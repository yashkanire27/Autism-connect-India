import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, MessageCircle, Heart, Globe, BookOpen } from 'lucide-react';
import { PageView, LanguageCode } from '../types';
import { translations } from '../data/translations';

interface HeroProps {
  onNavigate: (view: PageView) => void;
  currentLang: LanguageCode;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate, currentLang }) => {
  const t = translations[currentLang] || translations.en;

  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 bg-gradient-to-b from-purple-50/60 via-cream-50 to-white">
      {/* Subtle Background Glow Orbs */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-sky-200/30 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-amber-100/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Small Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100/80 border border-purple-200 text-purple-800 text-xs font-bold shadow-sm">
              <Sparkles className="w-4 h-4 text-purple-600 animate-pulse" />
              <span>{t.heroBadge}</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              <span className="bg-gradient-to-r from-purple-900 via-purple-700 to-sky-700 bg-clip-text text-transparent">
                {t.heroTitle}
              </span>
            </h1>

            {/* Supporting Subtitle */}
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              {t.heroSubtitle}
            </p>

            {/* Action CTA Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={() => onNavigate('guidance')}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-purple-600 via-purple-700 to-sky-600 hover:from-purple-700 hover:to-sky-700 text-white font-extrabold rounded-2xl text-base shadow-xl shadow-purple-200 hover:shadow-2xl hover:scale-[1.02] transition-all flex items-center justify-center gap-3"
              >
                <span>{t.heroExploreCta}</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => onNavigate('resources')}
                className="w-full sm:w-auto px-7 py-4 bg-white hover:bg-purple-50 text-purple-900 font-bold rounded-2xl text-base border border-purple-200/90 shadow-sm hover:shadow transition-all flex items-center justify-center gap-2"
              >
                <BookOpen className="w-5 h-5 text-purple-600" />
                <span>{t.heroLearnCta}</span>
              </button>
            </div>

            {/* Quick Guarantees */}
            <div className="pt-6 border-t border-purple-100/80 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0 text-left">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>100% Free & Open</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <Globe className="w-4 h-4 text-sky-600 shrink-0" />
                <span>5 Regional Languages</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <Heart className="w-4 h-4 text-purple-600 shrink-0" />
                <span>Parent-Led Support</span>
              </div>
            </div>

          </div>

          {/* Right Hero Graphic & Floating Cards Column */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            {/* Main Central Graphic Illustration Container */}
            <div className="relative w-full max-w-md aspect-square rounded-4xl bg-gradient-to-tr from-purple-100 via-cream-100 to-sky-100 p-6 shadow-2xl border border-white/80 flex items-center justify-center overflow-hidden">
              
              {/* Decorative Circle Gradients */}
              <div className="absolute inset-4 rounded-3xl bg-white/70 backdrop-blur-md border border-white shadow-inner flex items-center justify-center p-6 text-center">
                
                {/* SVG Illustration Artwork */}
                <div className="space-y-4">
                  <div className="relative inline-block">
                    <div className="w-28 h-28 mx-auto rounded-full bg-gradient-to-tr from-purple-500 to-sky-400 p-1.5 shadow-xl">
                      <img
                        src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=400"
                        alt="Parent holding child hand"
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-white p-2 rounded-2xl shadow-md border border-purple-100">
                      <Heart className="w-6 h-6 text-purple-600 fill-purple-100" />
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-base font-extrabold text-slate-900">
                      Compassionate Parenting Hub
                    </p>
                    <p className="text-xs text-purple-700 font-semibold mt-0.5">
                      Empowering every step with love & guidance
                    </p>
                  </div>
                </div>

              </div>

              {/* Floating UI Card 1: Trusted Resources */}
              <div className="absolute top-6 left-4 animate-float bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-lg border border-purple-100/80 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">
                  ✓
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Trusted Resources</p>
                  <p className="text-[10px] text-slate-500 font-medium">Verified by Specialists</p>
                </div>
              </div>

              {/* Floating UI Card 2: Community Support */}
              <div className="absolute bottom-10 left-2 animate-float-delayed bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-lg border border-purple-100/80 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Community Support</p>
                  <p className="text-[10px] text-purple-600 font-medium">1,200+ Active Parents 💬</p>
                </div>
              </div>

              {/* Floating UI Card 3: 5+ Languages */}
              <div className="absolute top-14 right-2 animate-float-delayed bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-lg border border-purple-100/80 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">5+ Languages 🌐</p>
                  <p className="text-[10px] text-slate-500">English, मराठी, हिन्दी...</p>
                </div>
              </div>

              {/* Floating UI Card 4: Therapy & Education */}
              <div className="absolute bottom-4 right-4 animate-float bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-lg border border-purple-100/80 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center">
                  <Heart className="w-4 h-4 fill-rose-500" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Therapy & Education ❤️</p>
                  <p className="text-[10px] text-slate-500">Accessible Guidance</p>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
