import React from 'react';
import { PageView, LanguageCode, ResourceItem, CampaignItem } from '../types';
import { Hero } from '../components/Hero';
import { TrustStats } from '../components/TrustStats';
import { BentoGrid } from '../components/BentoGrid';
import { EarlyGuidancePreview } from '../components/EarlyGuidancePreview';
import { MultilingualSection } from '../components/MultilingualSection';
import { CommunityPreview } from '../components/CommunityPreview';
import { FundraisingPreview } from '../components/FundraisingPreview';
import { ResourceLibraryPreview } from '../components/ResourceLibraryPreview';

interface LandingPageProps {
  onNavigate: (view: PageView) => void;
  currentLang: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
  onOpenDetailModal: (resource: ResourceItem) => void;
  onOpenDonateModal: (campaign: CampaignItem) => void;
  onShowToast: (title: string, message: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onNavigate,
  currentLang,
  onLanguageChange,
  onOpenDetailModal,
  onOpenDonateModal,
  onShowToast,
}) => {
  return (
    <div className="space-y-0 animate-fade-in">
      <Hero onNavigate={onNavigate} currentLang={currentLang} />
      <TrustStats />
      <BentoGrid onNavigate={onNavigate} currentLang={currentLang} />
      <EarlyGuidancePreview onNavigate={onNavigate} currentLang={currentLang} />
      <MultilingualSection
        currentLang={currentLang}
        onLanguageChange={onLanguageChange}
        onShowToast={onShowToast}
      />
      <CommunityPreview
        onNavigate={onNavigate}
        currentLang={currentLang}
        onShowToast={onShowToast}
      />
      <FundraisingPreview
        onNavigate={onNavigate}
        currentLang={currentLang}
        onOpenDonateModal={onOpenDonateModal}
      />
      <ResourceLibraryPreview
        onNavigate={onNavigate}
        currentLang={currentLang}
        onOpenDetailModal={onOpenDetailModal}
        onShowToast={onShowToast}
      />
    </div>
  );
};
