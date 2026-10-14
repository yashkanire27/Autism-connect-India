import { ActivityItem, ActivityCategory, AssessmentScores } from '../types';

const API_BASE = '/api/activities';

function getAuthHeaders(extra: Record<string, string> = {}): Record<string, string> {
  const token = localStorage.getItem('aci_token') || localStorage.getItem('token');
  const headers: Record<string, string> = { ...extra };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

export const activityService = {
  /**
   * Get all activities with optional category filter or keyword search
   */
  async getAll(params?: { category?: string; search?: string }): Promise<ActivityItem[]> {
    const query = new URLSearchParams();
    if (params?.category) query.append('category', params.category);
    if (params?.search) query.append('search', params.search);

    const url = `${API_BASE}${query.toString() ? `?${query.toString()}` : ''}`;
    const res = await fetch(url, {
      headers: getAuthHeaders(),
    });
    if (!res.ok) {
      throw new Error(`Failed to load activities: ${res.statusText}`);
    }
    return res.json();
  },

  /**
   * Get smart activity recommendations based on Assessment scores
   */
  async getRecommendations(scores: AssessmentScores): Promise<{
    recommendations: ActivityItem[];
    prioritizedCategories: ActivityCategory[];
  }> {
    const query = new URLSearchParams({
      comm: String(scores.comm),
      social: String(scores.social),
      daily: String(scores.daily),
    });

    try {
      const res = await fetch(`${API_BASE}/recommendations?${query.toString()}`, {
        headers: getAuthHeaders(),
      });
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // Endpoint not present on Spring Boot backend, fallback to client-side logic below
    }

    // Client-side recommendation algorithm for Spring Boot backend
    const all = await this.getAll();
    const prioritizedCategories: ActivityCategory[] = [];
    if (scores.comm <= 80) prioritizedCategories.push('COMMUNICATION', 'SPEECH');
    if (scores.social <= 80) prioritizedCategories.push('SOCIAL_SKILLS', 'MATCHING');
    if (scores.daily <= 80) prioritizedCategories.push('SENSORY', 'MOTOR_SKILLS', 'LEARNING', 'SORTING');
    if (prioritizedCategories.length === 0) {
      prioritizedCategories.push('SOCIAL_SKILLS', 'COMMUNICATION', 'SENSORY', 'MOTOR_SKILLS');
    }

    const recommended = all
      .filter((act) => prioritizedCategories.includes(act.category))
      .slice(0, 6)
      .map((act) => {
        let reason = 'General developmental enrichment';
        if (['COMMUNICATION', 'SPEECH'].includes(act.category)) {
          reason = `Tailored for Communication & Gesture development (${scores.comm}%)`;
        } else if (['SOCIAL_SKILLS', 'MATCHING'].includes(act.category)) {
          reason = `Recommended for Social Interaction & Joint Attention (${scores.social}%)`;
        } else if (['SENSORY', 'MOTOR_SKILLS', 'SORTING', 'LEARNING'].includes(act.category)) {
          reason = `Supports Daily Sensory Preferences & Routines (${scores.daily}%)`;
        }
        return { ...act, recommendationReason: reason };
      });

    return {
      recommendations: recommended,
      prioritizedCategories,
    };
  },

  /**
   * Get single activity by ID
   */
  async getById(id: string | number): Promise<ActivityItem> {
    const res = await fetch(`${API_BASE}/${id}`, {
      headers: getAuthHeaders(),
    });
    if (!res.ok) {
      throw new Error(`Failed to load activity #${id}: ${res.statusText}`);
    }
    return res.json();
  },

  /**
   * Create a new activity in the backend
   */
  async create(data: Partial<ActivityItem>): Promise<ActivityItem> {
    const res = await fetch(API_BASE, {
      method: 'POST',
      headers: getAuthHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.message || 'Failed to create activity');
    }
    return res.json();
  },

  /**
   * Update an activity in the backend
   */
  async update(id: string | number, data: Partial<ActivityItem>): Promise<ActivityItem> {
    const res = await fetch(`${API_BASE}/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.message || 'Failed to update activity');
    }
    return res.json();
  },

  /**
   * Delete an activity from the backend
   */
  async remove(id: string | number): Promise<{ success: boolean; message: string }> {
    const res = await fetch(`${API_BASE}/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.message || 'Failed to delete activity');
    }
    return res.json();
  },
};
