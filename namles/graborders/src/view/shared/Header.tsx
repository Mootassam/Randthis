import React from "react";
import { Link } from 'react-router-dom';
function Header() {
  let count = 1; // You can change this value to 1, 3, 4, etc.

  return (
    <div className="market__header">
      <img
        src="/images/home/logo.webp"
        alt=""
        style={{ width: 150 }}
      />

      <div className="header-icons">
        <Link to="/notifications">

          <div className="notification-container">
            <div className="notification-icon">
              <i className="fa-solid fa-bell"></i>
              {count > 0 && (
                <div className="notification-badge">
                  {count}
                </div>
              )}
            </div>
          </div>
        </Link>
        <Link to="/profile">
          <div className="profile-containers">
            <div className="profile-icon">
              <i className="fa-solid fa-user"></i>
            </div>
          </div>
        </Link>
      </div>

      <style>{`
        .market__header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 15px 20px;
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          border-bottom: 1px solid #374151;
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .header-icons {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .notification-container,
        .profile-containers {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .notification-icon,
        .profile-icon {
          position: relative;
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: rgba(30, 41, 59, 0.8);
      
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .notification-icon:hover,
        .profile-icon:hover {
          background: rgba(55, 65, 81, 0.6);
          border-color: #3b82f6;
          transform: translateY(-2px);
        }

        .notification-icon i,
        .profile-icon i {
          color: #e2e8f0;
          font-size: 18px;
          transition: color 0.3s ease;
        }

        .notification-icon:hover i,
        .profile-icon:hover i {
          color: #3b82f6;
        }

        .notification-badge {
          position: absolute;
          top: -5px;
          right: -5px;
          background: #ef4444;
          color: white;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 700;
          border: 2px solid #0f172a;
          animation: pulse 2s infinite;
        }

        /* Responsive Design */
        @media (max-width: 400px) {
          .market__header {
            padding: 12px 15px;
          }
          
          .header-icons {
            gap: 10px;
          }
          
          .notification-icon,
          .profile-icon {
            width: 36px;
            height: 36px;
          }
          
          .notification-icon i,
          .profile-icon i {
            font-size: 16px;
          }
          
          .notification-badge {
            width: 18px;
            height: 18px;
            font-size: 10px;
          }
        }

        /* Pulse Animation */
        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}

export default Header;