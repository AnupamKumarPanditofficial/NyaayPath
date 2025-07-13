import React from 'react';

const LANGUAGES = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'hi', label: 'हिन्दी', flag: '🇮🇳' },
  { code: 'bn', label: 'বাংলা', flag: '🇧🇩' },
  { code: 'mr', label: 'मराठी', flag: '🇮🇳' },
  { code: 'te', label: 'తెలుగు', flag: '🇮🇳' },
  { code: 'ta', label: 'தமிழ்', flag: '🇮🇳' },
  { code: 'ml', label: 'മലയാളം', flag: '🇮🇳' },
  { code: 'or', label: 'ଓଡ଼ିଆ', flag: '🇮🇳' },
];

const LanguageModal = ({ onSelect }: { onSelect: (lang: string) => void }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
        <h2 className="text-2xl font-bold mb-6 text-deep-blue">Select Your Language</h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          {LANGUAGES.map(lang => (
            <button
              key={lang.code}
              onClick={() => onSelect(lang.code)}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-gray-200 hover:bg-blue-50 transition-all text-lg font-semibold text-deep-blue w-full"
            >
              <span className="text-2xl">{lang.flag}</span>
              <span>{lang.label}</span>
            </button>
          ))}
        </div>
        <p className="text-gray-500 text-sm">You can change your language anytime from the menu.</p>
      </div>
    </div>
  );
};

export default LanguageModal; 