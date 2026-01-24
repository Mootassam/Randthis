import React, { useEffect } from "react";
import "../styles/styles.css";
import { useSelector, useDispatch } from "react-redux";
import actions from "src/modules/category/list/categoryListActions";
import selector from "src/modules/category/list/categoryListSelectors";
import LoadingModal from "src/shared/LoadingModal";
import SubHeader from "src/view/shared/Header/SubHeader";
import { i18n } from "../../../i18n";
import { Link } from 'react-router-dom'
function Online() {
  const dispatch = useDispatch();

  const record = useSelector(selector.selectRows);
  const loading = useSelector(selector.selectLoading);

  useEffect(() => {
    dispatch(actions.doFetch());
    // eslint-disable-next-line
  }, [dispatch]);

  const handleLiveChatClick = () => {
    // navigate("/LiveChat");
  }; 

  return (
    <div className="customer-service-container">
      <SubHeader title={i18n('pages.online.title')} path="/" />

      {/* Live Chat Button */}
      <div className="live-chat-button-container">

        <Link to="/LiveChat" style={{
          textDecoration: 'none',
          color: 'inherit'
        }} >
          <button className="live-chat-button" onClick={handleLiveChatClick}>
            <div className="live-chat-icon">
              <i className="fa-solid fa-comment-dots"></i>
            </div>
            <div className="live-chat-text">
              <span className="live-chat-title">Live Chat Support</span>
              <span className="live-chat-subtitle">Get instant help from our team</span>
            </div>
            <div className="live-chat-arrow">
              <i className="fa-solid fa-arrow-right"></i>
            </div>
          </button>
        </Link>
      </div>

      <div className="service-description-card">
        <div className="description-content">
          <i className="fa-solid fa-comments description-icon"></i>
          <p className="description-text">
            {i18n('pages.online.description')}
          </p>
        </div>
      </div>

      <div className="support-agents-list">
        {loading && <LoadingModal />}
        {!loading && record && record.map((item, index) => (
          <div className="support-agent-card" key={index}>
            <div className="agent-header">
              <h3 className="agent-title">{item?.name}</h3>
              <div className={`platform-badge ${item.type}`}>
                {item.type === "whatsApp" ? (
                  <i className="fa-brands fa-whatsapp"></i>
                ) : (
                  <i className="fa-brands fa-telegram"></i>
                )}
              </div>
            </div>

            <div className="agent-profile">
              <img
                src={item?.photo[0]?.downloadUrl}
                alt={`${item?.name}`}
                className="agent-photo"
              />
              <div className="status-indicator"></div>
            </div>

            <div className="agent-actions">
              {item.type === "whatsApp" ? (
                <a
                  href={`https://wa.me/${item.number}`}
                  className="contact-button whatsapp-button"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa-brands fa-whatsapp button-icon"></i>
                  <span>{i18n('pages.online.contactWhatsApp')}</span>
                  <i className="fa-solid fa-external-link action-arrow"></i>
                </a>
              ) : (
                <a
                  href={`https://t.me/${item.number}`}
                  className="contact-button telegram-button"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa-brands fa-telegram button-icon"></i>
                  <span>{i18n('pages.online.contactTelegram')}</span>
                  <i className="fa-solid fa-external-link action-arrow"></i>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .customer-service-container {
          max-width: 1000px;
          margin: 0 auto;
          background: #EDF1F7;
          min-height: 100vh;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          padding-bottom: 20px;
        }

        /* Live Chat Button */
        .live-chat-button-container {
          padding: 0 20px;
          margin: 20px 0;
        }

        .live-chat-button {
          width: 100%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          border-radius: 16px;
          padding: 20px;
          display: flex;
          align-items: center;
          gap: 15px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.3);
          position: relative;
          overflow: hidden;
        }

        .live-chat-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s ease;
        }

        .live-chat-button:hover::before {
          left: 100%;
        }

        .live-chat-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
        }

        .live-chat-button:active {
          transform: translateY(-1px);
        }

        .live-chat-icon {
          width: 50px;
          height: 50px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          color: white;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .live-chat-text {
          flex: 1;
          text-align: left;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .live-chat-title {
          color: white;
          font-size: 16px;
          font-weight: 700;
          line-height: 1.2;
        }

        .live-chat-subtitle {
          color: rgba(255, 255, 255, 0.9);
          font-size: 13px;
          font-weight: 400;
          line-height: 1.2;
        }

        .live-chat-arrow {
          width: 40px;
          height: 40px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          color: white;
          transition: all 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .live-chat-button:hover .live-chat-arrow {
          transform: translateX(3px);
          background: rgba(255, 255, 255, 0.3);
        }

        /* Service Description */
        .service-description-card {
          background: #FFFFFF;
          margin: 20px;
          padding: 25px 20px;
          border-radius: 16px;
          border: 1px solid #E2E8F0;
          text-align: center;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        .description-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 15px;
        }

        .description-icon {
          font-size: 32px;
          color: #4299E1;
          background: rgba(66, 153, 225, 0.1);
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid #4299E1;
        }

        .description-text {
          color: #4A5568;
          font-size: 15px;
          line-height: 1.5;
          margin: 0;
          text-align: center;
          font-weight: 400;
        }

        /* Support Agents List */
        .support-agents-list {
          padding: 0 20px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .support-agent-card {
          background: #FFFFFF;
          border-radius: 16px;
          padding: 25px;
          border: 1px solid #E2E8F0;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        .support-agent-card:hover {
          border-color: #4299E1;
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        }

        .support-agent-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(135deg, #4299E1, #3182CE);
        }

        /* Agent Header */
        .agent-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .agent-title {
          font-size: 18px;
          font-weight: 700;
          color: #1A202C;
          margin: 0;
        }

        .platform-badge {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          color: white;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        }

        .platform-badge.whatsApp {
          background: linear-gradient(135deg, #25D366, #128C7E);
        }

        .platform-badge.telegram {
          background: linear-gradient(135deg, #0088cc, #005c8a);
        }

        /* Agent Profile */
        .agent-profile {
          position: relative;
          width: 100px;
          height: 100px;
          margin: 0 auto 25px;
        }

        .agent-photo {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid #E2E8F0;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .status-indicator {
          position: absolute;
          bottom: 5px;
          right: 5px;
          width: 16px;
          height: 16px;
          background: #48BB78;
          border: 2px solid #FFFFFF;
          border-radius: 50%;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        /* Contact Buttons */
        .agent-actions {
          display: flex;
          justify-content: center;
        }

        .contact-button {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px 20px;
          border: none;
          border-radius: 12px;
          font-weight: 600;
          font-size: 14px;
          text-decoration: none;
          transition: all 0.3s ease;
          cursor: pointer;
          flex: 1;
          justify-content: center;
          max-width: 250px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .whatsapp-button {
          background: linear-gradient(135deg, #25D366, #128C7E);
          color: white;
        }

        .telegram-button {
          background: linear-gradient(135deg, #0088cc, #005c8a);
          color: white;
        }

        .contact-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
        }

        .button-icon {
          font-size: 18px;
        }

        .action-arrow {
          font-size: 12px;
          opacity: 0.8;
        }

        .contact-button span {
          flex: 1;
          text-align: center;
        }

        /* Loading State */
        :global(.loading-modal) {
          background: rgba(237, 241, 247, 0.9);
          backdrop-filter: blur(10px);
        }

        /* Responsive Design */
        @media (max-width: 400px) {
          .customer-service-container {
            border-radius: 0;
          }
          
          .live-chat-button-container {
            padding: 0 15px;
            margin: 15px 0;
          }
          
          .live-chat-button {
            padding: 16px;
            gap: 12px;
          }
          
          .live-chat-icon {
            width: 45px;
            height: 45px;
            font-size: 20px;
          }
          
          .live-chat-title {
            font-size: 15px;
          }
          
          .live-chat-subtitle {
            font-size: 12px;
          }
          
          .live-chat-arrow {
            width: 35px;
            height: 35px;
            font-size: 12px;
          }
          
          .service-description-card {
            margin: 15px;
            padding: 20px 15px;
          }
          
          .support-agents-list {
            padding: 0 15px;
            gap: 15px;
          }
          
          .support-agent-card {
            padding: 20px;
          }
          
          .agent-profile {
            width: 80px;
            height: 80px;
          }
          
          .contact-button {
            padding: 12px 16px;
            font-size: 13px;
          }
        }

        /* Animation for cards */
        @keyframes cardSlideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .live-chat-button {
          animation: cardSlideIn 0.6s ease-out;
        }

        .support-agent-card {
          animation: cardSlideIn 0.5s ease-out;
        }

        .support-agent-card:nth-child(1) { animation-delay: 0.1s; }
        .support-agent-card:nth-child(2) { animation-delay: 0.2s; }
        .support-agent-card:nth-child(3) { animation-delay: 0.3s; }
        .support-agent-card:nth-child(4) { animation-delay: 0.4s; }
      `}</style>
    </div>
  );
}

export default Online;