import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { i18n } from 'src/i18n';
import couponsSelectors from 'src/modules/record/recordSelectors';
import destroyActions from 'src/modules/record/destroy/recordDestroyActions';
import destroySelectors from 'src/modules/record/destroy/recordDestroySelectors';
import actions from 'src/modules/record/list/recordListActions';
import selectors from 'src/modules/record/list/recordListSelectors';
import ConfirmModal from 'src/view/shared/modals/ConfirmModal';
import Spinner from 'src/view/shared/Spinner';
import TableWrapper from 'src/view/shared/styles/TableWrapper';
import Pagination from 'src/view/shared/table/Pagination';
import actionsForm from 'src/modules/record/form/recordFormActions';
import UserListItem from 'src/view/user/list/UserListItem';
import ProductListItem from 'src/view/product/list/ProductListItem';

function RecordListTable(props) {
  const [recordIdToDestroy, setRecordIdToDestroy] = useState(null);
  const dispatch = useDispatch();

  const findLoading = useSelector(selectors.selectLoading);
  const destroyLoading = useSelector(destroySelectors.selectLoading);
  const loading = findLoading || destroyLoading;
  const rows = useSelector(selectors.selectRows);
  const pagination = useSelector(selectors.selectPagination);
  const hasRows = useSelector(selectors.selectHasRows);
  const sorter = useSelector(selectors.selectSorter);
  
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

  const formSubmit = (id, e) => {
    let data = { status: e.target.value };
    dispatch(actionsForm.doUpdate(id, data));
  };

  const getStatusClass = (status) => {
    switch(status) {
      case "pending":
        return "status-pending";
      case "canceled":
        return "status-canceled";
      case "completed":
        return "status-completed";
      default:
        return "status-unknown";
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case "pending":
        return "fas fa-clock";
      case "canceled":
        return "fas fa-times-circle";
      case "completed":
        return "fas fa-check-circle";
      default:
        return "fas fa-question-circle";
    }
  };

  return (
    <div className="record-list-container">
      <TableWrapper>
        <div className="table-responsive">
          <table className="record-list-table">
            <thead className="table-header">
              <tr>
                <th 
                  className="sortable-header" 
                  onClick={() => doChangeSort('user')}
                >
                  {i18n('entities.record.fields.user')}
                  {sorter.field === 'user' && (
                    <span className="sort-icon">
                      {sorter.order === 'ascend' ? '↑' : '↓'}
                    </span>
                  )}
                </th>
                <th 
                  className="sortable-header" 
                  onClick={() => doChangeSort('product')}
                >
                  {i18n('entities.record.fields.product')}
                  {sorter.field === 'product' && (
                    <span className="sort-icon">
                      {sorter.order === 'ascend' ? '↑' : '↓'}
                    </span>
                  )}
                </th>
                <th 
                  className="sortable-header text-center" 
                  onClick={() => doChangeSort('number')}
                >
                  {i18n('entities.record.fields.number')}
                  {sorter.field === 'number' && (
                    <span className="sort-icon">
                      {sorter.order === 'ascend' ? '↑' : '↓'}
                    </span>
                  )}
                </th>
                <th 
                  className="sortable-header text-center" 
                  onClick={() => doChangeSort('status')}
                >
                  {i18n('entities.record.fields.status')}
                  {sorter.field === 'status' && (
                    <span className="sort-icon">
                      {sorter.order === 'ascend' ? '↑' : '↓'}
                    </span>
                  )}
                </th>
                <th className="actions-header record-table-actions-header">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="table-body">
              {loading && (
                <tr>
                  <td colSpan={5} className="loading-cell">
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
                  <td colSpan={5} className="no-data-cell">
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
                    <td className="table-cell">
                      <div className="record-user-cell">
                        {row.user ? (
                          <div className="user-avatar-info">
                            <div className="user-avatar">
                              {row.user.avatar ? (
                                <img 
                                  src={row.user.avatar} 
                                  alt={row.user.fullName}
                                  className="avatar-img"
                                />
                              ) : (
                                <div className="avatar-placeholder">
                                  {row.user.fullName?.charAt(0) || 'U'}
                                </div>
                              )}
                            </div>
                            <div className="user-info">
                              <div className="user-name">{row.user.fullName}</div>
                              {row.user.email && (
                                <div className="user-email">{row.user.email}</div>
                              )}
                            </div>
                          </div>
                        ) : (
                          <span className="no-user">No user</span>
                        )}
                      </div>
                    </td>
                    <td className="table-cell">
                      <div className="record-product-cell">
                        {row.product ? (
                          <>
                            <div className="product-title">{row.product.title}</div>
                            {row.product.amount && (
                              <div className="product-amount">
                                <i className="fas fa-dollar-sign amount-icon"></i>
                                {row.product.amount}
                              </div>
                            )}
                          </>
                        ) : (
                          <span className="no-product">No product</span>
                        )}
                      </div>
                    </td>
                    <td className="table-cell text-center">
                      <div className="record-number-display">
                        <div className="number-badge">
                          {row.number}
                        </div>
                        {row.type && (
                          <div className="record-type">{row.type}</div>
                        )}
                      </div>
                    </td>
                    <td className="table-cell text-center">
                      <div className={`status-badge ${getStatusClass(row.status)}`}>
                        <i className={`status-icon ${getStatusIcon(row.status)}`}></i>
                        <span className="status-text">{row.status}</span>
                      </div>
                      {row.updatedAt && (
                        <div className="status-time">
                          {new Date(row.updatedAt).toLocaleDateString()}
                        </div>
                      )}
                    </td>
                    <td className="record-table-actions">
                      <div className="record-table-actions-content">
                        <Link
                          className="record-table-action-btn info"
                          to={`/record/${row.id}`}
                        >
                          <i className="fas fa-eye record-table-action-icon" />
                          View
                        </Link>
                        {hasPermissionToEdit && (
                          <Link
                            className="record-table-action-btn primary"
                            to={`/record/${row.id}/edit`}
                          >
                            <i className="fas fa-edit record-table-action-icon" />
                            Edit
                          </Link>
                        )}
                        {hasPermissionToDestroy && (
                          <button
                            className="record-table-action-btn danger"
                            onClick={() => setRecordIdToDestroy(row.id)}
                          >
                            <i className="fas fa-trash record-table-action-icon" />
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
        .record-list-container {
          width: 100%;
        }

        .sort-icon {
          margin-left: 8px;
          font-size: 12px;
        }

        .text-center {
          text-align: center;
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

        .record-user-cell {
          display: flex;
          align-items: center;
        }

        .user-avatar-info {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .user-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          overflow: hidden;
          border: 2px solid #e2e8f0;
        }

        .avatar-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .avatar-placeholder {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 14px;
        }

        .user-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .user-name {
          font-weight: 500;
          color: #334155;
        }

        .user-email {
          font-size: 12px;
          color: #64748b;
        }

        .no-user {
          color: #94a3b8;
          font-style: italic;
        }

        .record-product-cell {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .product-title {
          font-weight: 500;
          color: #334155;
        }

        .product-amount {
          display: flex;
          align-items: center;
          gap: 4px;
          color: #48bb78;
          font-size: 12px;
          font-weight: 500;
        }

        .amount-icon {
          font-size: 10px;
        }

        .no-product {
          color: #94a3b8;
          font-style: italic;
        }

        .record-number-display {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }

        .number-badge {
          background: linear-gradient(135deg, #4299e1 0%, #3182ce 100%);
          color: white;
          padding: 4px 12px;
          border-radius: 20px;
          font-weight: 600;
          font-size: 14px;
          min-width: 40px;
          text-align: center;
        }

        .record-type {
          font-size: 11px;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 500;
        }

        .status-pending {
          background: linear-gradient(135deg, #f6ad55 0%, #ed8936 100%);
          color: white;
        }

        .status-canceled {
          background: linear-gradient(135deg, #f56565 0%, #e53e3e 100%);
          color: white;
        }

        .status-completed {
          background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
          color: white;
        }

        .status-unknown {
          background: #e2e8f0;
          color: #475569;
        }

        .status-icon {
          font-size: 10px;
        }

        .status-text {
          text-transform: capitalize;
        }

        .status-time {
          font-size: 11px;
          color: #64748b;
          margin-top: 4px;
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

        .record-table-actions-header {
          background: #f8fafc;
        }

        .record-table-actions {
          position: sticky;
          right: 0;
          background: white;
          z-index: 10;
          min-width: 200px;
          white-space: nowrap;
          box-shadow: -2px 0 8px rgba(0,0,0,0.06);
          border-left: 2px solid #f1f5f9;
        }
        
        .record-table-actions-content {
          display: flex;
          align-items: center;
          gap: 6px;
          flex-wrap: nowrap;
          padding: 8px;
        }
        
        .record-table-action-btn {
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
        
        .record-table-action-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.15);
        }
        
        .record-table-action-btn.primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }
        
        .record-table-action-btn.success {
          background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
          color: white;
        }
        
        .record-table-action-btn.warning {
          background: linear-gradient(135deg, #ed8936 0%, #dd6b20 100%);
          color: white;
        }
        
        .record-table-action-btn.danger {
          background: linear-gradient(135deg, #f56565 0%, #e53e3e 100%);
          color: white;
        }
        
        .record-table-action-btn.info {
          background: linear-gradient(135deg, #4299e1 0%, #3182ce 100%);
          color: white;
        }
        
        .record-table-action-icon {
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

        /* Responsive */
        @media (max-width: 768px) {
          .record-table-actions-content {
            flex-direction: column;
            align-items: stretch;
          }
          
          .record-table-action-btn {
            justify-content: center;
            padding: 8px 12px;
          }
          
          .record-table-actions {
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
          
          .user-avatar-info {
            flex-direction: column;
            align-items: flex-start;
            gap: 4px;
          }
          
          .user-avatar {
            width: 28px;
            height: 28px;
          }
          
          .user-name {
            font-size: 12px;
          }
          
          .user-email {
            font-size: 10px;
          }
          
          .status-badge {
            padding: 4px 8px;
            font-size: 10px;
          }
          
          .number-badge {
            font-size: 12px;
            padding: 3px 8px;
          }
          
          .record-type {
            font-size: 9px;
          }
        }
      `}</style>
    </div>
  );
}

export default RecordListTable;