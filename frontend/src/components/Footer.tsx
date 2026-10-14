import React from 'react';
import { Heart, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { PageView } from '../types';

interface FooterProps {
  onNavigate: (view: PageView) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Important Safety Disclaimer Notice */}
        <div className="mb-12 p-6 rounded-3xl bg-slate-800/80 border border-slate-700/80 flex flex-col md:flex-row items-start gap-4">
          <div className="p-3 bg-purple-500/10 text-purple-400 rounded-2xl shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            <p className="font-semibold text-slate-100 mb-1">
              Important Product & Health Information Notice
            </p>
            Autism Connect is an educational, digital support, and community space for caregivers. Our tools, checklists, and articles provide general information and early observational guidance. <strong className="text-purple-300">They do not constitute medical diagnosis, clinical advice, or treatment plans.</strong> Always consult qualified pediatric developmental specialists, doctors, and certified speech/occupational therapists for formal clinical evaluations.
          </div>
        </div>

        {/* Footer Main Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 pb-12 border-b border-slate-800">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-purple-600 text-white flex items-center justify-center shadow-lg shadow-purple-900">
                <Heart className="w-5 h-5 fill-white/20" />
              </div>
              <span className="text-2xl font-extrabold text-white tracking-tight">
                Autism Connect
              </span>
            </div>
            <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
              Connecting parents and caregivers with trustworthy information, early guidance tools, compassionate peer community, and transparent support.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                🌱 Safe & Inclusive Space
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20">
                🌐 5+ Languages
              </span>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Platform
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-purple-400 transition-colors">
                  Home Overview
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('resources')} className="hover:text-purple-400 transition-colors">
                  Learn & Basics
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('guidance')} className="hover:text-purple-400 transition-colors flex items-center gap-1">
                  Early Guidance <ArrowUpRight className="w-3 h-3 text-purple-400" />
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('community')} className="hover:text-purple-400 transition-colors">
                  Parent Community
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('fundraising')} className="hover:text-purple-400 transition-colors">
                  Fundraising Campaigns
                </button>
              </li>
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Resources
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => onNavigate('resources')} className="hover:text-purple-400 transition-colors">
                  Autism Basics
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('resources')} className="hover:text-purple-400 transition-colors">
                  Parenting Strategies
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('resources')} className="hover:text-purple-400 transition-colors">
                  Inclusive Education & IEP
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('resources')} className="hover:text-purple-400 transition-colors">
                  Speech & OT Therapy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('resources')} className="hover:text-purple-400 transition-colors">
                  Govt Rights & UDID
                </button>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Support
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => onNavigate('community')} className="hover:text-purple-400 transition-colors">
                  Caregiver Help Hub
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-purple-400 transition-colors">
                  Accessibility Controls
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('community')} className="hover:text-purple-400 transition-colors">
                  Peer Mentorship
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-purple-400 transition-colors">
                  Contact Support Team
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 Autism Connect. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <button onClick={() => onNavigate('home')} className="hover:text-slate-200 transition-colors">
              Privacy Policy
            </button>
            <button onClick={() => onNavigate('home')} className="hover:text-slate-200 transition-colors">
              Terms of Service
            </button>
            <button onClick={() => onNavigate('home')} className="hover:text-slate-200 transition-colors">
              Accessibility Statement
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
