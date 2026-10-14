import React, { useState } from 'react';
import { Sparkles, ShieldAlert, ArrowRight, ArrowLeft, CheckCircle2, RotateCcw, Printer, Share2, BookOpen, MessageCircle } from 'lucide-react';
import { mockGuidanceQuestions } from '../data/mockData';
import { PageView, AssessmentScores } from '../types';

interface EarlyGuidancePageProps {
  onNavigate: (view: PageView) => void;
  onShowToast: (title: string, message: string) => void;
  onNavigateToActivities?: (scores: AssessmentScores) => void;
}

export const EarlyGuidancePage: React.FC<EarlyGuidancePageProps> = ({
  onNavigate,
  onShowToast,
  onNavigateToActivities,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQ = mockGuidanceQuestions[currentStep];
  const totalQuestions = mockGuidanceQuestions.length;

  const handleSelectOption = (score: number) => {
    const updated = { ...answers, [currentQ.id]: score };
    setAnswers(updated);

    if (currentStep < totalQuestions - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsCompleted(true);
      onShowToast('Checklist Complete 🎉', 'Observational summary report generated.');
    }
  };

  const handleRestart = () => {
    setAnswers({});
    setCurrentStep(0);
    setIsCompleted(false);
  };

  // Calculate Category Averages (0 to 100 scale)
  const calculateCategoryScores = () => {
    const categories = {
      Communication: { total: 0, count: 0 },
      'Social Interaction': { total: 0, count: 0 },
      'Daily Activities': { total: 0, count: 0 },
    };

    mockGuidanceQuestions.forEach((q) => {
      const score = answers[q.id] ?? 0;
      categories[q.category].total += score;
      categories[q.category].count += 1;
    });

    return {
      comm: Math.round(100 - (categories.Communication.total / (categories.Communication.count * 2)) * 60),
      social: Math.round(100 - (categories['Social Interaction'].total / (categories['Social Interaction'].count * 2)) * 60),
      daily: Math.round(100 - (categories['Daily Activities'].total / (categories['Daily Activities'].count * 2)) * 60),
    };
  };

  const scores = isCompleted ? calculateCategoryScores() : { comm: 80, social: 70, daily: 90 };

  return (
    <div className="py-12 bg-cream-50/50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header Title */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            <span>Interactive Guidance Tool</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Take the first step with confidence.
          </h1>
          <p className="text-base text-slate-600 max-w-2xl mx-auto">
            Observe behavioral milestones, joint attention cues, and daily routine preferences to prepare for pediatrician discussions.
          </p>
        </div>

        {/* PROMINENT MANDATORY SAFETY DISCLAIMER BANNER */}
        <div className="p-5 rounded-3xl bg-amber-50 border-2 border-amber-200 shadow-sm flex items-start gap-4">
          <div className="p-2.5 bg-amber-500/10 text-amber-700 rounded-2xl shrink-0 mt-0.5">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div className="text-xs sm:text-sm text-amber-950">
            <p className="font-extrabold text-amber-900 uppercase tracking-wide text-xs mb-1">
              Important Product & Health Disclaimer
            </p>
            <p className="font-bold">
              “This tool provides general guidance and is not a medical diagnosis.”
            </p>
            <p className="text-amber-800 text-xs mt-1">
              Always consult certified pediatricians, developmental specialists, and therapists for formal diagnostic assessments.
            </p>
          </div>
        </div>

        {/* Wizard Assessment Container */}
        {!isCompleted ? (
          <div className="bg-white rounded-4xl p-6 sm:p-10 border border-purple-100 shadow-2xl space-y-8">
            
            {/* Progress Bar Header */}
            <div className="space-y-2 border-b border-slate-100 pb-6">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-purple-700 uppercase tracking-wider">
                  Category: {currentQ.category}
                </span>
                <span className="text-slate-500">
                  Question {currentStep + 1} of {totalQuestions}
                </span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-purple-600 to-sky-600 h-full rounded-full transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / totalQuestions) * 100}%` }}
                />
              </div>
            </div>

            {/* Question Card */}
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug">
                {currentQ.question}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed bg-purple-50/60 p-4 rounded-2xl border border-purple-100/80">
                💡 <strong>Parent Tip:</strong> {currentQ.description}
              </p>
            </div>

            {/* Answer Options */}
            <div className="space-y-3">
              {currentQ.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(opt.score)}
                  className="w-full p-4 sm:p-5 text-left rounded-2xl border border-slate-200 hover:border-purple-300 bg-slate-50/50 hover:bg-purple-50/60 text-slate-800 hover:text-purple-950 font-semibold text-xs sm:text-sm transition-all duration-200 flex items-center justify-between group"
                >
                  <span className="pr-4">{opt.text}</span>
                  <div className="w-6 h-6 rounded-full border-2 border-slate-300 group-hover:border-purple-600 group-hover:bg-purple-600 group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </button>
              ))}
            </div>

            {/* Navigation back button */}
            <div className="pt-4 flex items-center justify-between text-xs border-t border-slate-100">
              <button
                onClick={() => currentStep > 0 && setCurrentStep(currentStep - 1)}
                disabled={currentStep === 0}
                className={`flex items-center gap-1.5 font-bold ${
                  currentStep === 0 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:text-purple-700'
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
                Previous Question
              </button>

              <span className="text-slate-400 font-medium">100% Private & Confidential</span>
            </div>

          </div>
        ) : (
          /* Completed Observational Report Summary Card */
          <div className="bg-white rounded-4xl p-6 sm:p-10 border border-purple-100 shadow-2xl space-y-8 animate-fade-in">
            
            <div className="text-center space-y-2 border-b border-slate-100 pb-6">
              <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xl shadow-inner">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Observational Guidance Summary Report
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Generated on {new Date().toLocaleDateString()} • Based on parent observations
              </p>
            </div>

            {/* Category Score Indicators */}
            <div className="space-y-6">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Observational Category Overview
              </h3>

              <div className="space-y-4">
                {/* Communication */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold text-slate-800">
                    <span>Communication & Gesture Responsiveness</span>
                    <span className="text-purple-700">{scores.comm}% Observational Score</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden p-0.5">
                    <div className="bg-gradient-to-r from-purple-500 to-sky-500 h-full rounded-full" style={{ width: `${scores.comm}%` }} />
                  </div>
                </div>

                {/* Social Interaction */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold text-slate-800">
                    <span>Social Interaction & Joint Attention</span>
                    <span className="text-sky-700">{scores.social}% Observational Score</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden p-0.5">
                    <div className="bg-gradient-to-r from-sky-500 to-emerald-500 h-full rounded-full" style={{ width: `${scores.social}%` }} />
                  </div>
                </div>

                {/* Daily Activities */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold text-slate-800">
                    <span>Daily Routines & Sensory Preferences</span>
                    <span className="text-emerald-700">{scores.daily}% Observational Score</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden p-0.5">
                    <div className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full rounded-full" style={{ width: `${scores.daily}%` }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Next Steps Recommendations */}
            <div className="p-6 rounded-3xl bg-purple-50/80 border border-purple-100 space-y-3">
              <h4 className="text-sm font-bold text-purple-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-600" />
                Recommended Caregiver Next Steps
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 font-bold">•</span>
                  <span><strong>Schedule a Pediatric Consultation:</strong> Bring this observational summary to your next appointment.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 font-bold">•</span>
                  <span><strong>Explore Visual Schedules:</strong> Introduce picture cards (PECS) for morning and bedtime routines.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 font-bold">•</span>
                  <span><strong>Connect with Local Parent Support Groups:</strong> Learn strategies from parents raising children with similar profiles.</span>
                </li>
              </ul>
            </div>

            {/* Direct Activity Redirection Card */}
            <div className="p-6 rounded-3xl bg-gradient-to-r from-purple-700 via-purple-800 to-sky-700 text-white shadow-xl space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-[11px] font-bold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>Next Milestone Step · Activity Module</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-extrabold">
                    Practice Targeted Learning & Sensory Activities
                  </h3>
                  <p className="text-xs sm:text-sm text-purple-100 max-w-xl">
                    Based on your observational score, we have matched sensory bins, communication flashcards, and motor exercises in the Activity Module.
                  </p>
                </div>

                <button
                  onClick={() => {
                    if (onNavigateToActivities) {
                      onNavigateToActivities(scores);
                    } else {
                      onNavigate('activities');
                    }
                  }}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white hover:bg-purple-50 text-purple-900 font-extrabold text-xs sm:text-sm shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group shrink-0"
                >
                  <span>Go to Activity Module</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-purple-700" />
                </button>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
              <button
                onClick={handleRestart}
                className="w-full sm:w-auto px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-2xl text-xs transition-colors flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Restart Checklist</span>
              </button>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => onShowToast('PDF Print Ready 🖨️', 'Opening print preview for your guidance report.')}
                  className="flex-1 sm:flex-initial px-5 py-2.5 bg-white border border-slate-200 hover:bg-purple-50 text-slate-800 font-bold rounded-2xl text-xs transition-colors flex items-center justify-center gap-2"
                >
                  <Printer className="w-4 h-4 text-purple-600" />
                  <span>Print Report</span>
                </button>

                <button
                  onClick={() => {
                    if (onNavigateToActivities) {
                      onNavigateToActivities(scores);
                    } else {
                      onNavigate('activities');
                    }
                  }}
                  className="flex-1 sm:flex-initial px-6 py-2.5 bg-gradient-to-r from-purple-600 to-sky-600 hover:from-purple-700 hover:to-sky-700 text-white font-bold rounded-2xl text-xs transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Proceed to Activities</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
