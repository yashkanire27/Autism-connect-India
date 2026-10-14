import React, { useState } from 'react';
import { HeartHandshake, Search, Heart, MapPin, Users, Sparkles } from 'lucide-react';
import { CampaignItem, PageView } from '../types';
import { mockCampaigns } from '../data/mockData';

interface FundraisingPageProps {
  onNavigate: (view: PageView) => void;
  onOpenDonateModal: (campaign: CampaignItem) => void;
  onShowToast: (title: string, message: string) => void;
}

export const FundraisingPage: React.FC<FundraisingPageProps> = ({
  onNavigate,
  onOpenDonateModal,
  onShowToast,
}) => {
  const [campaigns, setCampaigns] = useState<CampaignItem[]>(mockCampaigns);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Therapy', 'Education', 'Resources', 'Urgent Support'];

  const filteredCampaigns = campaigns.filter((camp) => {
    const matchesCategory =
      selectedCategory === 'All' ||
      (selectedCategory === 'Urgent Support' ? camp.isUrgent : camp.category === selectedCategory);
    const matchesSearch =
      camp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      camp.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      camp.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-12 bg-cream-50/50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Top Hero Banner */}
        <div className="p-8 sm:p-12 rounded-4xl bg-gradient-to-r from-rose-900 via-purple-900 to-sky-900 text-white shadow-2xl space-y-4 relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-rose-200 text-xs font-bold uppercase tracking-wider">
            <HeartHandshake className="w-4 h-4 text-rose-300" />
            <span>Community Accessibility Fund</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight max-w-2xl leading-tight">
            Every contribution can create an opportunity.
          </h1>

          <p className="text-rose-100 text-sm sm:text-base max-w-xl font-normal leading-relaxed">
            Helping children access speech therapy, special education kits, assistive technology devices, and sensory play spaces.
          </p>

          {/* Quick Total Metrics */}
          <div className="pt-4 grid grid-cols-3 gap-4 max-w-md text-left">
            <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10">
              <p className="text-lg font-extrabold text-white">₹3.5L+</p>
              <p className="text-[10px] text-rose-200 uppercase font-semibold">Total Raised</p>
            </div>
            <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10">
              <p className="text-lg font-extrabold text-white">268</p>
              <p className="text-[10px] text-rose-200 uppercase font-semibold">Generous Donors</p>
            </div>
            <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10">
              <p className="text-lg font-extrabold text-white">100%</p>
              <p className="text-[10px] text-rose-200 uppercase font-semibold">Direct Verification</p>
            </div>
          </div>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="space-y-4">
          <div className="relative max-w-xl">
            <Search className="w-5 h-5 text-purple-600 absolute left-4 top-4" />
            <input
              type="text"
              placeholder="Search campaigns by city, therapy type, or title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-white border border-purple-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all shadow-sm"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
                  selectedCategory === cat
                    ? 'bg-rose-600 text-white border-rose-600 shadow-md shadow-rose-100'
                    : 'bg-white text-slate-700 border-purple-100 hover:bg-rose-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Campaign Cards Directory */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCampaigns.map((camp) => {
            const pct = Math.min(100, Math.round((camp.raised / camp.goal) * 100));

            return (
              <div
                key={camp.id}
                className="rounded-4xl bg-white border border-purple-100 shadow-soft hover:shadow-soft-lg transition-all duration-300 transform hover:-translate-y-1 overflow-hidden flex flex-col justify-between group"
              >
                <div>
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

                <div className="p-6 pt-0">
                  <button
                    onClick={() => onOpenDonateModal(camp)}
                    className="w-full py-3 bg-gradient-to-r from-purple-600 to-rose-600 hover:from-purple-700 hover:to-rose-700 text-white font-extrabold rounded-2xl text-xs shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <Heart className="w-4 h-4 fill-white/20" />
                    <span>Support This Campaign</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
