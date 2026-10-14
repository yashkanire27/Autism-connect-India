import React, { useState } from 'react';
import { X, Clock, User, Calendar, Bookmark, Share2, Check, ArrowRight, HeartHandshake, Sparkles } from 'lucide-react';
import { ResourceItem, PageView } from '../types';

interface ResourceDetailModalProps {
  resource: ResourceItem | null;
  onClose: () => void;
  onNavigate: (view: PageView) => void;
  onShowToast: (title: string, message: string) => void;
}

export const ResourceDetailModal: React.FC<ResourceDetailModalProps> = ({
  resource,
  onClose,
  onNavigate,
  onShowToast,
}) => {
  const [isSaved, setIsSaved] = useState(false);

  if (!resource) return null;

  const handleShare = () => {
    navigator.clipboard?.writeText?.(window.location.href);
    onShowToast('Link Copied 🔗', 'Article link copied to your clipboard!');
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    if (!isSaved) {
      onShowToast('Saved to Profile 🔖', 'Article bookmarked in your parent dashboard.');
    } else {
      onShowToast('Removed Bookmark 🔖', 'Article removed from saved items.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/50 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="bg-white rounded-4xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-purple-100 my-auto relative">
        
        {/* Sticky Header Bar */}
        <div className="sticky top-0 bg-white/90 backdrop-blur-md px-6 sm:px-8 py-4 border-b border-slate-100 flex items-center justify-between z-20">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <button onClick={() => { onClose(); onNavigate('resources'); }} className="hover:text-purple-700">
              Resources
            </button>
            <span>/</span>
            <span className="text-purple-700 font-bold">{resource.category}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSave}
              className={`p-2 rounded-2xl border text-xs font-bold transition-all flex items-center gap-1.5 ${
                isSaved
                  ? 'bg-purple-600 text-white border-purple-600'
                  : 'bg-slate-50 hover:bg-purple-50 text-slate-700 border-slate-200'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-white' : ''}`} />
              <span className="hidden sm:inline">{isSaved ? 'Saved' : 'Save'}</span>
            </button>

            <button
              onClick={handleShare}
              className="p-2 bg-slate-50 hover:bg-purple-50 text-slate-700 border border-slate-200 rounded-2xl text-xs font-bold transition-all flex items-center gap-1.5"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">Share</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Main Body */}
        <div className="p-6 sm:p-10 space-y-8">
          
          {/* Category & Read Time */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="px-3.5 py-1 rounded-full bg-purple-100 text-purple-800 border border-purple-200 text-xs font-extrabold uppercase tracking-wider">
                {resource.category}
              </span>
              <span className="flex items-center gap-1 text-xs text-slate-500 font-medium">
                <Clock className="w-3.5 h-3.5 text-purple-600" />
                {resource.readTime}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
              {resource.title}
            </h1>

            {/* Author Meta */}
            <div className="flex items-center gap-4 pt-2 text-xs text-slate-600 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-1.5 font-bold text-slate-800">
                <User className="w-4 h-4 text-purple-600" />
                <span>{resource.author}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5 font-medium">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span>{resource.publishedDate}</span>
              </div>
            </div>
          </div>

          {/* Key Takeaways Box */}
          {resource.keyTakeaways && (
            <div className="p-6 rounded-3xl bg-purple-50/80 border border-purple-100 space-y-3">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-purple-800 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-600" />
                Key Takeaways & Parent Summary
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-purple-950 font-medium">
                {resource.keyTakeaways.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Article Full Paragraphs */}
          <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
            {resource.content.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          {/* Bottom Callout Banner */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-sky-50 to-purple-50 border border-purple-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="text-base font-bold text-slate-900">Need personal guidance or peer support?</h4>
              <p className="text-xs text-slate-600">Explore active parent discussions or take our early guidance checklist.</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => { onClose(); onNavigate('guidance'); }}
                className="px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl text-xs transition-colors shadow-sm"
              >
                Checklist Tool
              </button>
              <button
                onClick={() => { onClose(); onNavigate('community'); }}
                className="px-4 py-2.5 bg-white hover:bg-purple-50 text-purple-900 border border-purple-200 font-bold rounded-xl text-xs transition-colors"
              >
                Community
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
