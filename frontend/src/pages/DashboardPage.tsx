import React, { useState } from 'react';
import { LayoutDashboard, Sparkles, MessageCircle, HeartHandshake, Bookmark, Settings, User, CheckCircle2, ArrowRight, Heart } from 'lucide-react';
import { PageView, ResourceItem, CampaignItem } from '../types';
import { mockUserProfile, mockResources, mockDiscussions, mockCampaigns } from '../data/mockData';

interface DashboardPageProps {
  onNavigate: (view: PageView) => void;
  userName: string;
  onOpenDetailModal: (resource: ResourceItem) => void;
  onOpenDonateModal: (campaign: CampaignItem) => void;
  onShowToast: (title: string, message: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  onNavigate,
  userName,
  onOpenDetailModal,
  onOpenDonateModal,
  onShowToast,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'resources' | 'guidance' | 'community' | 'fundraising' | 'saved' | 'settings'>('overview');

  const profileName = userName || mockUserProfile.name;

  return (
    <div className="py-10 bg-cream-50/50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Sidebar Navigation */}
          <div className="lg:col-span-3 bg-white p-4 rounded-3xl border border-purple-100 shadow-soft space-y-2">
            
            {/* User Profile Mini Badge */}
            <div className="p-4 rounded-2xl bg-gradient-to-tr from-purple-50 to-sky-50 border border-purple-100 mb-4 flex items-center gap-3">
              <img
                src={mockUserProfile.avatar}
                alt={profileName}
                className="w-11 h-11 rounded-full object-cover border-2 border-purple-300"
              />
              <div className="overflow-hidden">
                <h3 className="text-sm font-bold text-slate-900 truncate">{profileName}</h3>
                <p className="text-[11px] text-purple-700 font-medium truncate">{mockUserProfile.role}</p>
              </div>
            </div>

            {/* Sidebar Menu Links */}
            {[
              { id: 'overview', label: 'Overview Hub', icon: <LayoutDashboard className="w-4 h-4" /> },
              { id: 'resources', label: 'Recommended Guides', icon: <Sparkles className="w-4 h-4" /> },
              { id: 'guidance', label: 'Guidance Checklists', icon: <CheckCircle2 className="w-4 h-4" /> },
              { id: 'community', label: 'My Community Activity', icon: <MessageCircle className="w-4 h-4" /> },
              { id: 'fundraising', label: 'Support Campaigns', icon: <HeartHandshake className="w-4 h-4" /> },
              { id: 'saved', label: 'Saved Articles (7)', icon: <Bookmark className="w-4 h-4" /> },
              { id: 'settings', label: 'Account Settings', icon: <Settings className="w-4 h-4" /> },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all text-left ${
                  activeTab === item.id
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-200'
                    : 'text-slate-700 hover:bg-purple-50 hover:text-purple-900'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}

          </div>

          {/* Main Area */}
          <div className="lg:col-span-9 space-y-8">
            
            {/* Top Welcome Banner */}
            <div className="p-8 rounded-4xl bg-gradient-to-r from-purple-900 via-purple-800 to-sky-900 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
              <div className="space-y-2 relative z-10">
                <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-bold text-purple-200 uppercase tracking-wider">
                  Caregiver Portal Active
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Welcome back 👋 {profileName}
                </h1>
                <p className="text-purple-100 text-xs sm:text-sm max-w-lg font-normal">
                  Here is your personalized progress, saved educational guides, and active community discussions.
                </p>
              </div>

              <div className="flex items-center gap-2.5 flex-wrap relative z-10">
                <button
                  onClick={() => onNavigate('activities')}
                  className="px-5 py-3 bg-purple-500/40 hover:bg-purple-500/60 border border-purple-300/40 text-white font-extrabold rounded-2xl text-xs transition-all shadow-sm flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Learning Activities</span>
                </button>

                <button
                  onClick={() => onNavigate('guidance')}
                  className="px-5 py-3 bg-white text-purple-950 font-extrabold rounded-2xl text-xs hover:bg-purple-50 transition-colors shadow-sm flex items-center gap-2"
                >
                  <span>Take Guidance Assessment</span>
                  <ArrowRight className="w-4 h-4 text-purple-600" />
                </button>
              </div>
            </div>

            {/* Metric Cards Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-5 rounded-3xl bg-white border border-purple-100 shadow-soft">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Saved Resources</p>
                <p className="text-2xl font-extrabold text-purple-900 mt-1">7</p>
                <p className="text-[10px] text-purple-600 font-semibold mt-1">Bookmarked guides</p>
              </div>

              <div className="p-5 rounded-3xl bg-white border border-purple-100 shadow-soft">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Guidance History</p>
                <p className="text-2xl font-extrabold text-sky-700 mt-1">2</p>
                <p className="text-[10px] text-sky-600 font-semibold mt-1">Completed checklists</p>
              </div>

              <div className="p-5 rounded-3xl bg-white border border-purple-100 shadow-soft">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Community Posts</p>
                <p className="text-2xl font-extrabold text-emerald-700 mt-1">5</p>
                <p className="text-[10px] text-emerald-600 font-semibold mt-1">Threads & replies</p>
              </div>

              <div className="p-5 rounded-3xl bg-white border border-purple-100 shadow-soft">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Campaign Support</p>
                <p className="text-2xl font-extrabold text-rose-600 mt-1">₹2,500</p>
                <p className="text-[10px] text-rose-600 font-semibold mt-1">Contributed</p>
              </div>
            </div>

            {/* Widget 1: Recommended Resources */}
            <div className="p-6 rounded-4xl bg-white border border-purple-100 shadow-soft space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  Recommended Resources For You
                </h3>
                <button
                  onClick={() => onNavigate('resources')}
                  className="text-xs font-bold text-purple-700 hover:underline"
                >
                  View All Library →
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockResources.slice(0, 2).map((res) => (
                  <div
                    key={res.id}
                    onClick={() => onOpenDetailModal(res)}
                    className="p-5 rounded-3xl bg-cream-50 hover:bg-purple-50/50 border border-purple-100 transition-all cursor-pointer space-y-2 group"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800">
                      {res.category}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-purple-700 line-clamp-1">
                      {res.title}
                    </h4>
                    <p className="text-xs text-slate-600 line-clamp-2">{res.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Widget 2: Community Activity Preview */}
            <div className="p-6 rounded-4xl bg-white border border-purple-100 shadow-soft space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  Latest Community Forum Activity
                </h3>
                <button
                  onClick={() => onNavigate('community')}
                  className="text-xs font-bold text-emerald-700 hover:underline"
                >
                  Go to Forum →
                </button>
              </div>

              <div className="space-y-3">
                {mockDiscussions.slice(0, 2).map((post) => (
                  <div
                    key={post.id}
                    onClick={() => onNavigate('community')}
                    className="p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-all cursor-pointer flex items-center justify-between gap-4"
                  >
                    <div className="space-y-0.5">
                      <p className="text-xs font-bold text-slate-900 line-clamp-1">{post.title}</p>
                      <p className="text-[11px] text-slate-500">{post.author} • {post.timestamp}</p>
                    </div>
                    <span className="shrink-0 text-xs font-bold text-purple-700 bg-purple-100 px-3 py-1 rounded-full">
                      {post.commentsCount} replies
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Widget 3: Support Campaign Progress */}
            <div className="p-6 rounded-4xl bg-white border border-purple-100 shadow-soft space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <HeartHandshake className="w-4 h-4 text-rose-600" />
                  Active Campaigns You Supported
                </h3>
                <button
                  onClick={() => onNavigate('fundraising')}
                  className="text-xs font-bold text-rose-600 hover:underline"
                >
                  Fundraising Directory →
                </button>
              </div>

              <div className="p-5 rounded-3xl bg-rose-50/60 border border-rose-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-center sm:text-left">
                  <h4 className="text-sm font-bold text-slate-900">{mockCampaigns[0].title}</h4>
                  <p className="text-xs text-slate-600">You contributed ₹2,500 on Feb 10, 2026</p>
                </div>
                <button
                  onClick={() => onOpenDonateModal(mockCampaigns[0])}
                  className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-2xl text-xs transition-colors shadow-sm flex items-center gap-1.5 shrink-0"
                >
                  <Heart className="w-3.5 h-3.5 fill-white" />
                  <span>Support Again</span>
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
