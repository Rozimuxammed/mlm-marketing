import React, { useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

const LanguageSelector: React.FC = () => {
  const { currentLanguage, changeLanguage, languages } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const currentLang = languages.find((lang) => lang.code === currentLanguage);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-[60px] px-4 py-1 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 dark:text-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-lg transition-colors"
      >
        <div className="flex items-center justify-center space-x-2">
          <span className="text-lg">{currentLang?.flag}</span>
        </div>
        <ChevronDown
          className={`transform transition-transform dark:text-slate-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          size={16}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-[100] max-h-64 overflow-y-auto">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => {
                changeLanguage(language.code);
                setIsOpen(false);
              }}
              className="flex w-full items-center justify-between px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors first:rounded-t-lg last:rounded-b-lg"
            >
              <div className="flex items-center space-x-2">
                <span className="text-lg">{language.flag}</span>
                <span>{language.name}</span>
              </div>
              {currentLanguage === language.code && (
                <Check className="text-blue-600 dark:text-blue-400" size={16} />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;