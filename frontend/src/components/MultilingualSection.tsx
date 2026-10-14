import React from 'react';
import { Globe, Languages, Sparkles, Check, Volume2 } from 'lucide-react';
import { LanguageCode } from '../types';
import { translations } from '../data/translations';

interface MultilingualSectionProps {
  currentLang: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
  onShowToast: (title: string, message: string) => void;
}

const languageList: { code: LanguageCode; name: string; nativeName: string; flag: string; sample: string }[] = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇬🇧',
    sample: 'Every child deserves compassionate support, clear resources, and early guidance in their home language.'
  },
  {
    code: 'mr',
    name: 'Marathi',
    nativeName: 'मराठी',
    flag: '🇮🇳',
    sample: 'प्रत्येक मुलाला त्याच्या मातृभाषेत प्रेमळ पाठिंबा, स्पष्ट संसाधने आणि प्रारंभिक मार्गदर्शन मिळण्याचा हक्क आहे.'
  },
  {
    code: 'hi',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    flag: '🇮🇳',
    sample: 'हर बच्चे को अपनी मातृभाषा में स्नेही सहायता, स्पष्ट संसाधन और शुरुआती मार्गदर्शन मिलने का अधिकार है।'
  },
  {
    code: 'bn',
    name: 'Bengali',
    nativeName: 'বাংলা',
    flag: '🇮🇳',
    sample: 'প্রতিটি শিশু তার মাতৃভাষায় সহানুভূতিশীল সহায়তা, স্পষ্ট সম্পদ এবং প্রাথমিক দিকনির্দেশনা পাওয়ার যোগ্য।'
  },
  {
    code: 'ta',
    name: 'Tamil',
    nativeName: 'தமிழ்',
    flag: '🇮🇳',
    sample: 'ஒவ்வொரு குழந்தையும் தங்கள் தாய்மொழியில் அன்பான ஆதரவு, தெளிவான வளங்கள் மற்றும் ஆரம்ப வழிகாட்டுதலைப் பெற தகுதியுடையவர்கள்.'
  }
];

export const MultilingualSection: React.FC<MultilingualSectionProps> = ({
  currentLang,
  onLanguageChange,
  onShowToast,
}) => {
  const activeLangObj = languageList.find((l) => l.code === currentLang) || languageList[0];
  const t = translations[currentLang] || translations.en;

  const handleSelectLang = (code: LanguageCode, name: string) => {
    onLanguageChange(code);
    onShowToast('Language Updated 🌐', `Platform display language switched to ${name}`);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white via-purple-50/40 to-white border-b border-purple-100/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100 text-purple-800 text-xs font-bold uppercase tracking-wider">
            <Globe className="w-3.5 h-3.5 text-purple-600" />
            <span>Inclusive Regional Accessibility</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Support in a language you’re comfortable with.
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Caregivers can read guides, search therapists, and participate in community discussions in their preferred regional Indian language.
          </p>
        </div>

        {/* Multilingual Card Experience */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Interactive Language Selector */}
          <div className="lg:col-span-5 space-y-3">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-400 px-2">
              Select Language Demo
            </h3>
            
            {languageList.map((lang) => {
              const isSelected = currentLang === lang.code;
              return (
                <button
                  key={lang.code}
                  onClick={() => handleSelectLang(lang.code, lang.name)}
                  className={`w-full p-4 rounded-2xl border text-left transition-all duration-300 flex items-center justify-between group ${
                    isSelected
                      ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white border-purple-600 shadow-lg shadow-purple-200 scale-[1.02]'
                      : 'bg-white hover:bg-purple-50/80 text-slate-800 border-slate-200 hover:border-purple-200'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <span className="text-2xl">{lang.flag}</span>
                    <div>
                      <p className={`text-base font-extrabold ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                        {lang.nativeName}
                      </p>
                      <p className={`text-xs ${isSelected ? 'text-purple-200' : 'text-slate-500'}`}>
                        {lang.name}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {isSelected ? (
                      <span className="p-1.5 rounded-full bg-white/20 text-white">
                        <Check className="w-4 h-4" />
                      </span>
                    ) : (
                      <span className="text-xs font-semibold text-purple-600 group-hover:underline">
                        Switch
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Dynamic Live Preview Card */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-4xl bg-white border border-purple-100 shadow-2xl space-y-6 relative overflow-hidden">
              
              {/* Top Card Badge */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                    {activeLangObj.flag}
                  </div>
                  <div>
                    <h4 className="text-lg font-extrabold text-slate-900">
                      Live Translation Preview
                    </h4>
                    <p className="text-xs text-purple-700 font-semibold">
                      Currently displaying in {activeLangObj.nativeName} ({activeLangObj.name})
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => onShowToast('Audio Demo 🔊', `Audio reading simulation active for ${activeLangObj.name}`)}
                  className="p-2.5 text-purple-700 bg-purple-50 hover:bg-purple-100 rounded-2xl transition-colors flex items-center gap-1.5 text-xs font-bold"
                  title="Simulate text-to-speech reading"
                >
                  <Volume2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Listen</span>
                </button>
              </div>

              {/* Sample Content Display */}
              <div className="space-y-4 py-2">
                <div className="p-5 rounded-3xl bg-purple-50/70 border border-purple-100 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-purple-800">
                    <Sparkles className="w-4 h-4 text-purple-600" />
                    <span>{t.heroBadge}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-purple-950 leading-snug">
                    “{t.heroTitle}”
                  </h3>
                </div>

                <div className="p-6 rounded-3xl bg-cream-50 border border-purple-100/80 space-y-3">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Sample Educational Passage
                  </p>
                  <p className="text-base text-slate-800 leading-relaxed font-medium italic">
                    “{activeLangObj.sample}”
                  </p>
                </div>
              </div>

              {/* Footer Note */}
              <div className="pt-2 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100">
                <span className="flex items-center gap-1.5">
                  <Languages className="w-4 h-4 text-purple-600" />
                  Localized UI & Guides
                </span>
                <span className="font-semibold text-purple-700">
                  Instant real-time switching ✓
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
