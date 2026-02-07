import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import actions from "src/modules/record/list/recordListActions";
import selectors from "src/modules/record/list/recordListSelectors";
import recordFormActions from "src/modules/record/form/recordFormActions";
import LoadingModal from "src/shared/LoadingModal";
import Dates from "src/view/shared/utils/Dates";
import Nodata from "src/view/shared/Nodata";
import { i18n } from "../../../i18n";

function Portfolio() {
  const [active, setActive] = useState("completed");
  const dispatch = useDispatch();
  const records = useSelector(selectors.selectRows);
  const loading = useSelector(selectors.selectLoading);
  const selectHasRows = useSelector(selectors.selectHasRows);

  useEffect(() => {
    const filter = { status: active };
    dispatch(actions.doFetch(filter, filter));
  }, [dispatch, active]);

  const submitStatus = (id) => {
    const data = { status: "completed" };
    dispatch(recordFormActions.doChangeStatus(id, data));
  };

  const calculateProfit = (price, commission) => {
    const p = parseFloat(price) || 0;
    const c = parseFloat(commission) || 0;
    const total = (p * c) / 100;
    return total.toFixed(3);
  };

  const renderRecords = () => (
    <>
      {records.map((item, index) => {
        const productType = item?.product?.type;

        const displayAmount =
          item?.price ?? item?.product?.amount ?? 0;

        const displayCommission =
          item?.commission ??
          (productType !== "prizes" ? item?.product?.commission : 0);

        const estimatedReturn =
          productType === "prizes"
            ? item?.product?.amount ?? 0
            : calculateProfit(displayAmount, displayCommission);

        return (
          <div className="single__product" key={`${item.id}-${index}`}>
            <div className="order__time">
              <div>
                {i18n("pages.portfolio.orderTime")}:{" "}
                {Dates.currentDate(item?.date)}
              </div>
              <div>
                {i18n("pages.portfolio.orderNumber")}: {item.number}
              </div>
            </div>

            <div className={`badge__ ${item?.status}`}>
              <label>
                {i18n(`pages.portfolio.status.${item?.status}`)}
              </label>
            </div>

            <div className="product__image">
              <div className="image__">
                {item?.product && (
                  <img
                    src={
                      item?.product?.image ||
                      item?.product?.photo?.[0]?.downloadUrl ||
                      "https://via.placeholder.com/70x70/3b82f6/ffffff?text=Product"
                    }
                    alt={item?.title || item?.product?.title}
                    loading="lazy"
                  />
                )}
              </div>
              <div className="product__detail">
                <div className="detail__name">{item?.product?.title}</div>
                <div className="detail__price">
                  <div>{displayAmount}</div>
                  <div>{i18n("pages.portfolio.quantity")}</div>
                </div>
              </div>
            </div>

            <div className="bottom__cadre">
              <div className="cadre__detail">
                <div>{i18n("pages.portfolio.totalOrderAmount")}</div>
                <div>
                  {displayAmount} {i18n("pages.portfolio.currency")}
                </div>
              </div>

              <div className="cadre__detail">
                <div>{i18n("pages.portfolio.commission")}</div>
                <div>
                  {displayCommission}
                  {productType !== "prizes" && !item?.commission && "%"}
                </div>
              </div>

              <div className="cadre__detail">
                <div>{i18n("pages.portfolio.estimatedReturn")}</div>
                <div>
                  {estimatedReturn} {i18n("pages.portfolio.currency")}
                </div>
              </div>

              <div className="order__pages">
                {item?.status === "pending" && (
                  <button
                    className="submit_staus"
                    onClick={() => submitStatus(item.id)}
                  >
                    Submit
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );

  return (
    <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", maxWidth: 1000, margin: "auto" }}>
      <div className="order__list">
        <div className="list__actions">
          <div
            onClick={() => setActive("completed")}
            className={active === "completed" ? "active__order" : ""}
          >
            <span>{i18n("pages.portfolio.completed")}</span>
          </div>
          <div
            onClick={() => setActive("pending")}
            className={active === "pending" ? "active__order" : ""}
          >
            <span>{i18n("pages.portfolio.pending")}</span>
          </div>
        </div>
      </div>

      <div className="list__product">
        {loading && <LoadingModal />}
        {!loading && records && renderRecords()}
      </div>

      {!selectHasRows && <Nodata />}
    </div>
  );
}

export default Portfolio;
