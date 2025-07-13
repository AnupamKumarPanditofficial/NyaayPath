import React, { useState, useEffect, useRef } from 'react';
import { Scale, Menu, X, Sun, Moon } from 'lucide-react';
import ApplicationForm from './ApplicationForm';
import { useTranslation } from 'react-i18next';

interface NavigationProps {
  onTriggerAdminLogin?: () => void;
}

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'bn', label: 'বাংলা' },
  { code: 'mr', label: 'मराठी' },
  { code: 'te', label: 'తెలుగు' },
  { code: 'ta', label: 'தமிழ்' },
  { code: 'ml', label: 'മലയാളം' },
  { code: 'or', label: 'ଓଡ଼ିଆ' },
];

const Navigation: React.FC<NavigationProps> = ({ onTriggerAdminLogin }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [logoClickCount, setLogoClickCount] = useState(0);
  const logoClickTimer = useRef<number | null>(null);
  const { i18n } = useTranslation();
  const [showLangs, setShowLangs] = useState(false);
  const currentLang = i18n.language || 'en';
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const handleLogoClick = () => {
    setLogoClickCount((prev) => {
      if (prev === 0 && logoClickTimer.current) {
        clearTimeout(logoClickTimer.current);
      }
      if (prev === 0) {
        logoClickTimer.current = setTimeout(() => {
          setLogoClickCount(0);
        }, 10000);
      }
      if (prev + 1 === 10) {
        if (onTriggerAdminLogin) onTriggerAdminLogin();
        setTimeout(() => setLogoClickCount(0), 200);
        if (logoClickTimer.current) clearTimeout(logoClickTimer.current);
        return 0;
      }
      return prev + 1;
    });
  };

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg py-3 border-b border-gray-200 dark:border-gray-800' 
          : 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm py-4 shadow-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2 cursor-pointer" onClick={handleLogoClick}>
              <Scale className="w-7 h-7 sm:w-8 sm:h-8 text-deep-blue dark:text-accent-orange" />
              <span className="text-xl sm:text-2xl font-bold text-deep-blue dark:text-accent-orange select-none">NyaayPath</span>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection('hero')}
                className="text-gray-700 dark:text-gray-100 hover:text-deep-blue dark:hover:text-accent-orange transition-colors font-medium"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('how-it-works')}
                className="text-gray-700 dark:text-gray-100 hover:text-deep-blue dark:hover:text-accent-orange transition-colors font-medium"
              >
                How It Works
              </button>
              <button
                onClick={() => scrollToSection('dashboard')}
                className="text-gray-700 dark:text-gray-100 hover:text-deep-blue dark:hover:text-accent-orange transition-colors font-medium"
              >
                Dashboard
              </button>
              <button
                onClick={() => scrollToSection('footer')}
                className="text-gray-700 dark:text-gray-100 hover:text-deep-blue dark:hover:text-accent-orange transition-colors font-medium"
              >
                Contact
              </button>
            </div>

            {/* Desktop Action Buttons */}
            <div className="hidden sm:flex items-center space-x-3">
              <button
                onClick={() => scrollToSection('track-search')}
                className="border border-deep-blue dark:border-accent-orange text-deep-blue dark:text-accent-orange px-3 py-2 lg:px-4 lg:py-2 rounded-lg hover:bg-deep-blue hover:text-white dark:hover:bg-accent-orange dark:hover:text-white transition-all duration-300 font-medium text-sm lg:text-base"
              >
                Track App
              </button>
              <button 
                onClick={() => setIsFormOpen(true)}
                className="bg-accent-orange text-white px-4 py-2 lg:px-6 lg:py-2 rounded-lg glow-button font-medium text-sm lg:text-base hover:bg-orange-600 dark:bg-accent-orange dark:text-white dark:hover:bg-orange-500"
              >
                Apply Now
              </button>
              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className="ml-2 p-2 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle dark mode"
              >
                {theme === 'dark' ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-700" />}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-deep-blue" />
              ) : (
                <Menu className="w-6 h-6 text-deep-blue" />
              )}
            </button>

            {/* Language Switcher */}
            <div className="relative ml-4">
              <button
                className="px-3 py-2 rounded bg-blue-100 text-deep-blue font-semibold hover:bg-blue-200 transition"
                onClick={() => setShowLangs(v => !v)}
              >
                {LANGUAGES.find(l => l.code === currentLang)?.label || 'Language'}
              </button>
              {showLangs && (
                <div className="absolute right-0 mt-2 bg-white rounded shadow-lg z-50 min-w-[120px]">
                  {LANGUAGES.map(lang => (
                    <button
                      key={lang.code}
                      className={`block w-full text-left px-4 py-2 hover:bg-blue-50 ${currentLang === lang.code ? 'font-bold text-accent-orange' : ''}`}
                      onClick={() => {
                        i18n.changeLanguage(lang.code);
                        localStorage.setItem('lang', lang.code);
                        setShowLangs(false);
                      }}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden mt-4 pb-4 border-t border-gray-200">
              <div className="flex flex-col space-y-3 pt-4">
                <button
                  onClick={() => scrollToSection('hero')}
                  className="text-left text-gray-700 hover:text-deep-blue transition-colors font-medium py-2"
                >
                  Home
                </button>
                <button
                  onClick={() => scrollToSection('how-it-works')}
                  className="text-left text-gray-700 hover:text-deep-blue transition-colors font-medium py-2"
                >
                  How It Works
                </button>
                <button
                  onClick={() => scrollToSection('dashboard')}
                  className="text-left text-gray-700 hover:text-deep-blue transition-colors font-medium py-2"
                >
                  Dashboard
                </button>
                <button
                  onClick={() => scrollToSection('footer')}
                  className="text-left text-gray-700 hover:text-deep-blue transition-colors font-medium py-2"
                >
                  Contact
                </button>
                
                {/* Mobile Action Buttons */}
                <div className="flex flex-col space-y-3 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => scrollToSection('track-search')}
                    className="border border-deep-blue text-deep-blue px-4 py-3 rounded-lg hover:bg-deep-blue hover:text-white transition-all duration-300 font-medium text-center"
                  >
                    Track Application
                  </button>
                  <button 
                    onClick={() => setIsFormOpen(true)}
                    className="bg-accent-orange text-white px-4 py-3 rounded-lg glow-button font-medium text-center"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      <ApplicationForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </>
  );
};

export default Navigation;