import React, { useState } from "react";
import SubHeader from "src/view/shared/Header/SubHeader";
import yupFormSchemas from "src/modules/shared/yup/yupFormSchemas";
import * as yup from "yup";
import { i18n } from "../../../i18n";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import actions from 'src/modules/user/form/userFormActions';
import InputFormItem from "src/shared/form/InputFormItem";
import selectors from "src/modules/auth/authSelectors";
import ButtonIcon from "src/shared/ButtonIcon";
import authSelectors from "src/modules/auth/authSelectors";

function ChangeWithdrawalPassword() {
  const dispatch = useDispatch();
  const currentUser = useSelector(authSelectors.selectCurrentUser);
  const hasWithdrawPassword = !!currentUser?.withdrawPassword;

  const [initialValues] = useState(() => ({
    oldPassword: "",
    newPassword: "",
    newPasswordConfirmation: "",
  }));

  // Create dynamic schema based on whether user has withdrawPassword
  const createSchema = () => {
    if (hasWithdrawPassword) {
      // User HAS withdrawPassword - need old, new, and confirmation
      return yup.object().shape({
        oldPassword: yupFormSchemas.string(i18n("user.fields.oldPassword"), {
          required: true,
        }),
        newPassword: yupFormSchemas.string(i18n("user.fields.newPassword"), {
          required: true,
        }),
        newPasswordConfirmation: yupFormSchemas
          .string(i18n("user.fields.newPasswordConfirmation"), {
            required: true,
          })
          .oneOf(
            [yup.ref("newPassword"), null],
            i18n("auth.passwordChange.mustMatch")
          ),
      });
    } else {
      // User DOES NOT have withdrawPassword - only need new and confirmation
      return yup.object().shape({
        newPassword: yupFormSchemas.string(i18n("user.fields.newPassword"), {
          required: true,
        }),
        newPasswordConfirmation: yupFormSchemas
          .string(i18n("user.fields.newPasswordConfirmation"), {
            required: true,
          })
          .oneOf(
            [yup.ref("newPassword"), null],
            i18n("auth.passwordChange.mustMatch")
          ),
      });
    }
  };

  const form = useForm({
    resolver: yupResolver(createSchema()),
    mode: "all",
    defaultValues: initialValues,
  });

  const saveLoading = useSelector(selectors.selectLoadingPasswordChange);

  const onSubmit = (values) => {
    // If no withdrawPassword exists, send undefined for oldPassword
    const submitData = {
      newPassword: values.newPassword,
      ...(hasWithdrawPassword && { oldPassword: values.oldPassword }),
    };
    dispatch(actions.doUpdateWithdrawPassword(submitData));
  };

  // Get the appropriate title and header text
  const pageTitle = hasWithdrawPassword
    ? i18n('pages.changePassword.ChangeWithdrawalPassword')
    : i18n('pages.changePassword.addWithdrawPassword');
  const headerText = hasWithdrawPassword
    ? i18n('pages.changePassword.header')
    : i18n('pages.changePassword.addHeader');

  return (
    <div>
      <SubHeader title={pageTitle} path="/profile" />
      <div className="app__wallet">
        <div className="wallet__">
          <h3 className="hall">{headerText}</h3>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="wallet__form">
                <div className="form__">
                  {/* Conditional Old Password Field */}
                  {hasWithdrawPassword && (
                    <div className="form__group">
                      <div className="label__form">
                        <span style={{ color: "red" }}>
                          {i18n('pages.changePassword.requiredField')}
                        </span>
                        <span style={{ fontSize: "13px" }}>
                          {i18n('pages.changePassword.oldPassword')}
                        </span>
                      </div>
                      <div className="input__div">
                        <InputFormItem
                          type="password"
                          name="oldPassword"
                          autoComplete="current-password"
                          className="input__"
                        />
                      </div>
                    </div>
                  )}

                  {/* New Password Field */}
                  <div className="form__group">
                    <div className="label__form">
                      <span style={{ color: "red" }}>
                        {i18n('pages.changePassword.requiredField')}
                      </span>
                      <span style={{ fontSize: "13px" }}>
                        {i18n('pages.changePassword.newPassword')}
                      </span>
                    </div>
                    <div className="input__div">
                      <InputFormItem
                        type="password"
                        name="newPassword"
                        autoComplete="new-password"
                        className="input__"
                      />
                    </div>
                  </div>

                  {/* Confirm New Password Field */}
                  <div className="form__group">
                    <div className="label__form">
                      <span style={{ color: "red" }}>
                        {i18n('pages.changePassword.requiredField')}
                      </span>
                      <span style={{ fontSize: "13px" }}>
                        {i18n('pages.changePassword.confirmPassword')}
                      </span>
                    </div>
                    <div className="input__div">
                      <InputFormItem
                        type="password"
                        name="newPasswordConfirmation"
                        autoComplete="new-password"
                        className="input__"
                      />
                    </div>
                  </div>
                </div>

                <button
                  className="confirm"
                  disabled={saveLoading}
                  type="submit"
                >
                  <ButtonIcon
                    loading={saveLoading}
                    iconClass="far fa-save"
                  />
                  &nbsp;
                  {hasWithdrawPassword
                    ? i18n('pages.changePassword.submit')
                    : i18n('pages.changePassword.create')}
                </button>
                <span style={{ fontSize: 13 }}>
                  <b>Note:</b> &nbsp; {i18n('pages.changePassword.note')}
                </span>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}

export default ChangeWithdrawalPassword;