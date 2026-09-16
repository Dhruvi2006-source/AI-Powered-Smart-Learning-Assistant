import React from 'react';
import { CheckCircle, XCircle, Info } from 'lucide-react';

export default function QuizQuestion({
  question,
  questionNumber,
  selectedOption,
  onSelectOption,
  showResults
}) {
  const optionLabels = ['A', 'B', 'C', 'D'];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
      {/* Question Header */}
      <div className="flex items-start gap-3">
        <span className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 font-bold text-sm flex items-center justify-center shrink-0 mt-0.5">
          {questionNumber}
        </span>
        <h4 className="text-slate-900 font-semibold text-base sm:text-lg leading-snug">
          {question.question}
        </h4>
      </div>

      {/* Options List */}
      <div className="grid grid-cols-1 gap-2.5 pt-2">
        {question.options.map((optionText, idx) => {
          const isSelected = selectedOption === idx;
          const isCorrect = idx === question.correctAnswer;
          
          let optionStyles = "border-slate-200 hover:border-indigo-300 hover:bg-slate-50 text-slate-700";
          let badgeStyles = "bg-slate-100 text-slate-600 border-slate-200";

          if (showResults) {
            if (isCorrect) {
              optionStyles = "border-emerald-500 bg-emerald-50/70 text-emerald-950 font-medium";
              badgeStyles = "bg-emerald-600 text-white border-emerald-600";
            } else if (isSelected && !isCorrect) {
              optionStyles = "border-rose-400 bg-rose-50/70 text-rose-950 font-medium";
              badgeStyles = "bg-rose-500 text-white border-rose-500";
            } else {
              optionStyles = "border-slate-100 bg-slate-50/50 text-slate-400 opacity-60";
              badgeStyles = "bg-slate-100 text-slate-400 border-slate-200";
            }
          } else if (isSelected) {
            optionStyles = "border-indigo-600 bg-indigo-50/80 text-indigo-950 font-medium shadow-xs";
            badgeStyles = "bg-indigo-600 text-white border-indigo-600";
          }

          return (
            <button
              key={idx}
              type="button"
              disabled={showResults}
              onClick={() => onSelectOption(idx)}
              className={`w-full text-left p-3.5 rounded-xl border transition-all duration-150 flex items-center justify-between cursor-pointer ${optionStyles}`}
            >
              <div className="flex items-center gap-3">
                <span className={`w-7 h-7 rounded-lg border text-xs font-bold flex items-center justify-center shrink-0 ${badgeStyles}`}>
                  {optionLabels[idx]}
                </span>
                <span className="text-sm">{optionText}</span>
              </div>

              {showResults && isCorrect && (
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 ml-2" />
              )}
              {showResults && isSelected && !isCorrect && (
                <XCircle className="w-5 h-5 text-rose-500 shrink-0 ml-2" />
              )}
            </button>
          );
        })}
      </div>

      {/* Explanation Box on Submit */}
      {showResults && (
        <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 space-y-1 animate-in fade-in">
          <div className="flex items-center gap-1.5 font-bold text-slate-900">
            <Info className="w-4 h-4 text-indigo-600" />
            <span>Explanation:</span>
          </div>
          <p className="text-slate-600 pl-5 leading-relaxed">{question.explanation}</p>
        </div>
      )}
    </div>
  );
}
