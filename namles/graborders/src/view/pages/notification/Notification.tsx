import React, { useState } from "react";
import { Link } from "react-router-dom";
import SubHeader from "src/view/shared/Header/SubHeader";

function Notifications() {
  const [filter, setFilter] = useState("all"); // all, deposit, withdraw

  // Static notification data
  const staticNotifications = [
    {
      id: 1,
      type: "deposit",
      status: "completed",
      amount: 100.00,
      date: "2024-01-15T14:30:00Z",
      reference: "DEP789123",
      note: "Bank transfer deposit"
    },
    {
      id: 2,
      type: "withdraw",
      status: "pending",
      amount: 50.00,
      date: "2024-01-15T10:15:00Z",
      reference: "WD456789",
      note: "Withdrawal to bank account"
    },
    {
      id: 3,
      type: "deposit",
      status: "completed",
      amount: 200.00,
      date: "2024-01-14T16:45:00Z",
      reference: "DEP654321",
      note: "Credit card deposit"
    },
    {
      id: 4,
      type: "withdraw",
      status: "failed",
      amount: 75.00,
      date: "2024-01-14T09:20:00Z",
      reference: "WD987654",
      note: "Insufficient balance"
    },
    {
      id: 5,
      type: "deposit",
      status: "completed",
      amount: 150.00,
      date: "2024-01-13T11:30:00Z",
      reference: "DEP123456",
      note: "PayPal deposit"
    },
    {
      id: 6,
      type: "withdraw",
      status: "completed",
      amount: 25.00,
      date: "2024-01-12T15:45:00Z",
      reference: "WD321654",
      note: "Withdrawal processed"
    }
  ];

  // Filter notifications based on selected filter
  const filteredNotifications = staticNotifications.filter(notification => {
    if (filter === "deposit") {
      return notification.type === "deposit";
    } else if (filter === "withdraw") {
      return notification.type === "withdraw";
    }
    return notification.type === "deposit" || notification.type === "withdraw";
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "#48BB78"; // green
      case "pending":
        return "#ED8936"; // orange
      case "failed":
        return "#F56565"; // red
      default:
        return "#A0AEC0"; // gray
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "completed":
        return "Completed";
      case "pending":
        return "Pending";
      case "failed":
        return "Failed";
      default:
        return status;
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "deposit":
        return "fa-solid fa-dollar-sign";
      case "withdraw":
        return "fa-solid fa-money-check";
      default:
        return "fa-solid fa-bell";
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "deposit":
        return "#4299E1"; // blue
      case "withdraw":
        return "#ED8936"; // orange
      default:
        return "#A0AEC0"; // gray
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
      <SubHeader title="Notifications" />

      {/* Filter Tabs */}
      <div className="filter-tabs">
        <button
          className={`filter-tab ${filter === "all" ? "active" : ""}`}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={`filter-tab ${filter === "deposit" ? "active" : ""}`}
          onClick={() => setFilter("deposit")}
        >
          Deposit
        </button>
        <button
          className={`filter-tab ${filter === "withdraw" ? "active" : ""}`}
          onClick={() => setFilter("withdraw")}
        >
          Withdraw
        </button>
      </div>

      {/* Notifications List */}
      <div className="notifications-list">
        {filteredNotifications.length === 0 ? (
          <div className="empty-state">
            <i className="fa-solid fa-bell-slash"></i>
            <span>No notifications found</span>
            <p>You don't have any {filter !== "all" ? filter : ""} notifications yet.</p>
          </div>
        ) : (
          filteredNotifications.map((notification) => (
            <div key={notification.id} className="notification-item">
              <div className="notification-icon">
                <i 
                  className={getTypeIcon(notification.type)} 
                  style={{ color: getTypeColor(notification.type) }}
                ></i>
              </div>
              
              <div className="notification-content">
                <div className="notification-header">
                  <span className="notification-title">
                    {notification.type === "deposit" ? "Deposit" : "Withdrawal"} Request
                  </span>
                  <span 
                    className="notification-status"
                    style={{ color: getStatusColor(notification.status) }}
                  >
                    {getStatusText(notification.status)}
                  </span>
                </div>
                
                <div className="notification-details">
                  <span className="notification-amount">
                    {notification.amount?.toFixed(2)} USD
                  </span>
                  <span className="notification-date">
                    {formatDate(notification.date)}
                  </span>
                </div>
                
                
              
              </div>
            </div>
          ))
        )}
      </div>

      <style>{`
        .notifications-container {
          max-width: 400px;
          margin: 0 auto;
          background: #EDF1F7;
          min-height: 100vh;
          color: #2D3748;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .page-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px;
          background: #FFFFFF;
          border-bottom: 1px solid #E2E8F0;
        }

        .back-button {
          color: #4A5568;
          font-size: 18px;
          text-decoration: none;
          padding: 8px;
          border-radius: 8px;
          transition: all 0.2s ease;
        }

        .back-button:hover {
          background: #F7FAFC;
          color: #2D3748;
        }

        .page-title {
          font-size: 18px;
          font-weight: 600;
          color: #1A202C;
          margin: 0;
        }

        .header-placeholder {
          width: 34px;
        }

        .filter-tabs {
          display: flex;
          border-bottom: 1px solid #E2E8F0;
          gap: 8px;
        }

        .filter-tab {
          flex: 1;
          padding: 12px 16px;
          border: none;
          background: #F7FAFC;
          color: #718096;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
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

        .notifications-list {
          padding: 20px;
        }

        .notification-item {
          display: flex;
          align-items: flex-start;
          gap: 15px;
          padding: 20px;
          background: #FFFFFF;
          border-radius: 12px;
          margin-bottom: 12px;
          border: 1px solid #E2E8F0;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
          transition: all 0.2s ease;
        }

        .notification-item:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }

        .notification-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: #F7FAFC;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          flex-shrink: 0;
        }

        .notification-content {
          flex: 1;
          min-width: 0;
        }

        .notification-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .notification-title {
          font-size: 14px;
          font-weight: 600;
          color: #1A202C;
        }

        .notification-status {
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
        }

        .notification-details {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 6px;
        }

        .notification-amount {
          font-size: 16px;
          font-weight: 700;
          color: #2D3748;
        }

        .notification-date {
          font-size: 12px;
          color: #718096;
        }

        .notification-reference {
          font-size: 12px;
          color: #718096;
          margin-bottom: 4px;
          font-family: monospace;
        }

        .notification-note {
          font-size: 13px;
          color: #4A5568;
          font-style: italic;
        }

        .empty-state {
          text-align: center;
          padding: 60px 20px;
          color: #718096;
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

        /* Responsive adjustments */
        @media (max-width: 400px) {
          .notifications-container {
            max-width: 100%;
          }
          
          .page-header,
          .filter-tabs,
          .notifications-list {
            padding: 15px;
          }
          
          .notification-item {
            padding: 15px;
          }
        }
      `}</style>
    </div>
  );
}

export default Notifications;