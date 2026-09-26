import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing Supabase environment variables. Check your .env file.');
}

export const supabase = createClient(
  supabaseUrl || 'http://localhost:54321', 
  supabaseAnonKey || 'anon-key-placeholder'
);

export async function signInWithGoogle() {
  const redirectTo = `${window.location.origin}/`;
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo,
    },
  });
  
  if (error) {
    console.error('Error signing in with Google:', error.message);
    throw error;
  }
  
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Error signing out:', error.message);
    throw error;
  }
}

// ---------------- Database Persistence Helpers ---------------- //

export interface DbProfile {
  id: string;
  full_name?: string;
  email?: string;
  avatar_url?: string;
  target_exam?: string;
  phone?: string;
}

export interface DbQuizAttempt {
  id?: string;
  user_id?: string;
  exam_id: string;
  subject: string;
  score: number;
  total_questions: number;
  accuracy?: number;
  time_taken_seconds?: number;
  answers_json?: any;
}

export interface DbOnboarding {
  user_id: string;
  knows_target_exam: boolean;
  target_exam_id?: string;
  education_level?: string;
  stream?: string;
  degree?: string;
  age_group?: string;
  graduation_year?: string;
  pathway_recommendation?: string;
}

export async function saveUserProfile(profile: DbProfile) {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .upsert({
        id: profile.id,
        full_name: profile.full_name,
        email: profile.email,
        avatar_url: profile.avatar_url,
        target_exam: profile.target_exam,
        updated_at: new Date().toISOString()
      }, { onConflict: 'id' });
    
    if (error) {
      console.warn('Could not save profile to Supabase (run schema.sql if tables do not exist yet):', error.message);
      return null;
    }
    return data;
  } catch (err) {
    console.warn('saveUserProfile error:', err);
    return null;
  }
}

export async function fetchUserProfile(userId: string): Promise<DbProfile | null> {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    if (error) {
      console.warn('Could not fetch profile from Supabase:', error.message);
      return null;
    }
    return data;
  } catch (err) {
    console.warn('fetchUserProfile error:', err);
    return null;
  }
}

export async function saveOnboarding(onboarding: DbOnboarding) {
  try {
    const { data, error } = await supabase
      .from('user_onboarding')
      .upsert(onboarding, { onConflict: 'user_id' });

    if (error) {
      console.warn('Could not save onboarding to Supabase:', error.message);
      return null;
    }
    return data;
  } catch (err) {
    console.warn('saveOnboarding error:', err);
    return null;
  }
}

export async function saveQuizAttempt(attempt: DbQuizAttempt) {
  try {
    const { data, error } = await supabase
      .from('quiz_attempts')
      .insert({
        user_id: attempt.user_id,
        exam_id: attempt.exam_id,
        subject: attempt.subject,
        score: attempt.score,
        total_questions: attempt.total_questions,
        accuracy: attempt.total_questions > 0 ? (attempt.score / attempt.total_questions) * 100 : 0,
        time_taken_seconds: attempt.time_taken_seconds || 0,
        answers_json: attempt.answers_json || []
      });

    if (error) {
      console.warn('Could not save quiz attempt to Supabase:', error.message);
      return null;
    }
    return data;
  } catch (err) {
    console.warn('saveQuizAttempt error:', err);
    return null;
  }
}

export async function fetchQuizHistory(userId: string): Promise<DbQuizAttempt[]> {
  try {
    const { data, error } = await supabase
      .from('quiz_attempts')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Could not fetch quiz history from Supabase:', error.message);
      return [];
    }
    return data || [];
  } catch (err) {
    console.warn('fetchQuizHistory error:', err);
    return [];
  }
}
