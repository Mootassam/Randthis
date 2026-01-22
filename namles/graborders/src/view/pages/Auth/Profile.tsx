import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import "../styles/styles.css";
import authActions from "src/modules/auth/authActions";
import authSelectors from "src/modules/auth/authSelectors";
import actions from "src/modules/record/list/recordListActions";
import selectors from "src/modules/record/list/recordListSelectors";
import Message from "src/view/shared/message";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import yupFormSchemas from "src/modules/shared/yup/yupFormSchemas";
import { i18n } from "../../../i18n";
import ImagesFormItem from "src/shared/form/ImagesFormItems";
import Storage from "src/security/storage";

const schema = yup.object().shape({
  avatars: yupFormSchemas.images(i18n("inputs.avatars"), {
    max: 1,
  }),
});

function Profile() {
  const dispatch = useDispatch();
  const history = useHistory();
  const totalperday = useSelector(selectors.selectTotalPerday);
  const currentUser = useSelector(authSelectors.selectCurrentUser);

  const [recharge, setRecharge] = useState(false);
  const [deposit, setDeposit] = useState(false);
  const referenceCodeRef = useRef<any>(null);

  useEffect(() => {
    const values = { status: "completed" };
    dispatch(actions.doCountDay());
    dispatch(actions.doFetch(values, values));
  }, [dispatch]);

  const doSignout = () => {
    dispatch(authActions.doSignout());
  };

  const [initialValues] = useState(() => {
    const record = currentUser || {};

    return {
      avatars: record.avatars || [],
    };
  });

  const form = useForm({
    resolver: yupResolver(schema),
    mode: "all",
    defaultValues: initialValues,
  });

  const goto = (param) => {
    history.push(param);
  };

  const copyToClipboardCoupon = () => {
    const referenceCode = referenceCodeRef.current.innerText;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(referenceCode)
        .then(() => Message.success(i18n('pages.profile.copied')))
        .catch((error) => console.error("Error copying to clipboard:", error));
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = referenceCode;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      Message.success(i18n('pages.profile.copied'));
    }
  };

  const menuItems = {
    financial: [
      {
        icon: "fa-solid fa-dollar-sign",
        name: i18n('pages.profile.recharge'),
        action: () => setRecharge(true)
      },
      {
        icon: "fa-solid fa-money-check",
        name: i18n('pages.profile.withdraw'),
        action: () => goto("/withdraw")
      }
    ],
    details: [
      {
        icon: "fa-solid fa-headphones",
        name: i18n('pages.profile.contactUs'),
        url: "/online"
      },
      {
        icon: "fa-solid fa-user",
        name: i18n('pages.profile.profile'),
        url: "/myprofile"
      },
      {
        icon: "fa-solid fa-wallet",
        name: i18n('pages.profile.updateWithdrawal'),
        url: "/wallet"
      }
    ],
    other: [
      {
        icon: "fa-solid fa-arrow-right-arrow-left",
        name: i18n('pages.profile.transaction'),
        url: "/transacation"
      },
      {
        icon: "fa-solid fa-clock-rotate-left",
        name: i18n('pages.profile.tasksHistory'),
        url: "/order"
      },
      {
        icon: "fa-solid fa-lock",
        name: i18n('pages.profile.security'),
        url: "/security"
      },
      {
        icon: "fa-solid fa-bell",
        name: i18n('pages.profile.notifications'),
        url: "/notifications"
      },
      {
        icon: "fa-solid fa-language",
        name: i18n('pages.profile.languages'),
        url: "/languages"
      }
    ]
  };

  return (
    <div className="profile-container">
      {/* Header Section */}
      <div className="profile-header">
        <div className="header-background"></div>
        <div className="profile-card">
          <div className="profile-top">
            <FormProvider {...form}>
              <form>
                <ImagesFormItem
                  name="avatars"
                  storage={Storage.values.userAvatarsProfiles}
                  max={1}
                />
              </form>
            </FormProvider>
            <div className="profile-info">
              <div className="user-name">{currentUser?.fullName}</div>
              <div className="invitation-code">
                <span>{i18n('pages.profile.invitationCode')}</span>
                <span ref={referenceCodeRef} className="code-text">
                  {currentUser?.refcode}
                </span>
                <i
                  className="fa-regular fa-copy copy-icon"
                  onClick={copyToClipboardCoupon}
                />
              </div>
            </div>
          </div>

          {/* Credit Score */}
          <div className="credit-score">
            <div className="score-label">{i18n('pages.profile.creditScore')}</div>
            <div className="score-bar-container">
              <div className="score-bar">
                <div
                  className="score-progress"
                  style={{ width: `${currentUser?.score || 100}%` }}
                ></div>
              </div>
              <div className="score-value">{currentUser?.score || 100}%</div>
            </div>
          </div>

          {/* Stats */}
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-label">{i18n('pages.profile.balance')}</div>
              <div className="stat-amount">
                {currentUser?.balance?.toFixed(2) || 0.0} {i18n('pages.profile.usd')}
              </div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-label">{i18n('pages.profile.todayProfit')}</div>
              <div className="stat-amount">{totalperday} {i18n('pages.profile.usd')}</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-label">{i18n('pages.profile.frozenAmount')}</div>
              <div className="stat-amount">
                {currentUser?.freezeblance?.toFixed(2)} {i18n('pages.profile.usd')}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Sections */}
      <div className="menu-sections">
        {/* Financial Section */}
        <div className="menu-section">
          <div className="section-title">{i18n('pages.profile.myFinancial')}</div>
          <div className="section-items">
            {menuItems.financial.map((item, index) => (
              <div
                key={index}
                className="menu-item"
                onClick={item.action}
              >
                <div className="item-left">
                  <i className={item.icon}></i>
                  <span>{item.name}</span>
                </div>
                <i className="fa fa-arrow-right item-arrow"></i>
              </div>
            ))}
          </div>
        </div>

        {/* Details Section */}
        <div className="menu-section">
          <div className="section-title">{i18n('pages.profile.myDetails')}</div>
          <div className="section-items">
            {menuItems.details.map((item, index) => (
              <Link key={index} to={item.url} className="menu-link">
                <div className="menu-item">
                  <div className="item-left">
                    <i className={item.icon}></i>
                    <span>{item.name}</span>
                  </div>
                  <i className="fa fa-arrow-right item-arrow"></i>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Other Section */}
        <div className="menu-section">
          <div className="section-title">{i18n('pages.profile.other')}</div>
          <div className="section-items">
            {menuItems.other.map((item, index) => (
              <Link key={index} to={item.url} className="menu-link">
                <div className="menu-item">
                  <div className="item-left">
                    <i className={item.icon}></i>
                    <span>{item.name}</span>
                  </div>
                  <i className="fa fa-arrow-right item-arrow"></i>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Logout Button */}
      <div className="logout-button" onClick={doSignout}>
        <i className="fa-solid fa-arrow-right-from-bracket"></i>
        {i18n('pages.profile.logout')}
      </div>

      {/* Recharge Modal */}
      {recharge && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title">{i18n('pages.profile.rechargeModal.title')}</div>
              <i
                className="fa fa-close modal-close"
                onClick={() => setRecharge(false)}
              />
            </div>
            <p className="modal-text">
              {i18n('pages.profile.rechargeModal.text')}
            </p>
            <div
              className="modal-confirm"
              onClick={() => goto("/Online")}
            >
              {i18n('pages.profile.confirm')}
            </div>
          </div>
        </div>
      )}

      {/* Deposit Modal */}
      {deposit && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title">{i18n('pages.profile.withdrawModal.title')}</div>
              <i
                className="fa fa-close modal-close"
                onClick={() => setDeposit(false)}
              />
            </div>
            <p className="modal-text">
              {i18n('pages.profile.withdrawModal.text')}
            </p>
            <div
              className="modal-confirm"
              onClick={() => goto("/Online")}
            >
              {i18n('pages.profile.confirm')}
            </div>
          </div>
        </div>
      )}


      <style>{`.profile-container {
  max-width: 400px;
  margin: 0 auto;
  background: #EDF1F7;
  min-height: 100vh;
  color: #2D3748;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.profile-header {
  position: relative;
  padding: 20px;
}

.header-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 120px;
  background: linear-gradient(135deg, #FFFFFF 0%, #E2E8F0 100%);
  border-radius: 0 0 20px 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
}

.profile-card {
  position: relative;
  background: #0d3e55;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #E2E8F0;
}

.profile-top {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
}

.avatar-placeholder {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #F7FAFC;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  color: #4A5568;
  border: 2px solid #E2E8F0;
}

.profile-info {
  flex: 1;
}

.user-name {
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 5px;
}

.invitation-code {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #718096;
  background: #F7FAFC;
  padding: 6px 12px;
  border-radius: 20px;
  border: 1px solid #E2E8F0;
}

.code-text {
  color: #2D3748;
  font-weight: 500;
}

.copy-icon {
  cursor: pointer;
  color: #4299E1;
  font-size: 14px;
}

.copy-icon:hover {
  color: #3182CE;
}

.credit-score {
  margin-bottom: 20px;
}

.score-label {
  font-size: 14px;
  color: #fff;
  margin-bottom: 8px;
}

.score-bar-container {
  display: flex;
  align-items: center;
  gap: 12px;
}

.score-bar {
  flex: 1;
  height: 6px;
  background: #E2E8F0;
  border-radius: 3px;
  overflow: hidden;
}

.score-progress {
  height: 100%;
  background: linear-gradient(90deg, #4299E1 0%, #3182CE 100%);
  border-radius: 3px;
  transition: width 0.3s ease;
}

.score-value {
  font-size: 12px;
  font-weight: 600;
  color: #4299E1;
  min-width: 35px;
}

.stats-grid {
  display: grid;
  grid-template-columns: 1fr auto 1fr auto 1fr;
  align-items: center;
  gap: 15px;
}

.stat-item {
  text-align: center;
}

.stat-label {
  font-size: 12px;
  color: #fff;
  margin-bottom: 4px;
}

.stat-amount {
  font-size: 14px;
  font-weight: 600;
  color: #fff;
}

.stat-divider {
  width: 1px;
  height: 30px;
  background: #E2E8F0;
}

.menu-sections {
  padding: 20px;
}

.menu-section {
  margin-bottom: 25px;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #1A202C;
  margin-bottom: 12px;
  padding-left: 5px;
}

.section-items {
  background: #FFFFFF;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #E2E8F0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.menu-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  background: #FFFFFF;
  transition: all 0.2s ease;
  cursor: pointer;
  border-bottom: 1px solid #F7FAFC;
}

.menu-item:last-child {
  border-bottom: none;
}

.menu-item:hover {
  background: #F7FAFC;
  transform: translateX(2px);
}

.menu-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.item-left {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  color: #2D3748;
}

.item-left i {
  width: 20px;
  text-align: center;
  color: #4299E1;
}

.item-arrow {
  color: #A0AEC0;
  font-size: 12px;
}

.logout-button {
  margin: 30px 20px 90px;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  color: white;
  padding: 16px;
  border-radius: 12px;
  text-align: center;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  box-shadow: 0 2px 8px rgba(229, 62, 62, 0.2);
}

.logout-button:hover {
  background: #C53030;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(229, 62, 62, 0.3);
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  z-index: 1000;
}

.modal-content {
  background: #FFFFFF;
  border-radius: 16px;
  padding: 24px;
  width: 100%;
  max-width: 320px;
  border: 1px solid #E2E8F0;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.modal-title {
  font-size: 18px;
  font-weight: 600;
  color: #1A202C;
}

.modal-close {
  color: #A0AEC0;
  cursor: pointer;
  font-size: 18px;
  transition: color 0.2s ease;
}

.modal-close:hover {
  color: #718096;
}

.modal-text {
  color: #718096;
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 20px;
  text-align: center;
}

.modal-confirm {
  background: #4299E1;
  color: white;
  padding: 14px;
  border-radius: 10px;
  text-align: center;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(66, 153, 225, 0.2);
}

.modal-confirm:hover {
  background: #3182CE;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(66, 153, 225, 0.3);
}

/* Responsive adjustments */
@media (max-width: 400px) {
  .profile-container {
    max-width: 100%;
  }
  
  .profile-header,
  .menu-sections {
    padding: 15px;
  }
  
  .stats-grid {
    gap: 10px;
  }
  
  .stat-amount {
    font-size: 13px;
  }
}`}</style>
    </div>
  );
}

export default Profile;