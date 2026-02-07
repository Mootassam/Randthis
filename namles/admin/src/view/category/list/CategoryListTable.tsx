import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { i18n } from 'src/i18n';
import categorySelectors from 'src/modules/category/categorySelectors';
import destroyActions from 'src/modules/category/destroy/categoryDestroyActions';
import destroySelectors from 'src/modules/category/destroy/categoryDestroySelectors';
import actions from 'src/modules/category/list/categoryListActions';
import selectors from 'src/modules/category/list/categoryListSelectors';
import ConfirmModal from 'src/view/shared/modals/ConfirmModal';
import Spinner from 'src/view/shared/Spinner';
import TableWrapper from 'src/view/shared/styles/TableWrapper';
import Pagination from 'src/view/shared/table/Pagination';
import ImagesListView from 'src/view/shared/table/ImagesListView';
import actionsForm from 'src/modules/category/form/categoryFormActions';

function CategoryListTable(props) {
  const dispatch = useDispatch();
  const [recordIdToDestroy, setRecordIdToDestroy] = useState(null);

  const findLoading = useSelector(selectors.selectLoading);
  const destroyLoading = useSelector(destroySelectors.selectLoading);
  const loading = findLoading || destroyLoading;
  const rows = useSelector(selectors.selectRows);
  const pagination = useSelector(selectors.selectPagination);
  const hasRows = useSelector(selectors.selectHasRows);
  const sorter = useSelector(selectors.selectSorter);
  
  const hasPermissionToEdit = useSelector(
    categorySelectors.selectPermissionToEdit,
  );
  const hasPermissionToDestroy = useSelector(
    categorySelectors.selectPermissionToDestroy,
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

  return (
    <div className="category-list-container">
      <TableWrapper>
        <div className="table-responsive">
          <table className="category-list-table">
            <thead className="table-header">
              <tr>
                <th className="table-header">
                  {i18n('entities.category.fields.photo')}
                </th>
                <th 
                  className="sortable-header" 
                  onClick={() => doChangeSort('name')}
                >
                  {i18n('entities.category.fields.name')}
                  {sorter.field === 'name' && (
                    <span className="sort-icon">
                      {sorter.order === 'ascend' ? '↑' : '↓'}
                    </span>
                  )}
                </th>
                <th className="table-header">
                  {i18n('entities.category.fields.status')}
                </th>
                <th className="actions-header category-table-actions-header">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="table-body">
              {loading && (
                <tr>
                  <td colSpan={4} className="loading-cell">
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
                  <td colSpan={4} className="no-data-cell">
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
                      <div className="category-photo-cell">
                        {row.photo && row.photo.length > 0 ? (
                          <img 
                            src={row.photo[0].downloadUrl} 
                            alt={row.name}
                            className="category-photo"
                          />
                        ) : (
                          <div className="category-photo-placeholder">
                            <i className="fas fa-folder"></i>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="table-cell">{row.name}</td>
                    <td className="table-cell">
                      <select
                        className="status-select"
                        value={row.status}
                        onChange={(e) => formSubmit(row.id, e)}
                      >
                        <option value="enable">Enable</option>
                        <option value="disable">Disable</option>
                      </select>
                    </td>
                    <td className="category-table-actions">
                      <div className="category-table-actions-content">
                        {hasPermissionToEdit && (
                          <Link
                            className="category-table-action-btn primary"
                            to={`/category/${row.id}/edit`}
                          >
                            <i className="fas fa-edit category-table-action-icon" />
                            Edit
                          </Link>
                        )}
                        {hasPermissionToDestroy && (
                          <button
                            className="category-table-action-btn danger"
                            onClick={() => setRecordIdToDestroy(row.id)}
                          >
                            <i className="fas fa-trash category-table-action-icon" />
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
        .category-list-container {
          width: 100%;
        }

        .sort-icon {
          margin-left: 8px;
          font-size: 12px;
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

        .category-photo-cell {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .category-photo {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          object-fit: cover;
          border: 2px solid #e2e8f0;
        }

        .category-photo-placeholder {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          background: #f1f5f9;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #94a3b8;
          font-size: 16px;
          border: 2px solid #e2e8f0;
        }

        .status-select {
          padding: 8px 12px;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
          background: white;
          color: #475569;
          font-size: 14px;
          min-width: 120px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .status-select:hover {
          border-color: #cbd5e1;
        }

        .status-select:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
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

        .category-table-actions-header {
          background: #f8fafc;
        }

        .category-table-actions {
          position: sticky;
          right: 0;
          background: white;
          z-index: 10;
          min-width: 200px;
          white-space: nowrap;
          box-shadow: -2px 0 8px rgba(0,0,0,0.06);
          border-left: 2px solid #f1f5f9;
        }
        
        .category-table-actions-content {
          display: flex;
          align-items: center;
          gap: 6px;
          flex-wrap: nowrap;
          padding: 8px;
        }
        
        .category-table-action-btn {
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
        
        .category-table-action-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.15);
        }
        
        .category-table-action-btn.primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }
        
        .category-table-action-btn.success {
          background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
          color: white;
        }
        
        .category-table-action-btn.warning {
          background: linear-gradient(135deg, #ed8936 0%, #dd6b20 100%);
          color: white;
        }
        
        .category-table-action-btn.danger {
          background: linear-gradient(135deg, #f56565 0%, #e53e3e 100%);
          color: white;
        }
        
        .category-table-action-btn.info {
          background: linear-gradient(135deg, #4299e1 0%, #3182ce 100%);
          color: white;
        }
        
        .category-table-action-icon {
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
          .category-table-actions-content {
            flex-direction: column;
            align-items: stretch;
          }
          
          .category-table-action-btn {
            justify-content: center;
            padding: 8px 12px;
          }
          
          .category-table-actions {
            min-width: 150px;
          }
          
          .status-select {
            min-width: 100px;
            font-size: 12px;
            padding: 6px 8px;
          }
          
          .table-header th {
            padding: 12px 8px;
            font-size: 10px;
          }
          
          .table-cell {
            padding: 12px 8px;
            font-size: 12px;
          }
        }
      `}</style>
    </div>
  );
}

export default CategoryListTable;