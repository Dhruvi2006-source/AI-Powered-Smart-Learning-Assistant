import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Summarizer from './pages/Summarizer';
import AskAI from './pages/AskAI';
import Quiz from './pages/Quiz';
import { GraduationCap, ExternalLink } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  const renderActivePage = () => {
    switch (activeTab) {
      case 'home':
        return <Home onNavigate={(tab) => setActiveTab(tab)} />;
      case 'summarizer':
        return <Summarizer />;
      case 'ask-ai':
        return <AskAI />;
      case 'quiz':
        return <Quiz />;
      default:
        return <Home onNavigate={(tab) => setActiveTab(tab)} />;
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Top Navbar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Page Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {renderActivePage()}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-auto py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          {/* Brand Info */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shadow-xs">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-slate-900 text-sm">SmartLearn GenAI</span>
                <span className="text-slate-400 text-xs">| Academic Project</span>
              </div>
              <p className="text-xs text-slate-500">B.Tech Computer Engineering</p>
            </div>
          </div>

          {/* Author & Copyright */}
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-xs text-slate-600">
            <div>
              Created by{' '}
              <a
                href="https://dhruvi-dev.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-indigo-600 hover:text-indigo-800 underline decoration-indigo-300 hover:decoration-indigo-600 inline-flex items-center gap-1 transition-colors"
              >
                <span>Dhruvi Patel</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <span className="hidden sm:inline text-slate-300">&bull;</span>
            <p className="text-slate-500">
              &copy; {currentYear} SmartLearn GenAI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
