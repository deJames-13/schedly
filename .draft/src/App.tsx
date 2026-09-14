import React, { useState } from 'react';
import { ActiveScreen, ScheduleDocument, UserProfile } from './types';
import { INITIAL_DOCUMENTS, INITIAL_USER, PRESET_SAMPLE_TEMPLATES } from './data/mockData';
import { Header } from './components/Header';
import { LandingPage } from './components/LandingPage';
import { OnboardingPage } from './components/OnboardingPage';
import { UploadPage } from './components/UploadPage';
import { TransformedScheduleView } from './components/TransformedScheduleView';
import { HistoryPage } from './components/HistoryPage';
import { ProfilePage } from './components/ProfilePage';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<ActiveScreen>('landing');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);
  const [documents, setDocuments] = useState<ScheduleDocument[]>(INITIAL_DOCUMENTS);
  const [currentDocument, setCurrentDocument] = useState<ScheduleDocument>(INITIAL_DOCUMENTS[0]);

  // Handlers
  const handleGetStarted = () => {
    setActiveScreen('upload');
  };

  const handleOpenAuth = () => {
    setActiveScreen('auth');
  };

  const handleAuthSuccess = (userData?: { name: string; email: string }) => {
    setIsAuthenticated(true);
    if (userData) {
      setUser((prev) => ({
        ...prev,
        name: userData.name || prev.name,
        email: userData.email || prev.email,
      }));
    }
    setActiveScreen('upload');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setActiveScreen('landing');
  };

  const handleScheduleParsed = (newDoc: ScheduleDocument) => {
    setDocuments((prev) => [newDoc, ...prev]);
    setCurrentDocument(newDoc);
    setUser((prev) => ({
      ...prev,
      subscription: {
        ...prev.subscription,
        parsedCount: prev.subscription.parsedCount + 1,
      },
    }));
    setActiveScreen('schedule_view');
  };

  const handleSelectSamplePreset = (presetId: string) => {
    const preset = PRESET_SAMPLE_TEMPLATES.find((p) => p.id === presetId);
    if (preset) {
      const doc: ScheduleDocument = {
        id: `preset-doc-${Date.now()}`,
        title: preset.title.split('(')[0].trim(),
        uploadedAt: new Date().toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }),
        sourceImageName: preset.previewName,
        sourceImageUrl: preset.sampleFilePreview,
        entriesCount: preset.entries.length,
        entries: preset.entries,
        status: 'processed',
      };
      setDocuments((prev) => [doc, ...prev]);
      setCurrentDocument(doc);
      setActiveScreen('schedule_view');
    }
  };

  const handleSaveSchedule = (updatedDoc: ScheduleDocument) => {
    setCurrentDocument(updatedDoc);
    setDocuments((prev) =>
      prev.map((d) => (d.id === updatedDoc.id ? updatedDoc : d))
    );
  };

  const handleOpenDocumentFromHistory = (doc: ScheduleDocument) => {
    setCurrentDocument(doc);
    setActiveScreen('schedule_view');
  };

  const handleDeleteDocument = (docId: string) => {
    setDocuments((prev) => prev.filter((d) => d.id !== docId));
  };

  return (
    <div id="schedly-app-root" className="min-h-screen flex flex-col bg-[#F8FAFC]">
      {/* Universal Header */}
      <Header
        activeScreen={activeScreen}
        setActiveScreen={setActiveScreen}
        isAuthenticated={isAuthenticated}
        onLogout={handleLogout}
        entriesCount={currentDocument?.entries?.length}
      />

      {/* Screen Views */}
      <main className="flex-1">
        {activeScreen === 'landing' && (
          <LandingPage
            onGetStarted={handleGetStarted}
            onOpenAuth={handleOpenAuth}
            onSelectSamplePreset={handleSelectSamplePreset}
          />
        )}

        {activeScreen === 'auth' && (
          <OnboardingPage
            onSuccessAuth={handleAuthSuccess}
            onCancel={() => setActiveScreen('landing')}
          />
        )}

        {activeScreen === 'upload' && (
          <UploadPage
            onScheduleParsed={handleScheduleParsed}
            onNavigateHistory={() => setActiveScreen('history')}
          />
        )}

        {activeScreen === 'schedule_view' && currentDocument && (
          <TransformedScheduleView
            document={currentDocument}
            onSaveSchedule={handleSaveSchedule}
            onUploadAnother={() => setActiveScreen('upload')}
          />
        )}

        {activeScreen === 'history' && (
          <HistoryPage
            documents={documents}
            onOpenDocument={handleOpenDocumentFromHistory}
            onDeleteDocument={handleDeleteDocument}
            onNavigateUpload={() => setActiveScreen('upload')}
          />
        )}

        {activeScreen === 'profile' && (
          <ProfilePage
            user={user}
            onUpdateUser={setUser}
            onLogout={handleLogout}
          />
        )}
      </main>
    </div>
  );
}
