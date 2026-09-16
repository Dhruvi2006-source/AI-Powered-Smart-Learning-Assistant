const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Send study notes to backend for AI summarization
 */
export async function summarizeNotes(notes) {
  try {
    const response = await fetch(`${API_BASE_URL}/summarize`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ notes }),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || 'Failed to summarize notes. Please try again.');
    }

    return data;
  } catch (error) {
    console.error('API Summarize Request Failed:', error);
    throw error;
  }
}

/**
 * Send study notes and student question to backend for AI Q&A explanation
 */
export async function askQuestion(notes, question) {
  try {
    const response = await fetch(`${API_BASE_URL}/ask`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ notes, question }),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || 'Failed to get answer from AI. Please try again.');
    }

    return data;
  } catch (error) {
    console.error('API Ask AI Request Failed:', error);
    throw error;
  }
}

/**
 * Send study notes and parameters to backend for AI Quiz generation
 */
export async function generateQuiz(notes, numberOfQuestions = 3, difficulty = 'medium') {
  try {
    const response = await fetch(`${API_BASE_URL}/quiz`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        notes,
        numberOfQuestions: parseInt(numberOfQuestions, 10),
        difficulty
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || 'Failed to generate quiz. Please try again.');
    }

    return data;
  } catch (error) {
    console.error('API Quiz Request Failed:', error);
    throw error;
  }
}
