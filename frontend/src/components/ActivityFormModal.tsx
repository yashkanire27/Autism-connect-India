import React, { useState, useEffect } from 'react';
import { X, Sparkles, Youtube, Instagram, Clock, AlertCircle, Save, Layers } from 'lucide-react';
import { ActivityItem, ActivityCategory, ActivityDifficulty } from '../types';

interface ActivityFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (activity: Partial<ActivityItem>) => Promise<void>;
  initialData?: ActivityItem | null;
}

const CATEGORIES: { value: ActivityCategory; label: string }[] = [
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

export const ActivityFormModal: React.FC<ActivityFormModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}) => {
  const [formData, setFormData] = useState<Partial<ActivityItem>>({
    title: '',
    category: 'COMMUNICATION',
    difficulty: 'EASY',
    description: '',
    imageUrl: '',
    durationMinutes: 15,
    ageGroup: '3-7 years',
    materialsNeeded: '',
    benefits: '',
    instructions: '',
    youtubeLink: '',
    instagramLink: '',
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        title: '',
        category: 'COMMUNICATION',
        difficulty: 'EASY',
        description: '',
        imageUrl: '',
        durationMinutes: 15,
        ageGroup: '3-7 years',
        materialsNeeded: '',
        benefits: '',
        instructions: '',
        youtubeLink: '',
        instagramLink: '',
      });
    }
    setError(null);
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title?.trim()) {
      setError('Activity title is required.');
      return;
    }
    if (!formData.category) {
      setError('Please select a category.');
      return;
    }

    setSaving(true);
    setError(null);

    try {
      await onSave(formData);
      onClose();
    } catch (err: any) {
      setError(err?.message || 'Failed to save activity to backend.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-4xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border border-purple-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-purple-100/80 flex items-center justify-between bg-gradient-to-r from-purple-50/60 to-sky-50/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-600 text-white flex items-center justify-center shadow-md shadow-purple-200">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-slate-900">
                {initialData ? 'Edit Learning Activity' : 'Add New Learning Activity'}
              </h2>
              <p className="text-xs text-slate-500">
                Connected directly to the Autism Connect Activities Backend
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body / Form */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-5 text-sm">
          {error && (
            <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 flex items-center gap-2 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Title & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Activity Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Color Sorting Basket"
                value={formData.title || ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-slate-50/50"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Category *
              </label>
              <select
                value={formData.category || 'COMMUNICATION'}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value as ActivityCategory })
                }
                className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-slate-50/50 font-medium"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Short Description
            </label>
            <textarea
              rows={2}
              placeholder="Brief summary of how this activity helps child development..."
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-slate-50/50 text-xs sm:text-sm"
            />
          </div>

          {/* Difficulty, Duration, Age Group */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Difficulty</label>
              <select
                value={formData.difficulty || 'EASY'}
                onChange={(e) =>
                  setFormData({ ...formData, difficulty: e.target.value as ActivityDifficulty })
                }
                className="w-full px-3 py-2.5 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-slate-50/50"
              >
                <option value="EASY">Easy</option>
                <option value="MEDIUM">Medium</option>
                <option value="HARD">Hard</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Duration (Minutes)
              </label>
              <div className="relative">
                <input
                  type="number"
                  min={1}
                  max={180}
                  value={formData.durationMinutes ?? ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      durationMinutes: e.target.value ? Number(e.target.value) : null,
                    })
                  }
                  className="w-full pl-9 pr-3 py-2.5 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-slate-50/50"
                  placeholder="15"
                />
                <Clock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Age Group</label>
              <input
                type="text"
                placeholder="e.g. 3-6 years"
                value={formData.ageGroup || ''}
                onChange={(e) => setFormData({ ...formData, ageGroup: e.target.value })}
                className="w-full px-3 py-2.5 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-slate-50/50"
              />
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Image URL</label>
            <input
              type="url"
              placeholder="https://images.unsplash.com/photo-..."
              value={formData.imageUrl || ''}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-slate-50/50 text-xs"
            />
          </div>

          {/* Materials Needed */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Materials Needed
            </label>
            <input
              type="text"
              placeholder="e.g. Colored balls, shallow baskets, stickers"
              value={formData.materialsNeeded || ''}
              onChange={(e) => setFormData({ ...formData, materialsNeeded: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-slate-50/50"
            />
          </div>

          {/* Benefits */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Developmental Benefits
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Improves fine motor skills, color discrimination, hand-eye coordination..."
              value={formData.benefits || ''}
              onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-slate-50/50 text-xs sm:text-sm"
            />
          </div>

          {/* Step-by-Step Instructions */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Parent Instructions
            </label>
            <textarea
              rows={3}
              placeholder="Step 1: Sit facing child... Step 2: Model the action..."
              value={formData.instructions || ''}
              onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-slate-50/50 text-xs sm:text-sm"
            />
          </div>

          {/* Video & Social Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <Youtube className="w-4 h-4 text-red-500" />
                <span>YouTube Demo Link</span>
              </label>
              <input
                type="url"
                placeholder="https://www.youtube.com/watch?v=..."
                value={formData.youtubeLink || ''}
                onChange={(e) => setFormData({ ...formData, youtubeLink: e.target.value })}
                className="w-full px-3 py-2 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-slate-50/50 text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <Instagram className="w-4 h-4 text-pink-500" />
                <span>Instagram Video/Guide Link</span>
              </label>
              <input
                type="url"
                placeholder="https://www.instagram.com/p/..."
                value={formData.instagramLink || ''}
                onChange={(e) => setFormData({ ...formData, instagramLink: e.target.value })}
                className="w-full px-3 py-2 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-slate-50/50 text-xs"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="px-5 py-2.5 rounded-2xl border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold text-xs transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md shadow-purple-200 transition-all flex items-center gap-2 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Saving to Backend...' : initialData ? 'Update Activity' : 'Save Activity'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
