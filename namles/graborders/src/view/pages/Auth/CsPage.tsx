import React, { useState, useEffect } from 'react';
import categoryService from 'src/modules/category/categoryService';
import { i18n } from "../../../i18n";

function CsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [response, setResponse] = useState([]);

  const fetchCsInfo = async () => {
    try {
      const response = await categoryService.listCs();
      setResponse(response.rows);
    } catch (error) {
      console.error('Error fetching Customer Support Info:', error);
    }
  };

  useEffect(() => {
    fetchCsInfo();
  }, []);

  const handleCsIconClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleContactClick = (cs) => {
    const number = cs.number.replace(/\D/g, ''); // Remove non-numeric characters
    const message = "Hello, I need help with...";

    if (cs.type.toLowerCase() === 'whatsapp') {
      // WhatsApp URL
      window.open(`https://wa.me/${number}?text=${encodeURIComponent(message)}`, '_blank');
    } else if (cs.type.toLowerCase() === 'telegram') {
      // Telegram URL
      window.open(`https://t.me/${number}`, '_blank');
    }

    closeModal();
  };

  const getPlatformIcon = (type) => {
    const platform = type.toLowerCase();
    if (platform === 'whatsapp') {
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893c0-3.18-1.24-6.169-3.495-8.418" />
        </svg>
      );
    } else if (platform === 'telegram') {
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.197l-1.84 8.576c-.129.578-.466.723-.945.449l-2.61-1.92-1.26 1.214c-.139.139-.257.257-.537.257l.188-2.668 4.838-4.371c.211-.188-.046-.292-.327-.104l-5.978 3.767-2.576-.803c-.551-.172-.562-.551.117-.813l10.017-3.858c.458-.165.858.112.709.813z" />
        </svg>
      );
    }
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" />
      </svg>
    );
  };

  const getPlatformName = (type) => {
    const platform = type.toLowerCase();
    if (platform === 'whatsapp') {
      return i18n('pages.csPage.platformNames.whatsapp');
    } else if (platform === 'telegram') {
      return i18n('pages.csPage.platformNames.telegram');
    }
    return type;
  };

  return (
    <div className="cs-page-container">
      {/* Support Icon in bottom right */}
      <div className="cs-icon-container" onClick={handleCsIconClick}>
        <div className="cs-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 12h-2v-2h2v2zm0-4h-2V6h2v4z" />
          </svg>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title-section">
                <div className="modal-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="#667eea">
                    <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 12h-2v-2h2v2zm0-4h-2V6h2v4z" />
                  </svg>
                </div>
                <div>
                  <h4 className="modal-title">{i18n('pages.csPage.customerSupport')}</h4>
                  <p className="modal-subtitle">{i18n('pages.csPage.hereToHelp')}</p>
                </div>
              </div>
              <button className="close-button" onClick={closeModal}>×</button>
            </div>

            <div className="modal-body">
              <p className="modal-text">{i18n('pages.csPage.howCanWeHelp')}</p>
              <div className="contact-options">
                {response && response.map((cs, index) => (
                  <div
                    key={index}
                    className={`contact-option ${cs.type.toLowerCase()}`}
                    onClick={() => handleContactClick(cs)}
                  >
                    <div className="contact-avatar">
                      {cs?.photo[0]?.downloadUrl ? (
                        <img
                          src={cs.photo[0].downloadUrl}
                          alt="Support Agent"
                          className="avatar-image"
                        />
                      ) : (
                        <div className="avatar-placeholder">
                          {getPlatformIcon(cs.type)}
                        </div>
                      )}
                    </div>
                    <div className="contact-info">
                      <span className="contact-platform">
                        {getPlatformIcon(cs.type)}
                        {getPlatformName(cs.type)}
                      </span>
                      <span className="contact-number">{cs.number}</span>
                    </div>
                    <div className="contact-arrow">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="#666">
                        <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}


      <style>{`
        .cs-page-container {
          position: relative;
        }

        .cs-icon-container {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 1000;
          cursor: pointer;
        }

        .cs-icon {
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
          cursor: pointer;
          transition: all 0.3s ease;
          border: 3px solid white;
        }

        .cs-icon:hover {
          transform: scale(1.1);
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.6);
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          backdrop-filter: blur(4px);
        }

        .modal-content {
          background: white;
          border-radius: 16px;
          padding: 0;
          width: 90%;
          max-width: 420px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          animation: modalAppear 0.3s ease-out;
          overflow: hidden;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding: 24px;
          background: linear-gradient(135deg, #f8f9ff 0%, #f0f2ff 100%);
          border-bottom: 1px solid #e8ecef;
        }

        .modal-title-section {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .modal-icon {
          width: 40px;
          height: 40px;
        //   background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .modal-title {
          margin: 0;
          font-size: 20px;
          font-weight: 700;
          color: #2d3748;
          line-height: 1.2;
        }

        .modal-subtitle {
          margin: 4px 0 0 0;
          font-size: 14px;
          color: #718096;
          font-weight: 500;
        }

        .close-button {
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          color: #a0aec0;
          padding: 4px;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .close-button:hover {
          background-color: #edf2f7;
          color: #4a5568;
        }

        .modal-body {
          padding: 24px;
        }

        .modal-text {
          margin: 0 0 20px 0;
          font-size: 16px;
          color: #4a5568;
          text-align: center;
          font-weight: 500;
        }

        .contact-options {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .contact-option {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px;
          border-radius: 12px;
          background: #f8f9fa;
          transition: all 0.3s ease;
          cursor: pointer;
          border: 1px solid transparent;
        }

        .contact-option:hover {
          background: white;
          border-color: #667eea;
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);
          transform: translateY(-2px);
        }

        .contact-option.whatsapp:hover {
          border-color: #25d366;
        }

        .contact-option.telegram:hover {
          border-color: #0088cc;
        }

        .contact-avatar {
          flex-shrink: 0;
        }

        .avatar-image {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          object-fit: cover;
        }

        .avatar-placeholder {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .contact-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .contact-platform {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 14px;
          font-weight: 600;
          color: #2d3748;
        }

        .contact-number {
          font-size: 13px;
          color: #718096;
          font-weight: 500;
        }

        .contact-arrow {
          color: #a0aec0;
          transition: transform 0.2s ease;
        }

        .contact-option:hover .contact-arrow {
          transform: translateX(2px);
          color: #667eea;
        }

        .contact-option.whatsapp:hover .contact-arrow {
          color: #25d366;
        }

        .contact-option.telegram:hover .contact-arrow {
          color: #0088cc;
        }

        @keyframes modalAppear {
          from {
            opacity: 0;
            transform: scale(0.8) translateY(-20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @media (max-width: 480px) {
          .cs-icon-container {
            bottom: 20px;
            right: 20px;
          }
          
          .cs-icon {
            width: 56px;
            height: 56px;
          }
          
          .modal-content {
            margin: 20px;
            width: calc(100% - 40px);
          }
          
          .modal-header,
          .modal-body {
            padding: 20px;
          }
        }
      `}</style>
    </div>
  );
}

export default CsPage;