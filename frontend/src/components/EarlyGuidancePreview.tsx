import React, { useState } from 'react';
import { Sparkles, ShieldAlert, ArrowRight, CheckCircle2, RefreshCw } from 'lucide-react';
import { PageView, LanguageCode } from '../types';
import { translations } from '../data/translations';

interface EarlyGuidancePreviewProps {
  onNavigate: (view: PageView) => void;
  currentLang: LanguageCode;
}

export const EarlyGuidancePreview: React.FC<EarlyGuidancePreviewProps> = ({
  onNavigate,
  currentLang,
}) => {
  const t = translations[currentLang] || translations.en;

  // Interactive UI slider demo states
  const [commScore, setCommScore] = useState(75);
  const [socialScore, setSocialScore] = useState(65);
  const [dailyScore, setDailyScore] = useState(85);

  const resetSliders = () => {
    setCommScore(75);
    setSocialScore(65);
    setDailyScore(85);
  };

  return (
    <section className="py-20 bg-white border-b border-purple-100/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Information & Disclaimer */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-sky-600" />
              <span>Parent Observational Tool</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {t.guidanceHeading}
            </h2>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              {t.guidanceSubheading}
            </p>

            {/* MANDATORY PRODUCT SAFETY DISCLAIMER */}
            <div className="p-5 rounded-3xl bg-amber-50/90 border-2 border-amber-200/90 shadow-sm flex items-start gap-4">
              <div className="p-2.5 bg-amber-500/10 text-amber-700 rounded-2xl shrink-0 mt-0.5">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div className="text-xs sm:text-sm text-amber-950">
                <p className="font-extrabold text-amber-900 uppercase tracking-wide text-xs mb-1">
                  Product Safety Notice
                </p>
                <p className="font-bold leading-snug">
                  “This tool provides general observational guidance and is not a medical diagnosis.”
                </p>
                <p className="text-amber-800 text-xs mt-1">
                  Results serve as a supportive guide to help structure conversations with pediatricians and developmental specialists.
                </p>
              </div>
            </div>

            {/* Checklist Features */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-slate-700">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>6 Easy observational questions for toddlers & children</span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-slate-700">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Instant visual summary report to share with therapists</span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-slate-700">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>100% Private — no personal data stored</span>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <button
                onClick={() => onNavigate('guidance')}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-sky-600 via-sky-700 to-purple-700 hover:from-sky-700 hover:to-purple-800 text-white font-extrabold rounded-2xl text-base shadow-xl shadow-sky-200 hover:shadow-2xl hover:scale-[1.02] transition-all flex items-center justify-center gap-3"
              >
                <span>{t.guidanceStartBtn}</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

          </div>

          {/* Right Column: Interactive Assessment Preview Module */}
          <div className="lg:col-span-6">
            <div className="p-6 sm:p-8 rounded-4xl bg-gradient-to-br from-cream-50 via-white to-purple-50/50 border border-purple-100 shadow-2xl space-y-6 relative">
              
              <div className="flex items-center justify-between border-b border-purple-100/80 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Interactive Checklist Preview
                  </h3>
                  <p className="text-xs text-purple-700 font-medium">
                    Adjust sliders to preview observational scoring
                  </p>
                </div>
                <button
                  onClick={resetSliders}
                  className="p-2 text-slate-400 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-colors text-xs flex items-center gap-1"
                  title="Reset demo values"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              </div>

              {/* Progress Bar Item 1: Communication */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-800">Communication & Gestures</span>
                  <span className="text-purple-700 bg-purple-100 px-2.5 py-0.5 rounded-full">{commScore}%</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={commScore}
                  onChange={(e) => setCommScore(Number(e.target.value))}
                  className="w-full accent-purple-600 bg-slate-200 rounded-lg h-2 cursor-pointer"
                />
                <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden p-0.5 border border-slate-200">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-sky-500 h-full rounded-full transition-all duration-500 shadow-sm"
                    style={{ width: `${commScore}%` }}
                  />
                </div>
              </div>

              {/* Progress Bar Item 2: Social Interaction */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-800">Social Interaction & Eye Contact</span>
                  <span className="text-sky-700 bg-sky-100 px-2.5 py-0.5 rounded-full">{socialScore}%</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={socialScore}
                  onChange={(e) => setSocialScore(Number(e.target.value))}
                  className="w-full accent-sky-600 bg-slate-200 rounded-lg h-2 cursor-pointer"
                />
                <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden p-0.5 border border-slate-200">
                  <div
                    className="bg-gradient-to-r from-sky-500 to-emerald-500 h-full rounded-full transition-all duration-500 shadow-sm"
                    style={{ width: `${socialScore}%` }}
                  />
                </div>
              </div>

              {/* Progress Bar Item 3: Daily Activities */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-800">Daily Routines & Sensory Comfort</span>
                  <span className="text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">{dailyScore}%</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={dailyScore}
                  onChange={(e) => setDailyScore(Number(e.target.value))}
                  className="w-full accent-emerald-600 bg-slate-200 rounded-lg h-2 cursor-pointer"
                />
                <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden p-0.5 border border-slate-200">
                  <div
                    className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full rounded-full transition-all duration-500 shadow-sm"
                    style={{ width: `${dailyScore}%` }}
                  />
                </div>
              </div>

              {/* Simulated Guidance Summary Card */}
              <div className="p-4 rounded-2xl bg-purple-50/80 border border-purple-100 text-xs text-purple-900 space-y-1">
                <p className="font-extrabold flex items-center justify-between">
                  <span>Observational Summary Indicator</span>
                  <span className="text-[10px] bg-purple-200 px-2 py-0.5 rounded font-bold uppercase">UI Demo</span>
                </p>
                <p className="text-slate-600">
                  Based on current sliders: Recommended to observe joint attention patterns during play dates and share findings with your pediatrician.
                </p>
              </div>

              <div className="text-center pt-2">
                <button
                  onClick={() => onNavigate('guidance')}
                  className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-2xl text-xs transition-colors shadow-md"
                >
                  Launch Full Assessment Checklist →
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
