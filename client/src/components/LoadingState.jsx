import React from 'react';
import { Sparkles, Loader2 } from 'lucide-react';

export default function LoadingState({ message = "AI is thinking..." }) {
  return (
    <div className="bg-gradient-to-r from-indigo-50/70 via-purple-50/70 to-blue-50/70 border border-indigo-100/80 rounded-2xl p-8 text-center my-6 flex flex-col items-center justify-center space-y-4 animate-pulse">
      <div className="relative">
        <div className="w-12 h-12 rounded-full bg-indigo-600/10 flex items-center justify-center text-indigo-600">
          <Loader2 className="w-6 h-6 animate-spin" />
        </div>
        <Sparkles className="w-4 h-4 text-purple-600 absolute -top-1 -right-1 animate-bounce" />
      </div>
      <div>
        <p className="text-slate-900 font-semibold text-base mb-1">{message}</p>
        <p className="text-xs text-slate-500">Processing with Generative AI model engine...</p>
      </div>
    </div>
  );
}
