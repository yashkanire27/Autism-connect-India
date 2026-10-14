import React, { useState } from 'react';
import { Heart, Globe, Accessibility, User, Menu, X, ChevronDown, Sparkles } from 'lucide-react';
import { PageView, LanguageCode, LanguageOption } from '../types';
import { translations } from '../data/translations';

interface NavbarProps {
  currentView: PageView;
  onNavigate: (view: PageView) => void;
  currentLang: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
  onOpenAuth: () => void;
  onOpenAccessibility: () => void;
  userLoggedIn: boolean;
  userName: string;
}

const languages: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇮🇳' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' },
];

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  currentLang,
  onLanguageChange,
  onOpenAuth,
  onOpenAccessibility,
  userLoggedIn,
  userName,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const t = translations[currentLang] || translations.en;
  const currentLangObj = languages.find((l) => l.code === currentLang) || languages[0];

  const handleNavClick = (view: PageView) => {
    onNavigate(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-nav border-b border-purple-100/60 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-2xl p-1 transition-all"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-purple-600 via-purple-500 to-sky-500 text-white flex items-center justify-center shadow-lg shadow-purple-200 group-hover:scale-105 transition-transform">
              <Heart className="w-6 h-6 fill-white/20 text-white" />
            </div>
            <div className="text-left">
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-purple-900 via-purple-700 to-sky-700 bg-clip-text text-transparent">
                Autism Connect
              </span>
              <span className="block text-[10px] uppercase font-bold tracking-widest text-purple-600">
                Support & Guidance
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-purple-100/80 shadow-sm">
            {[
              { id: 'home', label: t.navHome },
              { id: 'guidance', label: t.navGuidance },
              { id: 'activities', label: t.navActivities },
              { id: 'community', label: t.navCommunity },
              { id: 'fundraising', label: t.navFundraising },
              { id: 'resources', label: t.navResources },
            ].map((link) => {
              const isActive = currentView === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id as PageView)}
                  className={`px-4 py-2 text-sm font-semibold rounded-full transition-all ${
                    isActive
                      ? 'bg-purple-600 text-white shadow-md shadow-purple-200'
                      : 'text-slate-600 hover:text-purple-700 hover:bg-purple-50/80'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Bar */}
          <div className="hidden lg:flex items-center gap-3">
            
            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-slate-700 bg-white hover:bg-purple-50 rounded-2xl border border-slate-200 transition-all focus:outline-none focus:ring-2 focus:ring-purple-400"
                aria-label="Select Language"
              >
                <Globe className="w-4 h-4 text-purple-600" />
                <span>{currentLangObj.flag} {currentLangObj.nativeName}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-purple-100 py-2 z-50 animate-fade-in">
                  <div className="px-3 py-1 mb-1 border-b border-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Select Language 🌐
                  </div>
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        onLanguageChange(lang.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-4 py-2 text-xs text-left font-medium transition-colors ${
                        currentLang === lang.code
                          ? 'bg-purple-50 text-purple-700 font-bold'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span>{lang.flag} {lang.nativeName}</span>
                      <span className="text-[10px] text-slate-400">{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Accessibility Control Button */}
            <button
              onClick={onOpenAccessibility}
              className="p-2.5 text-slate-600 hover:text-purple-700 bg-white hover:bg-purple-50 rounded-2xl border border-slate-200 transition-all focus:outline-none focus:ring-2 focus:ring-purple-400"
              title="Accessibility & Display Settings"
              aria-label="Accessibility settings"
            >
              <Accessibility className="w-4 h-4 text-purple-600" />
            </button>

            {/* User Profile / Login */}
            {userLoggedIn ? (
              <button
                onClick={() => handleNavClick('dashboard')}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-50 to-sky-50 hover:from-purple-100 hover:to-sky-100 text-purple-900 border border-purple-200 rounded-2xl text-xs font-bold transition-all shadow-sm"
              >
                <div className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center text-[10px]">
                  <User className="w-3.5 h-3.5" />
                </div>
                <span>{userName}</span>
              </button>
            ) : (
              <button
                onClick={onOpenAuth}
                className="px-4 py-2 text-xs font-bold text-slate-700 hover:text-purple-700 bg-white hover:bg-purple-50 border border-slate-200 rounded-2xl transition-all"
              >
                {t.navLogin}
              </button>
            )}

            {/* Primary Get Started CTA */}
            <button
              onClick={() => handleNavClick('guidance')}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-sky-600 hover:from-purple-700 hover:to-sky-700 text-white font-bold rounded-2xl text-xs transition-all shadow-md shadow-purple-200 hover:shadow-lg hover:scale-[1.02]"
            >
              <Sparkles className="w-4 h-4" />
              <span>{t.navGetStarted}</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenAccessibility}
              className="p-2 text-slate-600 bg-white rounded-xl border border-slate-200"
              aria-label="Accessibility"
            >
              <Accessibility className="w-4 h-4 text-purple-600" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 bg-white rounded-xl border border-slate-200 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-xl border-b border-purple-100 px-4 pt-3 pb-6 space-y-3 animate-fade-in">
          <div className="grid grid-cols-2 gap-2 mb-3">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  onLanguageChange(lang.code);
                  setLangDropdownOpen(false);
                }}
                className={`py-1.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-between border ${
                  currentLang === lang.code
                    ? 'bg-purple-100 text-purple-800 border-purple-300'
                    : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                <span>{lang.flag} {lang.nativeName}</span>
              </button>
            ))}
          </div>

          <div className="space-y-1">
            {[
              { id: 'home', label: t.navHome },
              { id: 'guidance', label: t.navGuidance },
              { id: 'activities', label: t.navActivities },
              { id: 'community', label: t.navCommunity },
              { id: 'fundraising', label: t.navFundraising },
              { id: 'resources', label: t.navResources },
              { id: 'dashboard', label: 'Parent Dashboard' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id as PageView)}
                className={`w-full text-left px-4 py-3 rounded-2xl text-sm font-bold transition-colors ${
                  currentView === item.id
                    ? 'bg-purple-600 text-white'
                    : 'text-slate-700 hover:bg-purple-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 space-y-2">
            {!userLoggedIn && (
              <button
                onClick={() => {
                  onOpenAuth();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3 bg-slate-100 text-slate-800 font-bold rounded-2xl text-sm"
              >
                {t.navLogin}
              </button>
            )}
            <button
              onClick={() => handleNavClick('guidance')}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-sky-600 text-white font-bold rounded-2xl text-sm shadow-md"
            >
              {t.navGetStarted}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
