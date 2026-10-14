import React, { useState, useEffect } from 'react';
import { PageView, LanguageCode, AccessibilitySettings, ToastMessage, ResourceItem, CampaignItem, AssessmentScores } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { AuthModal } from './components/AuthModal';
import { AccessibilityModal } from './components/AccessibilityModal';
import { ResourceDetailModal } from './components/ResourceDetailModal';
import { DonationModal } from './components/DonationModal';

import { LandingPage } from './pages/LandingPage';
import { EarlyGuidancePage } from './pages/EarlyGuidancePage';
import { ActivitiesPage } from './pages/ActivitiesPage';
import { CommunityPage } from './pages/CommunityPage';
import { FundraisingPage } from './pages/FundraisingPage';
import { ResourceLibraryPage } from './pages/ResourceLibraryPage';
import { DashboardPage } from './pages/DashboardPage';
import { mockCampaigns } from './data/mockData';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<PageView>('home');
  const [currentLang, setCurrentLang] = useState<LanguageCode>('en');
  const [userLoggedIn, setUserLoggedIn] = useState(true);
  const [userName, setUserName] = useState('Ananya Sharma');

  const [accessibility, setAccessibility] = useState<AccessibilitySettings>({
    highContrast: false,
    fontSizeMultiplier: 1.0,
    dyslexicFont: false,
  });

  const [toast, setToast] = useState<ToastMessage | null>(null);

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [accessibilityModalOpen, setAccessibilityModalOpen] = useState(false);
  const [detailModalResource, setDetailModalResource] = useState<ResourceItem | null>(null);
  const [donateModalCampaign, setDonateModalCampaign] = useState<CampaignItem | null>(null);
  const [assessmentScores, setAssessmentScores] = useState<AssessmentScores | null>(null);

  const showToast = (title: string, message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    setToast({ id: `toast-${Date.now()}`, type, title, message });
  };

  const handleLanguageChange = (lang: LanguageCode) => {
    setCurrentLang(lang);
  };

  const handleNavigateToActivities = (scores: AssessmentScores) => {
    setAssessmentScores(scores);
    setCurrentView('activities');
    showToast('Redirected to Activities 🎯', 'Personalized activities loaded from your assessment score.');
  };

  const handleLoginSuccess = (name: string) => {
    setUserName(name);
    setUserLoggedIn(true);
    showToast('Welcome to Autism Connect 👋', `Signed in as ${name}`);
  };

  const handleDonationSuccess = (campaignId: string, amount: number) => {
    const camp = mockCampaigns.find((c) => c.id === campaignId);
    if (camp) {
      camp.raised += amount;
      camp.supporters += 1;
    }
    showToast('Thank You for Supporting ❤️', `Your contribution of ₹${amount.toLocaleString('en-IN')} was processed.`);
  };

  // Apply root accessibility classes & font scaling
  useEffect(() => {
    const root = document.documentElement;
    if (accessibility.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    if (accessibility.dyslexicFont) {
      document.body.classList.add('font-dyslexic');
    } else {
      document.body.classList.remove('font-dyslexic');
    }

    root.style.fontSize = `${accessibility.fontSizeMultiplier * 100}%`;
  }, [accessibility]);

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-purple-200 selection:text-purple-900 transition-colors duration-300">
      
      {/* Sticky Top Navbar */}
      <Navbar
        currentView={currentView}
        onNavigate={setCurrentView}
        currentLang={currentLang}
        onLanguageChange={handleLanguageChange}
        onOpenAuth={() => setAuthModalOpen(true)}
        onOpenAccessibility={() => setAccessibilityModalOpen(true)}
        userLoggedIn={userLoggedIn}
        userName={userName}
      />

      {/* Main Page View Content */}
      <main className="flex-1">
        {currentView === 'home' && (
          <LandingPage
            onNavigate={setCurrentView}
            currentLang={currentLang}
            onLanguageChange={handleLanguageChange}
            onOpenDetailModal={setDetailModalResource}
            onOpenDonateModal={setDonateModalCampaign}
            onShowToast={showToast}
          />
        )}

        {currentView === 'guidance' && (
          <EarlyGuidancePage
            onNavigate={setCurrentView}
            onShowToast={showToast}
            onNavigateToActivities={handleNavigateToActivities}
          />
        )}

        {currentView === 'activities' && (
          <ActivitiesPage
            onNavigate={setCurrentView}
            onShowToast={showToast}
            assessmentScores={assessmentScores}
          />
        )}

        {currentView === 'community' && (
          <CommunityPage
            onNavigate={setCurrentView}
            onShowToast={showToast}
          />
        )}

        {currentView === 'fundraising' && (
          <FundraisingPage
            onNavigate={setCurrentView}
            onOpenDonateModal={setDonateModalCampaign}
            onShowToast={showToast}
          />
        )}

        {currentView === 'resources' && (
          <ResourceLibraryPage
            onNavigate={setCurrentView}
            onOpenDetailModal={setDetailModalResource}
            onShowToast={showToast}
          />
        )}

        {currentView === 'dashboard' && (
          <DashboardPage
            onNavigate={setCurrentView}
            userName={userName}
            onOpenDetailModal={setDetailModalResource}
            onOpenDonateModal={setDonateModalCampaign}
            onShowToast={showToast}
          />
        )}
      </main>

      {/* Global Footer */}
      <Footer onNavigate={setCurrentView} />

      {/* Global Modals & Overlays */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      <AccessibilityModal
        isOpen={accessibilityModalOpen}
        onClose={() => setAccessibilityModalOpen(false)}
        settings={accessibility}
        onUpdateSettings={(newSet) => setAccessibility({ ...accessibility, ...newSet })}
      />

      <ResourceDetailModal
        resource={detailModalResource}
        onClose={() => setDetailModalResource(null)}
        onNavigate={setCurrentView}
        onShowToast={showToast}
      />

      <DonationModal
        campaign={donateModalCampaign}
        onClose={() => setDonateModalCampaign(null)}
        onDonationSuccess={handleDonationSuccess}
      />

      {/* Toast Notification Handler */}
      <Toast toast={toast} onClose={() => setToast(null)} />

    </div>
  );
};

export default App;
