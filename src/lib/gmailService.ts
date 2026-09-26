import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, User, signOut } from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';

const TOKEN_KEY = 'cw_gmail_access_token';

// Initialize or reuse Firebase App
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);

// Provider with Gmail Scopes
const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/gmail.send');
provider.addScope('https://www.googleapis.com/auth/gmail.readonly');
provider.addScope('https://www.googleapis.com/auth/gmail.compose');
provider.setCustomParameters({ prompt: 'select_account consent' });

let isSigningIn = false;
let cachedAccessToken: string | null = null;

export const getAccessToken = (): string | null => {
  if (!cachedAccessToken) {
    cachedAccessToken = sessionStorage.getItem(TOKEN_KEY);
  }
  return cachedAccessToken;
};

export const setAccessToken = (token: string | null) => {
  cachedAccessToken = token;
  if (token) {
    sessionStorage.setItem(TOKEN_KEY, token);
  } else {
    sessionStorage.removeItem(TOKEN_KEY);
  }
};

export const initAuthListener = (
  onSuccess: (user: User, token: string | null) => void,
  onFailure: () => void
) => {
  return onAuthStateChanged(auth, (user) => {
    if (user) {
      const token = getAccessToken();
      onSuccess(user, token);
    } else {
      setAccessToken(null);
      onFailure();
    }
  });
};

export const signInWithGoogle = async (forceConsent: boolean = false): Promise<{ user: User; accessToken: string } | null> => {
  try {
    isSigningIn = true;
    if (forceConsent) {
      provider.setCustomParameters({ prompt: 'select_account consent' });
    }
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken || null;

    if (!token) {
      throw new Error('Google Sign-in succeeded, but no access token was returned. Please ensure all requested permissions were checked and allowed.');
    }

    setAccessToken(token);
    return { user: result.user, accessToken: token };
  } catch (error: any) {
    console.error('Error signing in with Google OAuth:', error);
    const code = error?.code || '';
    const message = error?.message || '';

    if (code === 'auth/popup-blocked' || code === 'auth/cancelled-popup-request' || message.includes('popup')) {
      throw new Error('Sign-in popup was blocked by browser iframe restrictions. Please click "Open in Standalone Tab" at the top right to complete Google Sign-in in a full browser tab.');
    } else if (code === 'auth/popup-closed-by-user') {
      throw new Error('Sign-in window was closed before completion. Please click "Sign in with Google" again and grant required permissions.');
    } else if (code === 'auth/unauthorized-domain') {
      throw new Error(`Domain (${window.location.hostname}) is not authorized in Firebase Console. Open the app in a new tab or authorize this domain.`);
    } else if (message.includes('access token') || message.includes('permission')) {
      throw error;
    } else {
      throw new Error(message || 'Failed to sign in with Google OAuth. Please try opening the app in a new tab.');
    }
  } finally {
    isSigningIn = false;
  }
};

export const reconnectGmail = async (): Promise<{ user: User; accessToken: string } | null> => {
  setAccessToken(null);
  return signInWithGoogle(true);
};

export const logoutGoogle = async (): Promise<void> => {
  await signOut(auth);
  setAccessToken(null);
};

export interface GmailHeader {
  name: string;
  value: string;
}

export interface GmailMessageSummary {
  id: string;
  threadId: string;
  snippet: string;
  subject: string;
  from: string;
  date: string;
}

/**
 * Robust UTF-8 Base64URL encoder for Gmail RFC 2822 messages
 */
function base64UrlEncode(str: string): string {
  const utf8Bytes = new TextEncoder().encode(str);
  let latin1Str = '';
  for (let i = 0; i < utf8Bytes.length; i++) {
    latin1Str += String.fromCharCode(utf8Bytes[i]);
  }
  return btoa(latin1Str)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

/**
 * Fetch list of recent messages from user's Gmail inbox
 */
export const fetchRecentEmails = async (): Promise<GmailMessageSummary[]> => {
  const token = getAccessToken();
  if (!token) {
    throw new Error('No active Gmail access token. Please sign in with Google to read emails.');
  }

  const listRes = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=8', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!listRes.ok) {
    if (listRes.status === 401) {
      setAccessToken(null);
      throw new Error('Google session expired (401). Please click "Reconnect / Sign in with Google" to refresh your session.');
    }
    if (listRes.status === 403) {
      const errText = await listRes.text();
      setAccessToken(null);
      if (errText.includes('insufficient') || errText.includes('SCOPE') || errText.includes('ACCESS_TOKEN_SCOPE_INSUFFICIENT')) {
        throw new Error('403 ACCESS_TOKEN_SCOPE_INSUFFICIENT: Your Google token lacks Gmail inbox reading scope. Please click "Reconnect Gmail" to grant permissions.');
      }
      throw new Error(`Gmail API 403 Forbidden: ${errText}`);
    }
    const errText = await listRes.text();
    throw new Error(`Gmail API error (${listRes.status}): ${errText}`);
  }

  const listData = await listRes.json();
  const messages = listData.messages || [];

  const summaries: GmailMessageSummary[] = [];

  for (const msg of messages.slice(0, 8)) {
    try {
      const msgRes = await fetch(`https://gmail.googleapis.com/gmail/v1/users/me/messages/${msg.id}?format=full`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (msgRes.ok) {
        const msgData = await msgRes.json();
        const headers: GmailHeader[] = msgData.payload?.headers || [];
        const subject = headers.find(h => h.name.toLowerCase() === 'subject')?.value || '(No Subject)';
        const from = headers.find(h => h.name.toLowerCase() === 'from')?.value || 'Unknown Sender';
        const date = headers.find(h => h.name.toLowerCase() === 'date')?.value || new Date().toLocaleDateString();

        summaries.push({
          id: msgData.id,
          threadId: msgData.threadId,
          snippet: msgData.snippet || '',
          subject,
          from,
          date
        });
      }
    } catch (err) {
      console.warn('Failed to fetch individual message detail:', err);
    }
  }

  return summaries;
};

/**
 * Send an email using Gmail API
 */
export const sendEmailViaGmail = async (
  to: string,
  subject: string,
  body: string
): Promise<{ id: string; threadId: string }> => {
  const token = getAccessToken();
  if (!token) {
    throw new Error('No active Gmail access token. Please sign in with Google to send emails.');
  }

  const emailLines = [
    `To: ${to}`,
    'Content-Type: text/plain; charset=utf-8',
    'MIME-Version: 1.0',
    `Subject: ${subject}`,
    '',
    body
  ];

  const emailRaw = emailLines.join('\r\n');
  const encodedRaw = base64UrlEncode(emailRaw);

  const response = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ raw: encodedRaw })
  });

  if (!response.ok) {
    if (response.status === 401) {
      setAccessToken(null);
      throw new Error('Google session expired (401). Please click "Reconnect Gmail" to re-authenticate and try sending again.');
    }
    if (response.status === 403) {
      const errText = await response.text();
      setAccessToken(null);
      if (errText.includes('insufficient') || errText.includes('SCOPE') || errText.includes('ACCESS_TOKEN_SCOPE_INSUFFICIENT')) {
        throw new Error('403 ACCESS_TOKEN_SCOPE_INSUFFICIENT: Your current Google token does not have permission to send emails via Gmail API. Please click "Reconnect Gmail / Re-authorize" to grant the Gmail Send permission.');
      }
      throw new Error(`Gmail API 403 Forbidden: ${errText}`);
    }
    const errText = await response.text();
    throw new Error(`Failed to send email via Gmail API (${response.status}): ${errText}`);
  }

  return await response.json();
};

