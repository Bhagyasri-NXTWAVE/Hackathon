import 'dotenv/config';
import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import { ALL_EXAMS, DEMO_NOTIFICATIONS } from './src/data/examsData.js';
import { generateMockQuestions } from './src/data/quizDatabase.js';
import { isOutOfTopicQuery, OUT_OF_TOPIC_REPLY, getAcademicAnswer } from './src/data/studyKnowledgeEngine.js';

const app = express();
const PORT = 3000;

app.use(express.json());

// Helper to get Gemini Client if API key is present in env
function getAIClient(): GoogleGenAI | null {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return null;
  try {
    return new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  } catch (err) {
    console.warn('Gemini initialization warning:', err);
    return null;
  }
}

let ai = getAIClient();

// Health Check API
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    aiConnected: !!ai,
    mode: ai ? 'Full AI Engine Enabled' : 'Demo AI Mode (Fallback Active)',
  });
});

// Get Exams List
app.get('/api/exams', (req, res) => {
  res.json(ALL_EXAMS);
});

// Get Notifications List
app.get('/api/notifications', (req, res) => {
  res.json(DEMO_NOTIFICATIONS);
});

// AI Career Finder API
app.post('/api/ai/career-recommend', async (req, res) => {
  const profile = req.body;

  if (ai) {
    try {
      const prompt = `You are Competitive World AI, an expert career mentor for Indian competitive exams.
Student Profile:
- Name: ${profile.name || 'Student'}
- Age: ${profile.age || 21}
- State: ${profile.state || 'Andhra Pradesh'}
- Education: ${profile.education || 'B.Tech'} (${profile.branch || 'CSE/IT'}, ${profile.graduationStatus || 'Pursuing'} Year ${profile.currentYear || '2nd'})
- Technical Preference: ${profile.technicalPreference || 'Both'}
- Central/State Preference: ${profile.examPreference || 'Both'}
- Daily Hours Available: ${profile.dailyStudyHours || 3} hrs
- Interests/Strong Subjects: ${(profile.interests || []).join(', ')}, ${(profile.strongSubjects || []).join(', ')}

Analyze this profile and recommend 4 suitable Indian competitive exams (e.g. GATE, APPSC Group II, SSC CGL, RRB, Banking, UPSC).
Respond ONLY with a JSON array of objects with keys:
"examId" (string like "gate-cse", "appsc-group-2", "ssc-cgl", "rrb-ntpc"),
"examTitle" (string),
"matchPercentage" (number 60-98),
"matchReason" (string 2-3 sentences),
"eligibilityStatus" ("Likely Eligible" | "Needs Verification"),
"difficultyLevel" ("High" | "Moderate" | "Very High"),
"estimatedPrepDuration" (string e.g. "6-9 Months"),
"careerGrowthPotential" (string),
"nextRecommendedStep" (string)`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        },
      });

      if (response.text) {
        const parsed = JSON.parse(response.text);
        return res.json({ recommendations: parsed, isDemo: false });
      }
    } catch (error) {
      console.error('Gemini career recommendation failed, falling back to Demo Mode:', error);
    }
  }

  // Smart Fallback Demo Mode for Career Finder
  const branchLower = (profile.branch || '').toLowerCase();
  const isTech = profile.technicalPreference === 'Technical' || branchLower.includes('cs') || branchLower.includes('it') || branchLower.includes('tech');
  const isAP = (profile.state || '').toLowerCase().includes('andhra') || (profile.examPreference || '').includes('State');

  const demoRecs = [
    {
      examId: isTech ? 'gate-cse' : 'ssc-cgl',
      examTitle: isTech ? 'GATE (Computer Science / Tech)' : 'SSC CGL (Central Executive Services)',
      matchPercentage: 94,
      matchReason: `Your background in ${profile.education || 'Graduation'} (${profile.branch || 'Engineering'}) matches perfectly with ${isTech ? 'GATE technical & PSU recruitment' : 'SSC CGL high-salary administrative Inspector roles'}.`,
      eligibilityStatus: 'Likely Eligible',
      difficultyLevel: 'High',
      estimatedPrepDuration: '6-8 Months',
      careerGrowthPotential: 'Rapid promotion to Executive Engineer / Assistant Commissioner',
      nextRecommendedStep: 'Start with Engineering Mathematics & Aptitude core topics.'
    },
    {
      examId: isAP ? 'appsc-group-2' : 'rrb-ntpc',
      examTitle: isAP ? 'APPSC Group II Services' : 'RRB NTPC Railways',
      matchPercentage: 88,
      matchReason: `Fits your preference for ${isAP ? 'Andhra Pradesh state administration (Sub-Registrar, Deputy Tahsildar)' : 'Indian Railways executive posts'}. ${profile.dailyStudyHours || 3} hours daily is ideal for this syllabus.`,
      eligibilityStatus: 'Likely Eligible',
      difficultyLevel: 'Moderate',
      estimatedPrepDuration: '5-7 Months',
      careerGrowthPotential: 'Promotion to Gazetted Officer / Section Officer',
      nextRecommendedStep: isAP ? 'Master AP History and AP Economy basics.' : 'Focus on General Awareness & Aptitude speed.'
    },
    {
      examId: 'ssc-cgl',
      examTitle: 'SSC Combined Graduate Level',
      matchPercentage: 82,
      matchReason: 'Excellent national scope with central government benefits, Income Tax Inspector & ASO Ministry options.',
      eligibilityStatus: 'Likely Eligible',
      difficultyLevel: 'Moderate',
      estimatedPrepDuration: '6 Months',
      careerGrowthPotential: 'Group B Gazetted Cadre in Central Ministries',
      nextRecommendedStep: 'Practice daily Quantitative Aptitude & English Speed tests.'
    },
    {
      examId: 'appsc-group-1',
      examTitle: 'APPSC Group I Civil Services',
      matchPercentage: 76,
      matchReason: 'Top state civil services post (Deputy Collector, DSP). High prestige and direct public administration impact in AP.',
      eligibilityStatus: 'Needs Verification',
      difficultyLevel: 'Very High',
      estimatedPrepDuration: '10-12 Months',
      careerGrowthPotential: 'Direct State Executive -> IAS Conferment',
      nextRecommendedStep: 'Build daily newspaper reading habit and AP State General Studies foundation.'
    }
  ];

  return res.json({ recommendations: demoRecs, isDemo: true });
});

