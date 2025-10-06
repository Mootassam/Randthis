import { useEffect, useState } from "react";
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

function Home() {
  const dispatch = useDispatch();
  const record = useSelector(selector.selectRows);
  const logorecord = useSelector(selectors.selectRows);
  const loadingImage = useSelector(selectors?.selectLoading);
  const [timemodal, setBigModal] = useState(true);
  const loading = useSelector(selector.selectLoading);
  const [Modal, setShowModal] = useState(false);
  const currentUser = useSelector(authSelectors.selectCurrentUser);
  const [currentSlide, setCurrentSlide] = useState(0);
  const searchAllCoins = async () => { };

  const [selectedItem, setItems] = useState<DataItem | null>(null);

  const currentDate = () => {
    const californiaTimezone = "America/Los_Angeles";
    const options: Intl.DateTimeFormatOptions = { timeZone: californiaTimezone };
    const currentDateTime = new Date().toLocaleString("en-US", options);
    return currentDateTime;
  };

  const dolistCompany = () => {
    dispatch(listactions.doFetch());
  };

  useEffect(() => {
    dolistCompany();
    searchAllCoins();
    dispatch(Vipactions.doFetch());
    currentDate();

    // eslint-disable-next-line
  }, [dispatch]);

  // Auto slide effect
  useEffect(() => {
    const sliderInterval = setInterval(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === Images.length - 1 ? 0 : prevSlide + 1
      );
    }, 3000);

    return () => {
      clearInterval(sliderInterval);
    };
  }, []);

  const hideModal = () => {
    setShowModal(false);
  };

  const showModal = (item: DataItem) => {
    setItems(item);
    setShowModal(true);
  };

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

  const submit = (item: DataItem) => {
    const data = {
      vip: item,
    };
    dispatch(actions.doUpdateProfileMobile(data));
  };

  // Fixed NewsTicker component with proper marquee
  const NewsTicker = ({ text }: { text: string }) => {
    return (
      <div className="news-ticker-container">
        <div className="news-ticker-content">
          <span>{text}</span>
        </div>
      </div>
    );
  };

  const Images = [
    "https://nowspeed.com/wp-content/uploads/nowspeed-geo-visibility-1024x576.jpg",
    "/images/help.png",
    "https://nowspeed.com/wp-content/uploads/jennifer-anderson-blog-1024x576.png",
    "https://nowspeed.com/wp-content/uploads/nathan-girard-blog-1024x576.png",
    "https://nowspeed.com/wp-content/uploads/dan-stradtman-blog-1024x576.png"
  ];

  return (
    <MarketContainer>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header with Image Slider */}
        <div className="advertise__header">
      
      <img src="/images/home/home.png" alt="" srcset="" />
        </div>

        <div className="home__section">
          {/* FIXED: Announcement section with working marquee */}
          <div className="advertise__speaker">
            <div>
              <i className="fa-solid fa-volume-high speaker"></i>
            </div>
            <div className="announcement-container">
              <div className="announcement-text">
                <span>
                  {i18n('pages.home.announcement')} - Welcome to our platform! Important updates and news will be displayed here.
                </span>
              </div>
            </div>
          </div>

          <div className="adverstise__actions">
            {button__action.map((item, index) => (
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
            ))}
          </div>

          <div className="advertise__content">
            <div className="content__header">
              <h3 className="employee-level-title">{i18n('pages.home.levels')}</h3>
              <p className="employee-level-subtitle">{i18n('pages.home.chooseLevel')}</p>

              {loading && <LoadingModal />}
              {!loading && record && (
                <div className="vip-levels-grid">
                  {record?.map((item, index) => (
                    <div
                      className={`vip-level-card ${currentUser?.vip?.id === item.id ? 'vip-level-active' : ''}`}
                      onClick={() => showModal(item)}
                      key={index}
                    >
                      <div className="vip-level-badge">
                        {currentUser?.vip?.id === item.id ? (
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
                            src={item?.photo?.[0]?.downloadUrl || "/default-image.png"}
                            alt={item?.title}
                            className="level-image"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "/default-image.png";
                            }}
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
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>

        {selectedItem && Modal && (
          <div className="upgrade-modal-overlay">
            <div className="upgrade-modal-content">
              <div className="modal-header-section">
                <h3 className="modal-title">{i18n('pages.home.modal.levelDetails')}</h3>
                <div className="modal-close" onClick={() => hideModal()}>
                  <i className="fa-solid fa-times"></i>
                </div>
              </div>

              <div className="modal-body-section">
                <div className="level-preview">
                  <div className="preview-image">
                    <img
                      src={selectedItem?.photo?.[0]?.downloadUrl || "/default-image.png"}
                      alt={selectedItem?.title}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/default-image.png";
                      }}
                    />
                  </div>
                </div>

                <div className="level-details">
                  <div className="detail-item">
                    <i className="fa-solid fa-layer-group"></i>
                    <div className="detail-content">
                      <span className="detail-label">{i18n('pages.home.modal.levelLimit')}</span>
                      <span className="detail-value">{selectedItem?.levellimit}</span>
                    </div>
                  </div>

                  <div className="detail-item">
                    <i className="fa-solid fa-calendar-day"></i>
                    <div className="detail-content">
                      <span className="detail-label">{i18n('pages.home.modal.dailyOrders')}</span>
                      <span className="detail-value">{selectedItem?.dailyorder}</span>
                    </div>
                  </div>

                  <div className="detail-item">
                    <i className="fa-solid fa-percentage"></i>
                    <div className="detail-content">
                      <span className="detail-label">{i18n('pages.home.modal.commissionRate')}</span>
                      <span className="detail-value">{selectedItem?.comisionrate}%</span>
                    </div>
                  </div>
                </div>

              </div>

              <div className="modal-actions">
                <button className="cancel-upgrade-btn" onClick={() => hideModal()}>
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

        <style>{`
          /* Image Slider Styles */
          .image-slider {
            position: relative;
            width: 100%;
            max-width: 400px;
            height: 200px;
            overflow: hidden;
            background: #000;
            margin: 0 auto;
            border-radius: 12px;
          }

          .slide {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
            transition: opacity 0.8s ease-in-out;
          }

          .slide.active {
            opacity: 1;
          }

          .slider-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
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
          }

          .indicator.active {
            background: #FFFFFF;
            transform: scale(1.2);
          }

          .indicator:hover {
            background: #FFFFFF;
          }

          /* FIXED: Announcement Styles */
          .advertise__speaker {
            background: #FFFFFF;
            padding: 12px 16px;
            max-width: 370px;
            margin: 15px auto 0 auto;
            border-radius: 12px;
            display: flex;
            align-items: center;
            gap: 12px;
            border: 1px solid #E2E8F0;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
            overflow: hidden;
          }

          .speaker {
            color: #4299E1;
            font-size: 16px;
            flex-shrink: 0;
          }

          .announcement-container {
            flex: 1;
            overflow: hidden;
            position: relative;
          }

          .announcement-text {
            white-space: nowrap;
            animation: marquee 15s linear infinite;
          }

          .announcement-text span {
            color: #4A5568;
            font-size: 13px;
            font-weight: 400;
          }

          @keyframes marquee {
            0% {
              transform: translateX(100%);
            }
            100% {
              transform: translateX(-100%);
            }
          }

          /* Pause animation on hover */
          .announcement-container:hover .announcement-text {
            animation-play-state: paused;
          }

          /* Action Buttons */
          .adverstise__actions {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 15px;
            padding: 20px 15px;
            max-width: 400px;
            margin: 0 auto;
          }

          .remove__ligne {
            text-decoration: none;
          }

          .button__action {
            background: #FFFFFF;
            border-radius: 12px;
            padding: 20px 10px;
            text-align: center;
            transition: all 0.3s ease;
            border: 1px solid #E2E8F0;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
            cursor: pointer;
          }

          .button__action:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            border-color: #4299E1;
          }

          .action__cirlce {
            width: 50px;
            height: 50px;
            background: rgba(66, 153, 225, 0.1);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 10px;
            border: 2px solid #4299E1;
          }

          .icon__action {
            color: #4299E1;
            font-size: 20px;
          }

          .action__label {
            color: #2D3748;
            font-size: 12px;
            font-weight: 600;
            margin: 0;
            cursor: pointer;
            display: block;
          }

          /* VIP Content */
          .advertise__content {
            padding: 0 15px 20px;
            margin-bottom: 100px;
            max-width: 400px;
            margin: 0 auto;
          }

          .content__header {
            background: #FFFFFF;
            border-radius: 20px;
            padding: 24px 20px;
            border: 1px solid #E2E8F0;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
          }

          .employee-level-title {
            color: #1A202C;
            font-size: 24px;
            font-weight: 700;
            margin: 0 0 8px 0;
            text-align: center;
            background: linear-gradient(135deg, #4299E1, #3182CE);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }

          .employee-level-subtitle {
            color: #718096;
            font-size: 14px;
            text-align: center;
            margin: 0 0 30px 0;
            font-weight: 400;
          }

          .vip-levels-grid {
            display: flex;
            flex-direction: column;
            gap: 20px;
          }

          .vip-level-card {
            background: #FFFFFF;
            border: 2px solid #E2E8F0;
            border-radius: 16px;
            padding: 20px;
            transition: all 0.3s ease;
            cursor: pointer;
            position: relative;
            overflow: hidden;
          }

          .vip-level-card:hover {
            border-color: #4299E1;
            transform: translateY(-4px);
            box-shadow: 0 8px 30px rgba(66, 153, 225, 0.15);
          }

          .vip-level-card.vip-level-active {
            border-color: #48BB78;
            background: linear-gradient(135deg, #FFFFFF, #F0FFF4);
            box-shadow: 0 8px 30px rgba(72, 187, 120, 0.15);
          }

          .vip-level-badge {
            position: absolute;
            top: 16px;
            right: 16px;
            z-index: 2;
          }

          .current-level-indicator {
            background: linear-gradient(135deg, #48BB78, #38A169);
            color: white;
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 11px;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 4px;
            box-shadow: 0 2px 8px rgba(72, 187, 120, 0.3);
          }

          .upgrade-level-indicator {
            background: linear-gradient(135deg, #4299E1, #3182CE);
            color: white;
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 11px;
            font-weight: 600;
            box-shadow: 0 2px 8px rgba(66, 153, 225, 0.3);
          }

          .vip-level-content {
            display: flex;
            align-items: flex-start;
            gap: 16px;
          }

          .vip-level-image {
            flex-shrink: 0;
            width: 80px;
            height: 80px;
            border-radius: 12px;
            overflow: hidden;
            border: 3px solid #E2E8F0;
            background: #F7FAFC;
            display: flex;
            align-items: center;
            justify-content: center;
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
            min-width: 0;
          }

          .level-title {
            color: #1A202C;
            font-size: 18px;
            font-weight: 700;
            margin: 0 0 12px 0;
          }

          .level-features {
            display: flex;
            flex-direction: column;
            gap: 8px;
            margin-bottom: 16px;
          }

          .feature-item {
            display: flex;
            align-items: center;
            gap: 8px;
            color: #4A5568;
            font-size: 13px;
          }

          .feature-icon {
            color: #4299E1;
            font-size: 12px;
            width: 16px;
            text-align: center;
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
            backdrop-filter: blur(8px);
          }

          .upgrade-modal-content {
            background: #FFFFFF;
            border-radius: 20px;
            padding: 0;
            width: 100%;
            max-width: 400px;
            border: 1px solid #E2E8F0;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
            overflow: hidden;
          }

          .modal-header-section {
            background: linear-gradient(135deg, #4299E1, #3182CE);
            padding: 24px;
            text-align: center;
            position: relative;
          }

          .modal-title {
            color: #FFFFFF;
            font-size: 22px;
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
          }

          .modal-close:hover {
            opacity: 1;
          }

          .modal-body-section {
            padding: 24px;
          }

          .level-preview {
            text-align: center;
            margin-bottom: 24px;
          }

          .preview-image {
            width: 120px;
            height: 120px;
            border-radius: 16px;
            overflow: hidden;
            margin: 0 auto;
            border: 4px solid #E2E8F0;
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
            gap: 16px;
            margin-bottom: 24px;
          }

          .detail-item {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 16px;
            background: #F7FAFC;
            border-radius: 12px;
            border: 1px solid #E2E8F0;
          }

          .detail-item i {
            color: #4299E1;
            font-size: 20px;
            width: 24px;
          }

          .detail-content {
            display: flex;
            flex-direction: column;
          }

          .detail-label {
            color: #718096;
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
          }

          .detail-value {
            color: #1A202C;
            font-size: 16px;
            font-weight: 700;
          }

          .modal-actions {
            display: flex;
            gap: 12px;
            padding: 0 24px 24px;
          }

          .cancel-upgrade-btn, .confirm-upgrade-btn {
            flex: 1;
            padding: 16px;
            border: none;
            border-radius: 12px;
            font-weight: 600;
            font-size: 15px;
            cursor: pointer;
            transition: all 0.3s ease;
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
            gap: 8px;
            box-shadow: 0 4px 15px rgba(72, 187, 120, 0.3);
          }

          .confirm-upgrade-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(72, 187, 120, 0.4);
          }

          /* Responsive Design */
          @media (max-width: 400px) {
            .image-slider {
              height: 180px;
            }

            .slider-indicators {
              bottom: 12px;
            }

            .indicator {
              width: 6px;
              height: 6px;
            }

            .adverstise__actions {
              grid-template-columns: repeat(3, 1fr);
              gap: 12px;
              padding: 20px 12px;
            }

            .button__action {
              padding: 15px 8px;
            }

            .action__cirlce {
              width: 45px;
              height: 45px;
            }

            .icon__action {
              font-size: 18px;
            }

            .advertise__content {
              padding: 0 12px 15px;
            }

            .vip-level-content {
              flex-direction: column;
              text-align: center;
              gap: 12px;
            }

            .vip-level-image {
              width: 70px;
              height: 70px;
              margin: 0 auto;
            }

            .modal-actions {
              flex-direction: column;
            }
          }
        `}</style>
      </div>
    </MarketContainer>
  );
}

export default Home;