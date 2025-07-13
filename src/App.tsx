import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import TrackSearch from './components/TrackSearch';
import ProblemSection from './components/ProblemSection';
import HowItWorks from './components/HowItWorks';
import Dashboard from './components/Dashboard';
import DeveloperSection from './components/DeveloperSection';
import DigitalIndiaSection from './components/DigitalIndiaSection';
import Footer from './components/Footer';
import LanguageModal from './components/LanguageModal';
import './i18n';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminRoutes from './admin/AdminRoutes';

function MainHomePage() {
  return (
    <>
      <Navigation />
      <Hero />
      <TrackSearch />
      <ProblemSection />
      <HowItWorks />
      <Dashboard />
      <DeveloperSection />
      <DigitalIndiaSection />
      <Footer />
    </>
  );
}

function AppRoutes() {
  const [showLangModal, setShowLangModal] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem('lang');
    if (!savedLang) {
      setShowLangModal(true);
    } else {
      i18n.changeLanguage(savedLang);
    }
  }, []);

  const handleSelectLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('lang', lang);
    setShowLangModal(false);
  };

  return (
    <div className="scroll-smooth">
      {showLangModal && (
        <LanguageModal onSelect={handleSelectLanguage} />
      )}
      <Routes>
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/*" element={<MainHomePage />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <Router>
        <AppRoutes />
      </Router>
    </I18nextProvider>
  );
}

export default App;