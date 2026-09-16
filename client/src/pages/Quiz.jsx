import React, { useState } from 'react';
import { HelpCircle, Sparkles, AlertCircle, RefreshCw, Trophy, RotateCcw, FileText, CheckCircle2 } from 'lucide-react';
import LoadingState from '../components/LoadingState';
import QuizQuestion from '../components/QuizQuestion';
import { SAMPLE_STUDY_NOTES, MOCK_QUIZ_QUESTIONS } from '../data/mockData';
import { generateQuiz as apiGenerateQuiz } from '../services/api';

export default function Quiz() {
  const [notes, setNotes] = useState('');
  const [numQuestions, setNumQuestions] = useState('3');
  const [difficulty, setDifficulty] = useState('Medium');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [generatedQuiz, setGeneratedQuiz] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const handleLoadSample = () => {
    setNotes(SAMPLE_STUDY_NOTES);
    setError('');
    setGeneratedQuiz(null);
    setShowResults(false);
  };

  const handleGenerateQuiz = async () => {
    if (!notes.trim()) {
      setError('Please enter some study material first.');
      setGeneratedQuiz(null);
      return;
    }

    setError('');
    setLoading(true);
    setGeneratedQuiz(null);
    setShowResults(false);
    setUserAnswers({});

    try {
      const data = await apiGenerateQuiz(notes.trim(), numQuestions, difficulty);
      setGeneratedQuiz(data.questions);
    } catch (err) {
      console.warn('API call failed for Quiz Generator:', err.message);

      if (err.message.includes('GEMINI_API_KEY')) {
        setError('Backend GEMINI_API_KEY is not configured in server/.env. Displaying mock quiz preview.');
        const count = parseInt(numQuestions, 10) || 3;
        setGeneratedQuiz(MOCK_QUIZ_QUESTIONS.slice(0, count));
      } else {
        setError(err.message || 'Failed to generate quiz. Please check server connection.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOptionSelect = (questionId, optionIndex) => {
    if (showResults) return;
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const handleSubmitQuiz = () => {
    if (!generatedQuiz) return;
    
    // Calculate score
    let calculatedScore = 0;
    generatedQuiz.forEach(q => {
      if (userAnswers[q.id] === q.correctAnswer) {
        calculatedScore += 1;
      }
    });

    setScore(calculatedScore);
    setShowResults(true);
  };

  const handleTryAgain = () => {
    setUserAnswers({});
    setShowResults(false);
    setScore(0);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Practice & Evaluation</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          AI Quiz Generator
        </h1>
        <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
          Generate multiple-choice practice questions from your study notes and test your understanding.
        </p>
      </div>

      {/* Generator Configuration Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <label htmlFor="quiz-notes" className="block text-sm font-bold text-slate-900">
            Study Material Content
          </label>
          <button
            type="button"
            onClick={handleLoadSample}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 hover:text-emerald-800 hover:bg-emerald-50 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Load Sample Notes</span>
          </button>
        </div>

        <textarea
          id="quiz-notes"
          rows={6}
          value={notes}
          onChange={(e) => {
            setNotes(e.target.value);
            if (error) setError('');
          }}
          placeholder="Paste your study material here to generate quiz questions..."
          className="w-full p-4 text-sm text-slate-900 placeholder-slate-400 bg-slate-50/50 border border-slate-200 rounded-2xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 focus:bg-white transition-all resize-y"
        />

        {/* Options Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Number of Questions
            </label>
            <select
              value={numQuestions}
              onChange={(e) => setNumQuestions(e.target.value)}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
            >
              <option value="3">3 Questions (Quick Quiz)</option>
              <option value="5">5 Questions (Standard Quiz)</option>
              <option value="10">10 Questions (Comprehensive)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Difficulty Level
            </label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
            >
              <option value="Easy">Easy (Conceptual Basics)</option>
              <option value="Medium">Medium (Standard Academic)</option>
              <option value="Hard">Hard (Deep Analytical)</option>
            </select>
          </div>
        </div>

        {/* Validation error */}
        {error && (
          <div className="flex items-center gap-2 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm font-medium animate-in fade-in">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{error}</span>
          </div>
        )}

        {/* Action Button */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={handleGenerateQuiz}
            disabled={loading}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-md shadow-emerald-200 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Creating Quiz...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Generate Quiz</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Loading state */}
      {loading && <LoadingState message="Extracting key concepts & generating MCQs with Gemini AI..." />}

      {/* Generated Quiz Container */}
      {generatedQuiz && !loading && (
        <div className="space-y-6">
          {/* Score Header Banner if submitted */}
          {showResults && (
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-6 rounded-3xl shadow-lg flex items-center justify-between flex-wrap gap-4 animate-in zoom-in-95 duration-200">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 text-white">
                  <Trophy className="w-7 h-7 text-amber-300 animate-bounce" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Quiz Submitted!</h3>
                  <p className="text-emerald-100 text-sm">
                    You scored <span className="font-extrabold text-white text-base">{score}</span> out of <span className="font-extrabold text-white text-base">{generatedQuiz.length}</span> (
                    {Math.round((score / generatedQuiz.length) * 100)}%)
                  </p>
                </div>
              </div>

              <button
                onClick={handleTryAgain}
                className="px-4 py-2.5 rounded-xl bg-white text-emerald-800 hover:bg-emerald-50 font-bold text-sm transition-all shadow-xs cursor-pointer flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Try Again</span>
              </button>
            </div>
          )}

          {/* List of Questions */}
          <div className="space-y-4">
            {generatedQuiz.map((q, idx) => (
              <QuizQuestion
                key={q.id || idx}
                question={q}
                questionNumber={idx + 1}
                selectedOption={userAnswers[q.id || idx]}
                onSelectOption={(optionIndex) => handleOptionSelect(q.id || idx, optionIndex)}
                showResults={showResults}
              />
            ))}
          </div>

          {/* Submit Quiz Controls */}
          {!showResults ? (
            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between flex-wrap gap-4">
              <div className="text-xs text-slate-500 font-medium">
                Answered <span className="font-bold text-slate-900">{Object.keys(userAnswers).length}</span> of <span className="font-bold text-slate-900">{generatedQuiz.length}</span> questions
              </div>

              <button
                onClick={handleSubmitQuiz}
                disabled={Object.keys(userAnswers).length === 0}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-200 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Submit Quiz</span>
              </button>
            </div>
          ) : (
            <div className="flex justify-center pt-2">
              <button
                onClick={handleTryAgain}
                className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm transition-all cursor-pointer flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset & Retake Quiz</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
