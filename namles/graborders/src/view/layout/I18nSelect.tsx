import React from 'react';
import { getLanguages, getLanguageCode } from '../../i18n';
import actions from 'src/modules/layout/layoutActions';

function I18nSelect() {
  const doChangeLanguage = (language) => {
    actions.doChangeLanguage(language);
  };

  return (
    <div className="i18n-container">
      <div className="language-header">
        <i className="fa-solid fa-language"></i>
        <h2>Select Language</h2>
        <p>Choose your preferred language</p>
      </div>

      <div className="languages-grid">
        {getLanguages().map((language) => (
          <div
            key={language.id}
            onClick={() => doChangeLanguage(language.id)}
            className={`language-card ${
              getLanguageCode() === language.id ? 'active' : ''
            }`}
          >
            <div className="language-flag">
              <img src={language.flag} alt={language.label} />
            </div>
            <div className="language-info">
              <span className="language-name">{language.label}</span>
              <span className="language-native">
                {language.nativeName || language.label}
              </span>
            </div>
            {getLanguageCode() === language.id && (
              <div className="selected-indicator">
                <i className="fa-solid fa-check"></i>
              </div>
            )}
          </div>
        ))}
      </div>

      <style>{`
        .i18n-container {
          max-width: 440px;
          margin: 0 auto;
          padding: 20px;
          background: #FFFFFF;
          min-height: 100vh;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .language-header {
          text-align: center;
          margin-bottom: 30px;
          padding: 20px 0;
        }

        .language-header i {
          font-size: 48px;
          color: #4299E1;
          margin-bottom: 15px;
          display: block;
        }

        .language-header h2 {
          font-size: 24px;
          font-weight: 700;
          color: #1A202C;
          margin: 0 0 8px 0;
        }

        .language-header p {
          font-size: 14px;
          color: #718096;
          margin: 0;
        }

        .languages-grid {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .language-card {
          display: flex;
          align-items: center;
          padding: 16px 20px;
          background: #F7FAFC;
          border: 2px solid #E2E8F0;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .language-card:hover {
          transform: translateY(-2px);
          border-color: #4299E1;
          box-shadow: 0 8px 25px rgba(66, 153, 225, 0.15);
        }

        .language-card.active {
          background: linear-gradient(135deg, #4299E1 0%, #3182CE 100%);
          border-color: #4299E1;
          color: white;
        }

        .language-card.active::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, #48BB78, #4299E1);
        }

        .language-flag {
          width: 44px;
          height: 44px;
          border-radius: 8px;
          overflow: hidden;
          margin-right: 16px;
          border: 2px solid #E2E8F0;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          flex-shrink: 0;
        }

        .language-card.active .language-flag {
          border-color: rgba(255, 255, 255, 0.3);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .language-flag img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .language-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .language-name {
          font-size: 16px;
          font-weight: 600;
          color: #2D3748;
        }

        .language-native {
          font-size: 13px;
          color: #718096;
          font-weight: 500;
        }

        .language-card.active .language-name,
        .language-card.active .language-native {
          color: white;
        }

        .selected-indicator {
          width: 24px;
          height: 24px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: 12px;
          flex-shrink: 0;
        }

        .selected-indicator i {
          font-size: 12px;
          color: white;
        }

        /* Loading animation for language change */
        .language-card.loading {
          pointer-events: none;
          opacity: 0.7;
        }

        .language-card.loading::after {
          content: '';
          position: absolute;
          top: 50%;
          right: 20px;
          width: 16px;
          height: 16px;
          border: 2px solid transparent;
          border-top: 2px solid #4299E1;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: translateY(-50%) rotate(0deg); }
          100% { transform: translateY(-50%) rotate(360deg); }
        }

        /* Responsive Design */
        @media (max-width: 480px) {
          .i18n-container {
            padding: 16px;
          }
          
          .language-header {
            margin-bottom: 24px;
          }
          
          .language-header i {
            font-size: 40px;
          }
          
          .language-header h2 {
            font-size: 20px;
          }
          
          .language-card {
            padding: 14px 16px;
          }
          
          .language-flag {
            width: 40px;
            height: 40px;
            margin-right: 14px;
          }
        }

        @media (max-width: 360px) {
          .language-card {
            padding: 12px 14px;
          }
          
          .language-flag {
            width: 36px;
            height: 36px;
            margin-right: 12px;
          }
          
          .language-name {
            font-size: 15px;
          }
          
          .language-native {
            font-size: 12px;
          }
        }

        /* Dark mode support */
        @media (prefers-color-scheme: dark) {
          .i18n-container {
            background: #1A202C;
          }
          
          .language-header h2 {
            color: #F7FAFC;
          }
          
          .language-header p {
            color: #A0AEC0;
          }
          
          .language-card:not(.active) {
            background: #2D3748;
            border-color: #4A5568;
          }
          
          .language-card:not(.active) .language-name {
            color: #E2E8F0;
          }
          
          .language-card:not(.active) .language-native {
            color: #A0AEC0;
          }
        }
      `}</style>
    </div>
  );
}

export default I18nSelect;