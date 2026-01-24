import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SubHeader from "src/view/shared/Header/SubHeader";
import selectors from 'src/modules/notification/list/notificationListSelectors';
import actions from 'src/modules/notification/list/notificationListActions';
import actionsForm from 'src/modules/notification/form/notificationFormActions';
import { i18n } from "../../../i18n";

function Notifications() {
  const [filter, setFilter] = useState("all");
  const dispatch = useDispatch();
  const rows = useSelector(selectors.selectRows);
  const loading = useSelector(selectors.selectLoading);

  const asRead = (id) => {
    dispatch(actionsForm.doMarkAsRead(id));
  }

  useEffect(() => {
    dispatch(actions.doFetch())
  }, [dispatch])

  // Filter notifications based on selected filter
  const filteredNotifications = rows.filter(notification => {
    if (filter === "deposit") {
      return notification.type.includes("deposit");
    } else if (filter === "withdraw") {
      return notification.type.includes("withdraw");
    }
    return true;
  });

  // Get notification message based on type
  const getNotificationMessage = (notification) => {
    const amount = notification.amount || '0';
    
    switch (notification.type) {
      case "deposit_success":
        return i18n('pages.notifications.messages.deposit_success', amount);
      case "deposit_canceled":
        return i18n('pages.notifications.messages.deposit_canceled', amount);
      case "withdraw_success":
        return i18n('pages.notifications.messages.withdraw_success', amount);
      case "withdraw_canceled":
        return i18n('pages.notifications.messages.withdraw_canceled', amount);
      case "system":
        return i18n('pages.notifications.messages.system');
      case "alert":
        return i18n('pages.notifications.messages.alert');
      default:
        return i18n('pages.notifications.messages.default');
    }
  };

  // Get notification title based on type
  const getNotificationTitle = (type) => {
    switch (type) {
      case "deposit_success":
        return i18n('pages.notifications.types.deposit_success');
      case "deposit_canceled":
        return i18n('pages.notifications.types.deposit_canceled');
      case "withdraw_success":
        return i18n('pages.notifications.types.withdraw_success');
      case "withdraw_canceled":
        return i18n('pages.notifications.types.withdraw_canceled');
      case "system":
        return i18n('pages.notifications.types.system');
      case "alert":
        return i18n('pages.notifications.types.alert');
      default:
        return i18n('pages.notifications.types.default');
    }
  };

  // Get icon based on notification type
  const getNotificationIcon = (type) => {
    switch (type) {
      case "deposit_success":
        return "fa-solid fa-circle-check";
      case "deposit_canceled":
        return "fa-solid fa-circle-xmark";
      case "withdraw_success":
        return "fa-solid fa-circle-check";
      case "withdraw_canceled":
        return "fa-solid fa-circle-xmark";
      case "system":
        return "fa-solid fa-gear";
      case "alert":
        return "fa-solid fa-triangle-exclamation";
      default:
        return "fa-solid fa-bell";
    }
  };

  // Get background color based on notification type
  const getNotificationColor = (type) => {
    switch (type) {
      case "deposit_success":
      case "withdraw_success":
        return "#48BB78"; // Green for success
      case "deposit_canceled":
      case "withdraw_canceled":
        return "#F56565"; // Red for canceled
      case "system":
        return "#4299E1"; // Blue for system
      case "alert":
        return "#ED8936"; // Orange for alert
      default:
        return "#A0AEC0"; // Gray for default
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="notifications-container">
      {/* Header */}
      <SubHeader title={i18n('pages.notifications.title')} />

      {/* Filter Tabs */}
      <div className="filter-tabs">
        <button
          className={`filter-tab ${filter === "all" ? "active" : ""}`}
          onClick={() => setFilter("all")}
        >
          <i className="fa-solid fa-bell"></i>
          {i18n('pages.notifications.filters.all')}
        </button>
        <button
          className={`filter-tab ${filter === "deposit" ? "active" : ""}`}
          onClick={() => setFilter("deposit")}
        >
          <i className="fa-solid fa-arrow-down"></i>
          {i18n('pages.notifications.filters.deposit')}
        </button>
        <button
          className={`filter-tab ${filter === "withdraw" ? "active" : ""}`}
          onClick={() => setFilter("withdraw")}
        >
          <i className="fa-solid fa-arrow-up"></i>
          {i18n('pages.notifications.filters.withdraw')}
        </button>
      </div>

      {/* Unread Count */}
      <div className="unread-indicator">
        <span className="unread-count">
          {i18n('pages.notifications.unreadCount', rows.filter(n => n.status === 'unread').length)}
        </span>
      </div>

      {/* Notifications List */}
      <div className="notifications-list">
        {filteredNotifications.length === 0 ? (
          <div className="empty-state">
            <i className="fa-solid fa-bell-slash"></i>
            <span>{i18n('pages.notifications.emptyState.title')}</span>
            <p>
              {i18n('pages.notifications.emptyState.description', 
                filter !== "all" ? i18n(`pages.notifications.filters.${filter}`) : ""
              )}
            </p>
          </div>
        ) : (
          filteredNotifications.map((notification) => {
            const iconColor = getNotificationColor(notification.type);
            const isUnread = notification.status === 'unread';
            
            return (
              <div 
                key={notification.id} 
                className={`notification-item ${isUnread ? 'unread' : 'read'}`}
                onClick={() => isUnread && asRead(notification.id)}
              >
                {/* Unread indicator dot */}
                {isUnread && <div className="unread-dot"></div>}
                
                <div 
                  className="notification-icon"
                  style={{ backgroundColor: `${iconColor}15`, borderColor: `${iconColor}30` }}
                >
                  <i
                    className={getNotificationIcon(notification.type)}
                    style={{ color: iconColor }}
                  ></i>
                </div>

                <div className="notification-content">
                  <div className="notification-header">
                    <span className="notification-title">
                      {getNotificationTitle(notification.type)}
                    </span>
                  </div>

                  <p className="notification-message">
                    {getNotificationMessage(notification)}
                  </p>

                  <div className="notification-footer">
                    <div className="notification-amount">
                      <i className="fa-solid fa-coins"></i>
                      <span>{notification.amount} USDT</span>
                    </div>
                    <div className="notification-full-date">
                      {formatDate(notification.createdAt)}
                    </div>
                  </div>
                </div>

                {/* Read status icon */}
                <div className="read-status">
                  {isUnread ? (
                    <i className="fa-regular fa-circle unread-icon"></i>
                  ) : (
                    <i className="fa-solid fa-circle-check read-icon"></i>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>


      <style>{`
        .notifications-container {
          max-width: 1000px;
          margin: 0 auto;
          background: #F8FAFC;
          min-height: 100vh;
          color: #2D3748;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .filter-tabs {
          display: flex;
          background: #FFFFFF;
          border-bottom: 1px solid #E2E8F0;
          gap: 4px;
          padding: 12px 16px;
        }

        .filter-tab {
          flex: 1;
          padding: 10px 12px;
          border: none;
          background: #F7FAFC;
          color: #718096;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }

        .filter-tab.active {
          background: #4299E1;
          color: #FFFFFF;
          box-shadow: 0 2px 8px rgba(66, 153, 225, 0.2);
        }

        .filter-tab:hover:not(.active) {
          background: #EDF2F7;
          color: #4A5568;
        }

        .filter-tab i {
          font-size: 12px;
        }

        .unread-indicator {
          padding: 8px 16px;
          background: #FFFFFF;
          border-bottom: 1px solid #E2E8F0;
        }

        .unread-count {
          font-size: 13px;
          font-weight: 600;
          color: #4299E1;
          background: #EBF8FF;
          padding: 4px 12px;
          border-radius: 12px;
          border: 1px solid #BEE3F8;
        }

        .notifications-list {
          padding: 16px;
        }

        .notification-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 16px;
          background: #FFFFFF;
          border-radius: 12px;
          margin-bottom: 12px;
          border: 1px solid #E2E8F0;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
          transition: all 0.2s ease;
          position: relative;
          cursor: pointer;
        }

        /* Unread notification styles */
        .notification-item.unread {
          background: linear-gradient(135deg, #FFFFFF 0%, #F0FFF4 100%);
          border-left: 4px solid #48BB78;
          border-right: 1px solid #E2E8F0;
          border-top: 1px solid #E2E8F0;
          border-bottom: 1px solid #E2E8F0;
          box-shadow: 0 4px 12px rgba(72, 187, 120, 0.1);
        }

        .notification-item.unread:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(72, 187, 120, 0.15);
        }

        /* Read notification styles */
        .notification-item.read {
          background: #FFFFFF;
          opacity: 0.8;
          border: 1px solid #E2E8F0;
        }

        .notification-item.read:hover {
          opacity: 1;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }

        .unread-dot {
          position: absolute;
          top: 12px;
          left: 12px;
          width: 8px;
          height: 8px;
          background: #48BB78;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        .notification-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          flex-shrink: 0;
          border: 1px solid;
        }

        .notification-content {
          flex: 1;
          min-width: 0;
        }

        .notification-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 6px;
        }

        .notification-title {
          font-size: 14px;
          font-weight: 600;
          color: #1A202C;
        }

        /* Unread title is bolder */
        .notification-item.unread .notification-title {
          font-weight: 700;
          color: #2D3748;
        }

        .notification-time {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 11px;
          color: #718096;
        }

        .notification-time i {
          font-size: 10px;
        }

        .notification-message {
          font-size: 13px;
          color: #4A5568;
          line-height: 1.4;
          margin: 0 0 10px 0;
        }

        /* Unread message is darker */
        .notification-item.unread .notification-message {
          color: #2D3748;
          font-weight: 500;
        }

        .notification-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 8px;
          border-top: 1px solid #F1F5F9;
        }

        .notification-amount {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          font-weight: 600;
          color: #2D3748;
        }

        .notification-amount i {
          color: #D69E2E;
          font-size: 12px;
        }

        .notification-full-date {
          font-size: 11px;
          color: #A0AEC0;
        }

        .read-status {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 20px;
          height: 20px;
          flex-shrink: 0;
        }

        .unread-icon {
          color: #48BB78;
          font-size: 12px;
          animation: pulse 2s infinite;
        }

        .read-icon {
          color: #A0AEC0;
          font-size: 12px;
        }

        .empty-state {
          text-align: center;
          padding: 60px 20px;
          color: #718096;
          background: #FFFFFF;
          border-radius: 12px;
          border: 1px solid #E2E8F0;
        }

        .empty-state i {
          font-size: 48px;
          margin-bottom: 16px;
          color: #CBD5E0;
        }

        .empty-state span {
          display: block;
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 8px;
          color: #4A5568;
        }

        .empty-state p {
          font-size: 14px;
          margin: 0;
          color: #718096;
        }

        /* Pulse animation for unread items */
        @keyframes pulse {
          0% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.05);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        /* Responsive adjustments */
        @media (max-width: 400px) {
          .notifications-container {
            max-width: 100%;
          }
          
          .filter-tabs,
          .notifications-list {
            padding: 12px;
          }
          
          .notification-item {
            padding: 14px;
          }
        }

        /* Animation for new notifications */
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .notification-item {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

export default Notifications;