import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import actions from "src/modules/auth/authActions";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import yupFormSchemas from "src/modules/shared/yup/yupFormSchemas";
import { i18n } from "../../../i18n";
import { yupResolver } from "@hookform/resolvers/yup";
import InputFormItem from "src/shared/form/InputFormItem";
import selectors from "src/modules/auth/authSelectors";
import ButtonIcon from "src/shared/ButtonIcon";

const schema = yup.object().shape({
  email: yupFormSchemas.string(i18n("user.fields.username"), {
    required: true,
  }),
  password: yupFormSchemas.string(i18n("user.fields.password"), {
    required: true,
  }),
  rememberMe: yupFormSchemas.boolean(i18n("user.fields.rememberMe")),
});

function Signin() {
  const dispatch = useDispatch();
  const loading = useSelector(selectors.selectLoading);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [initialValues] = useState({
    email: "",
    password: "",
    rememberMe: true,
  });

  useEffect(() => {
    dispatch(actions.doClearErrorMessage());
  }, [dispatch]);

  const form = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
    defaultValues: initialValues,
  });

  const externalErrorMessage = useSelector(selectors.selectErrorMessage);

  const onSubmit = ({ email, password, rememberMe }) => {
    dispatch(actions.doSigninWithEmailAndPassword(email, password, rememberMe));
  };

  const handleCsIconClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="auth__page">
      <div className="auth__header">
        {/* <img src="/images/logo.png" alt="" style={{width:200}}  /> */}
      </div>    
      <div className="auth__header header__signup ">
        <img src="/images/home/logo.webp" alt="" />
        <h1 className="auth__title"> Welcome Back!</h1>
        <span className="auth__description __v2">
          Sign in to your marketing account
        </span>
      </div>

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="auth__form">
            <div className="form__authgroup">
              <InputFormItem
                type="text"
                name="email"
                placeholder={i18n("user.fields.username")}
                className="auth__input"
                externalErrorMessage={externalErrorMessage}
              />
            </div>
            <div className="form__authgroup">
              <InputFormItem
                type="text"
                name="password"
                placeholder={i18n("user.fields.password")}
                className="auth__input"
              />
            </div>
          </div>

          <div className="auth__bottom">
            <button className="auth__button" disabled={loading} type="submit">
              <ButtonIcon loading={loading} /> 
              <span>Sign in</span>
            </button>
            <Link to="/auth/signup" className="remove__ligne">
              <span className="auth__link">Don't have an account? <span className="signup__link">Sign up here.</span> </span>
            </Link>
          </div>
        </form>
      </FormProvider>

      {/* CS Icon in bottom right */}
      <div style={csIconContainerStyle}>
        <div style={csIconStyle} onClick={handleCsIconClick}>
          <span>CS</span>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div style={modalOverlayStyle} onClick={closeModal}>
          <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
            <div style={modalHeaderStyle}>
              <h4 style={modalTitleStyle}>Customer Support</h4>
              <button style={closeButtonStyle} onClick={closeModal}>×</button>
            </div>
            <div style={modalBodyStyle}>
              <p style={modalTextStyle}>How can we help you today?</p>
              <div style={contactOptionsStyle}>
                <div style={contactOptionStyle}>
                  <span style={iconStyle}>📞</span>
                  <span>Call: 1-800-HELP</span>
                </div>
                <div style={contactOptionStyle}>
                  <span style={iconStyle}>✉️</span>
                  <span>Email: support@company.com</span>
                </div>
                <div style={contactOptionStyle}>
                  <span style={iconStyle}>💬</span>
                  <span>Live Chat</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .auth__page {
          position: relative;
        }
      `}</style>
    </div>
  );
}

// Styles for CS Icon
const csIconContainerStyle = {
  position: 'fixed',
  bottom: '20px',
  right: '20px',
  zIndex: 1000,
};

const csIconStyle = {
  width: '50px',
  height: '50px',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  border: '2px solid white',
};

// Styles for Modal
const modalOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 2000,
};

const modalContentStyle = {
  backgroundColor: 'white',
  borderRadius: '12px',
  padding: '0',
  width: '90%',
  maxWidth: '400px',
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
  animation: 'modalAppear 0.3s ease-out',
};

const modalHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '20px 24px 0',
  borderBottom: '1px solid #e5e5e5',
  paddingBottom: '16px',
};

const modalTitleStyle = {
  margin: 0,
  fontSize: '20px',
  fontWeight: '600',
  color: '#333 !important',
};

const closeButtonStyle = {
  background: 'none',
  border: 'none',
  fontSize: '24px',
  cursor: 'pointer',
  color: '#666',
  padding: '0',
  width: '30px',
  height: '30px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const modalBodyStyle = {
  padding: '24px',
};

const modalTextStyle = {
  margin: '0 0 20px 0',
  fontSize: '16px',
  color: '#555',
  textAlign: 'center',
};

const contactOptionsStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
};

const contactOptionStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '12px',
  borderRadius: '8px',
  backgroundColor: '#f8f9fa',
  transition: 'background-color 0.2s ease',
  cursor: 'pointer',
};

const iconStyle = {
  fontSize: '18px',
};

// Add CSS animation
const styles = `
  @keyframes modalAppear {
    from {
      opacity: 0;
      transform: scale(0.8) translateY(-20px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }

  .cs-icon:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }

  .contact-option:hover {
    background-color: #e9ecef;
  }

  .close-button:hover {
    background-color: #f8f9fa;
  }
`;

// Add styles to document
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}

export default Signin;