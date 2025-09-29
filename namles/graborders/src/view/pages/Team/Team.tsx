import React from "react";
import SubHeader from "src/view/shared/Header/SubHeader";
import { useDispatch, useSelector } from "react-redux";
import authSelectors from "src/modules/auth/authSelectors";

function Team() {
  const currentUser = useSelector(authSelectors.selectCurrentUser);

  return (
    <div className="profile-page-wrapper">
      <SubHeader title="Profile" path="/profile" />

      <div className="profile-content-area">
        <div className="profile-info-card">
          <div className="profile-header-section">
            <h2 className="profile-main-title">Personal Information</h2>
            <p className="profile-subtitle">Your account details and information</p>
          </div>

          <div className="profile-info-list">
            <div className="profile-info-item">
              <div className="info-item-content">
                <div className="info-icon">
                  <i className="fa-solid fa-user"></i>
                </div>
                <div className="info-details">
                  <label className="info-label">Full Name</label>
                  <span className="info-value">{currentUser?.fullName}</span>
                </div>
              </div>
            </div>

            <div className="profile-info-item">
              <div className="info-item-content">
                <div className="info-icon">
                  <i className="fa-solid fa-envelope"></i>
                </div>
                <div className="info-details">
                  <label className="info-label">Email</label>
                  <span className="info-value">{currentUser?.email}</span>
                </div>
              </div>
            </div>

            <div className="profile-info-item">
              <div className="info-item-content">
                <div className="info-icon">
                  <i className="fa-solid fa-phone"></i>
                </div>
                <div className="info-details">
                  <label className="info-label">Phone Number</label>
                  <span className="info-value">{currentUser?.phoneNumber}</span>
                </div>
              </div>
            </div>
            
            {currentUser?.username && (
              <div className="profile-info-item">
                <div className="info-item-content">
                  <div className="info-icon">
                    <i className="fa-solid fa-globe"></i>
                  </div>
                  <div className="info-details">
                    <label className="info-label">Country</label>
                    <span className="info-value">{currentUser?.username}</span>
                  </div>
                </div>
              </div>
            )}

            <div className="profile-info-item">
              <div className="info-item-content">
                <div className="info-icon">
                  <i className="fa-solid fa-user-plus"></i>
                </div>
                <div className="info-details">
                  <label className="info-label">Invitation Code</label>
                  <span className="info-value invitation-code-display">{currentUser?.invitationcode}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .profile-page-wrapper {
          max-width: 400px;
          margin: 0 auto;
          background: #EDF1F7;
          min-height: 100vh;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .profile-content-area {
          padding: 20px;
        }

        .profile-info-card {
          background: #FFFFFF;
          border-radius: 20px;
          padding: 0;
          border: 1px solid #E2E8F0;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
          overflow: hidden;
        }

        .profile-header-section {
          background: linear-gradient(135deg, #4299E1, #3182CE);
          padding: 24px;
          text-align: center;
          color: white;
        }

        .profile-main-title {
          font-size: 24px;
          font-weight: 700;
          margin: 0 0 8px 0;
          color: #FFFFFF;
        }

        .profile-subtitle {
          font-size: 14px;
          opacity: 0.9;
          margin: 0;
          font-weight: 400;
        }

        .profile-info-list {
          padding: 0;
        }

        .profile-info-item {
          border-bottom: 1px solid #F1F5F9;
          transition: all 0.3s ease;
        }

        .profile-info-item:last-child {
          border-bottom: none;
        }

        .profile-info-item:hover {
          background: #F7FAFC;
        }

        .info-item-content {
          display: flex;
          align-items: center;
          padding: 20px 24px;
          gap: 16px;
        }

        .info-icon {
          width: 44px;
          height: 44px;
          background: rgba(66, 153, 225, 0.1);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          border: 2px solid rgba(66, 153, 225, 0.2);
        }

        .info-icon i {
          color: #4299E1;
          font-size: 18px;
        }

        .info-details {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .info-label {
          font-size: 12px;
          font-weight: 600;
          color: #718096;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .info-value {
          font-size: 16px;
          font-weight: 600;
          color: #1A202C;
          line-height: 1.4;
        }

        .invitation-code-display {
          font-family: 'Monaco', 'Consolas', 'Courier New', monospace;
          letter-spacing: 1px;
          color: #4299E1;
          font-weight: 700;
          background: rgba(66, 153, 225, 0.1);
          padding: 8px 12px;
          border-radius: 8px;
          border: 1px solid rgba(66, 153, 225, 0.2);
          display: inline-block;
          margin-top: 4px;
        }

        /* Responsive Design */
        @media (max-width: 400px) {
          .profile-page-wrapper {
            border-radius: 0;
          }
          
          .profile-content-area {
            padding: 15px;
          }
          
          .profile-header-section {
            padding: 20px;
          }
          
          .profile-main-title {
            font-size: 20px;
          }
          
          .info-item-content {
            padding: 16px 20px;
            gap: 12px;
          }
          
          .info-icon {
            width: 40px;
            height: 40px;
          }
          
          .info-icon i {
            font-size: 16px;
          }
          
          .info-value {
            font-size: 15px;
          }
        }

        /* Animation */
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .profile-info-item {
          animation: slideInUp 0.5s ease-out;
        }

        .profile-info-item:nth-child(1) { animation-delay: 0.1s; }
        .profile-info-item:nth-child(2) { animation-delay: 0.2s; }
        .profile-info-item:nth-child(3) { animation-delay: 0.3s; }
        .profile-info-item:nth-child(4) { animation-delay: 0.4s; }
        .profile-info-item:nth-child(5) { animation-delay: 0.5s; }

        /* Hover effects */
        .profile-info-item:hover .info-icon {
          background: rgba(66, 153, 225, 0.15);
          border-color: rgba(66, 153, 225, 0.3);
          transform: scale(1.05);
        }

        .profile-info-item:hover .info-value {
          color: #4299E1;
        }
      `}</style>
    </div>
  );
}

export default Team;