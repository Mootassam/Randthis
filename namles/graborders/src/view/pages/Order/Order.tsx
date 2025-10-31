
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import actions from "src/modules/record/list/recordListActions";
import selectors from "src/modules/record/list/recordListSelectors";
import LoadingModal from "src/shared/LoadingModal";
import Calcule from "src/view/shared/utils/Calcule";
import Dates from "src/view/shared/utils/Dates";
import Nodata from "src/view/shared/Nodata";
import { i18n } from "../../../i18n";

function Portfolio() {
  const [active, setActive] = useState("completed");
  const dispatch = useDispatch();
  const record = useSelector(selectors.selectRows);
  const loading = useSelector(selectors.selectLoading);
  const total = useSelector(selectors.selectTotal);
  const selectHasRows = useSelector(selectors.selectHasRows);

  useEffect(() => {
    const values = {
      status: active,
    };
    dispatch(actions.doFetch(values, values));
  }, [dispatch, active]);

  const All = () => (
    <>
      {record.map((item, index) => (
        <div className="single__product" key={`${item.id}-${index}`}>
          <div className="order__time">
            <div>{i18n('pages.portfolio.orderTime')}: {Dates.currentDate(item?.date)}</div>
            <div>{i18n('pages.portfolio.orderNumber')}: {item.number}</div>
          </div>
          <div className={`badge__ ${item?.status}`}>
            <label>
              {i18n(`pages.portfolio.status.${item?.status}`)}
            </label>
          </div>
          <div className="product__image">
            <div className="image__">
              {item?.product && (
                <img src={item.product.image || item?.product.photo[0]?.downloadUrl || 'https://via.placeholder.com/70x70/3b82f6/ffffff?text=Product'}
                  alt={item.title || item?.product?.title} loading="lazy" />
              )}
            </div>
            <div className="product__detail">
              <div className="detail__name">{item?.product?.title}</div>
              <div className="detail__price">
                <div>{item?.product?.amount}</div>
                <div>{i18n('pages.portfolio.quantity')}</div>
              </div>
            </div>
          </div>
          <div className="bottom__cadre">
            <div className="cadre__detail">
              <div>{i18n('pages.portfolio.totalOrderAmount')}</div>
              <div>{item?.product?.amount} {i18n('pages.portfolio.currency')}</div>
            </div>
            <div className="cadre__detail">
              <div>{i18n('pages.portfolio.commission')}</div>
              <div>
                {item && item?.product.type === "prizes" ? '0' : item?.product?.commission}%
              </div>
            </div>
            <div className="cadre__detail">
              <div>{i18n('pages.portfolio.estimatedReturn')}</div>
              <div>
                {item && item?.product.type === "prizes" ? item?.product?.amount :
                  Calcule.calcule__total(
                    item?.product?.amount,
                    item?.product?.commission
                  )
                } {i18n('pages.portfolio.currency')}
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          maxWidth: 500,
          margin: 'auto'
        }}
      >
        <div className="order__list">
          <div className="list__actions">
            <div
              onClick={() => setActive("completed")}
              className={active === "completed" ? `active__order` : ""}
            >
              <span>{i18n('pages.portfolio.completed')}</span>
            </div>
            <div
              onClick={() => setActive("pending")}
              className={active === "pending" ? `active__order` : ""}
            >
              <span>{i18n('pages.portfolio.pending')}</span>
            </div>
       
          </div>
        </div>
        <div className="list__product">
          {loading && <LoadingModal />}
          {!loading && record && <All />}
        </div>

        {!selectHasRows && <Nodata />}
      </div>
    </div>
  );
}

export default Portfolio;