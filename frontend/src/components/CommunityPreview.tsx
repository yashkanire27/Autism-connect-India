import React, { useState } from 'react';
import { MessageCircle, Heart, ArrowRight, Sparkles, MessageSquare } from 'lucide-react';
import { PageView, LanguageCode, DiscussionPost } from '../types';
import { translations } from '../data/translations';
import { mockDiscussions } from '../data/mockData';

interface CommunityPreviewProps {
  onNavigate: (view: PageView) => void;
  currentLang: LanguageCode;
  onShowToast: (title: string, message: string) => void;
}

export const CommunityPreview: React.FC<CommunityPreviewProps> = ({
  onNavigate,
  currentLang,
  onShowToast,
}) => {
  const t = translations[currentLang] || translations.en;
  const [posts, setPosts] = useState<DiscussionPost[]>(mockDiscussions);

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === id) {
          const isLiked = !post.isLiked;
          if (isLiked) {
            onShowToast('Liked Discussion ❤️', `Upvoted post by ${post.author}`);
          }
          return {
            ...post,
            isLiked,
            likes: isLiked ? post.likes + 1 : post.likes - 1,
          };
        }
        return post;
      })
    );
  };

  return (
    <section className="py-20 bg-white border-b border-purple-100/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>Safe Caregiver Forum</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {t.communityHeading}
            </h2>
            <p className="text-base text-slate-600 font-normal">
              {t.communitySubheading}
            </p>
          </div>

          <button
            onClick={() => onNavigate('community')}
            className="shrink-0 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl text-sm transition-all shadow-md shadow-emerald-200 hover:shadow-lg flex items-center gap-2"
          >
            <span>{t.communityJoinBtn}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Featured Discussion Quote Banner */}
        <div className="mb-10 p-8 rounded-4xl bg-gradient-to-r from-purple-900 via-purple-800 to-sky-900 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="space-y-2 relative z-10">
            <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-bold text-purple-200 uppercase tracking-wider">
              💬 Caregiver Voices
            </span>
            <blockquote className="text-lg sm:text-xl font-bold italic leading-relaxed text-purple-50">
              “Sharing our experience with early intervention helped us understand what to do next. You don’t have to figure it out alone.”
            </blockquote>
            <p className="text-xs text-purple-200 font-medium">
              — Parent Community Member, Mumbai
            </p>
          </div>

          <button
            onClick={() => onNavigate('community')}
            className="shrink-0 px-6 py-3 bg-white text-purple-950 font-extrabold rounded-2xl text-xs hover:bg-purple-50 transition-colors shadow-sm relative z-10"
          >
            Explore Community Threads →
          </button>
        </div>

        {/* Discussion Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.slice(0, 4).map((post) => (
            <div
              key={post.id}
              onClick={() => onNavigate('community')}
              className="p-6 rounded-3xl bg-cream-50 hover:bg-white border border-purple-100 hover:border-purple-200 shadow-soft hover:shadow-soft-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer flex flex-col justify-between group"
            >
              <div className="space-y-3">
                {/* Author Info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={post.avatar}
                      alt={post.author}
                      className="w-10 h-10 rounded-full object-cover border-2 border-purple-200"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-purple-700 transition-colors">
                        {post.author}
                      </h4>
                      <p className="text-[11px] text-slate-500">{post.role}</p>
                    </div>
                  </div>

                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-purple-100 text-purple-800 border border-purple-200">
                    {post.category}
                  </span>
                </div>

                {/* Title & Excerpt */}
                <h3 className="text-base font-bold text-slate-900 line-clamp-2 leading-snug">
                  {post.title}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {post.content}
                </p>
              </div>

              {/* Card Footer Interactions */}
              <div className="pt-4 mt-4 border-t border-purple-100/80 flex items-center justify-between text-xs text-slate-500">
                <span className="text-[11px] text-slate-400 font-medium">{post.timestamp}</span>

                <div className="flex items-center gap-4">
                  <button
                    onClick={(e) => handleLike(post.id, e)}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-colors ${
                      post.isLiked
                        ? 'bg-rose-100 text-rose-600 font-bold'
                        : 'hover:bg-purple-50 text-slate-600'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${post.isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
                    <span>{post.likes}</span>
                  </button>

                  <div className="flex items-center gap-1.5 text-slate-600">
                    <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                    <span>{post.commentsCount} comments</span>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
