import React from 'react';
import FeatureCard from '../components/FeatureCard';
import { BookOpen, MessageSquareText, HelpCircle, Sparkles, CheckCircle, Brain, FileText, Zap } from 'lucide-react';

export default function Home({ onNavigate }) {
  const scrollToFeatures = () => {
    const el = document.getElementById('feature-cards');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="space-y-16 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-12 rounded-3xl bg-gradient-to-b from-indigo-50/60 via-purple-50/30 to-transparent border border-indigo-100/60 p-8 sm:p-12 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-indigo-200 shadow-2xs text-xs font-semibold text-indigo-700">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600 animate-spin" />
            <span>Academic Mini Project &bull; SAP Submission</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Learn Smarter with <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Generative AI</span>
          </h1>

          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Understand your study material, get quick explanations, and practice with AI-generated quizzes.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('summarizer')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-base shadow-lg shadow-indigo-200 transition-all hover:scale-[1.02] cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Start Learning</span>
              <Sparkles className="w-4 h-4" />
            </button>

            <button
              onClick={scrollToFeatures}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-semibold text-base border border-slate-200 shadow-xs transition-all cursor-pointer"
            >
              Explore Features
            </button>
          </div>
        </div>
      </section>

      {/* Feature Cards Grid */}
      <section id="feature-cards" className="space-y-6">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            AI-Powered Study Tools
          </h2>
          <p className="text-slate-600 text-sm mt-1">
            Choose a feature to transform how you study and retain information.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard
            icon={BookOpen}
            title="AI Notes Summarizer"
            description="Turn lengthy study notes into short, easy-to-understand summaries with bulleted key takeaways."
            buttonText="Summarize Notes"
            onClick={() => onNavigate('summarizer')}
            badge="Quick Summary"
          />

          <FeatureCard
            icon={MessageSquareText}
            title="Ask AI"
            description="Ask questions about your study material and get clear, instant AI explanations tailored to your notes."
            buttonText="Ask a Question"
            onClick={() => onNavigate('ask-ai')}
            badge="Q&A Tutor"
          />

          <FeatureCard
            icon={HelpCircle}
            title="Quiz Generator"
            description="Create practice MCQs from your study material, test your knowledge, and review instant score reports."
            buttonText="Create Quiz"
            onClick={() => onNavigate('quiz')}
            badge="Self Practice"
          />
        </div>
      </section>

      {/* How SmartLearn Works */}
      <section className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-xs space-y-8">
        <div className="text-center max-w-lg mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            How SmartLearn Works
          </h2>
          <p className="text-slate-600 text-sm mt-1">
            Boost your learning in three effortless steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center space-y-3 p-4">
            <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-1">
              <FileText className="w-7 h-7" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Step 1</span>
            <h3 className="text-lg font-bold text-slate-900">Add your study material</h3>
            <p className="text-slate-600 text-sm">
              Paste your lecture notes, textbook chapters, or revision material into the app.
            </p>
          </div>

          <div className="flex flex-col items-center text-center space-y-3 p-4">
            <div className="w-14 h-14 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 mb-1">
              <Brain className="w-7 h-7" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-purple-600">Step 2</span>
            <h3 className="text-lg font-bold text-slate-900">Choose an AI learning tool</h3>
            <p className="text-slate-600 text-sm">
              Select whether to summarize, ask clarifying questions, or generate a customized quiz.
            </p>
          </div>

          <div className="flex flex-col items-center text-center space-y-3 p-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 mb-1">
              <Zap className="w-7 h-7" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">Step 3</span>
            <h3 className="text-lg font-bold text-slate-900">Learn, understand, & practice</h3>
            <p className="text-slate-600 text-sm">
              Review AI key points, test yourself with MCQs, and master complex engineering concepts quickly.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
