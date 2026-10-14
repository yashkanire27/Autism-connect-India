import React, { useState } from 'react';
import { MessageCircle, Search, Plus, Heart, MessageSquare, Sparkles, Filter, User } from 'lucide-react';
import { DiscussionPost, PageView } from '../types';
import { mockDiscussions } from '../data/mockData';
import { NewDiscussionModal } from '../components/NewDiscussionModal';

interface CommunityPageProps {
  onNavigate: (view: PageView) => void;
  onShowToast: (title: string, message: string) => void;
}

export const CommunityPage: React.FC<CommunityPageProps> = ({ onNavigate, onShowToast }) => {
  const [posts, setPosts] = useState<DiscussionPost[]>(mockDiscussions);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedCommentsId, setExpandedCommentsId] = useState<string | null>(null);

  const filters = ['All', 'Latest', 'Popular', 'Parenting', 'School & Education', 'Therapy Experiences', 'Early Intervention', 'Daily Challenges'];

  const filteredPosts = posts.filter((post) => {
    const matchesFilter =
      selectedFilter === 'All' ||
      selectedFilter === 'Latest' ||
      selectedFilter === 'Popular' ||
      post.category === selectedFilter;
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleLike = (id: string) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === id) {
          const isLiked = !post.isLiked;
          if (isLiked) {
            onShowToast('Liked Post ❤️', `Upvoted discussion by ${post.author}`);
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

  const handleAddPost = (newPostData: Omit<DiscussionPost, 'id' | 'likes' | 'commentsCount' | 'timestamp'>) => {
    const created: DiscussionPost = {
      ...newPostData,
      id: `post-${Date.now()}`,
      likes: 1,
      commentsCount: 0,
      timestamp: 'Just now',
    };
    setPosts([created, ...posts]);
    onShowToast('Discussion Published 💬', 'Your thread is now live in the community forum.');
  };

  return (
    <div className="py-12 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header Banner */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-purple-100">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>Safe Caregiver Forum</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              A community that understands.
            </h1>
            <p className="text-base text-slate-600">
              Connect with fellow parents, ask advice on therapy & school routines, and share encouragement in a supportive space.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="shrink-0 px-6 py-3.5 bg-gradient-to-r from-emerald-600 to-purple-600 hover:from-emerald-700 hover:to-purple-700 text-white font-extrabold rounded-2xl text-sm transition-all shadow-md shadow-emerald-200 hover:shadow-lg flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            <span>+ Start Discussion</span>
          </button>
        </div>

        {/* Search & Filter Controls */}
        <div className="space-y-4">
          <div className="relative max-w-xl">
            <Search className="w-5 h-5 text-purple-600 absolute left-4 top-4" />
            <input
              type="text"
              placeholder="Search discussion topics, parenting strategies, therapists..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-purple-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all shadow-sm"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
                  selectedFilter === filter
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-100'
                    : 'bg-cream-50 text-slate-700 border-purple-100 hover:bg-emerald-50'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Posts Directory List */}
        <div className="space-y-6">
          {filteredPosts.map((post) => {
            const isCommentsExpanded = expandedCommentsId === post.id;

            return (
              <div
                key={post.id}
                className="p-6 sm:p-8 rounded-4xl bg-cream-50/70 hover:bg-white border border-purple-100 shadow-soft hover:shadow-soft-lg transition-all duration-300 space-y-4"
              >
                {/* Author Info & Category */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={post.avatar}
                      alt={post.author}
                      className="w-11 h-11 rounded-full object-cover border-2 border-purple-200"
                    />
                    <div>
                      <h3 className="text-base font-bold text-slate-900">{post.author}</h3>
                      <p className="text-xs text-slate-500 font-medium">{post.role}</p>
                    </div>
                  </div>

                  <span className="px-3.5 py-1 rounded-full bg-purple-100 text-purple-800 border border-purple-200 text-xs font-extrabold uppercase tracking-wider">
                    {post.category}
                  </span>
                </div>

                {/* Post Content */}
                <div className="space-y-2">
                  <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-snug">
                    {post.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                    {post.content}
                  </p>
                </div>

                {/* Footer Interactions */}
                <div className="pt-4 border-t border-purple-100/80 flex items-center justify-between text-xs text-slate-500">
                  <span className="text-slate-400 font-medium">{post.timestamp}</span>

                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-all ${
                        post.isLiked
                          ? 'bg-rose-100 text-rose-600 font-bold'
                          : 'bg-white hover:bg-purple-50 text-slate-700 border border-slate-200'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
                      <span>{post.likes}</span>
                    </button>

                    <button
                      onClick={() => setExpandedCommentsId(isCommentsExpanded ? null : post.id)}
                      className="flex items-center gap-1.5 px-3.5 py-1.5 bg-white hover:bg-purple-50 border border-slate-200 rounded-full text-slate-700 font-bold transition-all"
                    >
                      <MessageSquare className="w-4 h-4 text-purple-600" />
                      <span>{post.commentsCount} Comments</span>
                    </button>
                  </div>
                </div>

                {/* Expandable Comments Section */}
                {isCommentsExpanded && (
                  <div className="mt-4 pt-4 border-t border-slate-200/80 space-y-4 bg-white/80 p-4 rounded-3xl animate-fade-in">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Community Replies ({post.commentsList?.length || 0})
                    </h4>

                    {post.commentsList && post.commentsList.length > 0 ? (
                      post.commentsList.map((c) => (
                        <div key={c.id} className="p-3.5 rounded-2xl bg-purple-50/60 border border-purple-100 text-xs space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-purple-900">{c.author} ({c.role})</span>
                            <span className="text-[10px] text-slate-400">{c.timestamp}</span>
                          </div>
                          <p className="text-slate-700 font-normal">{c.content}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-slate-500 italic">No comments yet. Be the first caregiver to reply!</p>
                    )}

                    <div className="pt-2 flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Write a supportive reply..."
                        className="flex-1 px-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                      <button
                        onClick={() => onShowToast('Reply Sent 💬', 'Your response has been added to the discussion.')}
                        className="px-4 py-2 bg-emerald-600 text-white font-bold rounded-2xl text-xs hover:bg-emerald-700 transition-colors"
                      >
                        Reply
                      </button>
                    </div>
                  </div>
                )}

              </div>
            );
          })}
        </div>

      </div>

      {/* New Discussion Creation Modal */}
      <NewDiscussionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddPost={handleAddPost}
      />
    </div>
  );
};
