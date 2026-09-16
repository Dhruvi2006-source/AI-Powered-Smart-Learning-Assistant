import React, { useState } from 'react';
import { MessageSquareText, Sparkles, AlertCircle, RefreshCw, HelpCircle, FileText } from 'lucide-react';
import LoadingState from '../components/LoadingState';
import AIResponseCard from '../components/AIResponseCard';
import { SAMPLE_STUDY_NOTES, MOCK_QA_RESPONSES, DEFAULT_QA_RESPONSE } from '../data/mockData';
import { askQuestion as apiAskQuestion } from '../services/api';

export default function AskAI() {
  const [notes, setNotes] = useState('');
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [response, setResponse] = useState(null);
  const [isMockResult, setIsMockResult] = useState(false);

  const handleLoadSample = () => {
    setNotes(SAMPLE_STUDY_NOTES);
    setQuestion("What is Generative AI?");
    setError('');
    setResponse(null);
  };

  const handleAskAI = async () => {
    if (!notes.trim()) {
      setError('Please enter your study material notes first.');
      setResponse(null);
      return;
    }

    if (!question.trim()) {
      setError('Please enter a question first.');
      setResponse(null);
      return;
    }

    setError('');
    setLoading(true);
    setResponse(null);
    setIsMockResult(false);

    try {
      const data = await apiAskQuestion(notes.trim(), question.trim());
      setResponse({
        question: question,
        answer: data.answer
      });
    } catch (err) {
      console.warn('API call failed for Ask AI:', err.message);

      if (err.message.includes('GEMINI_API_KEY')) {
        setError('Backend GEMINI_API_KEY is not configured in server/.env. Displaying mock answer preview.');
        
        const qLower = question.toLowerCase();
        const match = MOCK_QA_RESPONSES.find(m => 
          m.keywords.some(kw => qLower.includes(kw))
        );
        setResponse({
          question: question,
          answer: match ? match.answer : DEFAULT_QA_RESPONSE
        });
        setIsMockResult(true);
      } else {
        setError(err.message || 'Failed to process question. Please check server connection.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-xs font-semibold">
          <MessageSquareText className="w-3.5 h-3.5" />
          <span>Q&A Tutor</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Ask AI About Your Notes
        </h1>
        <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
          Ask specific questions about your study material and get instant AI explanations.
        </p>
      </div>

      {/* Main Input Form */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6">
        {/* Notes Input Section */}
        <div className="space-y-2">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <label htmlFor="qa-notes" className="block text-sm font-bold text-slate-900">
              Study Material Context
            </label>
            <button
              type="button"
              onClick={handleLoadSample}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-600 hover:text-purple-800 hover:bg-purple-50 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Load Sample Notes & Question</span>
            </button>
          </div>
          <textarea
            id="qa-notes"
            rows={5}
            value={notes}
            onChange={(e) => {
              setNotes(e.target.value);
              if (error) setError('');
            }}
            placeholder="Paste your study notes here..."
            className="w-full p-4 text-sm text-slate-900 placeholder-slate-400 bg-slate-50/50 border border-slate-200 rounded-2xl focus:outline-hidden focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 focus:bg-white transition-all resize-y"
          />
        </div>

        {/* Question Input Section */}
        <div className="space-y-2">
          <label htmlFor="qa-question" className="block text-sm font-bold text-slate-900">
            Your Question
          </label>
          <div className="relative">
            <input
              id="qa-question"
              type="text"
              value={question}
              onChange={(e) => {
                setQuestion(e.target.value);
                if (error) setError('');
              }}
              onKeyDown={(e) => e.key === 'Enter' && handleAskAI()}
              placeholder="Ask something about your notes (e.g. What is Generative AI?)"
              className="w-full pl-4 pr-12 py-3.5 text-sm sm:text-base text-slate-900 placeholder-slate-400 bg-slate-50/50 border border-slate-200 rounded-2xl focus:outline-hidden focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 focus:bg-white transition-all"
            />
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400">
              <HelpCircle className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Validation error message */}
        {error && (
          <div className="flex items-center gap-2 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm font-medium animate-in fade-in">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{error}</span>
          </div>
        )}

        {/* Submit button */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={handleAskAI}
            disabled={loading}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm shadow-md shadow-purple-200 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Thinking...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Ask AI</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Loading state */}
      {loading && <LoadingState message="Processing question with Gemini AI..." />}

      {/* AI Response Card */}
      {response && !loading && (
        <div className="space-y-3">
          <div className="px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
            Question: "{response.question}"
          </div>
          <AIResponseCard
            title="AI Answer & Explanation"
            rawText={response.answer}
            isMock={isMockResult}
          />
        </div>
      )}
    </div>
  );
}
