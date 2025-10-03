import React, { useState } from "react";
import SubHeader from "src/view/shared/Header/SubHeader";

function LanguagePage() {
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [searchTerm, setSearchTerm] = useState("");

  const languages = [
    {
      code: "en",
      name: "English",
      nativeName: "English",
      flag: "🇺🇸"
    },
    {
      code: "fr",
      name: "French", 
      nativeName: "Français",
      flag: "🇫🇷"
    },
    {
      code: "ru",
      name: "Russian",
      nativeName: "Русский",
      flag: "🇷🇺"
    },
    {
      code: "de",
      name: "German",
      nativeName: "Deutsch", 
      flag: "🇩🇪"
    },
    {
      code: "es",
      name: "Spanish",
      nativeName: "Español",
      flag: "🇪🇸"
    }
  ];

  const filteredLanguages = languages.filter(language =>
    language.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    language.nativeName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language.name);
    // Here you would typically dispatch an action to change the app language
    console.log(`App language changed to: ${language.name}`);
  };

  return (
    <div className="language-page-container">
      <SubHeader title="App Language" path="/profile" />

      {/* Current Language Display */}
      <div className="current-language-section">
        <div className="current-language-card">
          <div className="current-language-content">
            <div className="current-language-flag">{
              languages.find(lang => lang.name === selectedLanguage)?.flag || "🇺🇸"
            }</div>
            <div className="current-language-info">
              <div className="current-language-label">Current Language</div>
              <div className="current-language-name">{selectedLanguage}</div>
            </div>
            <div className="current-language-check">
              <i className="fa-solid fa-check"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="search-section">
        <div className="search-container">
          <i className="fa-solid fa-magnifying-glass search-icon"></i>
          <input
            type="text"
            placeholder="Search languages..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button 
              className="clear-search"
              onClick={() => setSearchTerm("")}
            >
              <i className="fa-solid fa-times"></i>
            </button>
          )}
        </div>
      </div>

      {/* Language List */}
      <div className="languages-section">
        <div className="section-header">
          <h3 className="section-title">Available Languages</h3>
          <div className="languages-count">{filteredLanguages.length}</div>
        </div>

        <div className="languages-list">
          {filteredLanguages.map((language, index) => (
            <div
              key={language.code}
              className={`language-item ${selectedLanguage === language.name ? 'language-item-selected' : ''}`}
              onClick={() => handleLanguageSelect(language)}
            >
              <div className="language-flag">{language.flag}</div>
              
              <div className="language-content">
                <div className="language-name">{language.name}</div>
                <div className="language-native">{language.nativeName}</div>
              </div>

              <div className="language-selector">
                {selectedLanguage === language.name ? (
                  <div className="language-selected">
                    <i className="fa-solid fa-check-circle"></i>
                  </div>
                ) : (
                  <div className="language-unselected"></div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* No Results State */}
        {filteredLanguages.length === 0 && (
          <div className="no-results">
            <i className="fa-solid fa-language no-results-icon"></i>
            <div className="no-results-title">No languages found</div>
            <div className="no-results-description">
              Try searching with different terms
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .language-page-container {
          max-width: 440px;
          margin: 0 auto;
          background: #F8FAFC;
          min-height: 100vh;
          color: #1E293B;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          padding-bottom: 20px;
        }

        /* Current Language Section */
        .current-language-section {
          padding: 20px 20px 16px;
        }

        .current-language-card {
          background: white;
          padding: 20px;
          border-radius: 16px;
          border: 2px solid #E2E8F0;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        .current-language-content {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .current-language-flag {
          font-size: 32px;
          width: 60px;
          height: 60px;
          background: #F1F5F9;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .current-language-info {
          flex: 1;
        }

        .current-language-label {
          font-size: 14px;
          color: #64748B;
          margin-bottom: 4px;
          font-weight: 500;
        }

        .current-language-name {
          font-size: 18px;
          font-weight: 600;
          color: #1E293B;
        }

        .current-language-check {
          color: #10B981;
          font-size: 20px;
        }

        /* Search Section */
        .search-section {
          padding: 0 20px 20px;
        }

        .search-container {
          position: relative;
          background: white;
          border-radius: 12px;
          border: 1px solid #E2E8F0;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
          overflow: hidden;
          display: flex;
          align-items: center;
        }

        .search-icon {
          position: absolute;
          left: 16px;
          color: #64748B;
          font-size: 16px;
        }

        .search-input {
          width: 100%;
          padding: 16px 48px 16px 44px;
          border: none;
          outline: none;
          background: transparent;
          font-size: 16px;
          color: #1E293B;
          font-weight: 500;
        }

        .search-input::placeholder {
          color: #94A3B8;
        }

        .clear-search {
          position: absolute;
          right: 16px;
          background: #F1F5F9;
          border: none;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #64748B;
          cursor: pointer;
          font-size: 12px;
        }

        .clear-search:hover {
          background: #E2E8F0;
        }

        /* Languages Section */
        .languages-section {
          padding: 0 20px;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
          padding: 0 4px;
        }

        .section-title {
          font-size: 16px;
          font-weight: 600;
          color: #374151;
          margin: 0;
        }

        .languages-count {
          font-size: 14px;
          color: #6B7280;
          background: #F3F4F6;
          padding: 4px 12px;
          border-radius: 12px;
          font-weight: 500;
        }

        .languages-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .language-item {
          display: flex;
          align-items: center;
          gap: 16px;
          background: white;
          padding: 16px;
          border-radius: 12px;
          border: 1px solid #F1F5F9;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .language-item:hover {
          border-color: #3B82F6;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .language-item-selected {
          border-color: #10B981;
          background: #F0FDF4;
        }

        .language-flag {
          font-size: 24px;
          width: 48px;
          height: 48px;
          background: #F8FAFC;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          border: 1px solid #F1F5F9;
        }

        .language-content {
          flex: 1;
        }

        .language-name {
          font-size: 16px;
          font-weight: 600;
          color: #1E293B;
          margin-bottom: 2px;
        }

        .language-native {
          font-size: 14px;
          color: #64748B;
        }

        .language-selector {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
        }

        .language-selected {
          color: #10B981;
          font-size: 20px;
        }

        .language-unselected {
          width: 18px;
          height: 18px;
          border: 2px solid #D1D5DB;
          border-radius: 50%;
        }

        /* No Results State */
        .no-results {
          text-align: center;
          padding: 40px 20px;
          color: #64748B;
        }

        .no-results-icon {
          font-size: 48px;
          color: #CBD5E1;
          margin-bottom: 16px;
        }

        .no-results-title {
          font-size: 16px;
          font-weight: 600;
          color: #475569;
          margin-bottom: 8px;
        }

        .no-results-description {
          font-size: 14px;
          color: #94A3B8;
        }

        /* Responsive Design */
        @media (max-width: 480px) {
          .language-page-container {
            max-width: 100%;
          }
          
          .current-language-section,
          .search-section,
          .languages-section {
            padding: 16px;
          }
          
          .language-item {
            padding: 14px;
          }
          
          .current-language-card {
            padding: 16px;
          }
        }
      `}</style>
    </div>
  );
}

export default LanguagePage;