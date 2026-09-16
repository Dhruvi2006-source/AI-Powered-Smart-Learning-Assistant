import React, { useState } from 'react';
import { Bot, Copy, Check, Sparkles, CheckCircle2 } from 'lucide-react';

export default function AIResponseCard({ title = "AI Generated Response", summary, keyPoints, rawText, isMock = false }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const textToCopy = rawText || `${summary}\n\nKey Points:\n` + (keyPoints ? keyPoints.map(kp => `- ${kp}`).join('\n') : '');
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden my-6 transition-all">
      {/* Header */}
      <div className="px-6 py-4 bg-slate-50/80 border-b border-slate-200/70 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shadow-xs">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-sm">{title}</h4>
            <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-indigo-500" /> Powered by Gemini AI
            </span>
          </div>
        </div>

        <button
          onClick={handleCopy}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            copied
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-slate-500" />
              <span>Copy Response</span>
            </>
          )}
        </button>
      </div>

      {/* Main Content */}
      <div className="p-6 space-y-6">
        {summary && (
          <div>
            <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Summary</h5>
            <p className="text-slate-800 text-sm sm:text-base leading-relaxed font-sans">
              {summary}
            </p>
          </div>
        )}

        {rawText && (
          <p className="text-slate-800 text-sm sm:text-base leading-relaxed font-sans whitespace-pre-line">
            {rawText}
          </p>
        )}

        {keyPoints && keyPoints.length > 0 && (
          <div>
            <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Key Takeaways</h5>
            <ul className="space-y-2.5">
              {keyPoints.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 mt-0.5 shrink-0" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Developer hint if mock */}
      {isMock && (
        <div className="px-6 py-2.5 bg-indigo-50/50 border-t border-indigo-100 text-[11px] text-indigo-700 font-medium flex items-center justify-between">
          <span>Part 1 Preview: Displaying structured response.</span>
          <span className="text-slate-500 font-mono text-[10px]">Gemini API integration arriving in Part 2</span>
        </div>
      )}
    </div>
  );
}
