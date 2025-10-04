import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { i18n } from 'src/i18n';
import couponsSelectors from 'src/modules/transaction/transactionSelectors';
import destroyActions from 'src/modules/transaction/destroy/transactionDestroyActions';
import destroySelectors from 'src/modules/transaction/destroy/transactionDestroySelectors';
import actions from 'src/modules/transaction/list/transactionListActions';
import selectors from 'src/modules/transaction/list/transactionListSelectors';
import TableColumnHeader from 'src/view/shared/table/TableColumnHeader';
import ConfirmModal from 'src/view/shared/modals/ConfirmModal';
import Spinner from 'src/view/shared/Spinner';
import TableWrapper from 'src/view/shared/styles/TableWrapper';
import Pagination from 'src/view/shared/table/Pagination';
import actionsForm from 'src/modules/transaction/form/transactionFormActions';
import UserListItem from 'src/view/user/list/UserListItem';

function TransactionListTable(props) {
  const [recordIdToDestroy, setRecordIdToDestroy] = useState(null);
  const dispatch = useDispatch();

  const findLoading = useSelector(selectors.selectLoading);
  const destroyLoading = useSelector(destroySelectors.selectLoading);
  const loading = findLoading || destroyLoading;

  const rows = useSelector(selectors.selectRows);
  const pagination = useSelector(selectors.selectPagination);
  const sorter = useSelector(selectors.selectSorter);
  const hasRows = useSelector(selectors.selectHasRows);

  const doChangeSort = (field) => {
    const order = sorter.field === field && sorter.order === 'ascend' ? 'descend' : 'ascend';
    dispatch(actions.doChangeSort({ field, order }));
  };

  const doChangePagination = (pagination) => {
    dispatch(actions.doChangePagination(pagination));
  };

  const handleStatusChange = (id, newStatus) => {
    let data = {
      status: newStatus,
      id: id
    };
    dispatch(actionsForm.doUpdateStatus(data));
  };

  // Get status color and display text
  const getStatusInfo = (status) => {
    switch (status) {
      case 'success':
        return { 
          color: '#48BB78',
          bgColor: '#F0FFF4',
          text: 'Success',
          icon: 'fa-solid fa-circle-check'
        };
      case 'pending':
        return { 
          color: '#ED8936',
          bgColor: '#FEF5E7', 
          text: 'Pending',
          icon: 'fa-solid fa-clock'
        };
      case 'canceled':
        return { 
          color: '#F56565',
          bgColor: '#FED7D7',
          text: 'Canceled',
          icon: 'fa-solid fa-circle-xmark'
        };
      default:
        return { 
          color: '#A0AEC0',
          bgColor: '#F7FAFC',
          text: status,
          icon: 'fa-solid fa-circle'
        };
    }
  };

  // Get type color and icon
  const getTypeInfo = (type) => {
    switch (type) {
      case 'deposit':
        return { 
          color: '#4299E1', 
          bgColor: '#EBF8FF',
          icon: 'fa-solid fa-arrow-down',
          text: 'Deposit'
        };
      case 'withdraw':
        return { 
          color: '#ED8936', 
          bgColor: '#FEF5E7',
          icon: 'fa-solid fa-arrow-up',
          text: 'Withdraw'
        };
      default:
        return { 
          color: '#A0AEC0', 
          bgColor: '#F7FAFC',
          icon: 'fa-solid fa-exchange',
          text: type
        };
    }
  };

  // Format amount with type indicator
  const formatAmount = (amount, type) => {
    const symbol = type === 'deposit' ? '+' : '-';
    return (
      <span className={`txn-amount ${type === 'deposit' ? 'txn-amount-deposit' : 'txn-amount-withdraw'}`}>
        {symbol}${amount}
      </span>
    );
  };

  return (
    <TableWrapper>
      <div className="txn-table-container">
        <table className="txn-table">
          <thead className="txn-table-header">
            <tr>
              <TableColumnHeader
                onSort={doChangeSort}
                hasRows={hasRows}
                sorter={sorter}
                name={'user'}
                label={i18n('entities.transaction.fields.user')}
              />
              <TableColumnHeader
                onSort={doChangeSort}
                hasRows={hasRows}
                sorter={sorter}
                name={'type'}
                label={i18n('entities.transaction.fields.type')}
              />
              <TableColumnHeader
                onSort={doChangeSort}
                hasRows={hasRows}
                sorter={sorter}
                name={'amount'}
                label={i18n('entities.transaction.fields.amount')}
                align="right"
              />
              <TableColumnHeader
                onSort={doChangeSort}
                hasRows={hasRows}
                sorter={sorter}
                name={'status'}
                label={i18n('entities.transaction.fields.status')}
              />
              <TableColumnHeader
                onSort={doChangeSort}
                hasRows={hasRows}
                sorter={sorter}
                name={'createdAt'}
                label="Date"
              />
            </tr>
          </thead>
          <tbody className="txn-table-body">
            {loading && (
              <tr>
                <td colSpan={5}>
                  <div className="txn-loading-container">
                    <Spinner />
                  </div>
                </td>
              </tr>
            )}
            {!loading && !hasRows && (
              <tr>
                <td colSpan={5}>
                  <div className="txn-empty-state">
                    <i className="fa-solid fa-receipt"></i>
                    <span>{i18n('table.noData')}</span>
                  </div>
                </td>
              </tr>
            )}
            {!loading && rows.map((row) => {
              const typeInfo = getTypeInfo(row.type);
              const statusInfo = getStatusInfo(row.status);
              const isPending = row.status === 'pending';
              
              return (
                <tr key={row.id} className="txn-table-row">
                  <td className="txn-user-cell">
                    <UserListItem value={row.user} />
                  </td>
                  <td className="txn-type-cell">
                    <div 
                      className="txn-type-badge"
                      style={{ 
                        color: typeInfo.color,
                        backgroundColor: typeInfo.bgColor,
                        borderColor: typeInfo.color
                      }}
                    >
                      <i className={typeInfo.icon}></i>
                      <span>{typeInfo.text}</span>
                    </div>
                  </td>
                  <td className="txn-amount-cell">
                    {formatAmount(row.amount, row.type)}
                  </td>
                  <td className="txn-status-cell">
                    {isPending ? (
                      // Show buttons for pending status
                      <div className="txn-status-buttons">
                        <button
                          className="txn-btn-accept"
                          onClick={() => handleStatusChange(row.id, 'success')}
                        >
                          <i className="fa-solid fa-check"></i>
                          Accept
                        </button>
                        <button
                          className="txn-btn-reject"
                          onClick={() => handleStatusChange(row.id, 'canceled')}
                        >
                          <i className="fa-solid fa-xmark"></i>
                          Reject
                        </button>
                      </div>
                    ) : (
                      // Show status badge for non-pending status
                      <div 
                        className="txn-status-badge"
                        style={{ 
                          color: statusInfo.color,
                          backgroundColor: statusInfo.bgColor
                        }}
                      >
                        <i className={statusInfo.icon}></i>
                        <span>{statusInfo.text}</span>
                      </div>
                    )}
                  </td>
                  <td className="txn-date-cell">
                    {row.createdAt ? new Date(row.createdAt).toLocaleDateString() : '-'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Pagination
        onChange={doChangePagination}
        disabled={loading}
        pagination={pagination}
      />

      {recordIdToDestroy && (
        <ConfirmModal
          title={i18n('common.areYouSure')}
          okText={i18n('common.yes')}
          cancelText={i18n('common.no')}
        />
      )}

      <style>{`
        .txn-table-container {
          background: #FFFFFF;
          border-radius: 12px;
          border: 1px solid #E2E8F0;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .txn-table {
          width: 100%;
          border-collapse: collapse;
        }

        .txn-table-header {
          background: #F7FAFC;
          border-bottom: 1px solid #E2E8F0;
        }

        .txn-table-header th {
          padding: 16px 20px;
          font-size: 12px;
          font-weight: 600;
          color: #718096;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          text-align: left;
        }

        .txn-table-body {
          background: #FFFFFF;
        }

        .txn-table-row {
          border-bottom: 1px solid #F1F5F9;
          transition: all 0.2s ease;
        }

        .txn-table-row:hover {
          background: #F8FAFC;
        }

        .txn-table-row:last-child {
          border-bottom: none;
        }

        .txn-table-row td {
          padding: 16px 20px;
          font-size: 14px;
          color: #2D3748;
        }

        .txn-user-cell {
          font-weight: 500;
        }

        .txn-type-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          border: 1px solid;
        }

        .txn-type-badge i {
          font-size: 10px;
        }

        .txn-amount-cell {
          text-align: right;
          font-weight: 600;
        }

        .txn-amount-deposit {
          color: #48BB78;
        }

        .txn-amount-withdraw {
          color: #F56565;
        }

        .txn-status-cell {
          min-width: 140px;
        }

        .txn-status-buttons {
          display: flex;
          gap: 8px;
          justify-content: center;
        }

        .txn-btn-accept,
        .txn-btn-reject {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 6px 12px;
          border: none;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .txn-btn-accept {
          background: #48BB78;
          color: white;
        }

        .txn-btn-accept:hover {
          background: #38A169;
          transform: translateY(-1px);
        }

        .txn-btn-reject {
          background: #F56565;
          color: white;
        }

        .txn-btn-reject:hover {
          background: #E53E3E;
          transform: translateY(-1px);
        }

        .txn-status-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          border: 1px solid;
          border-color: inherit;
        }

        .txn-status-badge i {
          font-size: 10px;
        }

        .txn-date-cell {
          color: #718096;
          font-size: 13px;
        }

        .txn-loading-container {
          display: flex;
          justify-content: center;
          padding: 40px;
        }

        .txn-empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 60px 20px;
          color: #718096;
        }

        .txn-empty-state i {
          font-size: 48px;
          margin-bottom: 16px;
          color: #CBD5E0;
        }

        .txn-empty-state span {
          font-size: 14px;
          font-weight: 500;
        }

        /* Responsive design */
        @media (max-width: 768px) {
          .txn-table-container {
            border-radius: 8px;
          }
          
          .txn-table-header th,
          .txn-table-row td {
            padding: 12px 16px;
          }
          
          .txn-type-badge {
            padding: 4px 8px;
            font-size: 11px;
          }
          
          .txn-status-buttons {
            flex-direction: column;
            gap: 4px;
          }
          
          .txn-btn-accept,
          .txn-btn-reject {
            padding: 4px 8px;
            font-size: 10px;
          }
        }
      `}</style>
    </TableWrapper>
  );
}

export default TransactionListTable;