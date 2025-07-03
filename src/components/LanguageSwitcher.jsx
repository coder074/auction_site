import React, { useState } from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext.jsx';

export function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const { currentLanguage, setLanguage, availableLanguages } = useLanguage();

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm font-medium">{currentLanguage.flag}</span>
        <span className="text-sm font-medium hidden sm:block">{currentLanguage.name}</span>
        <ChevronDown className="w-4 h-4" />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
            {availableLanguages.map((language) => (
              <button
                key={language.code}
                onClick={() => {
                  setLanguage(language);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors flex items-center space-x-3 ${
                  currentLanguage.code === language.code ? 'bg-gray-50' : ''
                }`}
              >
                <span className="text-lg">{language.flag}</span>
                <span className="text-sm font-medium">{language.name}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}