// AI Chatbot / Voice Assistant API
app.post('/api/ai/chat', async (req, res) => {
  const { message, language, studentProfile, history } = req.body;

  // 1. Mandatory Out-Of-Topic Check
  if (isOutOfTopicQuery(message)) {
    return res.json({ 
      responseText: OUT_OF_TOPIC_REPLY, 
      isOutOfTopic: true, 
      isDemo: true 
    });
  }

  const ai = getAIClient();

  if (ai) {
    try {
      const systemInstruction = `You are "Competitive AI", an expert, friendly AI Mentor for Indian students preparing for competitive exams (GATE, UPSC, SSC, RRB, Banking, Defence, APPSC Groups I, II, III, IV, etc.).

MANDATORY SCOPE RESTRICTION:
- You are strictly an academic and competitive exam mentor.
- If the user asks about anything outside studies, education, academic subjects, competitive exams, or career preparation (such as movies, cinema, actors, songs, cooking, recipes, video games, jokes, dating, casual gossip, etc.), you MUST decline by replying:
"Sorry, it is out of topic. I can only assist you with studies, academic subjects, competitive exam preparation, syllabus, and career guidance."

CRITICAL CONTEXTUAL MEMORY INSTRUCTIONS:
- You have active contextual memory of the entire conversation session history.
- Maintain continuity with previous questions and answers. If the user asks a follow-up question (e.g. "What about eligibility?", "How many hours for that?", "Explain step 2", "What is the salary?", "Summarize our conversation"), directly reference the specific exam, subject, degree, or topic discussed in earlier turns without asking them to re-explain.
- Recall the student's profile: Name: ${studentProfile?.name || 'Student'}, State: ${studentProfile?.state || 'Andhra Pradesh'}, Education: ${studentProfile?.education || 'Degree'} (${studentProfile?.branch || 'General'}), Target Exam: ${studentProfile?.targetExamId || 'Exploring'}, Preferred Language: ${language || studentProfile?.preferredLanguage || 'English'}.
- Provide direct, mathematically and conceptually accurate, authoritative explanations for any academic or exam question.
- If asked in Telugu or Teluglish (Telugu written in English script like "Nenu GATE ki ela prepare avali?"), respond naturally in warm Teluglish or clear Telugu/English mixed style.`;

      const contents = [];
      if (Array.isArray(history) && history.length > 0) {
        for (const item of history.slice(-16)) {
          if (item.text && item.text.trim()) {
            contents.push({
              role: item.sender === 'user' ? 'user' : 'model',
              parts: [{ text: item.text }],
            });
          }
        }
      }
      contents.push({ role: 'user', parts: [{ text: message }] });

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: contents,
        config: { systemInstruction },
      });

      if (response.text) {
        return res.json({ responseText: response.text, isDemo: false });
      }
    } catch (err) {
      console.error('Gemini chat error, falling back to Knowledge Engine:', err);
    }
  }

  // Authoritative Academic Knowledge Engine
  const reply = getAcademicAnswer(message, studentProfile || {}, language);
  return res.json({ responseText: reply, isDemo: true });
});

