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
            <h3 className="modal-title">{items?.vip?.title}</h3>
          </div>

          <div className="product-display">
            <div className="product-image-container">
              {items?.image && (
                <img
                  src={items.image || items?.photo[0]?.downloadUrl || 'https://plus.unsplash.com/premium_photo-1664392147011-2a720f214e01?q=80&w=878&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dhttps://via.placeholder.com/70x70/3b82f6/ffffff?text=Product'}
                  alt={items?.title}
                  loading='lazy'
                  className="product-image"
                />
              )}
            </div>
            <div className="product-details">
              <div className="product-name">{items?.title}</div>
            </div>
          </div>

          <div className="order-summary">
            <div className="summary-row">
              <span className="summary-label">{i18n('pages.grapModal.totalOrderAmount')}</span>
              <span className="summary-value">{items?.amount} {i18n('pages.grapModal.currency')}</span>
            </div>

            <div className="summary-row">
              <span className="summary-label">{i18n('pages.grapModal.estimatedReturn')}</span>
              <span className="summary-value">
                {calcule__total(items?.amount, items?.commission)} {i18n('pages.grapModal.currency')}
              </span>
            </div>
          </div>

          <div className="order-info">
            <div className="info-row">
              <span className="info-label">{i18n('pages.grapModal.orderTime')}</span>
              <span className="info-value">{Dates.current()}</span>
            </div>
            <div className="info-row">
              <span className="info-label">{i18n('pages.grapModal.orderNumber')}</span>
              <span className="info-value">N{number}</span>
            </div>
          </div>

          <div className="modal-actions">
            <div className="action-divider"></div>
            <div className="action-buttons">
              <button className="submit-button" onClick={submit}>
                {i18n('pages.grapModal.submit')}
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        /* Modal Styles */
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
        }

        @media (min-width: 768px) {
          .product-modal {
          }
        }

        @media (min-width: 1024px) {
          .product-modal {
            max-width: 1000px;
          }
        }

        .modal-contents {
          background: #FFFFFF;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
          border: 1px solid #E2E8F0;
        }

        @media (min-width: 768px) {
          .modal-contents {
            padding: 28px;
          }
        }

        .modal-header {
          margin-bottom: 24px;
        }

        .modal-title {
          margin: 0;
          font-size: 22px;
          font-weight: 700;
          color: #1A202C;
          text-align: center;
          line-height: 1.3;
        }

        @media (min-width: 768px) {
          .modal-title {
            font-size: 24px;
          }
        }

        @media (min-width: 1024px) {
          .modal-title {
            font-size: 26px;
          }
        }

        .product-display {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          margin-bottom: 28px;
        }

        @media (min-width: 768px) {
          .product-display {
            align-items: center;
            justify-content: center;
            text-align: left;
          }
        }

        .product-image-container {
          width: 100px;
          height: 100px;
          border-radius: 14px;
          overflow: hidden;
          border: 2px solid #E2E8F0;
          flex-shrink: 0;
          background: #F7FAFC;
        }

        @media (min-width: 768px) {
          .product-image-container {
            width: 110px;
            height: 110px;
          }
        }

        @media (min-width: 1024px) {
          .product-image-container {
            width: 120px;
            height: 120px;
          }
        }

        .product-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .product-details {
          flex: 1;
          text-align: center;
        }

        @media (min-width: 768px) {
          .product-details {
            text-align: left;
            padding-left: 20px;
          }
        }

        .product-name {
          font-size: 18px;
          font-weight: 600;
          color: #1A202C;
          line-height: 1.4;
          margin: 0;
        }

        @media (min-width: 768px) {
          .product-name {
            font-size: 20px;
          }
        }

        @media (min-width: 1024px) {
          .product-name {
            font-size: 22px;
          }
        }

        .order-summary {
          display: flex;
          gap: 16px;
          margin-bottom: 24px;
          background: #F7FAFC;
          border-radius: 12px;
          padding: 20px;
        }

        @media (min-width: 768px) {
          .order-summary {
            flex-direction: row;
            justify-content: space-between;
            padding: 24px;
          }
        }

      
        .summary-row {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          padding: 16px;
          background: white;
          border-radius: 10px;
          text-align: center;
          flex: 1;
        }

        @media (min-width: 768px) {
          .summary-row {
            padding: 20px;
          }
        }

        .summary-label {
          font-size: 14px;
          color: #718096;
          font-weight: 500;
          line-height: 1.4;
        }

        @media (min-width: 768px) {
          .summary-label {
            font-size: 15px;
          }
        }

        @media (min-width: 1024px) {
          .summary-label {
            font-size: 16px;
          }
        }

        .summary-value {
          font-size: 18px;
          font-weight: 700;
          color: #1A202C;
          line-height: 1.3;
        }

        @media (min-width: 768px) {
          .summary-value {
            font-size: 20px;
          }
        }

        @media (min-width: 1024px) {
          .summary-value {
            font-size: 22px;
          }
        }

        .order-info {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 24px;
          background: #F7FAFC;
          border-radius: 12px;
          padding: 20px;
        }

        .info-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 0;
        }

        .info-label {
          font-size: 14px;
          color: #718096;
          font-weight: 500;
        }

        @media (min-width: 768px) {
          .info-label {
            font-size: 15px;
          }
        }

        @media (min-width: 1024px) {
          .info-label {
            font-size: 16px;
          }
        }

        .info-value {
          font-size: 15px;
          font-weight: 600;
          color: #1A202C;
        }

        @media (min-width: 768px) {
          .info-value {
            font-size: 16px;
          }
        }

        @media (min-width: 1024px) {
          .info-value {
            font-size: 17px;
          }
        }

        .modal-actions {
          // margin-top: 24px;
        }

        .action-divider {
          height: 1px;
          background: #E2E8F0;
          margin-bottom: 24px;
        }

        .action-buttons {
          display: grid;
          gap: 12px;
        }

        .submit-button {
        margin-top: 0px !important;
          padding: 16px;
          border: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          background: linear-gradient(135deg, #48BB78 0%, #38A169 100%);
          color: white;
          width: 100%;
        }

        @media (min-width: 768px) {
          .submit-button {
            padding: 18px;
            font-size: 17px;
          }
        }

        @media (min-width: 1024px) {
          .submit-button {
            padding: 20px;
            font-size: 18px;
          }
        }

        .submit-button:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(66, 153, 225, 0.3);
        }
      `}</style>
    </div>
  )
}

export default GrapModal