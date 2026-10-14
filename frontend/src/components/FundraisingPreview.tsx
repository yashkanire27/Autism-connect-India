import React from 'react';
import { HeartHandshake, ArrowRight, Sparkles, MapPin, Users, Heart } from 'lucide-react';
import { PageView, LanguageCode, CampaignItem } from '../types';
import { translations } from '../data/translations';
import { mockCampaigns } from '../data/mockData';

interface FundraisingPreviewProps {
  onNavigate: (view: PageView) => void;
  currentLang: LanguageCode;
  onOpenDonateModal: (campaign: CampaignItem) => void;
}

export const FundraisingPreview: React.FC<FundraisingPreviewProps> = ({
  onNavigate,
  currentLang,
  onOpenDonateModal,
}) => {
  const t = translations[currentLang] || translations.en;

  return (
    <section className="py-20 bg-cream-50/60 border-b border-purple-100/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100 text-rose-800 text-xs font-bold uppercase tracking-wider">
              <HeartHandshake className="w-3.5 h-3.5 text-rose-600" />
              <span>Transparent Community Support</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {t.fundraisingHeading}
            </h2>
            <p className="text-base text-slate-600 font-normal">
              {t.fundraisingSubheading}
            </p>
          </div>

          <button
            onClick={() => onNavigate('fundraising')}
            className="shrink-0 px-6 py-3.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-2xl text-sm transition-all shadow-md shadow-rose-200 hover:shadow-lg flex items-center gap-2"
          >
            <span>Explore All Campaigns</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Campaign Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockCampaigns.slice(0, 3).map((camp) => {
            const pct = Math.min(100, Math.round((camp.raised / camp.goal) * 100));

            return (
              <div
                key={camp.id}
                className="rounded-4xl bg-white border border-purple-100/80 shadow-soft hover:shadow-soft-lg transition-all duration-300 transform hover:-translate-y-1 overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  {/* Campaign Image */}
                  <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                    <img
                      src={camp.image}
                      alt={camp.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[11px] font-bold text-slate-800 shadow-sm">
                        {camp.category}
                      </span>
                      {camp.isUrgent && (
                        <span className="px-2.5 py-1 bg-rose-600 text-white rounded-full text-[10px] font-extrabold uppercase tracking-wider animate-pulse">
                          Urgent Support
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 space-y-4">
                    <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-purple-600" />
                      <span>{camp.location}</span>
                      <span>•</span>
                      <Users className="w-3.5 h-3.5 text-sky-600" />
                      <span>{camp.supporters} Supporters</span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-purple-700 transition-colors line-clamp-2">
                      {camp.title}
                    </h3>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {camp.description}
                    </p>

                    {/* Progress Bar & Amounts */}
                    <div className="space-y-2 pt-2">
                      <div className="flex items-center justify-between text-xs font-bold">
                        <span className="text-slate-900">₹{camp.raised.toLocaleString('en-IN')} <span className="text-slate-500 font-normal">raised</span></span>
                        <span className="text-purple-700 font-extrabold">{pct}%</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden border border-slate-200/80 p-0.5">
                        <div
                          className="bg-gradient-to-r from-rose-500 to-purple-600 h-full rounded-full transition-all duration-700 shadow-sm"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-slate-500">
                        <span>Goal: ₹{camp.goal.toLocaleString('en-IN')}</span>
                        <span>{camp.daysLeft} days left</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Donate CTA Button */}
                <div className="p-6 pt-0">
                  <button
                    onClick={() => onOpenDonateModal(camp)}
                    className="w-full py-3 bg-gradient-to-r from-purple-600 to-rose-600 hover:from-purple-700 hover:to-rose-700 text-white font-extrabold rounded-2xl text-xs shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <Heart className="w-4 h-4 fill-white/20" />
                    <span>{t.fundraisingSupportBtn}</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
