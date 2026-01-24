import React from "react";
import SubHeader from "src/view/shared/Header/SubHeader";
import { useSelector } from "react-redux";
import authSelectors from "src/modules/auth/authSelectors";
import { i18n } from "../../../i18n";

function Team() {
  const currentUser = useSelector(authSelectors.selectCurrentUser);

  return (
    <div className="profile-page-wrapper">
      <SubHeader title={i18n('pages.team.title')} path="/profile" />

      <div className="profile-content-area">
        <div className="profile-info-card">
          <div className="profile-header-section">
            <h2 className="profile-main-title">{i18n('pages.team.personalInformation')}</h2>
            <p className="profile-subtitle">
              {i18n('pages.team.accountDetails')}
            </p>
          </div>

          <div className="profile-info-list">
            {/* ✅ Full Name */}
            <div className="profile-info-item">
              <div className="info-item-content">
                <div className="info-icon">
                  <i className="fa-solid fa-user"></i>
                </div>
                <div className="info-details">
                  <label className="info-label">{i18n('pages.team.fullName')}</label>
                  <span className="info-value">
                    {currentUser?.fullName || i18n('pages.team.notAvailable')}
                  </span>
                </div>
              </div>
            </div>

            {/* ✅ Email */}
            <div className="profile-info-item">
              <div className="info-item-content">
                <div className="info-icon">
                  <i className="fa-solid fa-envelope"></i>
                </div>
                <div className="info-details">
                  <label className="info-label">{i18n('pages.team.email')}</label>
                  <span className="info-value">
                    {currentUser?.email || i18n('pages.team.notAvailable')}
                  </span>
                </div>
              </div>
            </div>

            {/* ✅ Phone Number */}
            <div className="profile-info-item">
              <div className="info-item-content">
                <div className="info-icon">
                  <i className="fa-solid fa-phone"></i>
                </div>
                <div className="info-details">
                  <label className="info-label">{i18n('pages.team.phoneNumber')}</label>
                  <span className="info-value">
                    {currentUser?.phoneNumber || i18n('pages.team.notAvailable')}
                  </span>
                </div>
              </div>
            </div>

            {/* ✅ Country */}
            {currentUser?.username && (
              <div className="profile-info-item">
                <div className="info-item-content">
                  <div className="info-icon">
                    <i className="fa-solid fa-globe"></i>
                  </div>
                  <div className="info-details">
                    <label className="info-label">{i18n('pages.team.country')}</label>
                    <span className="info-value">
                      {currentUser?.username || i18n('pages.team.notAvailable')}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* ✅ Gender */}
            <div className="profile-info-item">
              <div className="info-item-content">
                <div className="info-icon">
                  <i className="fa-solid fa-venus-mars"></i>
                </div>
                <div className="info-details">
                  <label className="info-label">{i18n('pages.team.gender')}</label>
                  <span
                    className={`info-value gender-tag ${currentUser?.gender === "male"
                        ? "male"
                        : currentUser?.gender === "female"
                          ? "female"
                          : "unknown"
                      }`}
                  >
                    {currentUser?.gender
                      ? i18n(`user.enumerators.gender.${currentUser.gender}`)
                      : i18n('pages.team.genderNotSpecified')}
                  </span>
                </div>
              </div>
            </div>

            {/* ✅ Invitation Code */}
            <div className="profile-info-item">
              <div className="info-item-content">
                <div className="info-icon">
                  <i className="fa-solid fa-user-plus"></i>
                </div>
                <div className="info-details">
                  <label className="info-label">{i18n('pages.team.invitationCode')}</label>
                  <span className="info-value invitation-code-display">
                    {currentUser?.invitationcode || i18n('pages.team.notAvailable')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .profile-page-wrapper {
          max-width: 1000px;
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
          animation: slideInUp 0.5s ease-out;
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

        /* ✅ Gender Tag Styles */
        .gender-tag {
          display: inline-block;
          padding: 6px 12px;
          border-radius: 8px;
          font-weight: 600;
          text-transform: capitalize;
          font-size: 14px;
        }

        .gender-tag.male {
          background: rgba(66, 153, 225, 0.1);
          color: #2B6CB0;
          border: 1px solid rgba(66, 153, 225, 0.2);
        }

        .gender-tag.female {
          background: rgba(236, 72, 153, 0.1);
          color: #B83280;
          border: 1px solid rgba(236, 72, 153, 0.2);
        }

        .gender-tag.unknown {
          background: rgba(160, 174, 192, 0.1);
          color: #4A5568;
          border: 1px solid rgba(160, 174, 192, 0.2);
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

        /* Responsive */
        @media (max-width: 400px) {
          .profile-content-area {
            padding: 15px;
          }
          .info-item-content {
            padding: 16px 20px;
          }
        }
      `}</style>
    </div>
  );
}

export default Team;
