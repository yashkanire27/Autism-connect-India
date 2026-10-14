import React from 'react';
import { BookOpen, Sparkles, MessageCircle, Search, HeartHandshake, Globe, ArrowRight } from 'lucide-react';
import { PageView, LanguageCode } from '../types';
import { translations } from '../data/translations';

interface BentoGridProps {
  onNavigate: (view: PageView) => void;
  currentLang: LanguageCode;
}

export const BentoGrid: React.FC<BentoGridProps> = ({ onNavigate, currentLang }) => {
  const t = translations[currentLang] || translations.en;

  return (
    <section className="py-20 bg-cream-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100/90 text-purple-800 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Comprehensive Support Hub</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t.bentoTitle}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            {t.bentoSubtitle}
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Card 1: Learn & Understand (Large 8-col Bento Card) */}
          <div 
            onClick={() => onNavigate('resources')}
            className="md:col-span-8 p-8 rounded-4xl bg-gradient-to-br from-purple-900 via-purple-800 to-purple-950 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer relative overflow-hidden group flex flex-col justify-between min-h-[300px]"
          >
            <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl group-hover:bg-purple-400/30 transition-all pointer-events-none" />
            
            <div className="space-y-4 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md text-purple-200 flex items-center justify-center border border-white/20">
                <BookOpen className="w-6 h-6" />
              </div>
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-purple-300">
                Core Knowledge Base
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {t.bentoLearnTitle}
              </h3>
              <p className="text-purple-100 text-sm sm:text-base max-w-xl font-normal leading-relaxed">
                {t.bentoLearnDesc}
              </p>
            </div>

            <div className="pt-6 relative z-10 flex items-center gap-2 text-xs font-bold text-purple-200 group-hover:text-white">
              <span>Browse Article Library</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: Early Guidance (4-col Bento Card) */}
          <div 
            onClick={() => onNavigate('guidance')}
            className="md:col-span-4 p-8 rounded-4xl bg-gradient-to-br from-sky-50 via-white to-sky-100/50 border border-sky-200/80 shadow-soft hover:shadow-soft-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group flex flex-col justify-between min-h-[300px]"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-sky-600 text-white flex items-center justify-center shadow-md shadow-sky-200">
                <Sparkles className="w-6 h-6" />
              </div>
              <span className="inline-block text-xs font-bold uppercase tracking-wider text-sky-700">
                Observational Tools
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                {t.bentoGuidanceTitle}
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                {t.bentoGuidanceDesc}
              </p>
            </div>

            <div className="pt-6 flex items-center justify-between">
              <span className="text-xs font-bold text-sky-700 group-hover:underline">Start Checklist</span>
              <div className="w-8 h-8 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center group-hover:bg-sky-600 group-hover:text-white transition-colors">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Card 3: Parent Community (4-col Bento Card) */}
          <div 
            onClick={() => onNavigate('community')}
            className="md:col-span-4 p-8 rounded-4xl bg-gradient-to-br from-emerald-50 via-white to-emerald-100/50 border border-emerald-200/80 shadow-soft hover:shadow-soft-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group flex flex-col justify-between min-h-[300px]"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-200">
                <MessageCircle className="w-6 h-6" />
              </div>
              <span className="inline-block text-xs font-bold uppercase tracking-wider text-emerald-700">
                Safe Parent Space
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                {t.bentoCommunityTitle}
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                {t.bentoCommunityDesc}
              </p>
            </div>

            <div className="pt-6 flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-700 group-hover:underline">Join Discussions</span>
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Card 4: Find Resources (4-col Bento Card) */}
          <div 
            onClick={() => onNavigate('resources')}
            className="md:col-span-4 p-8 rounded-4xl bg-gradient-to-br from-amber-50 via-white to-amber-100/50 border border-amber-200/80 shadow-soft hover:shadow-soft-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group flex flex-col justify-between min-h-[300px]"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-600 text-white flex items-center justify-center shadow-md shadow-amber-200">
                <Search className="w-6 h-6" />
              </div>
              <span className="inline-block text-xs font-bold uppercase tracking-wider text-amber-700">
                Search & Directory
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                {t.bentoResourcesTitle}
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                {t.bentoResourcesDesc}
              </p>
            </div>

            <div className="pt-6 flex items-center justify-between">
              <span className="text-xs font-bold text-amber-700 group-hover:underline">Explore Directory</span>
              <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition-colors">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Card 5: Fundraising (4-col Bento Card) */}
          <div 
            onClick={() => onNavigate('fundraising')}
            className="md:col-span-4 p-8 rounded-4xl bg-gradient-to-br from-rose-50 via-white to-rose-100/50 border border-rose-200/80 shadow-soft hover:shadow-soft-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group flex flex-col justify-between min-h-[300px]"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-600 text-white flex items-center justify-center shadow-md shadow-rose-200">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <span className="inline-block text-xs font-bold uppercase tracking-wider text-rose-700">
                Community Access
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                {t.bentoFundraisingTitle}
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                {t.bentoFundraisingDesc}
              </p>
            </div>

            <div className="pt-6 flex items-center justify-between">
              <span className="text-xs font-bold text-rose-700 group-hover:underline">View Campaigns</span>
              <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center group-hover:bg-rose-600 group-hover:text-white transition-colors">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Card 6: Multilingual Support (Full width or 12-col bottom bar Bento Card) */}
          <div 
            onClick={() => onNavigate('home')}
            className="md:col-span-12 p-8 rounded-4xl bg-gradient-to-r from-purple-50 via-sky-50 to-cream-50 border border-purple-200/90 shadow-soft hover:shadow-soft-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group flex flex-col sm:flex-row items-center justify-between gap-6"
          >
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-3xl bg-purple-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-purple-200">
                <Globe className="w-7 h-7" />
              </div>
              <div>
                <span className="inline-block text-xs font-extrabold uppercase tracking-wider text-purple-700 mb-1">
                  Inclusive Accessibility 🌐
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                  {t.bentoMultiTitle}
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm max-w-2xl mt-0.5">
                  {t.bentoMultiDesc}
                </p>
              </div>
            </div>

            <div className="shrink-0 flex items-center gap-2 px-6 py-3 bg-white hover:bg-purple-600 hover:text-white text-purple-900 font-bold rounded-2xl text-xs border border-purple-200 shadow-sm transition-all">
              <span>Switch Language Demo</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
