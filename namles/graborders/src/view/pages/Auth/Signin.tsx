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
import CsPage from "./CsPage"; // Import the new component

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

  return (
    <div className="auth__page">
      <div className="auth__header">
        {/* <img src="/images/logo.png" alt="" style={{width:200}}  /> */}
      </div>
      <div className="auth__header header__signup ">
        <img src="/images/home/logo.webp" alt="" />
        <h1 className="auth__title">{i18n('pages.auth.signin.welcomeBack')}</h1>
        <span className="auth__description __v2">
          {i18n('pages.auth.signin.signinToAccount')}
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
              <span>{i18n('pages.auth.signin.signinButton')}</span>
            </button>
            <Link to="/auth/signup" className="remove__ligne">
              <span className="auth__link">
                {i18n('pages.auth.signin.noAccount')}{" "}
                <span className="signup__link">
                  {i18n('pages.auth.signin.signupHere')}
                </span>
              </span>
            </Link>
          </div>
        </form>
      </FormProvider>

      {/* Include the CsPage component */}
      <CsPage />

      <style>{`
        .auth__page {
          position: relative;
        }
      `}</style>
    </div>
  );
}

export default Signin;