// AI Quiz & Mock Exam Generator API
app.post('/api/ai/quiz', async (req, res) => {
  const { examId, examTitle, subject, difficulty, numQuestions = 10 } = req.body;
  const count = parseInt(numQuestions) || 10;
  const isFullMock = !subject || subject === 'ALL_SUBJECTS' || subject.toLowerCase().includes('all') || subject.toLowerCase().includes('full mock');
  const aiClient = getAIClient();

  if (aiClient) {
    try {
      const subjectInstruction = isFullMock
        ? `This is an authentic FULL MOCK EXAM for "${examTitle || examId}". Distribute the ${count} questions proportionally across all official sections of this exam.`
        : `This is a STRICT SUBJECT-SPECIFIC test. Generate questions ONLY for the subject "${subject}" in "${examTitle || examId}". DO NOT mix in questions from other subjects or exams!`;

      const prompt = `You are an official Indian competitive examination paper setter. Generate ${count} multiple-choice questions (MCQs) for "${examTitle || examId}".
${subjectInstruction}
Difficulty: ${difficulty || 'Medium'}.
Rules:
- Questions MUST be authentic to the official examination syllabus and difficulty level.
- Provide 4 distinct options per question.
- Return ONLY a valid JSON array of ${count} objects matching this schema:
[
  {
    "id": "q1",
    "question": "Clear, rigorous problem statement",
    "options": ["Option A text", "Option B text", "Option C text", "Option D text"],
    "correctAnswer": 0,
    "explanation": "Detailed explanation of why Option A is correct and why other options are wrong",
    "subject": "${isFullMock ? 'Exam Section' : subject}",
    "topic": "Specific Topic Name",
    "difficulty": "${difficulty || 'Medium'}"
  }
]`;

      const response = await aiClient.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
        config: { responseMimeType: 'application/json' },
      });

      if (response.text) {
        return res.json({ questions: JSON.parse(response.text), isDemo: false });
      }
    } catch (e) {
      console.warn('Gemini quiz generation fallback:', e);
    }
  }

  // Fallback authentic question generator strictly separated by subject & exam
  const questions = generateMockQuestions(examId || 'gate-cse', subject || 'ALL_SUBJECTS', difficulty || 'Medium', count);
  return res.json({ questions, isDemo: true });
});

