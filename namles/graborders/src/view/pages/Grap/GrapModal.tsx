import React from 'react';
import Dates from 'src/view/shared/utils/Dates';
import { i18n } from '../../../i18n';

function GrapModal(props) {
  const { items, number, hideModal, submit } = props;

  const calculateProfit = (price, commission) => {
    const p = parseFloat(price) || 0;
    const c = parseFloat(commission) || 0;
    return ((p * c) / 100).toFixed(3);
  };

  return (
    <div className="modal-overlay" onClick={hideModal}>
      <div
        className="product-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-contents">
        

          {/* PRODUCT */}
          <div className="product-display">
            <div className="product-image-container">
              <img
                src={
                  items?.image ||
                  items?.photo?.[0]?.downloadUrl ||
                  'https://via.placeholder.com/150'
                }
                alt={items?.title}
                loading="lazy"
                className="product-image"
              />
            </div>

            <div className="product-details">
              <div className="product-name">{items?.title}</div>
            </div>
          </div>

          {/* SUMMARY */}
          <div className="order-summary">
            <div className="summary-row">
              <span className="summary-label">
                {i18n('pages.grapModal.totalOrderAmount')}
              </span>
              <span className="summary-value">
                {items?.amount} {i18n('pages.grapModal.currency')}
              </span>
            </div>

            <div className="summary-row">
              <span className="summary-label">
                {i18n('pages.grapModal.estimatedReturn')}
              </span>
              <span className="summary-value">
                {calculateProfit(
                  items?.price ?? items?.amount,
                  items?.commission
                )}{' '}
                {i18n('pages.grapModal.currency')}
              </span>
            </div>
          </div>

          {/* INFO */}
          <div className="order-info">
            <div className="info-row">
              <span className="info-label">
                {i18n('pages.grapModal.orderTime')}
              </span>
              <span className="info-value">{Dates.current()}</span>
            </div>

            <div className="info-row">
              <span className="info-label">
                {i18n('pages.grapModal.orderNumber')}
              </span>
              <span className="info-value">N{number}</span>
            </div>
          </div>

          {/* ACTION */}
          <div className="modal-actions">
            <button className="submit-button" onClick={submit}>
              {i18n('pages.grapModal.submit')}
            </button>
          </div>
        </div>
      </div>

      {/* STYLES */}
      <style>{`
        /* OVERLAY */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
          z-index: 1000;
        }

        /* MODAL */
        .product-modal {
          width: 100%;
          max-width: 520px;
        }

        @media (min-width: 768px) {
          .product-modal {
            max-width: 720px;
          }
        }

        @media (min-width: 1024px) {
          .product-modal {
            max-width: 1000px;
          }
        }

        .modal-contents {
          background: #ffffff;
          border-radius: 16px;
          padding: 24px;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
        }

        /* HEADER */
        .modal-header {
          text-align: center;
          margin-bottom: 24px;
        }

        .modal-title {
          font-size: 22px;
          font-weight: 700;
          color: #1a202c;
        }

        /* PRODUCT */
        .product-display {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          margin-bottom: 24px;
        }

  

        .product-image-container {
          width: 110px;
          aspect-ratio: 1 / 1;
          border-radius: 14px;
          overflow: hidden;
          border: 2px solid #e2e8f0;
          background: #f7fafc;
          flex-shrink: 0;
        }

        .product-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .product-name {
          font-size: 18px;
          font-weight: 600;
          color: #1a202c;
          text-align: center;
        }

        @media (min-width: 768px) {
          .product-name {
            text-align: left;
            font-size: 20px;
          }
        }

        /* SUMMARY */
        .order-summary {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          background: #f7fafc;
          padding: 16px;
          border-radius: 12px;
          margin-bottom: 20px;
        }

        .summary-row {
            flex: 1;
    min-width: 140px;
    background: white;
    border-radius: 10px;
    padding: 14px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
        }

        .summary-label {
          font-size: 14px;
          color: #718096;
        }

        .summary-value {
          font-size: 18px;
          font-weight: 700;
          color: #1a202c;
        }

        /* INFO */
        .order-info {
          background: #f7fafc;
          border-radius: 12px;
          padding: 16px;
          margin-bottom: 24px;
        }

        .info-row {
          display: flex;
          justify-content: space-between;
          padding: 6px 0;
        }

        .info-label {
          color: #718096;
          font-size: 14px;
        }

        .info-value {
          font-weight: 600;
          color: #1a202c;
        }

        /* ACTION */
        .submit-button {
          width: 100%;
          min-height: 48px;
          border: none;
          border-radius: 12px;
          background: linear-gradient(135deg, #48bb78, #38a169);
          color: white;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .submit-button:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 16px rgba(56, 161, 105, 0.4);
        }
      `}</style>
    </div>
  );
}

export default GrapModal;
