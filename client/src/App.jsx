import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Summarizer from './pages/Summarizer';
import AskAI from './pages/AskAI';
import Quiz from './pages/Quiz';
import { GraduationCap } from 'lucide-react';

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
              <GraduationCap className="w-4 h-4" />
            </div>
            <span className="font-bold text-slate-900 text-sm">SmartLearn GenAI</span>
            <span className="text-slate-400 text-xs">| Academic Mini Project</span>
          </div>

          <p className="text-xs text-slate-500">
            Designed for B.Tech Computer Engineering &bull; Built with React, Vite & Tailwind CSS v4
          </p>
        </div>
      </footer>
    </div>
  );
}
