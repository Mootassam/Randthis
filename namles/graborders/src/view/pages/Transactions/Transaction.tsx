import React, { useEffect, useState } from "react";
import SubHeader from "src/view/shared/Header/SubHeader";
import action from 'src/modules/transaction/list/transactionListActions'
import selector from 'src/modules/transaction/list/transactionListSelectors'
import { useDispatch, useSelector } from 'react-redux';
import Dates from "src/view/shared/utils/Dates";
import LoadingModal from "src/shared/LoadingModal";
import Nodata from "src/view/shared/Nodata";

function Transaction() {
  const [active, setActive] = useState("withdraw");
  const dispatch = useDispatch();
  const loading = useSelector(selector.selectLoading)
  const selectHasRows = useSelector(selector.selectHasRows)

  const fetchAll = () => {
    const values = {
      type: active
    }
    dispatch(action.doFetchByUser(values, values))
  }

  useEffect(() => {
    fetchAll()
  }, [dispatch, active])

  const record = useSelector(selector.selectRows)

  const deposit = () => {
    setActive("deposit")
    const values = {
      type: 'deposit'
    }
    dispatch(action.doFetchByUser(values))
  }

  const withdraw = () => {
    setActive("withdraw")
    const values = {
      type: 'withdraw'
    }
    dispatch(action.doFetchByUser(values, values))
  }

  const allTransactions = () => {
    setActive("")
    const values = {
      type: ''
    }
    dispatch(action.doFetchByUser(values, values))
  }

  const getTransactionIcon = (type, status) => {
    if (type === 'deposit') {
      return status === 'success'
        ? "fa-solid fa-circle-arrow-down text-success"
        : status === 'pending'
          ? "fa-solid fa-clock text-warning"
          : "fa-solid fa-circle-xmark text-danger";
    } else {
      return status === 'success'
        ? "fa-solid fa-circle-arrow-up text-success"
        : status === 'pending'
          ? "fa-solid fa-clock text-warning"
          : "fa-solid fa-circle-xmark text-danger";
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      success: { class: 'status-completed', text: 'Completed' },
      pending: { class: 'status-pending', text: 'Processing' },
      canceled: { class: 'status-canceled', text: 'Canceled' },
    };

    const config = statusConfig[status] || statusConfig.pending;
    return (
      <div className={`status-badge ${config.class}`}>
        {config.text}
      </div>
    );
  };

  const getAmountDisplay = (item) => {
    const sign = item.type === 'deposit' ? '+' : '-';
    const amountClass = item.status === 'canceled' || item.status === 'failed'
      ? 'amount-canceled'
      : item.status === 'pending'
        ? 'amount-pending'
        : item.type === 'deposit'
          ? 'amount-deposit'
          : 'amount-withdraw';

    return (
      <div className={`transaction-amount ${amountClass}`}>
        {sign}${item?.amount}
      </div>
    );
  };

  const all = (item) => {
    return (
      <div className="transaction-item">
        <div className="transaction-icon">
          <i className={getTransactionIcon(item.type, item.status)}></i>
        </div>

        <div className="transaction-content">
          <div className="transaction-header">
            <div className="transaction-type">
              {item.type === 'deposit' ? 'Deposit' : 'Withdrawal'}
            </div>
            {getStatusBadge(item.status)}
          </div>

          <div className="transaction-details">
            <div className="transaction-date">
              <i className="fa-regular fa-clock"></i>
              {Dates.Date(item?.createdAt)}
            </div>

          </div>
        </div>

        <div className="transaction-amount-section">
          {getAmountDisplay(item)}

        </div>
      </div>
    );
  };

  return (
    <div className="transaction-page-container">
      <SubHeader title="Transaction History" path="/profile" />

      {/* Summary Cards */}
      <div className="summary-section">


      </div>

      {/* Filter Tabs */}
      <div className="transaction-filter-section">
        <div className="filter-tabs">
          <div
            className={`filter-tab ${active === "" ? 'filter-tab-active' : ''}`}
            onClick={allTransactions}
          >
            <i className="fa-solid fa-list"></i>
            <span>All</span>
          </div>
          <div
            onClick={withdraw}
            className={`filter-tab ${active === "withdraw" ? 'filter-tab-active' : ''}`}
          >
            <i className="fa-solid fa-arrow-up"></i>
            <span>Withdraw</span>
          </div>
          <div
            onClick={deposit}
            className={`filter-tab ${active === "deposit" ? 'filter-tab-active' : ''}`}
          >
            <i className="fa-solid fa-arrow-down"></i>
            <span>Deposit</span>
          </div>
        </div>
      </div>

      {/* Transaction List */}
      <div className="transaction-list-container">
        {loading && <LoadingModal />}

        {!loading && record && record.length > 0 && (
          <div className="transaction-list-header">
            <h3 className="recent">Recent Transactions</h3>
            <div className="transaction-count">{record.length} transactions</div>
          </div>
        )}

        {!loading && record && record.map((item, index) => (
          <div key={index}>
            {all(item)}
          </div>
        ))}

        {!loading && !selectHasRows && <Nodata />}
      </div>

      <style jsx>{`
        .transaction-page-container {
          max-width: 400px;
          margin: 0 auto;
          background: #EDF1F7;
          min-height: 100vh;
          color: #2D3748;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        /* Summary Section */
        .summary-section {
          padding: 10px;
        }

        .summary-card {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 20px;
          border-radius: 16px;
          margin-bottom: 16px;
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.15);
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .summary-icon {
          width: 50px;
          height: 50px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
        }

        .summary-content {
          flex: 1;
        }

        .summary-label {
          font-size: 14px;
          opacity: 0.9;
          margin-bottom: 4px;
        }

        .summary-amount {
          font-size: 24px;
          font-weight: 700;
        }

        .summary-stats {
          display: flex;
          gap: 12px;
        }

        .stat-item {
          flex: 1;
          background: white;
          padding: 16px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
          border: 1px solid #E2E8F0;
        }

        .stat-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          color: white;
        }

        .stat-icon.deposit {
          background: linear-gradient(135deg, #48BB78, #38A169);
        }

        .stat-icon.withdraw {
          background: linear-gradient(135deg, #ED8936, #DD6B20);
        }

        .stat-label {
          font-size: 12px;
          color: #718096;
          margin-bottom: 2px;
        }

        .stat-amount {
          font-size: 16px;
          font-weight: 700;
          color: #1A202C;
        }

        /* Filter Tabs */
        .transaction-filter-section {
          padding: 0px  0px 10px 0px;
        }

        .filter-tabs {
          display: flex;
          background: #FFFFFF;
          border-radius: 12px;
          padding: 4px;
          border: 1px solid #E2E8F0;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
        }

        .filter-tab {
          flex: 1;
          text-align: center;
          padding: 12px 16px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 500;
          color: #718096;
          background: transparent;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-size: 14px;
        }

        .filter-tab:hover {
          background: #F7FAFC;
          color: #2D3748;
        }

        .filter-tab-active {
          background: #4299E1;
          color: white;
          box-shadow: 0 2px 8px rgba(66, 153, 225, 0.2);
        }

        /* Transaction List */
        .transaction-list-container {
          padding: 0 20px 20px;
        }

        .transaction-list-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
          padding: 0 8px;
        }

        .transaction-list-header h3 {
          font-size: 16px;
          font-weight: 600;
          color: #1A202C !important;
          margin: 0;
        }

        .recent { color: #1A202C; }

        .transaction-count {
          font-size: 12px;
          color: #718096;
          background: #F7FAFC;
          padding: 4px 8px;
          border-radius: 12px;
        }

        .transaction-item {
          display: flex;
          align-items: center;
          gap: 15px;
          background: #FFFFFF;
          padding: 20px;
          border-radius: 16px;
          border: 1px solid #E2E8F0;
          margin-bottom: 12px;
          transition: all 0.3s ease;
          animation: slideIn 0.5s ease-out;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
        }

        .transaction-item:hover {
          border-color: #4299E1;
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        }

        .transaction-icon {
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

        .text-success { color: #48BB78; }
        .text-warning { color: #ED8936; }
        .text-danger { color: #F56565; }

        .transaction-content {
          flex: 1;
          min-width: 0;
        }

        .transaction-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 8px;
        }

        .transaction-type {
          font-size: 15px;
          font-weight: 600;
          color: #1A202C;
        }

        .transaction-details {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .transaction-date {
          font-size: 13px;
          color: #718096;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .transaction-reference {
          font-size: 12px;
          color: #A0AEC0;
          font-family: monospace;
        }

        .transaction-amount-section {
          text-align: right;
        }

        .transaction-amount {
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 4px;
        }

        .amount-deposit {
          color: #48BB78;
        }

        .amount-withdraw {
          color: #F56565;
        }

        .amount-pending {
          color: #ED8936;
        }

        .amount-canceled {
          color: #A0AEC0;
          text-decoration: line-through;
        }

        .transaction-method {
          font-size: 12px;
          color: #718096;
        }

        /* Status Badges */
        .status-badge {
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          width: fit-content;
        }

        .status-completed {
          background: rgba(34, 197, 94, 0.1);
          color: #22c55e;
          border: 1px solid rgba(34, 197, 94, 0.2);
        }

        .status-pending {
          background: rgba(245, 158, 11, 0.1);
          color: #f59e0b;
          border: 1px solid rgba(245, 158, 11, 0.2);
        }

        .status-canceled {
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
          border: 1px solid rgba(239, 68, 68, 0.2);
        }

        /* Animations */
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .transaction-item:nth-child(1) { animation-delay: 0.1s; }
        .transaction-item:nth-child(2) { animation-delay: 0.2s; }
        .transaction-item:nth-child(3) { animation-delay: 0.3s; }
        .transaction-item:nth-child(4) { animation-delay: 0.4s; }
        .transaction-item:nth-child(5) { animation-delay: 0.5s; }

        /* Responsive Design */
        @media (max-width: 400px) {
          .transaction-page-container {
            border-radius: 0;
            max-width: 100%;
          }
          
          .summary-section,
          .transaction-filter-section {
       
          }
          
          .transaction-list-container {
            padding: 0 15px 15px;
          }
          
          .transaction-item {
            padding: 16px;
          }
          
          .filter-tab {
            padding: 10px 12px;
            font-size: 13px;
          }
          
          .summary-stats {
            flex-direction: column;
          }
          
          .transaction-amount {
            font-size: 16px;
          }
        }
      `}</style>
    </div>
  );
}

export default Transaction;