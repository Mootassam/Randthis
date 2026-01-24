import { useEffect, useState, useCallback, memo } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Vipactions from "src/modules/vip/list/vipListActions";
import selector from "src/modules/vip/list/vipListSelectors";
import LoadingModal from "src/shared/LoadingModal";
import authSelectors from "src/modules/auth/authSelectors";
import actions from "src/modules/auth/authActions";
import listactions from "src/modules/company/list/companyListActions";
import selectors from "src/modules/company/list/companyListSelectors";
import { i18n } from "../../../i18n";

// Move styled component outside the component function
const MarketContainer = styled.div`
  top: 0;
  background-color: #EDF1F7;
  width: 100%;
  height: auto;
  position: absolute;
  left: 0;
  min-height: 100vh;
`;

interface DataItem {
  id: string;
  image: string;
  title: string;
  Entrylimit: string;
  levellimit: string;
  dailyorder: string;
  comisionrate: string;
  commissionmergedata?: string;
  tasksperday?: string;
  photo?: Array<{ downloadUrl: string }>;
}

// Memoized VIP Card Component for better performance
const VipLevelCard = memo(({
  item,
  isCurrent,
  onShowModal
}: {
  item: DataItem;
  isCurrent: boolean;
  onShowModal: (item: DataItem) => void;
}) => {


  return (
    <div
      className={`vip-level-card ${isCurrent ? 'vip-level-active' : ''}`}
      onClick={() => onShowModal(item)}
    >
      <div className="vip-level-badge">
        {isCurrent ? (
          <div className="current-level-indicator">
            <i className="fa-solid fa-crown"></i>
            {i18n('pages.home.currentLevel')}
          </div>
        ) : (
          <div className="upgrade-level-indicator">
            {i18n('pages.home.upgrade')}
          </div>
        )}
      </div>

      <div className="vip-level-content">
        <div className="vip-level-image">
          <img
            src={item?.photo?.[0]?.downloadUrl }
            alt={item?.title}
            className="level-image"
            loading="lazy"
          
          />
        </div>

        <div className="vip-level-info">
          <h4 className="level-title">{item?.title}</h4>

          <div className="level-features">
            <div className="feature-item">
              <i className="fa-solid fa-chart-line feature-icon"></i>
              <span>{item.comisionrate}% {i18n('pages.home.profitNormal')}</span>
            </div>
            <div className="feature-item">
              <i className="fa-solid fa-star feature-icon"></i>
              <span>{item.commissionmergedata}% {i18n('pages.home.profitPremium')}</span>
            </div>
            <div className="feature-item">
              <i className="fa-solid fa-box feature-icon"></i>
              <span>{i18n('pages.home.maxOrders')} {item.tasksperday}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

VipLevelCard.displayName = 'VipLevelCard';

// Memoized Action Button Component
const ActionButton = memo(({ item, index }: { item: any; index: number }) => (
  <Link to={item.link} className="remove__ligne" key={index}>
    <div className="button__action">
      <div className="action__cirlce">
        <i className={`${item.icon} icon__action`}></i>
      </div>
      <label htmlFor="" className="action__label">
        {item.text}
      </label>
    </div>
  </Link>
));

ActionButton.displayName = 'ActionButton';

function Home() {
  const dispatch = useDispatch();
  const record = useSelector(selector.selectRows);
  const loading = useSelector(selector.selectLoading);
  const currentUser = useSelector(authSelectors.selectCurrentUser);

  const [Modal, setShowModal] = useState(false);
  const [selectedItem, setItems] = useState<DataItem | null>(null);

  // Optimized image slider with proper state management
  const Images = [
    "https://nowspeed.com/wp-content/uploads/ns-content-marketing.jpg", // Use local image first
    "https://nowspeed.com/wp-content/uploads/ns-campaigns.jpg",
    "https://nowspeed.com/wp-content/uploads/aed8c19bc75f85346ff4c6e5265256a1.jpg",
    "https://nowspeed.com/wp-content/uploads/ns-seo.jpg"
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Memoized functions to prevent unnecessary re-renders
  const dolistCompany = useCallback(() => {
    dispatch(listactions.doFetch());
  }, [dispatch]);

  const fetchVipData = useCallback(() => {
    dispatch(Vipactions.doFetch());
  }, [dispatch]);

  const hideModal = useCallback(() => {
    setShowModal(false);
    setItems(null);
  }, []);

  const showModal = useCallback((item: DataItem) => {
    setItems(item);
    setShowModal(true);
  }, []);

  const submit = useCallback((item: DataItem) => {
    const data = {
      vip: item,
    };
    dispatch(actions.doUpdateProfileMobile(data));
    setShowModal(false);
    setItems(null);
  }, [dispatch]);

  // Single useEffect for all data fetching
  useEffect(() => {
    dolistCompany();
    fetchVipData();
  }, [dolistCompany, fetchVipData]);

  // Auto slide effect with cleanup
  useEffect(() => {
    const sliderInterval = setInterval(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === Images.length - 1 ? 0 : prevSlide + 1
      );
    }, 4000); // Increased interval for better performance

    return () => {
      clearInterval(sliderInterval);
    };
  }, [Images.length]);

  const button__action = [
    {
      icon: "fa-solid fa-headphones",
      text: i18n('pages.home.services'),
      link: "/Online",
    },
    {
      icon: "fa-solid fa-calendar",
      text: i18n('pages.home.events'),
      link: "/events",
    },
    {
      icon: "fa-regular fa-building",
      text: i18n('pages.home.about'),
      link: "/company",
    },
    {
      icon: "fa-solid fa-file-contract",
      text: i18n('pages.home.terms'),
      link: "/tc",
    },
    {
      icon: "fa fa-certificate",
      text: i18n('pages.home.certificate'),
      link: "/Certificate",
    },
    {
      icon: "fa-solid fa-question",
      text: i18n('pages.home.faqs'),
      link: "/faqs",
    },
  ];

  return (
    <MarketContainer>
      <div className="home-container">
        {/* Fixed Header with Image Slider */}
        <div className="advertise__header">
          <div className="image-slider">
            {Images.map((image, index) => (
              <div
                key={index}
                className={`slide ${index === currentSlide ? 'active' : ''}`}
              >
                <img
                  src={image}
                  alt={`Slide ${index + 1}`}
                  className="slider-image"
                  loading={index === 0 ? "eager" : "lazy"} // First image eager, others lazy
                />
              </div>
            ))}

            {/* Indicator dots */}
            <div className="slider-indicators">
              {Images.map((_, index) => (
                <button
                  key={index}
                  className={`indicator ${index === currentSlide ? 'active' : ''}`}
                  onClick={() => setCurrentSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="home__section">
          {/* Announcement section */}
          <div className="advertise__speaker">
            <div>
              <i className="fa-solid fa-volume-high speaker" aria-hidden="true"></i>
            </div>
            <div className="announcement-container">
              <div className="announcement-text">
                <span>
                  {i18n('pages.home.announcement')} - Welcome to our platform! Important updates and news will be displayed here.
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="adverstise__actions">
            {button__action.map((item, index) => (
              <ActionButton key={index} item={item} index={index} />
            ))}
          </div>

          {/* VIP Content Section */}
          <div className="advertise__content">
            <div className="content__header">
              <div className="section-header">
                <h3 className="employee-level-title">{i18n('pages.home.levels')}</h3>
                <p className="employee-level-subtitle">{i18n('pages.home.chooseLevel')}</p>

                {/* View All VIP Button as Link */}
                <Link to="/vip" className="view-all-btn">
                  <i className="fa-solid fa-grid"></i>
                  {i18n('pages.home.viewAllVIP')}
                </Link>
              </div>

              {loading && <LoadingModal />}
              {!loading && record && (
                <div className="vip-levels-grid horizontal-view">
                  {record.map((item, index) => (
                    <VipLevelCard
                      key={item.id || index}
                      item={item}
                      isCurrent={currentUser?.vip?.id === item.id}
                      onShowModal={showModal}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* VIP Level Modal */}
        {selectedItem && Modal && (
          <div className="upgrade-modal-overlay" onClick={hideModal}>
            <div className="upgrade-modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header-section">
                <h3 className="modal-title">{i18n('pages.home.modal.levelDetails')}</h3>
                <button className="modal-close" onClick={hideModal} aria-label="Close modal">
                  <i className="fa-solid fa-times"></i>
                </button>
              </div>

              <div className="modal-body-section">
                <div className="level-preview">
                  <div className="preview-image">
                    <img
                      src={selectedItem?.photo?.[0]?.downloadUrl }
                      alt={selectedItem?.title}
                      loading="lazy"
                  
                    />
                  </div>
                </div>

                <div className="level-details">
                  <div className="detail-item">
                    <i className="fa-solid fa-layer-group" aria-hidden="true"></i>
                    <div className="detail-content">
                      <span className="detail-label">{i18n('pages.home.modal.levelLimit')}</span>
                      <span className="detail-value">{selectedItem?.levellimit}</span>
                    </div>
                  </div>

                  <div className="detail-item">
                    <i className="fa-solid fa-calendar-day" aria-hidden="true"></i>
                    <div className="detail-content">
                      <span className="detail-label">{i18n('pages.home.modal.dailyOrders')}</span>
                      <span className="detail-value">{selectedItem?.dailyorder}</span>
                    </div>
                  </div>

                  <div className="detail-item">
                    <i className="fa-solid fa-percentage" aria-hidden="true"></i>
                    <div className="detail-content">
                      <span className="detail-label">{i18n('pages.home.modal.commissionRate')}</span>
                      <span className="detail-value">{selectedItem?.comisionrate}%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal-actions">
                <button className="cancel-upgrade-btn" onClick={hideModal}>
                  {i18n('pages.home.modal.cancel')}
                </button>
                <button className="confirm-upgrade-btn" onClick={() => submit(selectedItem)}>
                  <i className="fa-solid fa-arrow-up"></i>
                  {i18n('pages.home.modal.upgradeNow')}
                </button>
              </div>
            </div>
          </div>
        )}

        <style >{`
          /* Base Styles */
          .home-container {
            display: flex;
            flex-direction: column;
          }

          /* Fixed Image Slider Styles */
          .advertise__header {
            width: 100%;
            box-sizing: border-box;
            margin-top:49px;
          }

          .image-slider {
            position: relative;
            width: 100%;
            max-width: 1000px;
            height: 200px;
            overflow: hidden;
            background: #000;
            margin: 0 auto;
            // border-radius: 12px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          }

          .slide {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
            transition: opacity 0.5s ease-in-out;
          }

          .slide.active {
            opacity: 1;
          }

          .slider-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            background: #f0f0f0;
          }

          .slider-indicators {
            position: absolute;
            bottom: 15px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            gap: 8px;
            z-index: 2;
          }

          .indicator {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            cursor: pointer;
            transition: all 0.3s ease;
            border: none;
            padding: 0;
          }

          .indicator.active {
            background: #FFFFFF;
            transform: scale(1.2);
          }

          .indicator:hover {
            background: #FFFFFF;
          }

          /* Action Buttons */
          .adverstise__actions {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 12px;
            padding: 20px 15px;
            max-width: 1000px;
            margin: 0 auto;
          }

          .remove__ligne {
            text-decoration: none;
          }

          .button__action {
            background: #FFFFFF;
            border-radius: 12px;
            padding: 15px 8px;
            text-align: center;
            transition: all 0.2s ease;
            border: 1px solid #E2E8F0;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
            cursor: pointer;
          }

          .button__action:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            border-color: #4299E1;
          }

          .action__cirlce {
            width: 45px;
            height: 45px;
            background: rgba(66, 153, 225, 0.1);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 8px;
            border: 2px solid #4299E1;
          }

          .icon__action {
            color: #4299E1;
            font-size: 18px;
          }

          .action__label {
            color: #2D3748;
            font-size: 11px;
            font-weight: 600;
            margin: 0;
            cursor: pointer;
            display: block;
            line-height: 1.3;
          }

          /* VIP Content */
          .advertise__content {
            padding: 0 15px 20px;
            max-width: 1000px;
            margin: 0 auto;
          }

          .content__header {
            background: #FFFFFF;
            border-radius: 20px;
            padding: 20px;
            border: 1px solid #E2E8F0;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);

            margin-bottom:80px;
          }

          .section-header {
            text-align: center;
            margin-bottom: 20px;
          }

          /* View All Button as Link */
          .view-all-btn {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            border-radius: 25px;
            padding: 12px 24px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
            margin: 10px 0 20px 0;
            text-decoration: none;
          }

          .view-all-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
            color: white;
            text-decoration: none;
          }

          /* VIP Levels Grid */
          .vip-levels-grid.horizontal-view {
            display: flex;
            gap: 16px;
            overflow-x: auto;
            scrollbar-width: none;
            -ms-overflow-style: none;
            padding-bottom: 10px;
            -webkit-overflow-scrolling: touch;
            cursor: grab;
          }

          .vip-levels-grid::-webkit-scrollbar {
            display: none;
          }

          .vip-level-card {
            background: #FFFFFF;
            border: 2px solid #E2E8F0;
            border-radius: 16px;
            padding: 16px;
            transition: all 0.2s ease;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            flex: 0 0 auto;
            width: 260px;
            min-height: 160px;
          }

          .vip-level-card:hover {
            border-color: #4299E1;
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(66, 153, 225, 0.15);
          }

          .vip-level-card.vip-level-active {
            border-color: #48BB78;
            background: linear-gradient(135deg, #FFFFFF, #F0FFF4);
            box-shadow: 0 6px 20px rgba(72, 187, 120, 0.15);
          }

          .vip-level-badge {
            position: absolute;
            top: 12px;
            right: 12px;
            z-index: 2;
          }

          .current-level-indicator {
            background: linear-gradient(135deg, #48BB78, #38A169);
            color: white;
            padding: 4px 8px;
            border-radius: 12px;
            font-size: 10px;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 4px;
          }

          .upgrade-level-indicator {
            background: linear-gradient(135deg, #4299E1, #3182CE);
            color: white;
            padding: 4px 8px;
            border-radius: 12px;
            font-size: 10px;
            font-weight: 600;
          }

          .vip-level-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 10px;
            height: 100%;
          }

          .vip-level-image {
            width: 60px;
            height: 60px;
            border-radius: 10px;
            overflow: hidden;
            border: 2px solid #E2E8F0;
            background: #F7FAFC;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
          }

          .vip-level-card.vip-level-active .vip-level-image {
            border-color: #48BB78;
          }

          .level-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .vip-level-info {
            flex: 1;
            width: 100%;
          }

          .level-title {
            color: #1A202C;
            font-size: 15px;
            font-weight: 700;
            margin: 0 0 8px 0;
            line-height: 1.2;
          }

          .level-features {
            display: flex;
            flex-direction: column;
            gap: 4px;
          }

          .feature-item {
            display: flex;
            align-items: center;
            gap: 6px;
            color: #4A5568;
            font-size: 11px;
            justify-content: center;
            line-height: 1.2;
          }

          .feature-icon {
            color: #4299E1;
            font-size: 10px;
            width: 12px;
            text-align: center;
          }

          .employee-level-title {
            color: #1A202C;
            font-size: 22px;
            font-weight: 700;
            margin: 0 0 6px 0;
            text-align: center;
            background: linear-gradient(135deg, #4299E1, #3182CE);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }

          .employee-level-subtitle {
            color: #718096;
            font-size: 13px;
            text-align: center;
            margin: 0 0 10px 0;
            font-weight: 400;
          }

          /* Modal Styles */
          .upgrade-modal-overlay {
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
            backdrop-filter: blur(4px);
          }

          .upgrade-modal-content {
            background: #FFFFFF;
            border-radius: 20px;
            padding: 0;
            width: 100%;
            max-width: 380px;
            border: 1px solid #E2E8F0;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
            overflow: hidden;
          }

          .modal-header-section {
            background: linear-gradient(135deg, #4299E1, #3182CE);
            padding: 20px;
            text-align: center;
            position: relative;
          }

          .modal-title {
            color: #FFFFFF;
            font-size: 20px;
            font-weight: 700;
            margin: 0;
          }

          .modal-close {
            position: absolute;
            top: 16px;
            right: 16px;
            color: #FFFFFF;
            cursor: pointer;
            font-size: 18px;
            opacity: 0.8;
            transition: opacity 0.3s ease;
            background: none;
            border: none;
            padding: 4px;
          }

          .modal-close:hover {
            opacity: 1;
          }

          .modal-body-section {
            padding: 20px;
          }

          .level-preview {
            text-align: center;
            margin-bottom: 20px;
          }

          .preview-image {
            width: 100px;
            height: 100px;
            border-radius: 16px;
            overflow: hidden;
            margin: 0 auto;
            border: 3px solid #E2E8F0;
            background: #F7FAFC;
          }

          .preview-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .level-details {
            display: flex;
            flex-direction: column;
            gap: 12px;
            margin-bottom: 20px;
          }

          .detail-item {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 12px;
            background: #F7FAFC;
            border-radius: 10px;
            border: 1px solid #E2E8F0;
          }

          .detail-item i {
            color: #4299E1;
            font-size: 18px;
            width: 20px;
          }

          .detail-content {
            display: flex;
            flex-direction: column;
          }

          .detail-label {
            color: #718096;
            font-size: 11px;
            font-weight: 600;
            text-transform: uppercase;
          }

          .detail-value {
            color: #1A202C;
            font-size: 15px;
            font-weight: 700;
          }

          .modal-actions {
            display: flex;
            gap: 10px;
            padding: 0 20px 20px;
          }

          .cancel-upgrade-btn, .confirm-upgrade-btn {
            flex: 1;
            padding: 14px;
            border: none;
            border-radius: 12px;
            font-weight: 600;
            font-size: 14px;
            cursor: pointer;
            transition: all 0.2s ease;
          }

          .cancel-upgrade-btn {
            background: #F7FAFC;
            color: #4A5568;
            border: 2px solid #E2E8F0;
          }

          .cancel-upgrade-btn:hover {
            background: #EDF2F7;
            border-color: #CBD5E0;
          }

          .confirm-upgrade-btn {
            background: linear-gradient(135deg, #48BB78, #38A169);
            color: #FFFFFF;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
          }

          .confirm-upgrade-btn:hover {
            transform: translateY(-1px);
          }

          /* Performance Optimizations */
          @media (prefers-reduced-motion: reduce) {
            * {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
            }
          }

          /* Responsive Design */
          @media (max-width: 400px) {
            .image-slider {
              height: 180px;
            }

            .adverstise__actions {
              gap: 10px;
              padding: 15px 12px;
            }

            .button__action {
              padding: 12px 6px;
            }

            .action__cirlce {
              width: 40px;
              height: 40px;
            }

            .icon__action {
              font-size: 16px;
            }

            .action__label {
              font-size: 10px;
            }

            .vip-level-card {
              width: 240px;
              padding: 12px;
            }

            .view-all-btn {
              padding: 10px 20px;
              font-size: 13px;
            }
          }
        `}</style>
      </div>
    </MarketContainer>
  );
}

export default memo(Home);