// AI Personal Roadmap API
app.post('/api/ai/roadmap', async (req, res) => {
  const { examTitle, studentProfile } = req.body;

  if (ai) {
    try {
      const prompt = `Create a 6-phase personalized preparation roadmap for an Indian student preparing for: "${examTitle || 'GATE / APPSC'}".
Student Background: ${studentProfile?.education || 'Degree'} (${studentProfile?.branch || 'Tech'}), Daily hours: ${studentProfile?.dailyStudyHours || 3} hours.
Return ONLY JSON array of 6 Phase objects:
[
  {
    "phaseNumber": 1,
    "title": "Phase Title",
    "duration": "e.g. Month 1-2",
    "focusTopics": ["Topic 1", "Topic 2", "Topic 3"],
    "recommendedResources": ["Standard Book / Channel 1", "Practice Bank"],
    "keyMilestones": ["Complete 50% syllabus", "Basic Mock Test 1"],
    "status": "in_progress"
  }
]`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
        config: { responseMimeType: 'application/json' },
      });

      if (response.text) {
        return res.json({ phases: JSON.parse(response.text), isDemo: false });
      }
    } catch (e) {
      console.error('Gemini roadmap generation error:', e);
    }
  }

  // Demo Roadmap Fallback
  const demoPhases = [
    {
      phaseNumber: 1,
      title: 'Phase 1: Syllabus Foundation & Concept Building',
      duration: 'Weeks 1 - 4',
      focusTopics: ['Core Fundamentals', 'General Aptitude & Mathematics', 'Syllabus Mapping'],
      recommendedResources: ['Standard NCERT / University Textbooks', 'Competitive World Notes'],
      keyMilestones: ['Complete subject syllabus overview', 'Analyze past 5-year paper trend'],
      status: 'in_progress'
    },
    {
      phaseNumber: 2,
      title: 'Phase 2: Core Subject Deep Dive',
      duration: 'Weeks 5 - 10',
      focusTopics: ['High-Weightage Subject 1', 'High-Weightage Subject 2', 'Important State/National Topics'],
      recommendedResources: ['Subject Standard Reference Books', 'Topic-wise Practice MCQs'],
      keyMilestones: ['Create formula & quick revision handbook', 'Score > 65% in topic tests'],
      status: 'upcoming'
    },
    {
      phaseNumber: 3,
      title: 'Phase 3: Previous Year Questions (PYQ) Mastery',
      duration: 'Weeks 11 - 14',
      focusTopics: ['Last 10-15 Years PYQs', 'Option Elimination Techniques', 'Speed Shortcut Methods'],
      recommendedResources: ['GATE / APPSC PYQ Bank', 'Competitive World Quiz Engine'],
      keyMilestones: ['Solve 1,500+ PYQs with zero error in fundamentals'],
      status: 'upcoming'
    },
    {
      phaseNumber: 4,
      title: 'Phase 4: Subject-Wise Mock Tests & Weak Area Fixing',
      duration: 'Weeks 15 - 18',
      focusTopics: ['Targeted Weak Subject Re-learning', 'Time Management under Exam Pressure'],
      recommendedResources: ['Subject Specific Test Series', 'AI Error Log Tracker'],
      keyMilestones: ['Reduce negative marking by 50%', 'Achieve 75%+ accuracy rate'],
      status: 'upcoming'
    },
    {
      phaseNumber: 5,
      title: 'Phase 5: Full-Length Mocks & Exam Simulation',
      duration: 'Weeks 19 - 22',
      focusTopics: ['Full 3-Hour Exam Simulations', 'Stress Management', 'Final Strategy Refinement'],
      recommendedResources: ['10 Full Length Mock Tests'],
      keyMilestones: ['Consistently rank in top 10% percentile in mock tests'],
      status: 'upcoming'
    },
    {
      phaseNumber: 6,
      title: 'Phase 6: Rapid Revision & Exam Day Readiness',
      duration: 'Final 2 Weeks',
      focusTopics: ['Formula Sheet Scan', 'Current Affairs Final Polish', 'Health & Mindset'],
      recommendedResources: ['Personalized Quick Notes', 'Key Formula Cards'],
      keyMilestones: ['100% confidence & hall ticket verification ready'],
      status: 'upcoming'
    }
  ];

  return res.json({ phases: demoPhases, isDemo: true });
});

