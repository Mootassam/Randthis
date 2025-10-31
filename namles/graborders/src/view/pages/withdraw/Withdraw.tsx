import React, { useCallback, useEffect, useState } from "react";
import SubHeader from "src/view/shared/Header/SubHeader";
import authSelectors from "src/modules/auth/authSelectors";
import yupFormSchemas from "src/modules/shared/yup/yupFormSchemas";
import * as yup from "yup";
import { i18n } from "../../../i18n";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import InputFormItem from "src/shared/form/InputFormItem";
import actions from "src/modules/transaction/form/transactionFormActions";
import authActions from "src/modules/auth/authActions";

const schema = yup.object().shape({
  amount: yupFormSchemas.integer(i18n("entities.transaction.fields.amount"), {
    required: true,
    min: 100,
  }),
  withdrawPassword: yupFormSchemas.string(
    i18n("user.fields.withdrawPassword"),
    {
      required: true,
    }
  ),
});

function Withdraw() {
  const currentUser = useSelector(authSelectors.selectCurrentUser);
  const dispatch = useDispatch();

  const refreshItems = useCallback(async () => {
    await dispatch(authActions.doRefreshCurrentUser());
  }, [dispatch]);

  const onSubmit = async ({ amount, withdrawPassword }) => {
    const values = {
      status: "pending",
      date: new Date(),
      user: currentUser ? currentUser.id : null,
      type: "withdraw",
      amount: amount,
      vip: currentUser,
      withdrawPassword: withdrawPassword,
    };
    await dispatch(actions.doCreate(values));
    await refreshItems();
  };

  const [initialValues] = useState({
    amount: "",
  });
  const form = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
    defaultValues: initialValues,
  });

  return (
    <div>
      <SubHeader title={i18n('pages.withdraw.title')} path="/profile" />
      <div className="withdraw__page">
        <div className="withdraw__content">
          <div className="withdraw__header">
            <h3 className="hall" style={{ paddingTop: 0 }}>
              {i18n('pages.withdraw.withdrawAmount')}:
            </h3>

            <span style={{ color: "black", fontSize: "14px" }}>
              {i18n('pages.withdraw.availableBalance')} : {currentUser?.balance?.toFixed(2) || 0} USD
            </span>
          </div>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div>
                <InputFormItem
                  type="text"
                  name="amount"
                  placeholder={i18n("entities.transaction.fields.amount")}
                  className="input__withdraw"
                />
                <div className="number__click">
                  <h3 className="hall" style={{ paddingTop: 0 }}>
                    {i18n('pages.withdraw.withdrawPassword')}:
                  </h3>
                  <InputFormItem
                    type="text"
                    name="withdrawPassword"
                    placeholder={i18n("user.fields.withdrawPassword")}
                    className="input__withdraw"
                  />
                </div>

                <div className="advertise__speaker">
                  <div>
                    <i className="fa-solid fa-volume-high speaker" aria-hidden="true"></i>
                  </div>
                  <div className="announcement-container">
                    <div className="announcement-text">
                      <span>
                        {i18n('pages.withdraw.announcement')}
                      </span>
                    </div>
                  </div>
                </div>

                {currentUser.withdraw ? (
                  <button className="confirm" type="submit">
                    {i18n('pages.withdraw.confirm')}
                  </button>
                ) : (
                  <button className="confirm" disabled={true}>
                    {i18n('pages.withdraw.confirm')}
                  </button>
                )}
              </div>
            </form>
          </FormProvider>
        </div>

        {/* <div className="withdraw__rules">
          <div className="rules__title">{i18n('pages.withdraw.rulesDescription')}</div>

          <ul className="rules__list">
            <li>{i18n('pages.withdraw.rules.minimum')}</li>
            <li>
              {i18n('pages.withdraw.rules.paymentTime')}
            </li>
            <li>
              {i18n('pages.withdraw.rules.orderCompletion')}
            </li>
          </ul>
        </div> */}
      </div>
    </div>
  );
}

export default Withdraw;