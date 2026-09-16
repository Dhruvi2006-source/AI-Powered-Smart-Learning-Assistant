import express from 'express';
import { summarizeNotes, askQuestion, generateQuiz } from '../services/geminiService.js';

const router = express.Router();

/**
 * Health Check Route
 * GET /api/health
 */
router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'SmartLearn GenAI API is running smoothly'
  });
});

/**
 * Feature 1: Summarize Notes
 * POST /api/summarize
 * Body: { notes: string }
 */
router.post('/summarize', async (req, res) => {
  try {
    const { notes } = req.body;

    if (!notes || typeof notes !== 'string' || !notes.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Please provide study material notes to summarize.'
      });
    }

    if (notes.length > 20000) {
      return res.status(400).json({
        success: false,
        message: 'Study material text is too long. Please limit notes to under 20,000 characters.'
      });
    }

    const result = await summarizeNotes(notes.trim());

    return res.status(200).json({
      success: true,
      summary: result.summary,
      keyPoints: result.keyPoints
    });
  } catch (error) {
    console.error('API Summarize Error:', error.message);
    return res.status(500).json({
      success: false,
      message: error.message.includes('GEMINI_API_KEY') 
        ? 'Backend API Key is missing. Please configure GEMINI_API_KEY in server/.env file.'
        : 'Failed to generate summary. Please check your API configuration or try again.'
    });
  }
});

/**
 * Feature 2: Ask AI
 * POST /api/ask
 * Body: { notes: string, question: string }
 */
router.post('/ask', async (req, res) => {
  try {
    const { notes, question } = req.body;

    if (!notes || typeof notes !== 'string' || !notes.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Please provide study material notes as context.'
      });
    }

    if (!question || typeof question !== 'string' || !question.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a question.'
      });
    }

    const result = await askQuestion(notes.trim(), question.trim());

    return res.status(200).json({
      success: true,
      answer: result.answer
    });
  } catch (error) {
    console.error('API Ask AI Error:', error.message);
    return res.status(500).json({
      success: false,
      message: error.message.includes('GEMINI_API_KEY')
        ? 'Backend API Key is missing. Please configure GEMINI_API_KEY in server/.env file.'
        : 'Failed to process question. Please try again.'
    });
  }
});

/**
 * Feature 3: Quiz Generator
 * POST /api/quiz
 * Body: { notes: string, numberOfQuestions?: number, difficulty?: string }
 */
router.post('/quiz', async (req, res) => {
  try {
    const { notes, numberOfQuestions = 3, difficulty = 'medium' } = req.body;

    if (!notes || typeof notes !== 'string' || !notes.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Please provide study material notes to generate quiz questions.'
      });
    }

    const count = parseInt(numberOfQuestions, 10);
    if (isNaN(count) || count < 1 || count > 10) {
      return res.status(400).json({
        success: false,
        message: 'Number of questions must be between 1 and 10.'
      });
    }

    const validDifficulties = ['easy', 'medium', 'hard'];
    const diffLower = (difficulty || '').toLowerCase();
    const finalDiff = validDifficulties.includes(diffLower) ? diffLower : 'medium';

    const result = await generateQuiz(notes.trim(), count, finalDiff);

    return res.status(200).json({
      success: true,
      questions: result.questions
    });
  } catch (error) {
    console.error('API Quiz Generator Error:', error.message);
    return res.status(500).json({
      success: false,
      message: error.message.includes('GEMINI_API_KEY')
        ? 'Backend API Key is missing. Please configure GEMINI_API_KEY in server/.env file.'
        : 'Failed to generate practice quiz. Please try again.'
    });
  }
});

export default router;
