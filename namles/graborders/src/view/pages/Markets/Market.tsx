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

function Market() {
  const MarketContainer = styled.div`
    top: 0;
    background-color: #EDF1F7;
    with: 100dvw;
    width: 100%;
    height: auto;
    position: absolute;
    left: 0;
    min-height: 100vh;
  `;

  const dispatch = useDispatch();
  const record = useSelector(selector.selectRows);
  const logorecord = useSelector(selectors.selectRows);
  const loadingImage = useSelector(selectors?.selectLoading);
  const [timemodal, setBigModal] = useState(true);
  const loading = useSelector(selector.selectLoading);
  const [Modal, setShowModal] = useState(false);
  const currentUser = useSelector(authSelectors.selectCurrentUser);
  const searchAllCoins = async () => { };
  interface DataItem {
    image: string;
    title: string;
    Entrylimit: string;
    levellimit: string;
    dailyorder: string;
    comisionrate: string;
  }
  const [selectedItem, setItems] = useState<DataItem | null>(null);

  const currentDate = () => {
    const californiaTimezone = "America/Los_Angeles"; // Timezone for California
    const options = { timeZone: californiaTimezone };
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

  const hideModal = () => {
    setShowModal(false);
  };

  const showModal = (item) => {
    setItems(item);
    setShowModal(true);
  };

  const button__action = [
    {
      icon: "fa-solid fa-headphones",
      text: "Services",
      link: "/Online",
    },
    {
      icon: "fa-solid fa-calendar",
      text: "Events",
      link: "/events",
    },
    {
      icon: "fa-regular fa-building",
      text: "About",
      link: "/company",
    },
    {
      icon: "fa-solid fa-file-contract",
      text: "T&C",
      link: "/tc",
    },
    {
      icon: "fa fa-certificate",
      text: "Certificate",
      link: "/Certificate",
    },
    {
      icon: "fa-solid fa-question",
      text: "FAQs",
      link: "/faqs",
    },
  ];

  const submit = (item) => {
    const data = {
      vip: item,
    };
    dispatch(actions.doUpdateProfileMobile(data));
  };

  const NewsTicker = ({ text }) => {
    return (
      <div className="news-ticker-container">
        <div className="news-ticker">
          <span>{text}</span>
        </div>
      </div>
    );
  };

  useEffect(() => { });

  return (
    <MarketContainer>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div className="advertise__header">
          <video
            className="w-full h-full"
            autoPlay
            loop
            playsInline
            style={{ zIndex: 1, width: "100%" }}
          >
            <source src="/video/gtb2.mp4" type="video/mp4" />
          </video>

          <div className="advertise__profile">
            <div className="welcome">
              <img src="/images/user.png" alt="" className="user__png" />
              <b> Hi, {currentUser.fullName} </b> Welcome Back 👏
            </div>
            <div>
              <Link to="/profile">
                <img src="/images/circle.png" alt="" className="user__png" />
              </Link>
            </div>
          </div>
        </div>
        <div className="home__section">
          <div className="advertise__speaker">
            <div>
              <i className="fa-solid fa-volume-off speaker"></i>
            </div>

            <div className="marquee">
              <span>
                Dear users,the Wappier platform is back to the best and normal,continue to earn as much as you can from the platform
              </span>
            </div>
            <NewsTicker text="" />
          </div>

          <div className="adverstise__actions">
            {button__action.map((item) => (
              <Link to={item.link} className="remove__ligne">
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
              <h3 className="employee-level-title">Employee Levels</h3>
              <p className="employee-level-subtitle">Choose your level to maximize your earnings</p>

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
                            Current
                          </div>
                        ) : (
                          <div className="upgrade-level-indicator">
                            Upgrade
                          </div>
                        )}
                      </div>

                      <div className="vip-level-content">
                        <div className="vip-level-image">
                          <img
                            src={item?.photo[0]?.downloadUrl}
                            alt={item?.title}
                            className="level-image"
                          />
                        </div>

                        <div className="vip-level-info">
                          <h4 className="level-title">{item?.title}</h4>

                          <div className="level-features">
                            <div className="feature-item">
                              <i className="fa-solid fa-chart-line feature-icon"></i>
                              <span>{item.comisionrate}% profit on normal products</span>
                            </div>
                            <div className="feature-item">
                              <i className="fa-solid fa-star feature-icon"></i>
                              <span>{item.commissionmergedata}% profit on premium products</span>
                            </div>
                            <div className="feature-item">
                              <i className="fa-solid fa-box feature-icon"></i>
                              <span>Max {item.tasksperday} orders per day</span>
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
                <h3 className="modal-title">{selectedItem?.title}</h3>
                <div className="modal-close" onClick={() => hideModal()}>
                  <i className="fa-solid fa-times"></i>
                </div>
              </div>

              <div className="modal-body-section">

                <div className="level-details">
                  <div className="detail-item">
                    <i className="fa-solid fa-layer-group"></i>
                    <div className="detail-content">
                      <span className="detail-label">Level Limit</span>
                      <span className="detail-value">{selectedItem?.levellimit}</span>
                    </div>
                  </div>

                  <div className="detail-item">
                    <i className="fa-solid fa-calendar-day"></i>
                    <div className="detail-content">
                      <span className="detail-label">Daily Orders</span>
                      <span className="detail-value">{selectedItem?.dailyorder}</span>
                    </div>
                  </div>

                  <div className="detail-item">
                    <i className="fa-solid fa-percentage"></i>
                    <div className="detail-content">
                      <span className="detail-label">Commission Rate</span>
                      <span className="detail-value">{selectedItem?.comisionrate}%</span>
                    </div>
                  </div>
                </div>

              
              </div>

              <div className="modal-actions">
                <button className="cancel-upgrade-btn" onClick={() => hideModal()}>
                  Cancel
                </button>
                <button className="confirm-upgrade-btn" onClick={() => submit(selectedItem)}>
                  <i className="fa-solid fa-arrow-up"></i>
                  Upgrade Now
                </button>
              </div>
            </div>
          </div>
        )}

        <style>{`
          /* Header Styles */
          

          .user__png {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            object-fit: cover;
          }

          /* Speaker/Announcement Styles */
          .advertise__speaker {
            background: #FFFFFF;
            margin: 15px;
            padding: 12px 16px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            gap: 12px;
            border: 1px solid #E2E8F0;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
          }

          .speaker {
            color: #4299E1;
            font-size: 16px;
          }

          .marquee {
            flex: 1;
            overflow: hidden;
          }

          .marquee span {
            color: #4A5568;
            font-size: 13px;
            font-weight: 400;
            white-space: nowrap;
            animation: marquee 15s linear infinite;
          }

          @keyframes marquee {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
          }

          /* Action Buttons */
          .adverstise__actions {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 15px;
            padding: 0 15px 20px;
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
          }

          /* VIP Content - IMPROVED DESIGN */
          .advertise__content {
            padding: 0 15px 20px;
    margin-bottom: 100px;
}
          }

          .content__header {
            background: #FFFFFF;
            border-radius: 20px;
            padding: 24px;
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

          .level-stats {
            display: flex;
            gap: 16px;
            background: #F7FAFC;
            padding: 12px;
            border-radius: 8px;
            border: 1px solid #E2E8F0;
          }

          .stat {
            flex: 1;
            text-align: center;
          }

          .stat-label {
            color: #718096;
            font-size: 11px;
            font-weight: 600;
            text-transform: uppercase;
            margin-bottom: 4px;
          }

          .stat-value {
            color: #1A202C;
            font-size: 16px;
            font-weight: 700;
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

          .upgrade-benefits {
            background: #EDF2F7;
            padding: 20px;
            border-radius: 12px;
            border: 1px solid #E2E8F0;
          }

          .upgrade-benefits h4 {
            color: #1A202C;
            font-size: 16px;
            font-weight: 700;
            margin: 0 0 12px 0;
          }

          .upgrade-benefits ul {
            color: #4A5568;
            font-size: 14px;
            line-height: 1.6;
            margin: 0;
            padding-left: 20px;
          }

          .upgrade-benefits li {
            margin-bottom: 6px;
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
            .adverstise__actions {
              grid-template-columns: repeat(3, 1fr);
              gap: 12px;
              padding: 0 12px 15px;
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

            .content__header {
              padding: 20px;
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

            .level-stats {
              justify-content: center;
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

export default Market;