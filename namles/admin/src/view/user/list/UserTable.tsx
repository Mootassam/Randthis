import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import userSelectors from 'src/modules/user/userSelectors';
import selectors from 'src/modules/user/list/userListSelectors';
import actions from 'src/modules/user/list/userListActions';
import { Link } from 'react-router-dom';
import { i18n } from 'src/i18n';
import Pagination from 'src/view/shared/table/Pagination';
import Spinner from 'src/view/shared/Spinner';
import TableColumnHeader from 'src/view/shared/table/TableColumnHeader';
import ConfirmModal from 'src/view/shared/modals/ConfirmModal';
import Roles from 'src/security/roles';
import UserStatusView from 'src/view/user/view/UserStatusView';
import Avatar from 'src/view/shared/Avatar';
import TableWrapper from 'src/view/shared/styles/TableWrapper';
import recordListActions from 'src/modules/record/list/recordListActions';
import selectorTaskdone from 'src/modules/record/list/recordListSelectors';

function UserTable() {
  const dispatch = useDispatch();
  const [recordIdToDestroy, setRecordIdToDestroy] =
    useState(null);
  const [totalTask, setTotalTasks] = useState('');
  const tasksdone = useSelector(
    selectorTaskdone.selectCountRecord,
  );
  const LoadingTasksDone = useSelector(
    selectorTaskdone.selectLoading,
  );
  const loading = useSelector(selectors.selectLoading);
  const rows = useSelector(selectors.selectRows);
  const pagination = useSelector(
    selectors.selectPagination,
  );
  const selectedKeys = useSelector(
    selectors.selectSelectedKeys,
  );
  const [showTask, setShowTask] = useState(false)
  const hasRows = useSelector(selectors.selectHasRows);
  const sorter = useSelector(selectors.selectSorter);
  const isAllSelected = useSelector(
    selectors.selectIsAllSelected,
  );
  const hasPermissionToEdit = useSelector(
    userSelectors.selectPermissionToEdit,
  );
  const hasPermissionToDestroy = useSelector(
    userSelectors.selectPermissionToDestroy,
  );

  const doDestroy = (id) => {
    setRecordIdToDestroy(null);
    dispatch(actions.doDestroy(id));
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

  const showThecurrentRecord = async (id, totaltask?) => {
    setShowTask(true)
    await dispatch(recordListActions.doTasksDone(id));
    setTotalTasks(totaltask);
  };

  useEffect(() => { }, [dispatch, tasksdone]);

  return (
    <>
      <style>{`
        .user-table-actions {
          position: sticky;
          right: 0;
          background: white;
          z-index: 10;
          min-width: 280px;
          white-space: nowrap;
          box-shadow: -2px 0 5px rgba(0,0,0,0.1);
        }
        
        .user-table-actions-content {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: nowrap;
          padding: 8px;
        }
        
        .user-table-action-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 6px 10px;
          border: none;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          text-decoration: none;
          min-width: auto;
          white-space: nowrap;
        }
        
        .user-table-action-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        
        .user-table-action-btn.primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }
        
        .user-table-action-btn.success {
          background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
          color: white;
        }
        
        .user-table-action-btn.warning {
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          color: white;
        }
        
        .user-table-action-btn.danger {
          background: linear-gradient(135deg, #ff5858 0%, #f09819 100%);
          color: white;
        }
        
        .user-table-action-btn.info {
          background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
          color: #333;
        }
        
        .user-table-action-icon {
          margin-right: 4px;
          font-size: 12px;
        }
        
        .user-table-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }
        
        .user-table-modal-content {
          background: white;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
          position: relative;
          min-width: 300px;
          text-align: center;
        }
        
        .user-table-modal-close {
          position: absolute;
          top: 15px;
          right: 15px;
          background: none;
          border: none;
          font-size: 20px;
          cursor: pointer;
          color: #666;
          transition: color 0.2s;
        }
        
        .user-table-modal-close:hover {
          color: #333;
        }
        
        .user-table-modal-text {
          font-size: 18px;
          font-weight: 600;
          color: #333;
          margin: 0;
        }
        
        .user-table-progress {
          font-size: 24px;
          font-weight: bold;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .table-responsive {
          overflow-x: auto;
        }
        
        .user-table-sticky-actions {
          position: sticky;
          right: 0;
          background: inherit;
        }
      `}</style>

      <TableWrapper>
        <div className="table-responsive">
          <table className="table table-striped user-table">
            <thead className="thead">
              <tr>
                <TableColumnHeader className="th-checkbox">
                  {hasRows && (
                    <div className="adherent-control adherent-checkbox">
                      <input
                        type="checkbox"
                        className="adherent-control-input"
                        id="table-header-checkbox"
                        checked={Boolean(isAllSelected)}
                        onChange={doToggleAllSelected}
                      />
                      <label
                        htmlFor="table-header-checkbox"
                        className="adherent-control-label"
                      >
                        &#160;
                      </label>
                    </div>
                  )}
                </TableColumnHeader>

                <TableColumnHeader
                  onSort={doChangeSort}
                  hasRows={hasRows}
                  sorter={sorter}
                  name={'email'}
                  label={i18n('user.fields.email')}
                />
                <TableColumnHeader
                  onSort={doChangeSort}
                  hasRows={hasRows}
                  sorter={sorter}
                  name={'phoneNumber'}
                  label={i18n('user.fields.phoneNumber')}
                />
                <TableColumnHeader
                  onSort={doChangeSort}
                  hasRows={hasRows}
                  sorter={sorter}
                  name={'invitationcode'}
                  label={i18n('user.fields.invitationcode')}
                />

                <TableColumnHeader
                  onSort={doChangeSort}
                  hasRows={hasRows}
                  sorter={sorter}
                  name={'refcode'}
                  label={i18n('user.fields.refcode')}
                />
                <TableColumnHeader
                  onSort={doChangeSort}
                  hasRows={hasRows}
                  sorter={sorter}
                  name={'couponcode'}
                  label={i18n('user.fields.couponcode')}
                />

                <TableColumnHeader
                  label={i18n('user.fields.roles')}
                ></TableColumnHeader>
                <TableColumnHeader
                  className="text-center"
                  label={i18n('user.fields.status')}
                />
                <TableColumnHeader
                  className="text-center"
                  label={i18n('user.fields.country')}
                />
                <TableColumnHeader
                  className="user-table-sticky-actions"
                  label={i18n('common.actions')}
                />
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={100}>
                    <Spinner />
                  </td>
                </tr>
              )}
              {!loading && !hasRows && (
                <tr>
                  <td colSpan={100}>
                    <div className="d-flex justify-content-center">
                      {i18n('table.noData')}
                    </div>
                  </td>
                </tr>
              )}
              {!loading &&
                rows.map((row) => (
                  <tr key={row.id}>
                    <th className="th-checkbox" scope="row">
                      <div className="adherent-control adherent-checkbox">
                        <input
                          type="checkbox"
                          className="adherent-control-input"
                          id={`table-header-checkbox-${row.id}`}
                          checked={selectedKeys.includes(
                            row.id,
                          )}
                          onChange={() =>
                            doToggleOneSelected(row.id)
                          }
                        />
                        <label
                          htmlFor={`table-header-checkbox-${row.id}`}
                          className="adherent-control-label"
                        >
                          &#160;
                        </label>
                      </div>
                    </th>
                    <td>{row.email}</td>
                    <td>{row.phoneNumber}</td>
                    <td>{row.invitationcode}</td>
                    <td>{row.refcode}</td>
                    <td>{row.couponcode}</td>

                    <td>
                      {row.roles.map((roleId) => (
                        <div key={roleId}>
                          <span>
                            {Roles.labelOf(roleId)}
                          </span>
                        </div>
                      ))}
                    </td>
                    <td className="text-center">
                      <UserStatusView value={row.status} />
                    </td>

                    <td className="text-center">
                      <span>United-States <br /> 188.145.30.20</span>
                    </td>

                    <td className="user-table-actions">
                      <div className="user-table-actions-content">
                        <button
                          className="user-table-action-btn primary"
                          onClick={() => {
                            /* Add login functionality here */
                            console.log('Login as:', row.id);
                          }}
                        >
                          <i className="fas fa-sign-in-alt user-table-action-icon" />
                          Login
                        </button>

                        <button
                          className="user-table-action-btn success"
                          onClick={() =>
                            showThecurrentRecord(
                              row.id,
                              row?.vip?.dailyorder,
                            )
                          }
                        >
                          <i className="fas fa-tasks user-table-action-icon" />
                          Tasks
                        </button>

                        <Link
                          className="user-table-action-btn info"
                          to="/changePassword"
                        >
                          <i className="fas fa-key user-table-action-icon" />
                          Password
                        </Link>

                        <Link
                          className="user-table-action-btn warning"
                          to={`/user/${row.id}`}
                        >
                          <i className="fas fa-eye user-table-action-icon" />
                          View
                        </Link>

                        {hasPermissionToEdit && (
                          <Link
                            className="user-table-action-btn primary"
                            to={`/user/${row.id}/edit`}
                          >
                            <i className="fas fa-edit user-table-action-icon" />
                            Edit
                          </Link>
                        )}

                        {hasPermissionToDestroy && (
                          <button
                            className="user-table-action-btn danger"
                            onClick={() =>
                              setRecordIdToDestroy(row.id)
                            }
                          >
                            <i className="fas fa-lock user-table-action-icon" />
                            Freeze
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <Pagination
          onChange={doChangePagination}
          disabled={loading}
          pagination={pagination}
        />
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

      {!LoadingTasksDone && showTask && (
        <div className="user-table-modal-overlay">
          <div className="user-table-modal-content">
            <button
              className="user-table-modal-close"
              onClick={() => setShowTask(false)}
            >
              <i className="fas fa-times" />
            </button>
            <h3 className="user-table-modal-text">Task Progress</h3>
            <div className="user-table-progress">
              {tasksdone} / {totalTask}
            </div>
            <div style={{ marginTop: '15px', fontSize: '14px', color: '#666' }}>
              Tasks Completed
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default UserTable;