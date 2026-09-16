import React, { useState } from 'react';
import { BookOpen, Sparkles, AlertCircle, RefreshCw, FileText } from 'lucide-react';
import LoadingState from '../components/LoadingState';
import AIResponseCard from '../components/AIResponseCard';
import { SAMPLE_STUDY_NOTES, MOCK_SUMMARY_RESPONSE } from '../data/mockData';
import { summarizeNotes as apiSummarizeNotes } from '../services/api';

export default function Summarizer() {
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const [isMockResult, setIsMockResult] = useState(false);

  const MAX_CHARS = 5000;

  const handleNotesChange = (e) => {
    const text = e.target.value;
    if (text.length <= MAX_CHARS) {
      setNotes(text);
      if (error) setError('');
    }
  };

  const handleLoadSample = () => {
    setNotes(SAMPLE_STUDY_NOTES);
    setError('');
    setResult(null);
  };

  const handleGenerate = async () => {
    if (!notes.trim()) {
      setError('Please enter some study material first.');
      setResult(null);
      return;
    }

    setError('');
    setLoading(true);
    setResult(null);
    setIsMockResult(false);

    try {
      const data = await apiSummarizeNotes(notes.trim());
      setResult({
        summary: data.summary,
        keyPoints: data.keyPoints
      });
    } catch (err) {
      console.warn('API call failed, falling back to mock preview if API key unconfigured:', err.message);
      
      // If API key is missing on backend, notify user or fallback gracefully
      if (err.message.includes('GEMINI_API_KEY')) {
        setError('Backend GEMINI_API_KEY is not configured yet in server/.env. Displaying mock summary.');
        setResult(MOCK_SUMMARY_RESPONSE);
        setIsMockResult(true);
      } else {
        setError(err.message || 'Failed to generate summary. Please check your network or server connection.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setNotes('');
    setError('');
    setResult(null);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Notes Summarizer</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          AI Notes Summarizer
        </h1>
        <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
          Paste your study material below and turn it into a concise summary with key takeaways.
        </p>
      </div>

      {/* Main Form Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-5">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <label htmlFor="study-notes" className="block text-sm font-bold text-slate-900">
            Study Material / Lecture Notes
          </label>
          <button
            type="button"
            onClick={handleLoadSample}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Load Sample Notes</span>
          </button>
        </div>

        {/* Textarea */}
        <div className="relative">
          <textarea
            id="study-notes"
            rows={7}
            value={notes}
            onChange={handleNotesChange}
            placeholder="Paste your notes, textbook content, or study material here..."
            className={`w-full p-4 text-sm sm:text-base text-slate-900 placeholder-slate-400 bg-slate-50/50 border rounded-2xl focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 focus:bg-white transition-all resize-y ${
              error ? 'border-rose-300 ring-2 ring-rose-100' : 'border-slate-200'
            }`}
          />

          {/* Character counter */}
          <div className="flex items-center justify-between mt-2 px-1 text-xs text-slate-400 font-mono">
            <span>{notes.length} / {MAX_CHARS} characters</span>
            {notes.length > 0 && (
              <button
                onClick={handleClear}
                className="text-slate-400 hover:text-rose-600 transition-colors cursor-pointer font-sans text-xs"
              >
                Clear text
              </button>
            )}
          </div>
        </div>

        {/* Error Validation Message */}
        {error && (
          <div className="flex items-center gap-2 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm font-medium animate-in fade-in">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{error}</span>
          </div>
        )}

        {/* Action Button */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-md shadow-indigo-200 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Generating Summary...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Generate Summary</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Loading State */}
      {loading && <LoadingState message="Connecting to Gemini API & summarizing notes..." />}

      {/* Results Output Card */}
      {result && !loading && (
        <AIResponseCard
          title="Notes Summary & Key Takeaways"
          summary={result.summary}
          keyPoints={result.keyPoints}
          isMock={isMockResult}
        />
      )}
    </div>
  );
}
