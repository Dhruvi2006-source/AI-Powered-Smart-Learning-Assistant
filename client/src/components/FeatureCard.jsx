import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function FeatureCard({ icon: Icon, title, description, buttonText, onClick, badge }) {
  return (
    <div className="group relative bg-white rounded-2xl p-6 md:p-8 border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-5">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 transition-colors group-hover:bg-indigo-600 group-hover:text-white">
            <Icon className="w-6 h-6 transition-transform group-hover:scale-110" />
          </div>
          {badge && (
            <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full border border-slate-200">
              {badge}
            </span>
          )}
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2.5 font-sans tracking-tight">
          {title}
        </h3>
        <p className="text-slate-600 text-sm leading-relaxed mb-6">
          {description}
        </p>
      </div>

      <button
        onClick={onClick}
        className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-50 hover:bg-indigo-600 text-slate-800 hover:text-white font-semibold text-sm border border-slate-200 hover:border-indigo-600 transition-all duration-200 cursor-pointer shadow-2xs"
      >
        <span>{buttonText}</span>
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </button>
    </div>
  );
}
