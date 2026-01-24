import { useEffect, useState, useCallback, memo } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Vipactions from "src/modules/vip/list/vipListActions";
import selector from "src/modules/vip/list/vipListSelectors";
import LoadingModal from "src/shared/LoadingModal";
import authSelectors from "src/modules/auth/authSelectors";
import actions from "src/modules/auth/authActions";
import { i18n } from "../../../i18n";

// Styled container
const VipContainer = styled.div`
  top: 0;
  background-color: #EDF1F7;
  width: 100%;
  height: auto;
  position: absolute;
  left: 0;
  min-height: 100vh;
  padding-bottom: 80px;
`;

interface VipItem {
  id: string;
  title: string;
  Entrylimit: string;
  levellimit: string;
  dailyorder: string;
  comisionrate: string;
  commissionmergedata?: string;
  tasksperday?: string;
  photo?: Array<{ downloadUrl: string }>;
  description?: string;
  benefits?: string[];
  price?: string;
  setperday
}

function VipPage() {
  const dispatch = useDispatch();
  
  // Redux selectors
  const vipRecords = useSelector(selector.selectRows);
  const loading = useSelector(selector.selectLoading);
  const currentUser = useSelector(authSelectors.selectCurrentUser);
  
  // Local state
  const [selectedVip, setSelectedVip] = useState<VipItem | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [upgradingVipId, setUpgradingVipId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch VIP data on component mount
  useEffect(() => {
    dispatch(Vipactions.doFetch());
  }, [dispatch]);

  // Filter VIP levels based on search
  const filteredVipRecords = vipRecords?.filter((vip: VipItem) =>
    vip.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vip.description?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  // Memoized event handlers
  const handleShowModal = useCallback((vip: VipItem) => {
    setSelectedVip(vip);
    setShowModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    setSelectedVip(null);
  }, []);

  const handleUpgrade = useCallback(async (vip: VipItem) => {
    setUpgradingVipId(vip.id);
    try {
      const data = { vip };
      await dispatch(actions.doUpdateProfileMobile(data));
      setShowModal(false);
    } catch (error) {
      console.error('Upgrade failed:', error);
    } finally {
      setUpgradingVipId(null);
    }
  }, [dispatch]);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  // Check if user can upgrade to a VIP level
  const canUpgradeTo = useCallback((vip: VipItem) => {
    if (!currentUser?.vip?.id) return true;
    
    const currentLevel = vipRecords?.find((v: VipItem) => v.id === currentUser.vip.id);
    const targetLevel = vip;
    
    if (currentLevel && targetLevel) {
      return parseInt(targetLevel.levellimit) > parseInt(currentLevel.levellimit) ||
             parseInt(targetLevel.dailyorder) > parseInt(currentLevel.dailyorder);
    }
    
    return true;
  }, [currentUser, vipRecords]);

  // VIP Level Card Component
  const VipLevelCard = memo(({ vip }: { vip: VipItem }) => {
    const isCurrent = currentUser?.vip?.id === vip.id;
    const canUpgrade = canUpgradeTo(vip);
    const isLoading = upgradingVipId === vip.id;

    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
      e.currentTarget.src = "/default-image.png";
    };

    return (
      <div
        className={`vip-level-card ${isCurrent ? 'vip-level-active' : ''} ${!canUpgrade ? 'vip-level-locked' : ''}`}
        onClick={() => canUpgrade && handleShowModal(vip)}
      >
        {isLoading && (
          <div className="loading-overlay">
            <div className="loading-spinner"></div>
          </div>
        )}
        
        <div className="vip-level-badge">
          {isCurrent ? (
            <div className="current-level-indicator">
              <i className="fa-solid fa-crown"></i>
              {i18n('pages.vip.currentLevel')}
            </div>
          ) : !canUpgrade ? (
            <div className="locked-level-indicator">
              <i className="fa-solid fa-lock"></i>
              {i18n('pages.vip.locked')}
            </div>
          ) : (
            <div className="upgrade-level-indicator">
              {i18n('pages.vip.upgrade')}
            </div>
          )}
        </div>

        <div className="vip-level-content">
          <div className="vip-level-image">
            <img
              src={vip?.photo?.[0]?.downloadUrl || "/default-image.png"}
              alt={vip?.title}
              className="level-image"
              loading="lazy"
             
            />
          </div>

          <div className="vip-level-info">
            <h4 className="level-title">{vip?.title}</h4>
            
            {vip.description && (
              <p className="level-description">{vip.description}</p>
            )}

            <div className="level-features">
              <div className="feature-item">
                <i className="fa-solid fa-percentage feature-icon"></i>
                <span>{vip.comisionrate}% {i18n('pages.vip.commission')}</span>
              </div>
              
              {vip.commissionmergedata && (
                <div className="feature-item">
                  <i className="fa-solid fa-star feature-icon"></i>
                  <span>{vip.commissionmergedata}% {i18n('pages.vip.premiumCommission')}</span>
                </div>
              )}
              
              <div className="feature-item">
                <i className="fa-solid fa-box feature-icon"></i>
                <span>{i18n('pages.vip.maxOrders')}: {vip.tasksperday}</span>
              </div>
              
              <div className="feature-item">
                <i className="fa-solid fa-calendar-day feature-icon"></i>
                <span>{i18n('pages.vip.setperday')}: {vip.setperday}</span>
              </div>
            </div>

            {vip.price && (
              <div className="level-price">
                <i className="fa-solid fa-tag"></i>
                {vip.price}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  });

  VipLevelCard.displayName = 'VipLevelCard';

  return (
    <VipContainer>
      <div className="vip-page-container">
        {/* Header Section */}
        <div className="vip-header">
          <Link to="/" className="back-button">
            <i className="fa-solid fa-arrow-left"></i>
            {i18n('pages.vip.backToHome')}
          </Link>
          
          <div className="vip-header-content">
            <h1 className="vip-title">{i18n('pages.vip.title')}</h1>
            <p className="vip-subtitle">{i18n('pages.vip.subtitle')}</p>
            
            {/* Current VIP Status */}
            {currentUser?.vip && (
              <div className="current-vip-status">
                <div className="status-badge">
                  <i className="fa-solid fa-crown"></i>
                  {i18n('pages.vip.currentlyOn')}: {currentUser.vip.title}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Search Bar */}
        <div className="search-section">
          <div className="search-container">
            <i className="fa-solid fa-search search-icon"></i>
            <input
              type="text"
              placeholder={i18n('pages.vip.searchPlaceholder')}
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-input"
            />
            {searchTerm && (
              <button 
                className="clear-search"
                onClick={() => setSearchTerm("")}
              >
                <i className="fa-solid fa-times"></i>
              </button>
            )}
          </div>
        </div>

        {/* VIP Levels Grid */}
        <div className="vip-content">
          {loading && <LoadingModal />}
          
          {!loading && filteredVipRecords.length === 0 && (
            <div className="no-results">
              <i className="fa-solid fa-search"></i>
              <h3>{i18n('pages.vip.noResults')}</h3>
              <p>{i18n('pages.vip.noResultsDesc')}</p>
            </div>
          )}

          {!loading && filteredVipRecords.length > 0 && (
            <div className="vip-levels-grid">
              {filteredVipRecords.map((vip: VipItem, index: number) => (
                <VipLevelCard key={vip.id || index} vip={vip} />
              ))}
            </div>
          )}
        </div>

        {/* Upgrade Modal */}
        {selectedVip && showModal && (
          <div className="upgrade-modal-overlay" onClick={handleCloseModal}>
            <div className="upgrade-modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header-section">
                <h3 className="modal-title">{i18n('pages.vip.upgradeTo')} {selectedVip.title}</h3>
                <button className="modal-close" onClick={handleCloseModal}>
                  <i className="fa-solid fa-times"></i>
                </button>
              </div>

              <div className="modal-body-section">
                <div className="level-preview">
                  <div className="preview-image">
                    <img
                      src={selectedVip?.photo?.[0]?.downloadUrl || "/default-image.png"}
                      alt={selectedVip?.title}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/default-image.png";
                      }}
                    />
                  </div>
                  <h4 className="preview-title">{selectedVip.title}</h4>
                  {selectedVip.description && (
                    <p className="preview-description">{selectedVip.description}</p>
                  )}
                </div>

                <div className="level-details">
                  <h4 className="details-title">{i18n('pages.vip.levelDetails')}</h4>
                  
                  <div className="detail-item">
                    <i className="fa-solid fa-layer-group"></i>
                    <div className="detail-content">
                      <span className="detail-label">{i18n('pages.vip.levelLimit')}</span>
                      <span className="detail-value">{selectedVip.levellimit}</span>
                    </div>
                  </div>

                  <div className="detail-item">
                    <i className="fa-solid fa-calendar-day"></i>
                    <div className="detail-content">
                      <span className="detail-label">{i18n('pages.vip.setperday')}</span>
                      <span className="detail-value">{selectedVip.setperday}</span>
                    </div>
                  </div>

                  <div className="detail-item">
                    <i className="fa-solid fa-percentage"></i>
                    <div className="detail-content">
                      <span className="detail-label">{i18n('pages.vip.commissionRate')}</span>
                      <span className="detail-value">{selectedVip.comisionrate}%</span>
                    </div>
                  </div>

                  {selectedVip.commissionmergedata && (
                    <div className="detail-item">
                      <i className="fa-solid fa-star"></i>
                      <div className="detail-content">
                        <span className="detail-label">{i18n('pages.vip.premiumCommission')}</span>
                        <span className="detail-value">{selectedVip.commissionmergedata}%</span>
                      </div>
                    </div>
                  )}

                  <div className="detail-item">
                    <i className="fa-solid fa-box"></i>
                    <div className="detail-content">
                      <span className="detail-label">{i18n('pages.vip.maxOrders')}</span>
                      <span className="detail-value">{selectedVip.tasksperday}</span>
                    </div>
                  </div>
                </div>

                {selectedVip.benefits && selectedVip.benefits.length > 0 && (
                  <div className="level-benefits">
                    <h4 className="benefits-title">{i18n('pages.vip.benefits')}</h4>
                    <ul className="benefits-list">
                      {selectedVip.benefits.map((benefit, index) => (
                        <li key={index} className="benefit-item">
                          <i className="fa-solid fa-check"></i>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="modal-actions">
                <button className="cancel-upgrade-btn" onClick={handleCloseModal}>
                  {i18n('pages.vip.cancel')}
                </button>
                <button 
                  className="confirm-upgrade-btn" 
                  onClick={() => handleUpgrade(selectedVip)}
                  disabled={upgradingVipId === selectedVip.id}
                >
                  {upgradingVipId === selectedVip.id ? (
                    <>
                      <div className="loading-spinner-small"></div>
                      {i18n('pages.vip.upgrading')}
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-arrow-up"></i>
                      {i18n('pages.vip.upgradeNow')}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        <style >{`
          .vip-page-container {
            max-width: 1000px;
            margin: 0 auto;
            padding: 15px;
          }

          /* Header Styles */
          .vip-header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 16px;
            padding: 20px;
            margin-bottom: 20px;
            color: white;
            position: relative;
            overflow: hidden;
            margin-top:40px;
          }

          .vip-header::before {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            width: 150px;
            height: 150px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 50%;
            transform: translate(30%, -30%);
          }

          .back-button {
            color: white;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 15px;
            font-weight: 600;
            font-size: 14px;
            opacity: 0.9;
            transition: opacity 0.3s ease;
          }

          .back-button:hover {
            opacity: 1;
          }

          .vip-header-content {
            position: relative;
            z-index: 2;
          }

          .vip-title {
            font-size: 1.5rem;
            font-weight: 700;
            margin: 0 0 8px 0;
            background: linear-gradient(135deg, #fff, #f0f0f0);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }

          .vip-subtitle {
            font-size: 0.9rem;
            opacity: 0.9;
            margin: 0 0 15px 0;
            line-height: 1.4;
          }

          .current-vip-status {
            margin-top: 15px;
          }

          .status-badge {
            background: rgba(255, 255, 255, 0.2);
            padding: 8px 16px;
            border-radius: 20px;
            display: inline-flex;
            align-items: center;
            gap: 6px;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.3);
            font-size: 0.85rem;
          }

          /* Search Section */
          .search-section {
            margin-bottom: 20px;
          }

          .search-container {
            position: relative;
            width: 100%;
          }

          .search-icon {
            position: absolute;
            left: 15px;
            top: 50%;
            transform: translateY(-50%);
            color: #718096;
            z-index: 2;
            font-size: 14px;
          }

          .search-input {
            width: 100%;
            padding: 12px 40px 12px 40px;
            border: 2px solid #E2E8F0;
            border-radius: 20px;
            font-size: 14px;
            background: white;
            transition: all 0.3s ease;
          }

          .search-input:focus {
            outline: none;
            border-color: #4299E1;
            box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.1);
          }

          .clear-search {
            position: absolute;
            right: 12px;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            color: #718096;
            cursor: pointer;
            padding: 4px;
            font-size: 14px;
          }

          /* VIP Levels Grid */
          .vip-levels-grid {
            display: flex;
            flex-direction: column;
            gap: 16px;
            margin-bottom: 30px;
          }

          .vip-level-card {
            background: white;
            border-radius: 16px;
            padding: 20px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
            border: 2px solid #E2E8F0;
            transition: all 0.3s ease;
            cursor: pointer;
            position: relative;
            overflow: hidden;
          }

          .vip-level-card:hover {
            transform: translateY(-3px);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
            border-color: #4299E1;
          }

          .vip-level-card.vip-level-active {
            border-color: #48BB78;
            background: linear-gradient(135deg, #FFFFFF, #F0FFF4);
          }

          .vip-level-card.vip-level-locked {
            opacity: 0.7;
            cursor: not-allowed;
          }

          .vip-level-card.vip-level-locked:hover {
            transform: none;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
            border-color: #E2E8F0;
          }

          .loading-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(255, 255, 255, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10;
            border-radius: 16px;
          }

          .loading-spinner {
            width: 25px;
            height: 25px;
            border: 3px solid #f3f3f3;
            border-top: 3px solid #4299E1;
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }

          .loading-spinner-small {
            width: 14px;
            height: 14px;
            border: 2px solid #f3f3f3;
            border-top: 2px solid #ffffff;
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          .vip-level-badge {
            position: absolute;
            top: 15px;
            right: 15px;
            z-index: 2;
          }

          .current-level-indicator {
            background: linear-gradient(135deg, #48BB78, #38A169);
            color: white;
            padding: 6px 12px;
            border-radius: 15px;
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
            border-radius: 15px;
            font-size: 11px;
            font-weight: 600;
            box-shadow: 0 2px 8px rgba(66, 153, 225, 0.3);
          }

          .locked-level-indicator {
            background: linear-gradient(135deg, #A0AEC0, #718096);
            color: white;
            padding: 6px 12px;
            border-radius: 15px;
            font-size: 11px;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 4px;
          }

          .vip-level-content {
            display: flex;
            gap: 15px;
            align-items: flex-start;
          }

          .vip-level-image {
            flex-shrink: 0;
            width: 70px;
            height: 70px;
            border-radius: 12px;
            overflow: hidden;
            border: 3px solid #E2E8F0;
            background: #F7FAFC;
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
            font-size: 1.1rem;
            font-weight: 700;
            margin: 0 0 8px 0;
          }

          .level-description {
            color: #718096;
            font-size: 0.8rem;
            margin: 0 0 12px 0;
            line-height: 1.3;
          }

          .level-features {
            display: flex;
            flex-direction: column;
            gap: 6px;
            margin-bottom: 12px;
          }

          .feature-item {
            display: flex;
            align-items: center;
            gap: 8px;
            color: #4A5568;
            font-size: 0.75rem;
          }

          .feature-icon {
            color: #4299E1;
            font-size: 0.7rem;
            width: 14px;
            text-align: center;
          }

          .level-price {
            background: linear-gradient(135deg, #F6E05E, #ECC94B);
            color: #744210;
            padding: 6px 12px;
            border-radius: 12px;
            font-weight: 700;
            display: inline-flex;
            align-items: center;
            gap: 4px;
            font-size: 0.8rem;
          }

          /* No Results */
          .no-results {
            text-align: center;
            padding: 40px 20px;
            color: #718096;
          }

          .no-results i {
            font-size: 2rem;
            margin-bottom: 15px;
            opacity: 0.5;
          }

          .no-results h3 {
            color: #4A5568;
            margin: 0 0 8px 0;
            font-size: 1.1rem;
          }

          .no-results p {
            font-size: 0.85rem;
            margin: 0;
          }

          /* Modal Styles */
          .upgrade-modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 15px;
            z-index: 1000;
            backdrop-filter: blur(5px);
          }

          .upgrade-modal-content {
            background: white;
            border-radius: 20px;
            width: 100%;
            max-width: 380px;
            max-height: 85vh;
            overflow-y: auto;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
          }

          .modal-header-section {
            background: linear-gradient(135deg, #4299E1, #3182CE);
            padding: 20px;
            text-align: center;
            position: relative;
            border-radius: 20px 20px 0 0;
          }

          .modal-title {
            color: white;
            font-size: 1.2rem;
            font-weight: 700;
            margin: 0;
            padding-right: 30px;
          }

          .modal-close {
            position: absolute;
            top: 15px;
            right: 15px;
            background: rgba(255, 255, 255, 0.2);
            border: none;
            color: white;
            cursor: pointer;
            font-size: 1rem;
            width: 35px;
            height: 35px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background 0.3s ease;
          }

          .modal-close:hover {
            background: rgba(255, 255, 255, 0.3);
          }

          .modal-body-section {
            padding: 20px;
          }

          .level-preview {
            text-align: center;
            margin-bottom: 20px;
            padding-bottom: 20px;
            border-bottom: 1px solid #E2E8F0;
          }

          .preview-image {
            width: 80px;
            height: 80px;
            border-radius: 16px;
            overflow: hidden;
            margin: 0 auto 12px;
            border: 3px solid #E2E8F0;
            background: #F7FAFC;
          }

          .preview-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .preview-title {
            color: #1A202C;
            font-size: 1.1rem;
            font-weight: 700;
            margin: 0 0 8px 0;
          }

          .preview-description {
            color: #718096;
            font-size: 0.8rem;
            margin: 0;
            line-height: 1.3;
          }

          .level-details {
            margin-bottom: 20px;
          }

          .details-title {
            color: #1A202C;
            font-size: 1rem;
            font-weight: 600;
            margin: 0 0 12px 0;
          }

          .detail-item {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 10px;
            background: #F7FAFC;
            border-radius: 10px;
            margin-bottom: 8px;
            border: 1px solid #E2E8F0;
          }

          .detail-item i {
            color: #4299E1;
            font-size: 1rem;
            width: 18px;
            text-align: center;
          }

          .detail-content {
            display: flex;
            flex-direction: column;
          }

          .detail-label {
            color: #718096;
            font-size: 0.75rem;
            font-weight: 600;
            text-transform: uppercase;
          }

          .detail-value {
            color: #1A202C;
            font-size: 0.9rem;
            font-weight: 700;
          }

          .level-benefits {
            margin-bottom: 20px;
          }

          .benefits-title {
            color: #1A202C;
            font-size: 1rem;
            font-weight: 600;
            margin: 0 0 12px 0;
          }

          .benefits-list {
            list-style: none;
            padding: 0;
            margin: 0;
          }

          .benefit-item {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 6px 0;
            color: #4A5568;
            font-size: 0.8rem;
          }

          .benefit-item i {
            color: #48BB78;
            font-size: 0.8rem;
          }

          .modal-actions {
            display: flex;
            gap: 12px;
            padding: 0 20px 20px;
          }

          .cancel-upgrade-btn, .confirm-upgrade-btn {
            flex: 1;
            padding: 12px;
            border: none;
            border-radius: 12px;
            font-weight: 600;
            font-size: 0.9rem;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
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
            color: white;
            box-shadow: 0 2px 8px rgba(72, 187, 120, 0.3);
          }

          .confirm-upgrade-btn:hover:not(:disabled) {
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(72, 187, 120, 0.4);
          }

          .confirm-upgrade-btn:disabled {
            opacity: 0.7;
            cursor: not-allowed;
            transform: none;
          }

          /* Performance Optimizations */
          @media (prefers-reduced-motion: reduce) {
            * {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
            }
          }

          /* Responsive Design for smaller screens */
          @media (max-width: 400px) {
            .vip-page-container {
              padding: 12px;
            }

            .vip-header {
              padding: 16px;
            }

            .vip-title {
              font-size: 1.3rem;
            }

            .vip-subtitle {
              font-size: 0.85rem;
            }

            .vip-level-card {
              padding: 16px;
            }

            .vip-level-content {
              gap: 12px;
            }

            .vip-level-image {
              width: 60px;
              height: 60px;
            }

            .level-title {
              font-size: 1rem;
            }

            .modal-body-section {
              padding: 16px;
            }

            .modal-actions {
              padding: 0 16px 16px;
            }
          }

          .upgrade-modal-content {
  overflow-y: scroll; /* keep scroll functionality */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */
}

.upgrade-modal-content::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}
        `}</style>
      </div>
    </VipContainer>
  );
}

export default VipPage;