// AI Eligibility Checker API
app.post('/api/ai/eligibility', async (req, res) => {
  const { examTitle, userAge, userQualification, userState, userDegree } = req.body;

  if (ai) {
    try {
      const prompt = `Evaluate if a student is eligible for "${examTitle}".
Details provided:
- Age: ${userAge}
- Qualification/Degree: ${userQualification} (${userDegree})
- State: ${userState}

Respond ONLY with JSON:
{
  "eligibilityStatus": "Likely Eligible" | "Needs Verification" | "Likely Not Eligible",
  "reasonText": "2-3 sentences clear explanation with age/degree criteria",
  "officialDisclaimer": "Always verify eligibility with the latest official notification before applying."
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
        config: { responseMimeType: 'application/json' },
      });

      if (response.text) {
        return res.json(JSON.parse(response.text));
      }
    } catch (e) {
      console.error('Eligibility check error:', e);
    }
  }

  const ageNum = parseInt(userAge) || 21;
  let status = 'Likely Eligible';
  let reason = `Based on your age (${ageNum}) and qualification (${userQualification || 'Degree'}), you meet the general criteria for ${examTitle || 'this exam'}. Most graduate level exams require candidates to be 18 to 32/42 years of age.`;

  if (ageNum < 18) {
    status = 'Likely Not Eligible';
    reason = `Minimum age for most government and competitive exams is 18 years. You are currently ${ageNum}.`;
  }

  return res.json({
    eligibilityStatus: status,
    reasonText: reason,
    officialDisclaimer: 'Always verify eligibility with the latest official notification before applying.',
  });
});

// AI Quiz Generator API
app.post('/api/ai/quiz', async (req, res) => {
  const { examTitle, subject, topic, difficulty, numQuestions } = req.body;

  if (ai) {
    try {
      const prompt = `Generate ${numQuestions || 5} multiple choice questions (MCQs) for Indian competitive exam "${examTitle}" on subject "${subject || 'General Aptitude'}" topic "${topic || 'Core Concept'}".
Difficulty: ${difficulty || 'Medium'}.
Return ONLY JSON array of objects with keys:
"id" (string),
"question" (string),
"options" (array of 4 strings),
"correctAnswer" (number 0-3),
"explanation" (string explaining why option is correct),
"subject" (string),
"topic" (string),
"difficulty" ("Easy" | "Medium" | "Hard")`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
        config: { responseMimeType: 'application/json' },
      });

      if (response.text) {
        return res.json({ questions: JSON.parse(response.text), isDemo: false });
      }
    } catch (e) {
      console.error('Quiz generation error:', e);
    }
  }

  // Fallback Quiz questions
  const demoQuestions = [
    {
      id: 'q1',
      question: 'Which of the following data structures operates on a Last-In, First-Out (LIFO) basis?',
      options: ['Queue', 'Stack', 'Array', 'Linked List'],
      correctAnswer: 1,
      explanation: 'A Stack follows the LIFO principle where the element inserted last is removed first.',
      subject: subject || 'Computer Science / Aptitude',
      topic: topic || 'Data Structures',
      difficulty: difficulty || 'Easy'
    },
    {
      id: 'q2',
      question: 'Under which article of the Indian Constitution is the State Public Service Commission (like APPSC) established?',
      options: ['Article 280', 'Article 315', 'Article 324', 'Article 356'],
      correctAnswer: 1,
      explanation: 'Article 315 of the Constitution provides for the establishment of Public Service Commissions for the Union and for the States.',
      subject: 'Indian Polity / GS',
      topic: 'Constitutional Bodies',
      difficulty: 'Medium'
    },
    {
      id: 'q3',
      question: 'A train 150m long is running at 54 km/hr. How much time will it take to cross a pole?',
      options: ['8 seconds', '10 seconds', '12 seconds', '15 seconds'],
      correctAnswer: 1,
      explanation: 'Speed = 54 km/hr = 54 * (5/18) = 15 m/s. Time = Distance / Speed = 150 / 15 = 10 seconds.',
      subject: 'Quantitative Aptitude',
      topic: 'Speed, Time and Distance',
      difficulty: 'Easy'
    },
    {
      id: 'q4',
      question: 'Which Andhra Pradesh state scheme provides financial assistance to farmers for agriculture?',
      options: ['Jagananna Vidya Deevena', 'YSR Rythu Bharosa', 'Aarogyasri', 'Aasara Pension'],
      correctAnswer: 1,
      explanation: 'YSR Rythu Bharosa is the farmer welfare scheme in Andhra Pradesh offering financial assistance to farmers.',
      subject: 'AP State Affairs',
      topic: 'AP Welfare Schemes',
      difficulty: 'Medium'
    },
    {
      id: 'q5',
      question: 'In Operating Systems, what condition is NOT required for a deadlock to occur?',
      options: ['Mutual Exclusion', 'Hold and Wait', 'Preemption', 'Circular Wait'],
      correctAnswer: 2,
      explanation: 'No Preemption is required for deadlock. If preemption is allowed, deadlock cannot occur.',
      subject: 'Computer Science',
      topic: 'Operating Systems',
      difficulty: 'Hard'
    }
  ];

  return res.json({ questions: demoQuestions, isDemo: true });
});

// AI Exam Comparison API
app.post('/api/ai/compare', async (req, res) => {
  const { exam1Id, exam2Id, studentProfile } = req.body;

  const ex1 = ALL_EXAMS.find(e => e.id === exam1Id) || ALL_EXAMS[0];
  const ex2 = ALL_EXAMS.find(e => e.id === exam2Id) || ALL_EXAMS[1];

  if (ai) {
    try {
      const prompt = `Compare these two Indian competitive exams for a student:
Exam 1: ${ex1.title}
Exam 2: ${ex2.title}
Student Profile: Education: ${studentProfile?.education || 'Degree'}, Branch: ${studentProfile?.branch || 'Tech'}, Available Hours: ${studentProfile?.dailyStudyHours || 3}

Provide a comparative analysis with keys:
"eligibilityComparison", "difficultyComparison", "prepTimeComparison", "salaryComparison", "careerGrowthComparison", "recommendationSummary", "recommendedExamId" ("${ex1.id}" or "${ex2.id}")
Return ONLY JSON.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
        config: { responseMimeType: 'application/json' },
      });

      if (response.text) {
        return res.json({ comparison: JSON.parse(response.text), exam1: ex1, exam2: ex2, isDemo: false });
      }
    } catch (e) {
      console.error('Comparison error:', e);
    }
  }

  // Fallback Comparison
  return res.json({
    comparison: {
      eligibilityComparison: `${ex1.title} requires ${ex1.eligibility.qualification}, whereas ${ex2.title} accepts ${ex2.eligibility.qualification}.`,
      difficultyComparison: `${ex1.title} difficulty is rated ${ex1.examPattern.stages}, while ${ex2.title} involves ${ex2.examPattern.stages}.`,
      prepTimeComparison: `Typical preparation for ${ex1.title} is 6-8 months versus 5-7 months for ${ex2.title}.`,
      salaryComparison: `Pay range for ${ex1.title} is ${ex1.salaryRange}, while ${ex2.title} offers ${ex2.salaryRange}.`,
      careerGrowthComparison: `Growth in ${ex1.title}: ${ex1.careerGrowth[0]}. Growth in ${ex2.title}: ${ex2.careerGrowth[0]}.`,
      recommendationSummary: `Based on your profile (${studentProfile?.education || 'Degree'}), ${ex1.title} provides high specialized alignment while ${ex2.title} offers broader state administrative opportunities.`,
      recommendedExamId: ex1.id
    },
    exam1: ex1,
    exam2: ex2,
    isDemo: true
  });
});

// Vite server configuration for development / production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
