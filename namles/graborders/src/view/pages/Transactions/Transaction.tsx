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

  const all = (item) => {
    return (
      <div className="transaction-item">
        <div className="transaction-left">
          <div className={`status-badge ${item.status === 'canceled' ? 'status-canceled' : item.status === 'pending' ? 'status-pending' : 'status-completed'}`}>
            {item.status}
          </div>
          <div className="transaction-date">{Dates.Date(item?.createdAt)}</div>
        </div>
        <div className={`transaction-amount ${item.status === 'canceled' ? 'amount-canceled' : item.status === 'pending' ? 'amount-pending' : 'amount-completed'}`}>
          ${item?.amount}
        </div>
      </div>
    );
  };

  return (
    <div className="transaction-page-container">
      <SubHeader title="Transaction" path="/profile" />
      
      <div className="transaction-filter-section">
        <div className="filter-tabs">
          <div
            className={`filter-tab ${active === "" ? 'filter-tab-active' : ''}`}
            onClick={() => setActive("")}
          >
            <span>All</span>
          </div>
          <div
            onClick={() => withdraw()}
            className={`filter-tab ${active === "withdraw" ? 'filter-tab-active' : ''}`}
          >
            <span>Withdraw</span>
          </div>
          <div
            onClick={() => deposit()}
            className={`filter-tab ${active === "deposit" ? 'filter-tab-active' : ''}`}
          >
            <span>Deposit</span>
          </div>
        </div>
      </div>

      <div className="transaction-list-container">
        {loading && <LoadingModal />}
        {!loading && record && record.map((item, index) => (
          <div key={index}>
            {all(item)}
          </div>
        ))}
        {!selectHasRows && <Nodata />}
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

        .transaction-filter-section {
          padding: 20px;
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

        .transaction-list-container {
          padding: 0 20px 20px;
        }

        .transaction-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #FFFFFF;
          padding: 20px;
          border-radius: 12px;
          border: 1px solid #E2E8F0;
          margin-bottom: 12px;
          transition: all 0.3s ease;
          animation: slideIn 0.5s ease-out;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
        }

        .transaction-item:hover {
          border-color: #4299E1;
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
        }

        .transaction-left {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .status-badge {
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          text-transform: capitalize;
          width: fit-content;
        }

        .status-completed {
          background: rgba(34, 197, 94, 0.1);
          color: #22c55e;
          border: 1px solid #22c55e;
        }

        .status-pending {
          background: rgba(245, 158, 11, 0.1);
          color: #f59e0b;
          border: 1px solid #f59e0b;
        }

        .status-canceled {
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
          border: 1px solid #ef4444;
        }

        .transaction-date {
          font-size: 13px;
          color: #718096;
        }

        .transaction-amount {
          font-size: 18px;
          font-weight: 700;
        }

        .amount-completed {
          color: #22c55e;
        }

        .amount-pending {
          color: #f59e0b;
        }

        .amount-canceled {
          color: #ef4444;
        }

        /* Loading and No Data States */
        :global(.loading-modal) {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
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
          
          .transaction-filter-section {
            padding: 15px;
          }
          
          .transaction-list-container {
            padding: 0 15px 15px;
          }
          
          .transaction-item {
            padding: 16px;
          }
          
          .filter-tab {
            padding: 10px 12px;
            font-size: 14px;
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