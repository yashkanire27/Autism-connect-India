import React, { useState, useEffect, useCallback } from 'react';
import {
  Sparkles,
  Search,
  Plus,
  Filter,
  Youtube,
  Instagram,
  Clock,
  Tag,
  CheckCircle,
  Edit2,
  Trash2,
  ChevronDown,
  ChevronUp,
  Server,
  Layers,
  ArrowRight,
  RefreshCw,
  BookOpen,
} from 'lucide-react';
import { ActivityItem, ActivityCategory, ActivityDifficulty, AssessmentScores, PageView } from '../types';
import { activityService } from '../services/activityService';
import { ActivityFormModal } from '../components/ActivityFormModal';

interface ActivitiesPageProps {
  onNavigate: (view: PageView) => void;
  onShowToast: (title: string, message: string, type?: 'success' | 'info' | 'warning') => void;
  assessmentScores?: AssessmentScores | null;
}

const CATEGORIES: { value: string; label: string }[] = [
  { value: '', label: 'All Categories' },
  { value: 'COMMUNICATION', label: 'Communication' },
  { value: 'SOCIAL_SKILLS', label: 'Social Skills' },
  { value: 'MOTOR_SKILLS', label: 'Motor Skills' },
  { value: 'LEARNING', label: 'Learning' },
  { value: 'SENSORY', label: 'Sensory' },
  { value: 'SPEECH', label: 'Speech' },
  { value: 'CREATIVITY', label: 'Creativity' },
  { value: 'MEMORY', label: 'Memory' },
  { value: 'SORTING', label: 'Sorting' },
  { value: 'MATCHING', label: 'Matching' },
  { value: 'INDOOR', label: 'Indoor' },
  { value: 'OUTDOOR', label: 'Outdoor' },
];

