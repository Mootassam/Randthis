import React, { useState, useEffect } from "react";
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
import GrapModal from "./GrapModal";
import productListActions from "src/modules/product/list/productListActions";
import PrizeModal from "./PrizeModal";
import { i18n } from "../../../i18n";
import Message from "src/view/shared/message";

const Grappage = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const dispatch = useDispatch();
  const record = useSelector(authSelectors.selectCurrentUser);
  const items = useSelector(selector.selectRows);
  const loading = useSelector(selector.selectLoading);
  const Modal = useSelector(selector.showModal);

  const [number] = useState(Dates.Number());
  const currentUser = useSelector(authSelectors.selectCurrentUser);
  const totalperday = useSelector(recordSelector.selectTotalPerday);

  // Initialize images
  const initializeImages = async () => {
    try {
      const initialImages = await Promise.all(
        Array(9).fill(0).map(() => Image.randomImages())
      );
      setImages(initialImages);
      setIsInitialized(true);
    } catch (error) {
      console.error("Error loading images:", error);
      const defaultImages = Array(9).fill("https://plus.unsplash.com/premium_photo-1664392147011-2a720f214e01?q=80&w=878&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
      setImages(defaultImages);
      setIsInitialized(true);
    }
  };

  // Get visible images
  const getVisibleImages = () => {
    if (images.length < 3) {
      return Array(3).fill("https://plus.unsplash.com/premium_photo-1664392147011-2a720f214e01?q=80&w=878&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
    }

    const visible = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % images.length;
      visible.push({
        src: images[index],
        id: `${index}-${Date.now()}-${Math.random()}`,
        position: i
      });
    }
    return visible;
  };

  // Handle slide to next
  const slideToNext = () => {
    if (isAnimating || !isInitialized) return;

    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex(prev => (prev + 1) % images.length);
      setTimeout(() => setIsAnimating(false), 50);
    }, 600);
  };

  // Initialize and start slider
  useEffect(() => {
    dispatch(recordListAction.doCount());
    dispatch(recordListAction.doCountDay());
    initializeImages();
  }, [dispatch]);

  // Start automatic sliding
  useEffect(() => {
    if (!isInitialized) return;
    const interval = setInterval(slideToNext, 3000);
    return () => clearInterval(interval);
  }, [isInitialized, isAnimating]);

  // Check user conditions - Show messages on mount when conditions are met
  useEffect(() => {
    if (currentUser.balance <= 0) {
      Message.error('Insufficient balance. Please top up your account to continue.');
    }

    if (currentUser.tasksDone >= currentUser.vip.dailyorder) {
      Message.success('You have completed all available tasks. Please contact customer support to reset your account.');
    }
  }, [currentUser.balance, currentUser.tasksDone, currentUser.vip.dailyorder]);

  const rollAll = async () => {
    if (currentUser.balance <= 0) {
      Message.error('Insufficient balance. Please top up your account to continue.');
      return; // Don't proceed to rollAll
    }

    if (currentUser.tasksDone >= currentUser.vip.dailyorder) {
      Message.success('You have completed all available tasks. Please contact customer support to reset your account.');
      return; // Don't proceed to rollAll
    }

    // If all conditions pass, execute rollAll
    await dispatch(actions.doFetch());
  };

  const hideModal = () => {
    dispatch(productListActions.doCloseModal());
  };


  const submit = async () => {
    const values = {
      number: number,
      product: items?.id,
      status: items?.type === "combo" ? "pending" : "completed",
      user: currentUser.id,
    };
    await dispatch(recordActions.doCreate(values));
  };

  const visibleImages = getVisibleImages();

  return (
    <div className="grappage-container">
      {/* Header Section */}
      <div className="grappage-header">
        <div className="user-greeting">
          <div className="greeting-content">
            <img src="/images/user.png" alt="User" className="user-avatar" />
            <span className="greeting-text">
              {i18n('pages.grab.greeting', currentUser.fullName)}
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
              <div className="stat-title">{i18n('pages.grab.totalAmount')}</div>
              <div className="stat-subtitle">{i18n('pages.grab.profitsAdded')}</div>
            </div>
          </div>
          <div className="stat-amount">
            <div className="amount-value">{currentUser.balance.toFixed(2)}</div>
            <div className="amount-currency">{i18n('pages.grab.currency')}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-content">
            <div className="stat-icon">
              <img src="/images/T.png" alt="Commission" />
            </div>
            <div className="stat-info">
              <div className="stat-title">{i18n('pages.grab.todaysCommission')}</div>
              <div className="stat-subtitle">{i18n('pages.grab.commissionEarned')}</div>
            </div>
          </div>
          <div className="stat-amount">
            <div className="amount-value">{totalperday}</div>
            <div className="amount-currency">{i18n('pages.grab.currency')}</div>
          </div>
        </div>
      </div>

      {/* Optimization Section */}
      <div className="optimization-section">
        <div className="optimization-header">
          <span>{i18n('pages.grab.startOptimization')}</span>
          <span className="progress-count">
            {i18n('pages.grab.progressCount', currentUser?.tasksDone, currentUser?.vip?.dailyorder)}
          </span>
        </div>
      </div>

      {/* Main Game Area */}
      <div className="game-grid-section">
        <div className="game-header">
          <div className="vip-info">
            <div className="vip-title">{record?.vip?.title}</div>
            <div className="commission-rate">
              <span className="rate-label">{i18n('pages.grab.commissionRate')}: </span>
              <span className="rate-value">{record?.vip?.comisionrate}%</span>
            </div>
          </div>
          <div className="channel-info">
            <span>{i18n('pages.grab.exclusiveChannel')}</span>
          </div>
        </div>

        {/* Slider Container */}
        <div className="slider-container">
          <div className="slider-wrapper">
            <div className={`slider-viewport ${isAnimating ? 'sliding' : ''}`}>
              {visibleImages.map((item, index) => (
                <div
                  key={item.id}
                  className={`slider-item ${index === 1 ? 'active' : ''}`}
                  data-position={index}
                >
                  <div className="image-container">
                    <img
                      src={item.src}
                      alt={`Product ${index + 1}`}
                      className="slider-image"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/images/default-product.png";
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Start Button - Always clickable */}
          <div className="game-grid">
            <button
              className={`start-button ${loading ? "loading" : ""}`}
              onClick={rollAll}
              disabled={loading} // Only disable when loading
            >
              <span className="button-text">
                {loading ? i18n('pages.grab.processing') : i18n('pages.grab.startButton')}
              </span>
            </button>
          </div>
        </div>

        <div className="channel-footer">
          <span>{i18n('pages.grab.exclusiveChannel')}</span>
        </div>
      </div>

      {/* Notice Section */}
      <div className="notice-section">
        <div className="notice-header">
          <b>{i18n('pages.grab.notice')}:</b>
        </div>
        <ul className="notice-list">
          <li>{i18n('pages.grab.supportHours')}</li>
          <li>{i18n('pages.grab.contactSupport')}</li>
        </ul>
      </div>

      {/* Loading and Modals */}
      {loading && <LoadingModal />}
      {items && items?.type === "prizes" && Modal && !loading && (
        <PrizeModal
          items={items}
          number={number}
          hideModal={hideModal}
          submit={submit}
        />
      )}
      {Modal && !loading && (
        <GrapModal
          items={items}
          number={number}
          hideModal={hideModal}
          submit={submit}
        />
      )}

      <style>{`
        .grappage-container {
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

        /* Slider Container */
        .slider-container {
          margin: 20px 0;
          position: relative;
        }

        .slider-wrapper {
          position: relative;
          width: 100%;
          height: 250px;
          overflow: hidden;
        }

        .slider-viewport {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          position: relative;
          width: 100%;
        }

        .slider-viewport.sliding {
          animation: slideViewport 0.6s ease-in-out;
        }

        @keyframes slideViewport {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.33%);
          }
        }

        .slider-item {
          position: absolute;
          transition: all 0.6s ease;
          border-radius: 16px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .slider-item[data-position="0"] {
          width: 180px;
          height: 180px;
          left: 10%;
          opacity: 0.7;
          transform: translateX(0) scale(0.85);
          z-index: 1;
        }

        .slider-item[data-position="1"] {
          width: 250px;
          height: 250px;
          left: 50%;
          transform: translateX(-50%) scale(1);
          opacity: 1;
          z-index: 3;
          box-shadow: 0 10px 40px rgba(66, 153, 225, 0.4);
        }

        .slider-item[data-position="2"] {
          width: 180px;
          height: 180px;
          left: 90%;
          transform: translateX(-100%) scale(0.85);
          opacity: 0.7;
          z-index: 1;
        }

        .slider-item.active .image-container {
          border: 3px solid #4299E1;
        }

        .image-container {
          width: 100%;
          height: 100%;
          border-radius: 16px;
          overflow: hidden;
          border: 2px solid #E2E8F0;
          background: #F7FAFC;
        }

        .slider-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .slider-item.active .slider-image:hover {
          transform: scale(1.05);
        }

        /* Game Grid for Start Button */
        .game-grid {
          margin: 20px 0;
          display: flex;
          justify-content: center;
        }

        /* Start Button - Always enabled */
        .start-button {
          width: 280px;
          height: 60px;
          background: linear-gradient(135deg, #48BB78 0%, #38A169 100%);
          border: none;
          border-radius: 16px;
          color: white;
          font-size: 18px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 15px rgba(72, 187, 120, 0.3);
          position: relative;
          overflow: hidden;
        }

        .start-button:hover:not(.loading) {
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(72, 187, 120, 0.4);
          background: linear-gradient(135deg, #38A169 0%, #2F855A 100%);
        }

        .start-button:active:not(.loading) {
          transform: translateY(0);
          box-shadow: 0 4px 12px rgba(72, 187, 120, 0.3);
        }

        .start-button.loading {
          background: linear-gradient(135deg, #A0AEC0 0%, #718096 100%);
          cursor: not-allowed;
        }

        .start-button.loading::after {
          content: '';
          position: absolute;
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        .button-text {
          font-size: 18px;
          font-weight: 700;
          text-align: center;
        }

        .start-button.loading .button-text {
          margin-right: 10px;
        }

        .channel-footer {
          text-align: center;
          color: #718096;
          font-size: 12px;
          padding-top: 20px;
          border-top: 1px solid #E2E8F0;
          margin-top: 10px;
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
        }

        .notice-list li {
          margin-bottom: 4px;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .slider-wrapper {
            height: 220px;
          }
          
          .slider-item[data-position="0"],
          .slider-item[data-position="2"] {
            width: 150px;
            height: 150px;
          }
          
          .slider-item[data-position="1"] {
            width: 220px;
            height: 220px;
          }
          
          .slider-item[data-position="0"] {
            left: 5%;
          }
          
          .slider-item[data-position="2"] {
            left: 95%;
          }
          
          .start-button {
            width: 240px;
            height: 56px;
          }
          
          .button-text {
            font-size: 16px;
          }
        }

        @media (max-width: 640px) {
          .slider-wrapper {
            height: 200px;
          }
          
          .slider-item[data-position="0"],
          .slider-item[data-position="2"] {
            width: 120px;
            height: 120px;
            left: 0%;
          }
          
          .slider-item[data-position="1"] {
            width: 180px;
            height: 180px;
          }
          
          .slider-item[data-position="2"] {
            left: 100%;
            transform: translateX(-120%) scale(0.85);
          }
          
          .start-button {
            width: 200px;
            height: 52px;
          }
          
          .button-text {
            font-size: 14px;
          }
        }

        @media (max-width: 480px) {
          .grappage-container {
            padding: 16px;
          }
          
          .user-greeting {
            padding: 14px 16px;
            gap: 12px;
            align-items: flex-start;
          }
          
          .vip-badge {
            align-self: flex-end;
          }
          
          .stat-card {
            padding: 16px;

            // flex-direction: column;
            gap: 15px;
            text-align: center;
          }
          
          .stat-content {
            // flex-direction: column;
            text-align: left;
          }
          
          .stat-amount {
            text-align: center;
          }
          
          .game-grid-section {
            padding: 16px;
          }
          
          .slider-wrapper {
            height: 180px;
          }
          
          .slider-item[data-position="0"],
          .slider-item[data-position="2"] {
            width: 100px;
            height: 100px;
          }
          
          .slider-item[data-position="1"] {
            width: 160px;
            height: 160px;
          }
          
          .start-button {
            width: 180px;
            height: 48px;
          }
          
          .button-text {
            font-size: 14px;
          }
        }

        @media (max-width: 360px) {
          .slider-wrapper {
            height: 160px;
          }
          
          .slider-item[data-position="0"],
          .slider-item[data-position="2"] {
            width: 80px;
            height: 80px;
          }
          
          .slider-item[data-position="1"] {
            width: 140px;
            height: 140px;
          }
          
          .start-button {
            width: 160px;
            height: 44px;
          }
          
          .button-text {
            font-size: 13px;
          }
        }

        @media (max-width: 320px) {
          .slider-wrapper {
            height: 140px;
          }
          
          .slider-item[data-position="0"],
          .slider-item[data-position="2"] {
            width: 70px;
            height: 70px;
          }
          
          .slider-item[data-position="1"] {
            width: 120px;
            height: 120px;
          }
          
          .start-button {
            width: 140px;
            height: 40px;
          }
          
          .button-text {
            font-size: 12px;
          }
        }
      `}</style>
    </div>
  );
};

export default Grappage;