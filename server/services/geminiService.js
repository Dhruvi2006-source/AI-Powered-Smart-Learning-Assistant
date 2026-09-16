import { GoogleGenAI, Type } from '@google/genai';

/**
 * Helper to get an instance of GoogleGenAI SDK
 */
function getGenAI() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'your_gemini_api_key_here') {
    throw new Error('GEMINI_API_KEY is not configured in server/.env file. Please add your API key from Google AI Studio.');
  }
  return new GoogleGenAI({ apiKey });
}

// Current supported Gemini model identifier
const MODEL_NAME = 'gemini-3.6-flash';

/**
 * Feature 1: Summarize Notes
 */
export async function summarizeNotes(notes) {
  const ai = getGenAI();

  const prompt = `You are an expert academic AI tutor. 
Analyze the following student study notes and generate a structured JSON response containing:
1. A concise, easy-to-understand summary.
2. A list of 4 to 6 key bullet points highlighting important concepts for exam revision.

Strict Output Format: Respond ONLY with a valid JSON object matching this schema:
{
  "summary": "Concise overview text here...",
  "keyPoints": ["Key point 1", "Key point 2", "Key point 3", "Key point 4"]
}

Study Material Notes:
${notes}`;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            keyPoints: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ['summary', 'keyPoints']
        }
      }
    });

    const responseText = response.text;
    const data = JSON.parse(responseText);
    
    return {
      summary: data.summary || "Summary generated successfully.",
      keyPoints: Array.isArray(data.keyPoints) ? data.keyPoints : []
    };
  } catch (err) {
    console.error('Gemini Summarize Error:', err);
    throw new Error(`Failed to generate summary: ${err.message}`);
  }
}

/**
 * Feature 2: Ask AI
 */
export async function askQuestion(notes, question) {
  const ai = getGenAI();

  const prompt = `You are a helpful, student-friendly AI Learning Assistant.
Answer the student's question based strictly on the provided study material.

Guidelines:
1. Use the provided study notes as your primary source of truth.
2. Explain concepts clearly and concisely using simple language suitable for a student.
3. CRITICAL: If the answer cannot be reasonably found in or inferred from the provided study material, clearly reply:
   "The provided study material does not contain information to answer this question."

Study Material Notes:
${notes}

Student Question:
${question}`;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt
    });

    return {
      answer: response.text.trim()
    };
  } catch (err) {
    console.error('Gemini Ask AI Error:', err);
    throw new Error(`Failed to answer question: ${err.message}`);
  }
}

/**
 * Feature 3: Quiz Generator
 */
export async function generateQuiz(notes, numberOfQuestions = 3, difficulty = 'medium') {
  const ai = getGenAI();

  const count = parseInt(numberOfQuestions, 10) || 3;

  const prompt = `You are an academic test creator. 
Based ONLY on the provided study material notes, generate exactly ${count} multiple-choice questions (MCQs).
Difficulty Level: ${difficulty}.

Requirements for each question:
- 'question': Clear, precise question text.
- 'options': An array of EXACTLY 4 distinct choice options.
- 'correctAnswer': An integer index representing the correct option (0 for option A, 1 for B, 2 for C, 3 for D).
- 'explanation': A short explanation of why the correct option is right.

Study Material Notes:
${notes}`;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            questions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.INTEGER },
                  question: { type: Type.STRING },
                  options: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                  },
                  correctAnswer: { type: Type.INTEGER },
                  explanation: { type: Type.STRING }
                },
                required: ['question', 'options', 'correctAnswer', 'explanation']
              }
            }
          },
          required: ['questions']
        }
      }
    });

    const responseText = response.text;
    const data = JSON.parse(responseText);

    // Validate structure
    if (!data.questions || !Array.isArray(data.questions)) {
      throw new Error('Invalid quiz response structure from Gemini API');
    }

    const validatedQuestions = data.questions.map((q, index) => ({
      id: q.id || index + 1,
      question: q.question,
      options: Array.isArray(q.options) && q.options.length === 4 ? q.options : ["Option A", "Option B", "Option C", "Option D"],
      correctAnswer: typeof q.correctAnswer === 'number' && q.correctAnswer >= 0 && q.correctAnswer <= 3 ? q.correctAnswer : 0,
      explanation: q.explanation || "Correct answer based on provided notes."
    }));

    return {
      questions: validatedQuestions
    };
  } catch (err) {
    console.error('Gemini Quiz Generator Error:', err);
    throw new Error(`Failed to generate quiz: ${err.message}`);
  }
}
