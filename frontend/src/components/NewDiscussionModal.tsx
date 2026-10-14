import React, { useState } from 'react';
import { X, MessageSquarePlus, Sparkles, Send } from 'lucide-react';
import { DiscussionPost } from '../types';

interface NewDiscussionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPost: (newPost: Omit<DiscussionPost, 'id' | 'likes' | 'commentsCount' | 'timestamp'>) => void;
}

export const NewDiscussionModal: React.FC<NewDiscussionModalProps> = ({
  isOpen,
  onClose,
  onAddPost,
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<DiscussionPost['category']>('Parenting');
  const [content, setContent] = useState('');
  const [authorName, setAuthorName] = useState('');

  if (!isOpen) return null;

  const categories: DiscussionPost['category'][] = [
    'Early Intervention',
    'School & Education',
    'Parenting',
    'Therapy Experiences',
    'Daily Challenges',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddPost({
      author: authorName || 'Caregiver Member',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
      role: 'Parent Community Member',
      category,
      title,
      content,
    });
    setTitle('');
    setContent('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-purple-100 relative">
        
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-100 text-emerald-700 rounded-2xl">
              <MessageSquarePlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Start a Discussion</h3>
              <p className="text-xs text-slate-500">Ask a question or share advice with fellow parents</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Your Name or Pseudonym</label>
            <input
              type="text"
              placeholder="e.g. Priya M."
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Topic Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as any)}
              className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Discussion Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Tips for sensory-friendly bedtime routines?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Detailed Message / Question</label>
            <textarea
              required
              rows={4}
              placeholder="Share what worked for your family, or describe the challenge you're encountering..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-4 text-xs bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl text-xs transition-all shadow-md shadow-emerald-200 flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Post Discussion Thread</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
