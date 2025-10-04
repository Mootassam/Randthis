import { log } from "console";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import actions from 'src/modules/notification/list/notificationListActions';
import selectors from 'src/modules/notification/list/notificationListSelectors';
import { Link } from "react-router-dom";
function SubHeader(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const unread = useSelector(selectors.selectUnread);
  const loading = useSelector(selectors.UnreadLoading);


  useEffect(() => {
    dispatch(actions.fetchUnreadNotifications())
  }, [dispatch])

  const goBack = () => {
    history.goBack();
  };


  return (
    <div className="subheader-container">
      <div className="subheader-content">
        <div className="back-button" onClick={goBack}>
          <i className="fa-solid fa-arrow-left back-icon"></i>
        </div>
        <h3 className="subheader-title">{props?.title}</h3>
        <Link to="/notifications">
          <div className="notification-container">
            <div className="notification-icons">
              <i className="fa-solid fa-bell"></i>
              {unread > 0 && !loading && (
                <div className="notification-badge">
                  {unread}
                </div>
              )}
            </div>
          </div>
        </Link>
      </div>

      <style>{`
        .subheader-container {
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          border-bottom: 1px solid #374151;
          padding: 15px 20px;
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .subheader-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 400px;
          margin: 0 auto;
        }

        .back-button {
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

        .back-button:hover {
          background: rgba(55, 65, 81, 0.6);
          border-color: #3b82f6;
          transform: translateX(-2px);
        }

        .back-icon {
          color: #e2e8f0;
          font-size: 16px;
          transition: color 0.3s ease;
        }

        .back-button:hover .back-icon {
          color: #3b82f6;
        }

        .subheader-title {
          color: #f1f5f9;
          font-size: 18px;
          font-weight: 700;
          margin: 0;
          text-align: center;
          flex: 1;
        }

        .notification-container {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .notification-icons {
          position: relative;
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: rgba(30, 41, 59, 0.8);

          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .notification-icons:hover {
          background: rgba(55, 65, 81, 0.6);
          border-color: #3b82f6;
          transform: translateY(-2px);
        }

        .notification-icons i {
          color: #e2e8f0;
          font-size: 16px;
          transition: color 0.3s ease;
        }

        .notification-icons:hover i {
          color: #3b82f6;
        }

        .notification-badge {
          position: absolute;
          top: -5px;
          right: -5px;
          background: #ef4444;
          color: white;
          border-radius: 50%;
          width: 18px;
          height: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          font-weight: 700;
          border: 2px solid #0f172a;
          animation: pulse 2s infinite;
        }

        /* Responsive Design */
        @media (max-width: 400px) {
          .subheader-container {
            padding: 12px 15px;
          }
          
          .subheader-content {
            padding: 0;
          }
          
          .back-button {
            width: 36px;
            height: 36px;
          }
          
          .subheader-title {
            font-size: 16px;
          }
          
          .notification-container {
            width: 36px;
            height: 36px;
          }
          
          .notification-icons {
            width: 32px;
            height: 32px;
          }
          
          .notification-badge {
            width: 16px;
            height: 16px;
            font-size: 9px;
          }
        }

        /* Animations */
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

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

        .subheader-container {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

export default SubHeader;