import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { i18n } from 'src/i18n';
import couponsSelectors from 'src/modules/product/productSelectors';
import destroyActions from 'src/modules/product/destroy/productDestroyActions';
import destroySelectors from 'src/modules/product/destroy/productDestroySelectors';
import actions from 'src/modules/product/list/productListActions';
import selectors from 'src/modules/product/list/productListSelectors';
import ConfirmModal from 'src/view/shared/modals/ConfirmModal';
import Spinner from 'src/view/shared/Spinner';
import TableWrapper from 'src/view/shared/styles/TableWrapper';
import Pagination from 'src/view/shared/table/Pagination';
import actionsForm from 'src/modules/product/form/productFormActions';
import VipListItem from 'src/view/vip/list/VipListItem';

function ProductListTable(props) {
  const [recordIdToDestroy, setRecordIdToDestroy] = useState(null);
  const dispatch = useDispatch();

  const findLoading = useSelector(selectors.selectLoading);
  const destroyLoading = useSelector(destroySelectors.selectLoading);
  const loading = findLoading || destroyLoading;
  const rows = useSelector(selectors.selectRows);
  const pagination = useSelector(selectors.selectPagination);
  const selectedKeys = useSelector(selectors.selectSelectedKeys);
  const hasRows = useSelector(selectors.selectHasRows);
  const sorter = useSelector(selectors.selectSorter);
  const isAllSelected = useSelector(selectors.selectIsAllSelected);
  
  const hasPermissionToEdit = useSelector(
    couponsSelectors.selectPermissionToEdit,
  );
  const hasPermissionToDestroy = useSelector(
    couponsSelectors.selectPermissionToDestroy,
  );

  const doDestroy = (id) => {
    setRecordIdToDestroy(null);
    dispatch(destroyActions.doDestroy(id));
  };

  const doChangeSort = (field) => {
    const order =
      sorter.field === field && sorter.order === 'ascend'
        ? 'descend'
        : 'ascend';

    dispatch(
      actions.doChangeSort({
        field,
        order,
      }),
    );
  };

  const doChangePagination = (pagination) => {
    dispatch(actions.doChangePagination(pagination));
  };

  const doToggleAllSelected = () => {
    dispatch(actions.doToggleAllSelected());
  };

  const doToggleOneSelected = (id) => {
    dispatch(actions.doToggleOneSelected(id));
  };

  const formSubmit = (id, e) => {
    let data = { status: e.target.value };
    dispatch(actionsForm.doUpdate(id, data));
  };

  return (
    <div className="product-list-container">
      <TableWrapper>
        <div className="table-responsive">
          <table className="product-list-table">
            <thead className="table-header">
              <tr>
                <th className="checkbox-column">
                  {hasRows && (
                    <div className="checkbox-wrapper">
                      <input
                        type="checkbox"
                        className="form-checkbox"
                        id="table-header-checkbox"
                        checked={Boolean(isAllSelected)}
                        onChange={() => doToggleAllSelected()}
                      />
                    </div>
                  )}
                </th>
                <th 
                  className="sortable-header" 
                  onClick={() => doChangeSort('vip')}
                >
                  {i18n('entities.product.fields.vip')}
                  {sorter.field === 'vip' && (
                    <span className="sort-icon">
                      {sorter.order === 'ascend' ? '↑' : '↓'}
                    </span>
                  )}
                </th>
                <th 
                  className="sortable-header" 
                  onClick={() => doChangeSort('title')}
                >
                  {i18n('entities.product.fields.title')}
                  {sorter.field === 'title' && (
                    <span className="sort-icon">
                      {sorter.order === 'ascend' ? '↑' : '↓'}
                    </span>
                  )}
                </th>
                <th 
                  className="sortable-header text-right" 
                  onClick={() => doChangeSort('amount')}
                >
                  {i18n('entities.product.fields.amount')}
                  {sorter.field === 'amount' && (
                    <span className="sort-icon">
                      {sorter.order === 'ascend' ? '↑' : '↓'}
                    </span>
                  )}
                </th>
                <th 
                  className="sortable-header text-right" 
                  onClick={() => doChangeSort('commission')}
                >
                  {i18n('entities.product.fields.commission')}
                  {sorter.field === 'commission' && (
                    <span className="sort-icon">
                      {sorter.order === 'ascend' ? '↑' : '↓'}
                    </span>
                  )}
                </th>
                <th className="actions-header product-table-actions-header">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="table-body">
              {loading && (
                <tr>
                  <td colSpan={6} className="loading-cell">
                    <div className="loading-container">
                      <Spinner />
                      <span className="loading-text">
                        Loading data...
                      </span>
                    </div>
                  </td>
                </tr>
              )}
              {!loading && !hasRows && (
                <tr>
                  <td colSpan={6} className="no-data-cell">
                    <div className="no-data-content">
                      <i className="fas fa-database no-data-icon"></i>
                      <p>{i18n('table.noData')}</p>
                    </div>
                  </td>
                </tr>
              )}
              {!loading &&
                rows.map((row) => (
                  <tr key={row.id} className="table-row">
                    <td className="checkbox-column">
                      <div className="checkbox-wrapper">
                        <input
                          type="checkbox"
                          className="form-checkbox"
                          id={`table-row-checkbox-${row.id}`}
                          checked={selectedKeys.includes(row.id)}
                          onChange={() => doToggleOneSelected(row.id)}
                        />
                      </div>
                    </td>
                    <td className="table-cell">
                      <div className="product-vip-cell">
                        {row.vip ? (
                          <div className="vip-badge">
                            <i className="fas fa-crown vip-icon"></i>
                            <span className="vip-name">{row.vip.title}</span>
                          </div>
                        ) : (
                          <span className="no-vip">No VIP</span>
                        )}
                      </div>
                    </td>
                    <td className="table-cell">
                      <div className="product-title-cell">
                        <span className="product-title">{row.title}</span>
                        {row.description && (
                          <small className="product-description">{row.description}</small>
                        )}
                      </div>
                    </td>
                    <td className="table-cell text-right">
  <div className="amount-display">
    {row.vip?.isFixedAmount ? (
      <>
        <i className="fas fa-dollar-sign amount-icon"></i>
        <span className="amount-value">{row.amount}</span>
        {row.currency && (
          <span className="amount-currency">{row.currency}</span>
        )}
      </>
    ) : (
      <>
        <span className="amount-value">{row.amount}</span>
        <span className="amount-unit">%</span>
      </>
    )}
  </div>
</td>

                    <td className="table-cell text-right">
                      <div className="commission-display">
                        <span className="commission-value">{row.commission}</span>
                        <span className="commission-unit">%</span>
                      </div>
                    </td>
                    <td className="product-table-actions">
                      <div className="product-table-actions-content">
                        <Link
                          className="product-table-action-btn info"
                          to={`/product/${row.id}`}
                        >
                          <i className="fas fa-eye product-table-action-icon" />
                          View
                        </Link>
                        {hasPermissionToEdit && (
                          <Link
                            className="product-table-action-btn primary"
                            to={`/product/${row.id}/edit`}
                          >
                            <i className="fas fa-edit product-table-action-icon" />
                            Edit
                          </Link>
                        )}
                        {hasPermissionToDestroy && (
                          <button
                            className="product-table-action-btn danger"
                            onClick={() => setRecordIdToDestroy(row.id)}
                          >
                            <i className="fas fa-trash product-table-action-icon" />
                            Delete
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <div className="pagination-container">
          <Pagination
            onChange={doChangePagination}
            disabled={loading}
            pagination={pagination}
          />
        </div>
      </TableWrapper>

      {recordIdToDestroy && (
        <ConfirmModal
          title={i18n('common.areYouSure')}
          onConfirm={() => doDestroy(recordIdToDestroy)}
          onClose={() => setRecordIdToDestroy(null)}
          okText={i18n('common.yes')}
          cancelText={i18n('common.no')}
        />
      )}

      <style>{`
        .product-list-container {
          width: 100%;
        }

        .sort-icon {
          margin-left: 8px;
          font-size: 12px;
        }

        .text-right {
          text-align: right;
        }

        .checkbox-column {
          width: 40px;
          padding: 16px 8px !important;
        }

        .checkbox-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .form-checkbox {
          width: 16px;
          height: 16px;
          cursor: pointer;
        }

        .table-header {
          background: #f8fafc;
          border-bottom: 2px solid #e2e8f0;
        }

        .table-header th {
          padding: 16px 12px;
          font-weight: 600;
          color: #475569;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border-bottom: 2px solid #e2e8f0;
        }

        .sortable-header {
          cursor: pointer;
          transition: background-color 0.2s ease;
          user-select: none;
        }

        .sortable-header:hover {
          background: #f1f5f9;
        }

        .table-body {
          background: white;
        }

        .table-row {
          transition: background-color 0.2s ease;
          border-bottom: 1px solid #f1f5f9;
        }

        .table-row:hover {
          background: #f8fafc;
        }

        .table-cell {
          padding: 16px 12px;
          font-size: 14px;
          color: #475569;
          vertical-align: middle;
        }

        .product-vip-cell {
          display: flex;
          align-items: center;
        }

        .vip-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: linear-gradient(135deg, #f6ad55 0%, #ed8936 100%);
          color: white;
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 500;
        }

        .vip-icon {
          font-size: 10px;
        }

        .vip-name {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 100px;
        }

        .no-vip {
          color: #94a3b8;
          font-style: italic;
          font-size: 12px;
        }

        .product-title-cell {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .product-title {
          font-weight: 500;
          color: #334155;
        }

        .product-description {
          color: #64748b;
          font-size: 12px;
          line-height: 1.3;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }

        .amount-display {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 4px;
        }

        .amount-icon {
          color: #48bb78;
          font-size: 12px;
        }

        .amount-value {
          font-weight: 700;
          color: #2d3748;
          font-size: 16px;
        }

        .amount-currency {
          color: #718096;
          font-size: 12px;
          margin-left: 2px;
        }

        .commission-display {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 8px;
        }

        .commission-value {
          font-weight: 700;
          color: #2d3748;
          font-size: 16px;
          min-width: 30px;
          text-align: right;
        }

        .commission-unit {
          color: #718096;
          font-size: 12px;
        }

        .commission-bar {
          width: 60px;
          height: 6px;
          background: #e2e8f0;
          border-radius: 3px;
          overflow: hidden;
        }

        .commission-fill {
          height: 100%;
          background: linear-gradient(135deg, #4299e1 0%, #3182ce 100%);
          border-radius: 3px;
          transition: width 0.3s ease;
        }

        .loading-cell {
          text-align: center;
          padding: 40px !important;
        }

        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }

        .loading-text {
          color: #6c757d;
          font-size: 14px;
        }

        .no-data-cell {
          text-align: center;
          padding: 60px 20px !important;
        }

        .no-data-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          color: #6c757d;
        }

        .no-data-icon {
          font-size: 48px;
          color: #adb5bd;
        }

        .no-data-content p {
          margin: 0;
          font-size: 14px;
        }

        .actions-header {
          width: 200px;
        }

        .product-table-actions-header {
          background: #f8fafc;
        }

        .product-table-actions {
          position: sticky;
          right: 0;
          background: white;
          z-index: 10;
          min-width: 200px;
          white-space: nowrap;
          box-shadow: -2px 0 8px rgba(0,0,0,0.06);
          border-left: 2px solid #f1f5f9;
        }
        
        .product-table-actions-content {
          display: flex;
          align-items: center;
          gap: 6px;
          flex-wrap: nowrap;
          padding: 8px;
        }
        
        .product-table-action-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 6px 10px;
          border: none;
          border-radius: 8px;
          font-size: 11px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          text-decoration: none;
          min-width: auto;
          white-space: nowrap;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        
        .product-table-action-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.15);
        }
        
        .product-table-action-btn.primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }
        
        .product-table-action-btn.success {
          background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
          color: white;
        }
        
        .product-table-action-btn.warning {
          background: linear-gradient(135deg, #ed8936 0%, #dd6b20 100%);
          color: white;
        }
        
        .product-table-action-btn.danger {
          background: linear-gradient(135deg, #f56565 0%, #e53e3e 100%);
          color: white;
        }
        
        .product-table-action-btn.info {
          background: linear-gradient(135deg, #4299e1 0%, #3182ce 100%);
          color: white;
        }
        
        .product-table-action-icon {
          margin-right: 4px;
          font-size: 10px;
          width: 10px;
        }

        /* Pagination Styles */
        .pagination-container {
          margin-top: 20px;
          display: flex;
          justify-content: center;
        }

        /* Status indicator if needed */
        .status-indicator {
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          margin-right: 6px;
        }

        .status-active {
          background: #48bb78;
        }

        .status-inactive {
          background: #f56565;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .product-table-actions-content {
            flex-direction: column;
            align-items: stretch;
          }
          
          .product-table-action-btn {
            justify-content: center;
            padding: 8px 12px;
          }
          
          .product-table-actions {
            min-width: 150px;
          }
          
          .table-header th {
            padding: 12px 8px;
            font-size: 10px;
          }
          
          .table-cell {
            padding: 12px 8px;
            font-size: 12px;
          }
          
          .checkbox-column {
            padding: 12px 4px !important;
          }
          
          .vip-badge {
            padding: 3px 8px;
            font-size: 10px;
          }
          
          .vip-name {
            max-width: 60px;
          }
          
          .amount-display,
          .commission-display {
            flex-direction: column;
            align-items: flex-end;
            gap: 2px;
          }
          
          .commission-bar {
            width: 40px;
          }
          
          .product-title-cell {
            max-width: 120px;
          }
        }
      `}</style>
    </div>
  );
}

export default ProductListTable;