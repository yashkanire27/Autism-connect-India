export type PageView = 'home' | 'guidance' | 'activities' | 'community' | 'fundraising' | 'resources' | 'dashboard';

export type LanguageCode = 'en' | 'mr' | 'hi' | 'bn' | 'ta';

export interface LanguageOption {
  code: LanguageCode;
  name: string;
  nativeName: string;
  flag: string;
}

export interface ResourceItem {
  id: string;
  title: string;
  description: string;
  category: 'Autism Basics' | 'Early Signs' | 'Parenting' | 'Education' | 'Therapy' | 'Government Resources';
  readTime: string;
  iconName: string;
  author: string;
  publishedDate: string;
  content: string[];
  keyTakeaways: string[];
  isSaved?: boolean;
}

export interface DiscussionComment {
  id: string;
  author: string;
  avatar: string;
  role: string;
  content: string;
  timestamp: string;
  likes: number;
}

export interface DiscussionPost {
  id: string;
  author: string;
  avatar: string;
  role: string;
  category: 'Early Intervention' | 'School & Education' | 'Parenting' | 'Therapy Experiences' | 'Daily Challenges';
  title: string;
  content: string;
  timestamp: string;
  likes: number;
  commentsCount: number;
  commentsList?: DiscussionComment[];
  isLiked?: boolean;
}

export interface CampaignItem {
  id: string;
  title: string;
  description: string;
  category: 'Therapy' | 'Education' | 'Resources' | 'Urgent Support';
  raised: number;
  goal: number;
  supporters: number;
  image: string;
  organizer: string;
  location: string;
  daysLeft: number;
  isUrgent?: boolean;
}

export interface GuidanceQuestion {
  id: string;
  category: 'Communication' | 'Social Interaction' | 'Daily Activities';
  question: string;
  description: string;
  options: { text: string; score: number }[];
}

export interface AccessibilitySettings {
  highContrast: boolean;
  fontSizeMultiplier: number; // 1.0, 1.15, 1.3
  dyslexicFont: boolean;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning';
  title: string;
  message: string;
}

export interface UserProfile {
  name: string;
  email: string;
  role: string;
  childAge?: string;
  location: string;
  avatar: string;
  joinedDate: string;
  savedResourcesCount: number;
  completedGuidanceCount: number;
  communityPostsCount: number;
  contributionsTotal: number;
}

export type ActivityCategory =
  | 'COMMUNICATION'
  | 'SOCIAL_SKILLS'
  | 'MOTOR_SKILLS'
  | 'LEARNING'
  | 'SENSORY'
  | 'SPEECH'
  | 'CREATIVITY'
  | 'MEMORY'
  | 'SORTING'
  | 'MATCHING'
  | 'INDOOR'
  | 'OUTDOOR';

export type ActivityDifficulty = 'EASY' | 'MEDIUM' | 'HARD';

export interface ActivityItem {
  activityId?: number | string;
  title: string;
  description: string;
  imageUrl?: string;
  difficulty: ActivityDifficulty;
  durationMinutes?: number | null;
  ageGroup?: string;
  materialsNeeded?: string;
  benefits?: string;
  instructions?: string;
  youtubeLink?: string;
  instagramLink?: string;
  category: ActivityCategory;
  recommendationReason?: string;
  createdAt?: string;
}

export interface AssessmentScores {
  comm: number;
  social: number;
  daily: number;
}

