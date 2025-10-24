import React from 'react'
import Dates from 'src/view/shared/utils/Dates';
import { i18n } from "../../../i18n";

function GrapModal(props) {
  const { items, number, hideModal, submit } = props;

  const calcule__total = (price, comission) => {
    const total = (parseFloat(comission) / 100) * parseFloat(price);
    return total.toFixed(3);
  };

  return (
    <div className="modal-overlay">
      <div className="product-modal">
        <div className="modal-contents">
          <div className="modal-header">
            <h3>{items?.vip?.title}</h3>
          </div>

          <div className="order-info">
            <div>{i18n('pages.grapModal.orderTime')}: {Dates.current()}</div>
            <div>{i18n('pages.grapModal.orderNumber')}: N{number}</div>
          </div>

          <div className="product-display">
            <div className="product-image">
              {items?.image && (
                <img src={items?.image} alt={items?.title} loading='lazy' />
              )}
            </div>
            <div className="product-details">
              <div className="product-name">{items?.title}</div>
            </div>
          </div>

          <div className="order-summary">
            <div className="summary-row">
              <span>{i18n('pages.grapModal.totalOrderAmount')}</span>
              <span>{items?.amount} {i18n('pages.grapModal.currency')}</span>
            </div>
            <div className="summary-row">
              <span>{i18n('pages.grapModal.commission')}</span>
              <span>{items?.commission}%</span>
            </div>
            <div className="summary-row">
              <span>{i18n('pages.grapModal.estimatedReturn')}</span>
              <span>
                {calcule__total(items?.amount, items?.commission)} {i18n('pages.grapModal.currency')}
              </span>
            </div>
          </div>

          <div className="modal-actions">
            <div className="action-divider"></div>
            <div className="action-buttons">
              <button className="cancel-button" onClick={hideModal}>
                {i18n('pages.grapModal.cancel')}
              </button>
              <button className="submit-button" onClick={submit}>
                {i18n('pages.grapModal.submit')}
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`  /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          z-index: 1000;
        }

        .product-modal {
          width: 100%;
          max-width: 380px;
        }

        .modal-contents {
          background: #FFFFFF;
          border-radius: 10px !important;
          padding: 10px 15px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
          border: 1px solid #E2E8F0;
        }

        .modal-header h3 {
          margin: 0 0 16px 0 !important;
          font-size: 20px !important;
          font-weight: 700 !important;
          color: #1A202C !important;
          text-align: center !important;
        }

        .order-info {
          display: flex;
          flex-direction: column;
          gap: 6px;
          font-size: 13px;
          color: #718096;
          margin-bottom: 12px;
          text-align: center;
        }

        .status-badge {
          display: inline-block;
          padding: 6px 16px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          margin-bottom: 20px;
          text-align: center;
          width: 100%;
        }

        .status-badge.pending {
          background: #FEF5E7;
          color: #D69E2E;
          border: 1px solid #FBD38D;
        }

        .product-display {
          display: flex;
          gap: 16px;
          margin-bottom: 20px;
          align-items: center;
        }

        .product-image {
          width: 80px;
          height: 80px;
          border-radius: 12px;
          overflow: hidden;
          border: 2px solid #E2E8F0;
          flex-shrink: 0;
        }

        .product-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .product-details {
          flex: 1;
        }

        .product-name {
          font-size: 16px;
          font-weight: 600;
          color: #1A202C;
          margin-bottom: 8px;
        }

        .product-quantity {
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          color: #718096;
        }

        .order-summary {
          background: #F7FAFC;
          padding: 16px;
          border-radius: 12px;
          margin-bottom: 20px;
          border: 1px solid #E2E8F0;
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 0;
          font-size: 14px;
        }

        .summary-row:not(:last-child) {
          border-bottom: 1px solid #E2E8F0;
        }

        .modal-actions {
          margin-top: 20px;
        }

        .action-divider {
          height: 1px;
          background: #E2E8F0;
          margin-bottom: 20px;
        }

        .action-buttons {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .cancel-button, .submit-button {
          padding: 14px;
          border: none;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .cancel-button {
          background: #F7FAFC;
          color: #718096;
          border: 1px solid #E2E8F0;
        }

        .cancel-button:hover {
          background: #EDF2F7;
        }

        .submit-button {
          background: linear-gradient(135deg, #4299E1 0%, #3182CE 100%);
          color: white;
        }

        .submit-button:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(66, 153, 225, 0.3);
        }`}</style>
    </div>
  )
}

export default GrapModal