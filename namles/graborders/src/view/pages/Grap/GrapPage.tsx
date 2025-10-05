import React, { useState, useEffect, useCallback } from "react";
import "../styles/styles.css";
import { useDispatch, useSelector } from "react-redux";
import authSelectors from "src/modules/auth/authSelectors";
import actions from "src/modules/product/list/productListActions";
import selector from "src/modules/product/list/productListSelectors";
import LoadingModal from "src/shared/LoadingModal";
import Dates from "src/view/shared/utils/Dates";
import recordActions from "src/modules/record/form/recordFormActions";
import recordListAction from "src/modules/record/list/recordListActions";
import recordSelector from "src/modules/record/list/recordListSelectors";
import Image from "src/shared/Images";
import { useHistory } from "react-router-dom";
import authActions from "src/modules/auth/authActions";
import GrapModal from "./GrapModal";
import productListActions from "src/modules/product/list/productListActions";
import PrizeModal from "./PrizeModal";

const Grappage = () => {
  const [randomImages, setRandomImages] = useState(Array(8).fill(""));
  const dispatch = useDispatch();
  const record = useSelector(authSelectors.selectCurrentUser);
  const items = useSelector(selector.selectRows);
  const loading = useSelector(selector.selectLoading);
  const Modal = useSelector(selector.showModal);
  const [number] = useState(Dates.Number());
  const currentUser = useSelector(authSelectors.selectCurrentUser);
  const totalperday = useSelector(recordSelector.selectTotalPerday);


  const displayRandomImage = () => {
    const updateImage = async (index) => {
      const randomImage = await Image.randomImages();
      setRandomImages(prev => {
        const newImages = [...prev];
        newImages[index] = randomImage;
        return newImages;
      });
    };

    // Initialize all images
    randomImages.forEach((_, index) => {
      updateImage(index);
    });

    // Set intervals for each image
    const intervals = [
      setInterval(() => updateImage(0), 3000),
      setInterval(() => updateImage(1), 4000),
      setInterval(() => updateImage(2), 2000),
      setInterval(() => updateImage(3), 4000),
      setInterval(() => updateImage(4), 5000),
      setInterval(() => updateImage(5), 2000),
      setInterval(() => updateImage(6), 3000),
      setInterval(() => updateImage(7), 4000),
    ];

    return () => intervals.forEach(clearInterval);
  };

  const rollAll = async () => {
    await dispatch(actions.doFetch());
  };

  const hideModal = () => {
    dispatch(productListActions.doCloseModal())
  };

  useEffect(() => {
    dispatch(recordListAction.doCount());
    dispatch(recordListAction.doCountDay());
    const cleanup = displayRandomImage();
    return cleanup;
  }, [dispatch]);



  const submit = async () => {
    const values = {
      number: number,
      product: items?.id,
      status: items?.combo ? "pending" : "completed",
      user: currentUser.id,
    };
    await dispatch(recordActions.doCreate(values));

  };

  const disableButton = currentUser.balance <= 0 || !currentUser.grab || currentUser.tasksDone >= currentUser.vip.dailyorder;

  return (
    <div className="grappage-container">
      {/* Header Section */}
      <div className="grappage-header">
        <div className="user-greeting">
          <div className="greeting-content">
            <img src="/images/user.png" alt="User" className="user-avatar" />
            <span className="greeting-text">
              Hi <b>{currentUser.fullName}</b> 👏
            </span>
          </div>
          <div className="vip-badge">
            <b>{currentUser.vip.title}</b>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-content">
            <div className="stat-icon">
              <img src="/images/wallet.png" alt="Wallet" />
            </div>
            <div className="stat-info">
              <div className="stat-title">Total Amount</div>
              <div className="stat-subtitle">Profits will be added here</div>
            </div>
          </div>
          <div className="stat-amount">
            <div className="amount-value">{currentUser.balance.toFixed(2)}</div>
            <div className="amount-currency">USD</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-content">
            <div className="stat-icon">
              <img src="/images/T.png" alt="Commission" />
            </div>
            <div className="stat-info">
              <div className="stat-title">Today's Commission</div>
              <div className="stat-subtitle">Commission Earned</div>
            </div>
          </div>
          <div className="stat-amount">
            <div className="amount-value">{totalperday}</div>
            <div className="amount-currency">USD</div>
          </div>
        </div>
      </div>

      {/* Optimization Section */}
      <div className="optimization-section">
        <div className="optimization-header">
          <span>Start Optimization</span>
          <span className="progress-count">
            {currentUser?.tasksDone}/{currentUser?.vip?.dailyorder}
          </span>
        </div>
      </div>

      {/* Main Game Grid */}
      <div className="game-grid-section">
        <div className="game-header">
          <div className="vip-info">
            <div className="vip-title">{record?.vip?.title}</div>
            <div className="commission-rate">
              <span className="rate-label">Commission Rate: </span>
              <span className="rate-value">{record?.vip?.comisionrate}%</span>
            </div>
          </div>
          <div className="channel-info">
            <span>Exclusive channel for exclusive members</span>
          </div>
        </div>

        <div className="game-grid">
          <div className="grid-row">
            {[0, 1, 2].map((index) => (
              <div key={index} className="grid-item">
                <img src={randomImages[index]} alt={`Product ${index + 1}`} />
              </div>
            ))}
          </div>
          <div className="grid-row">
            {[3, 4, 5].map((index) => (
              <div key={index} className="grid-item">
                {index === 4 ? (
                  <button
                    className={`start-button ${loading ? "loading" : ""} ${disableButton ? "disabled" : ""
                      }`}
                    onClick={rollAll}
                    disabled={disableButton}
                  >
                    <span className="button-text">
                      {loading ? "Processing..." : "Start"}
                    </span>
                  </button>
                ) : (
                  <img src={randomImages[index]} alt={`Product ${index + 1}`} />
                )}
              </div>
            ))}
          </div>
          <div className="grid-row">
            {[6, 7].map((index) => (
              <div key={index} className="grid-item">
                <img src={randomImages[index]} alt={`Product ${index + 1}`} />
              </div>
            ))}
            <div className="grid-item empty"></div>
          </div>
        </div>

        <div className="channel-footer">
          <span>Exclusive channel for exclusive members</span>
        </div>
      </div>

      {/* Notice Section */}
      <div className="notice-section">
        <div className="notice-header">
          <b>Notice:</b>
        </div>
        <ul className="notice-list">
          <li>Online Support Hours 10:00 - 22:00</li>
          <li>Please contact online support for your assistance!</li>
        </ul>
      </div>

      {/* Loading and Modals */}
      {loading && <LoadingModal />}
      {items && items?.type === "prizes" && Modal && <PrizeModal items={items}
        number={number}
        hideModal={hideModal}
        submit={submit} />}
      {Modal && (
        <GrapModal items={items} number={number} hideModal={hideModal} submit={submit} />
      )}

      <style>{`
        .grappage-container {
          max-width: 440px;
          margin: 0 auto;
          padding: 20px;
          background: linear-gradient(135deg, #EDF1F7 0%, #F7FAFC 100%);
          min-height: 100vh;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        /* Header Styles */
        .grappage-header {
          margin-bottom: 20px;
        }

        .user-greeting {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #FFFFFF;
          padding: 16px 20px;
          border-radius: 16px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          border: 1px solid #E2E8F0;
        }

        .greeting-content {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 2px solid #E2E8F0;
        }

        .greeting-text {
          font-size: 16px;
          color: #2D3748;
          font-weight: 500;
        }

        .vip-badge {
          background: linear-gradient(135deg, #4299E1 0%, #3182CE 100%);
          color: white;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 600;
        }

        /* Stats Grid */
        .stats-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
          margin-bottom: 20px;
        }

        .stat-card {
          background: #FFFFFF;
          padding: 20px;
          border-radius: 16px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          border: 1px solid #E2E8F0;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .stat-content {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .stat-icon {
          width: 48px;
          height: 48px;
          background: #F7FAFC;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #E2E8F0;
        }

        .stat-icon img {
          width: 24px;
          height: 24px;
        }

        .stat-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .stat-title {
          font-size: 14px;
          font-weight: 600;
          color: #1A202C;
        }

        .stat-subtitle {
          font-size: 12px;
          color: #718096;
        }

        .stat-amount {
          text-align: right;
        }

        .amount-value {
          font-size: 18px;
          font-weight: 700;
          color: #4299E1;
        }

        .amount-currency {
          font-size: 12px;
          color: #718096;
          font-weight: 500;
        }

        /* Optimization Section */
        .optimization-section {
          background: #FFFFFF;
          padding: 16px 20px;
          border-radius: 16px;
          margin-bottom: 20px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          border: 1px solid #E2E8F0;
        }

        .optimization-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 16px;
          font-weight: 600;
          color: #1A202C;
        }

        .progress-count {
          background: #48BB78;
          color: white;
          padding: 6px 12px;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 600;
        }

        /* Game Grid Section */
        .game-grid-section {
          background: #FFFFFF;
          padding: 20px;
          border-radius: 20px;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
          border: 1px solid #E2E8F0;
          margin-bottom: 20px;
        }

        .game-header {
          margin-bottom: 20px;
        }

        .vip-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .vip-title {
          font-size: 18px;
          font-weight: 700;
          color: #1A202C;
        }

        .commission-rate {
          font-size: 14px;
        }

        .rate-label {
          color: #718096;
        }

        .rate-value {
          color: #4299E1;
          font-weight: 600;
        }

        .channel-info {
          text-align: center;
          color: #718096;
          font-size: 12px;
        }

        .game-grid {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin: 20px 0;
        }

        .grid-row {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 12px;
        }

        .grid-item {
          aspect-ratio: 1;
          background: #F7FAFC;
          border-radius: 12px;
          border: 2px solid #E2E8F0;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .grid-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .grid-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .start-button {
        margin-top: 0px !important;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #48BB78 0%, #38A169 100%);
          border: none;
          border-radius: 10px;
          color: white;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .start-button:hover:not(.disabled):not(.loading) {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(72, 187, 120, 0.3);
        }

        .start-button.loading {
          background: linear-gradient(135deg, #A0AEC0 0%, #718096 100%);
          cursor: not-allowed;
        }

        .start-button.disabled {
          background: #CBD5E0;
          cursor: not-allowed;
          opacity: 0.6;
        }

        .button-text {
          font-size: 16px;
          font-weight: 700;
        }

        .channel-footer {
          text-align: center;
          color: #718096;
          font-size: 12px;
          padding-top: 10px;
          border-top: 1px solid #E2E8F0;
        }

        /* Notice Section */
        .notice-section {
          background: #FFF5F5;
          padding: 16px 20px;
          border-radius: 12px;
          border: 1px solid #FED7D7;
          margin-bottom: 80px;
        }

        .notice-header {
          color: #C53030;
          font-size: 14px;
          margin-bottom: 8px;
        }

        .notice-list {
          color: #718096;
          font-size: 13px;
          line-height: 1.5;
          margin: 0;
          padding-left: 16px;
        }

        .notice-list li {
          margin-bottom: 4px;
        }

        /* Responsive Design */
        @media (max-width: 480px) {
          .grappage-container {
            padding: 16px;
          }
          
          .user-greeting {
            padding: 14px 16px;
          }
          
          .stat-card {
            padding: 16px;
          }
          
          .game-grid-section {
            padding: 16px;
          }
          
          .grid-row {
            gap: 8px;
          }
        }

        @media (max-width: 360px) {
          .vip-info {
            flex-direction: column;
            gap: 8px;
            align-items: flex-start;
          }
          
          .greeting-content {
            flex-direction: column;
            text-align: center;
            gap: 8px;
          }
        }
      `}</style>
    </div>
  );
};

export default Grappage;