export const ActivitiesPage: React.FC<ActivitiesPageProps> = ({
  onNavigate,
  onShowToast,
  assessmentScores,
}) => {
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [recommendations, setRecommendations] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [backendOnline, setBackendOnline] = useState(true);

  const [formModalOpen, setFormModalOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState<ActivityItem | null>(null);
  const [expandedCardId, setExpandedCardId] = useState<string | number | null>(null);

  // Load activities from Backend
  const loadActivities = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await activityService.getAll({
        category: selectedCategory || undefined,
        search: searchQuery.trim() || undefined,
      });
      setActivities(data);
      setBackendOnline(true);
    } catch (err: any) {
      console.warn('Backend activity fetch failed:', err);
      setError('Could not connect to activity backend. Please ensure the backend is running.');
      setBackendOnline(false);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, searchQuery]);

  // Load recommendations if assessment scores are provided
  useEffect(() => {
    if (assessmentScores) {
      activityService
        .getRecommendations(assessmentScores)
        .then((res) => {
          setRecommendations(res.recommendations || []);
        })
        .catch((err) => {
          console.warn('Failed to load personalized recommendations:', err);
        });
    }
  }, [assessmentScores]);

  useEffect(() => {
    loadActivities();
  }, [loadActivities]);

  const handleCreateOrUpdate = async (formData: Partial<ActivityItem>) => {
    if (editingActivity && editingActivity.activityId) {
      await activityService.update(editingActivity.activityId, formData);
      onShowToast('Activity Updated ✨', `"${formData.title}" was saved to backend.`);
    } else {
      await activityService.create(formData);
      onShowToast('Activity Added 🎉', `"${formData.title}" added to activities.`);
    }
    setFormModalOpen(false);
    setEditingActivity(null);
    loadActivities();
  };

  const handleDelete = async (activity: ActivityItem) => {
    if (!activity.activityId) return;
    const confirmDelete = window.confirm(`Are you sure you want to delete "${activity.title}"?`);
    if (!confirmDelete) return;

    try {
      await activityService.remove(activity.activityId);
      onShowToast('Activity Deleted', `"${activity.title}" has been removed.`, 'info');
      loadActivities();
    } catch (err: any) {
      onShowToast('Error Deleting', err.message || 'Could not delete activity', 'warning');
    }
  };

  const getDifficultyBadge = (difficulty: ActivityDifficulty) => {
    switch (difficulty) {
      case 'EASY':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'MEDIUM':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'HARD':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      default:
        return 'bg-purple-100 text-purple-800 border-purple-200';
    }
  };

  // Filter by difficulty in UI
  const filteredActivities = activities.filter((act) => {
    if (selectedDifficulty === 'ALL') return true;
    return act.difficulty === selectedDifficulty;
  });

  return (
    <div className="py-10 bg-cream-50/50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Header & Breadcrumb */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              <span>Autism Connect · Activity Module</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Evidence-Based Learning Activities
            </h1>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl">
              Targeted sensory routines, joint-attention games, and communication exercises built from the MegaProject specification.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-white border border-slate-200 shadow-sm text-xs font-semibold text-slate-600">
              <Server className={`w-3.5 h-3.5 ${backendOnline ? 'text-emerald-500' : 'text-amber-500'}`} />
              <span>{backendOnline ? 'Backend: Connected (/api/activities)' : 'Backend: Reconnecting...'}</span>
            </div>

            <button
              onClick={() => {
                setEditingActivity(null);
                setFormModalOpen(true);
              }}
              className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-sky-600 hover:from-purple-700 hover:to-sky-700 text-white font-bold rounded-2xl text-xs sm:text-sm shadow-md shadow-purple-200 transition-all flex items-center gap-2 shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Add Activity</span>
            </button>
          </div>
        </div>

        {/* Personalized Recommendations Banner (If assessment score was just completed) */}
        {assessmentScores && (
          <div className="p-6 rounded-4xl bg-gradient-to-r from-purple-900 via-indigo-900 to-sky-900 text-white shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-amber-300">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base sm:text-lg">
                    Recommended for Your Child's Assessment Profile
                  </h3>
                  <p className="text-xs text-purple-200">
                    Automated recommendations customized from your Observational Guidance Summary
                  </p>
                </div>
              </div>

              {/* Assessment score badges */}
              <div className="flex items-center gap-2 flex-wrap text-xs font-bold">
                <span className="px-3 py-1 rounded-full bg-purple-500/30 border border-purple-400/30 text-purple-200">
                  Communication: {assessmentScores.comm}%
                </span>
                <span className="px-3 py-1 rounded-full bg-sky-500/30 border border-sky-400/30 text-sky-200">
                  Social: {assessmentScores.social}%
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-500/30 border border-emerald-400/30 text-emerald-200">
                  Daily/Sensory: {assessmentScores.daily}%
                </span>
              </div>
            </div>

            {recommendations.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
                {recommendations.map((rec) => (
                  <div
                    key={rec.activityId}
                    className="p-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 backdrop-blur-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-[11px] font-bold text-amber-300 mb-1">
                        <span>{rec.category?.replace('_', ' ')}</span>
                        <span className="px-2 py-0.5 rounded-full bg-white/20 text-white text-[10px]">
                          {rec.difficulty}
                        </span>
                      </div>
                      <h4 className="font-extrabold text-sm text-white line-clamp-1">{rec.title}</h4>
                      <p className="text-xs text-purple-100/90 mt-1 line-clamp-2">{rec.description}</p>
                    </div>
                    {rec.recommendationReason && (
                      <p className="text-[10px] text-amber-200 font-medium mt-2 bg-amber-400/10 p-1.5 rounded-xl border border-amber-300/20">
                        💡 {rec.recommendationReason}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-purple-200">
                Loading tailored activities based on assessment...
              </p>
            )}
          </div>
        )}

        {/* Filter and Search Bar */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 border border-purple-100 shadow-sm space-y-3">
          <div className="flex flex-col lg:flex-row items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder="Search activities by title, materials, benefits, keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-400 text-xs sm:text-sm bg-slate-50/50"
              />
            </div>

            {/* Category Select */}
            <div className="w-full lg:w-60">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-400 text-xs sm:text-sm bg-slate-50/50 font-semibold text-slate-700"
              >
                {CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Difficulty Tabs */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-2xl w-full lg:w-auto overflow-x-auto">
              {['ALL', 'EASY', 'MEDIUM', 'HARD'].map((diff) => (
                <button
                  key={diff}
                  onClick={() => setSelectedDifficulty(diff)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                    selectedDifficulty === diff
                      ? 'bg-white text-purple-800 shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {diff === 'ALL' ? 'All Levels' : diff}
                </button>
              ))}
            </div>

            {/* Refresh Button */}
            <button
              onClick={() => loadActivities()}
              className="p-2.5 rounded-2xl border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors shrink-0"
              title="Refresh from backend"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-purple-600' : ''}`} />
            </button>
          </div>
        </div>

        {/* Loading Spinner */}
        {loading && activities.length === 0 && (
          <div className="py-20 text-center space-y-3">
            <div className="w-10 h-10 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-sm font-semibold text-slate-500">
              Loading learning activities from backend...
            </p>
          </div>
        )}

        {/* Error Notification */}
        {error && (
          <div className="p-4 rounded-3xl bg-amber-50 border border-amber-200 text-amber-900 flex items-center justify-between text-xs">
            <span>{error}</span>
            <button
              onClick={() => loadActivities()}
              className="px-3 py-1 bg-amber-200 hover:bg-amber-300 rounded-xl font-bold transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {/* Activities Grid */}
        {!loading && filteredActivities.length === 0 ? (
          <div className="bg-white rounded-4xl p-12 text-center space-y-4 border border-purple-100 shadow-sm">
            <div className="w-16 h-16 mx-auto rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
              <Layers className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900">No activities found</h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto">
              We couldn't find any activities matching your category or search keywords.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('');
                setSelectedDifficulty('ALL');
                setSearchQuery('');
              }}
              className="px-5 py-2.5 bg-purple-600 text-white rounded-2xl text-xs font-bold hover:bg-purple-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredActivities.map((activity) => {
              const isExpanded = expandedCardId === activity.activityId;

              return (
                <div
                  key={activity.activityId}
                  className="bg-white rounded-3xl border border-purple-100/90 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
                >
                  <div>
                    {/* Activity Image Banner */}
                    <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                      <img
                        src={activity.imageUrl || 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=600&q=80'}
                        alt={activity.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e: any) => {
                          e.target.src =
                            'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=600&q=80';
                        }}
                      />
                      <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
                        <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-extrabold text-purple-900 shadow-sm uppercase tracking-wide">
                          {activity.category?.replace('_', ' ')}
                        </span>
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold border shadow-sm ${getDifficultyBadge(
                            activity.difficulty
                          )}`}
                        >
                          {activity.difficulty}
                        </span>
                      </div>

                      {/* Duration & Age overlays */}
                      <div className="absolute bottom-3 right-3 flex items-center gap-1.5">
                        {activity.durationMinutes && (
                          <span className="px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold flex items-center gap-1">
                            <Clock className="w-3 h-3 text-amber-300" />
                            {activity.durationMinutes} min
                          </span>
                        )}
                        {activity.ageGroup && (
                          <span className="px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold">
                            {activity.ageGroup}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-5 space-y-3">
                      <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-purple-700 transition-colors">
                        {activity.title}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {activity.description}
                      </p>

                      {/* Materials needed */}
                      {activity.materialsNeeded && (
                        <div className="text-xs text-slate-500 bg-slate-50 p-2.5 rounded-2xl border border-slate-100 flex items-start gap-2">
                          <Tag className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
                          <span><strong>Materials:</strong> {activity.materialsNeeded}</span>
                        </div>
                      )}

                      {/* Benefits */}
                      {activity.benefits && (
                        <div className="text-xs text-purple-900/90 bg-purple-50/60 p-2.5 rounded-2xl border border-purple-100 flex items-start gap-2">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span><strong>Benefits:</strong> {activity.benefits}</span>
                        </div>
                      )}

                      {/* Instructions accordion */}
                      {activity.instructions && (
                        <div className="pt-1">
                          <button
                            onClick={() =>
                              setExpandedCardId(isExpanded ? null : activity.activityId ?? null)
                            }
                            className="w-full flex items-center justify-between py-1.5 text-xs font-bold text-purple-700 hover:text-purple-900 transition-colors"
                          >
                            <span>{isExpanded ? 'Hide Steps & Instructions' : 'View Step-by-Step Instructions'}</span>
                            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                          </button>
                          {isExpanded && (
                            <div className="p-3 bg-purple-50/40 rounded-2xl border border-purple-100 text-xs text-slate-700 leading-relaxed mt-1 animate-fade-in">
                              {activity.instructions}
                            </div>
                          )}
                        </div>
                      )}

                      {/* YouTube and Instagram Video Links */}
                      {(activity.youtubeLink || activity.instagramLink) && (
                        <div className="flex items-center gap-2 pt-1 flex-wrap">
                          {activity.youtubeLink && (
                            <a
                              href={activity.youtubeLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold transition-colors"
                            >
                              <Youtube className="w-3.5 h-3.5 text-red-600" />
                              <span>Watch on YouTube</span>
                            </a>
                          )}
                          {activity.instagramLink && (
                            <a
                              href={activity.instagramLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-pink-50 hover:bg-pink-100 text-pink-700 text-xs font-bold transition-colors"
                            >
                              <Instagram className="w-3.5 h-3.5 text-pink-600" />
                              <span>Instagram Demo</span>
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Action Footer */}
                  <div className="px-5 py-3.5 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between gap-2">
                    <span className="text-[10px] text-slate-400 font-medium">
                      ID #{activity.activityId}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setEditingActivity(activity);
                          setFormModalOpen(true);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:bg-purple-50 text-slate-700 hover:text-purple-800 text-xs font-bold transition-all flex items-center gap-1"
                        title="Edit Activity"
                      >
                        <Edit2 className="w-3 h-3 text-purple-600" />
                        <span>Edit</span>
                      </button>

                      <button
                        onClick={() => handleDelete(activity)}
                        className="p-1.5 rounded-xl bg-white border border-slate-200 hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors"
                        title="Delete Activity"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Add New Activity Card Placeholder */}
            <div
              onClick={() => {
                setEditingActivity(null);
                setFormModalOpen(true);
              }}
              className="bg-purple-50/40 hover:bg-purple-50 rounded-3xl border-2 border-dashed border-purple-200 hover:border-purple-400 p-8 flex flex-col items-center justify-center text-center cursor-pointer min-h-[320px] transition-all group"
            >
              <div className="w-14 h-14 rounded-2xl bg-white text-purple-600 shadow-md group-hover:scale-110 flex items-center justify-center transition-transform mb-3">
                <Plus className="w-7 h-7" />
              </div>
              <h4 className="font-extrabold text-base text-purple-950">
                Add Custom Activity
              </h4>
              <p className="text-xs text-purple-700/80 mt-1 max-w-xs">
                Create new communication, motor, or sensory cards with materials, instructions, and video links.
              </p>
              <span className="mt-4 px-4 py-2 rounded-xl bg-purple-600 text-white font-bold text-xs group-hover:bg-purple-700 transition-colors shadow-sm">
                + Create Activity
              </span>
            </div>
          </div>
        )}

        {/* Early Guidance Navigation Callout */}
        <div className="p-6 rounded-4xl bg-white border border-purple-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-extrabold text-slate-900 text-sm sm:text-base">
                Looking for early observational checklists?
              </h4>
              <p className="text-xs text-slate-500">
                Take or retake the Early Guidance Assessment to get personalized activity match recommendations.
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigate('guidance')}
            className="w-full sm:w-auto px-5 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors flex items-center justify-center gap-2 shrink-0"
          >
            <span>Go to Early Guidance</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Add / Edit Activity Modal */}
      <ActivityFormModal
        isOpen={formModalOpen}
        onClose={() => {
          setFormModalOpen(false);
          setEditingActivity(null);
        }}
        onSave={handleCreateOrUpdate}
        initialData={editingActivity}
      />
    </div>
  );
};
