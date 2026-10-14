import React, { useState } from 'react';
import { Search, BookOpen, Clock, ArrowRight, Bookmark, Sparkles, Filter } from 'lucide-react';
import { PageView, LanguageCode, ResourceItem } from '../types';
import { translations } from '../data/translations';
import { mockResources } from '../data/mockData';

interface ResourceLibraryPreviewProps {
  onNavigate: (view: PageView) => void;
  currentLang: LanguageCode;
  onOpenDetailModal: (resource: ResourceItem) => void;
  onShowToast: (title: string, message: string) => void;
}

export const ResourceLibraryPreview: React.FC<ResourceLibraryPreviewProps> = ({
  onNavigate,
  currentLang,
  onOpenDetailModal,
  onShowToast,
}) => {
  const t = translations[currentLang] || translations.en;
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [savedIds, setSavedIds] = useState<string[]>([]);

  const categories = ['All', 'Autism Basics', 'Early Signs', 'Parenting', 'Education', 'Therapy', 'Government Resources'];

  const filteredResources = mockResources.filter((res) => {
    const matchesCategory = selectedCategory === 'All' || res.category === selectedCategory;
    const matchesSearch =
      res.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      res.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleBookmark = (id: string, title: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (savedIds.includes(id)) {
      setSavedIds(savedIds.filter((item) => item !== id));
      onShowToast('Bookmark Removed 🔖', `Removed "${title.substring(0, 30)}..." from saved items`);
    } else {
      setSavedIds([...savedIds, id]);
      onShowToast('Saved to Dashboard 🔖', `Bookmarked "${title.substring(0, 30)}..."`);
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100 text-purple-800 text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5 text-purple-600" />
            <span>Curated Knowledge Library</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t.resourcesHeading}
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            {t.resourcesSubheading}
          </p>

          {/* Search Bar */}
          <div className="pt-4 max-w-xl mx-auto relative">
            <Search className="w-5 h-5 text-purple-600 absolute left-4 top-4" />
            <input
              type="text"
              placeholder={t.resourcesSearchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-purple-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Category Pills Filter */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${
                selectedCategory === cat
                  ? 'bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-200'
                  : 'bg-cream-50 text-slate-700 border-purple-100 hover:bg-purple-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Resource Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredResources.slice(0, 6).map((res) => {
            const isSaved = savedIds.includes(res.id);

            return (
              <div
                key={res.id}
                onClick={() => onOpenDetailModal(res)}
                className="p-7 rounded-4xl bg-cream-50 hover:bg-white border border-purple-100 hover:border-purple-200 shadow-soft hover:shadow-soft-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer flex flex-col justify-between group relative"
              >
                <div className="space-y-4">
                  {/* Category & Bookmark Header */}
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-purple-100 text-purple-800 border border-purple-200">
                      {res.category}
                    </span>

                    <button
                      onClick={(e) => toggleBookmark(res.id, res.title, e)}
                      className={`p-2 rounded-full transition-colors ${
                        isSaved
                          ? 'bg-purple-600 text-white'
                          : 'text-slate-400 hover:text-purple-600 hover:bg-purple-50'
                      }`}
                      title={isSaved ? 'Remove Bookmark' : 'Save Resource'}
                    >
                      <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-white' : ''}`} />
                    </button>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-purple-700 transition-colors leading-snug line-clamp-2">
                    {res.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {res.description}
                  </p>
                </div>

                {/* Card Footer */}
                <div className="pt-6 mt-6 border-t border-purple-100/80 flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1 text-slate-400 font-medium">
                    <Clock className="w-3.5 h-3.5 text-purple-500" />
                    {res.readTime}
                  </span>

                  <span className="text-purple-700 font-extrabold flex items-center gap-1 group-hover:underline">
                    Read Guide
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Resources Footer */}
        <div className="mt-12 text-center">
          <button
            onClick={() => onNavigate('resources')}
            className="px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-2xl text-xs transition-all shadow-md hover:shadow-lg inline-flex items-center gap-2"
          >
            <span>Explore Complete Resource Library (6+ Guides)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
