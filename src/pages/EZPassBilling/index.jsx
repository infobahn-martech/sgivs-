import React, { useEffect, useRef, useState } from 'react';
import useRentalReducer from '../../stores/RentalReducer';
import CustomTable from '../../components/common/CustomTable';
import CommonHeader from '../../components/common/CommonHeader';

import '../../assets/scss/usermanagement.scss';

import penIcon from '../../assets/images/edit-status.svg';
import camaraIcon from '../../assets/images/camera.svg';
import tagIcon from '../../assets/images/tag.svg';
import bagIcon from '../../assets/images/shopping-bag.svg';

import { debounce } from 'lodash';
import moment from 'moment';
import { getPaymentStatus, paymentStatus } from './utils';
import CustomSelect from '../../components/common/CommonSelect';
import InitialsAvatar from '../../components/common/InitialsAvatar';
import { Tooltip } from 'react-tooltip';
import RentalNote from './rentalNotes';
import useAuthReducer from '../../stores/AuthReducer';
import { Spinner } from 'react-bootstrap';
import ViewTransactionModal from './ViewTransactionModal';
import BillingHistoryModal from './BillingHitoryModal';
import CustomActionModal from '../../components/common/CustomActionModal';

const EZPassBilling = () => {
  const {
    getAllRentals,
    rentalData,
    isRentalLoading,
    exportRental,
    isExportLoading,
    changeStatus: postChangeStatus,
    successMessage,
    statusLoading,
    uploadEzPass,
    userActionLoading,
  } = useRentalReducer((state) => state);

  const { getAllUsersListByRole, usersRoleData } = useAuthReducer(
    (state) => state
  );

  const [changeStatus, setChangeStatus] = useState({});
  const [modal, setModal] = useState(null);

  const initialParams = {
    page: 1,
    limit: 10,
    search: '',
    sortOrder: 'DESC',
    isEzPass: true,
  };

  const [params, setParams] = useState(initialParams);
  // const [modalConfig, setModalConfig] = useState({ type: null, data: null });

  const statusEditRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        statusEditRef.current &&
        !statusEditRef.current.contains(event.target)
      ) {
        setChangeStatus({});
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (successMessage) {
      handleGetAllRentals();
      setChangeStatus({});
      useRentalReducer.setState({ successMessage: '' });
    }
  }, [successMessage]);

  useEffect(() => {
    getAllUsersListByRole({ role: 2 });
  }, []);

  const handleGetAllRentals = () => {
    getAllRentals(params);
  };

  const handleSortChange = (selector) => {
    setParams((prevParams) => ({
      ...prevParams,
      sortBy: selector,
      sortOrder: prevParams.sortOrder === 'ASC' ? 'DESC' : 'ASC',
    }));
  };

  const handlePageChange = (currentPage) => {
    setParams((prevParams) => ({ ...prevParams, page: currentPage }));
  };

  const handleLimitChange = (limit) => {
    setParams((prevParams) => ({ ...prevParams, limit }));
  };
  useEffect(() => {
    handleGetAllRentals();
  }, [params]);

  const debouncedSearch = debounce((searchValue) => {
    setParams((prevParams) => ({
      ...prevParams,
      search: searchValue,
      page: 1,
    }));
  }, 500);

  const formatDateTime = (date) =>
    date ? moment.utc(date).format('MMM D, YYYY : hh:mm A') : '-';

  const renderStatus = (row) => {
    const { label, className } = getPaymentStatus(row.status);
    if (changeStatus.id === row.id) {
      const handleSubmit = () => {
        if (row.status === changeStatus.status) {
          // Prevent submit if no change
          setChangeStatus({});
          return;
        }
        postChangeStatus({
          id: changeStatus.id,
          status: changeStatus.status,
        });
      };

      return (
        <div className="loan-status-wrp" ref={statusEditRef}>
          <CustomSelect
            classNamePrefix="react-select"
            isClearable={false}
            options={paymentStatus}
            value={row.status}
            onChange={({ value }) =>
              setChangeStatus((prev) => ({
                ...prev,
                status: value,
              }))
            }
          />
          <button
            onClick={handleSubmit}
            className="btn-save-trans"
            disabled={statusLoading}
          >
            {statusLoading ? (
              <Spinner
                size="sm"
                as="span"
                animation="border"
                variant="light"
                aria-hidden="true"
                className="custom-spinner"
              />
            ) : (
              'Save'
            )}
          </button>
        </div>
      );
    }

    return (
      <>
        <div className="d-flex justify-content-center">
          <span
            className={`status-wrap ${className} cursor-pointer`}
            onClick={() => {
              setChangeStatus({
                id: row.id,
                status: row.status,
              });
            }}
          >
            <span>{label}</span>{' '}
            {!row.isOld && (
              <img
                style={{ cursor: 'pointer' }}
                src={penIcon}
                alt="edit-icon"
                className="flex-shrink-0"
                onClick={() => {
                  setChangeStatus({
                    id: row.id,
                    status: row.status,
                  });
                }}
              />
            )}
          </span>
        </div>
      </>
    );
  };

  const columns = [
    {
      name: 'User',
      selector: 'user.firstName',
      titleClasses: 'tw1',
      contentClass: 'user-pic',
      cell: (row) => (
        <>
          <InitialsAvatar
            name={`${row?.['user.firstName'] || ''} ${row?.['user.lastName'] || ''
              }`.trim()}
          />
          <span>
            {row?.['user.firstName'] || row?.['user.lastName']
              ? `${row?.['user.firstName']} ${row?.['user.lastName']}`
              : '-'}
          </span>
        </>
      ),
    },
    {
      name: 'EZ pass item ID',
      selector: 'inventory.itemId',
      titleClasses: 'tw2',
    },
    {
      name: 'Item Name',
      selector: 'inventory.itemName',
      titleClasses: 'tw3',
    },
    {
      name: 'Borrowed On',
      selector: 'borrowedAt',
      cell: (row) => formatDateTime(row?.borrowedAt),
      titleClasses: 'tw4',
    },
    {
      name: 'Deadline',
      selector: 'dueDate',
      cell: (row) => formatDateTime(row?.dueDate),
      titleClasses: 'tw5',
    },
    {
      name: 'Returned date and time',
      selector: 'returnedAt',
      cell: (row) =>
        row?.dueDate < row?.returnedAt ? (
          <span className="text-danger">{formatDateTime(row?.returnedAt)}</span>
        ) : (
          formatDateTime(row?.returnedAt)
        ),
      titleClasses: 'tw6',
    },
    {
      name: 'Loan Status',
      selector: 'status',
      titleClasses: 'tw6',
      cell: (row) => renderStatus(row),
    },
    {
      name: 'Balance Due',
      selector: 'balanceDue',
      titleClasses: 'tw6',
      colClassName: 'balance-due',
      cell: (row) =>
        `$${row?.balanceDue ? parseFloat(row.balanceDue).toFixed(2) : 0}`,
    },
    {
      name: 'Total Due',
      selector: 'totalDue',
      colClassName: 'balance-due',
      cell: (row) =>
        `$${row?.totalDue ? parseFloat(row.totalDue).toFixed(2) : 0}`,
    },
    {
      name: 'Action',
      selector: 'action',
      titleClasses: 'tw7',
      contentClass: 'action-wrap',
      cell: (row) => (
        <>
          {row.status == 2 && (
            <img
              src={camaraIcon}
              alt="Note"
              data-tooltip-id="note-tooltip"
              data-tooltip-content="View Billing History"
              onClick={() => {
                setModal({ data: row, mode: 'history' });
              }}
            />
          )}
          {row.status == 2 && (
            <img
              src={tagIcon}
              alt="Alert"
              data-tooltip-id="alert-tooltip"
              data-tooltip-content="View Transactions"
              onClick={() => {
                setModal({ data: row, mode: 'transaction' });
              }}
            />
          )}
          {row.balanceDue != 0 && (
            <img
              src={bagIcon}
              alt="shopping-bag"
              onClick={() => {
                setModal({ data: row, mode: 'warning' });
              }}
              data-tooltip-id="deadline-tooltip"
              data-tooltip-content="Charge Balance"
            />
          )}

          {/* Tooltips */}
          <Tooltip
            id="note-tooltip"
            place="bottom"
            effect="solid"
            style={{
              backgroundColor: '#051a53',
            }}
          />
          <Tooltip
            id="alert-tooltip"
            place="bottom"
            effect="solid"
            style={{
              backgroundColor: '#051a53',
            }}
          />
          <Tooltip
            id="deadline-tooltip"
            place="bottom"
            effect="solid"
            style={{
              backgroundColor: '#051a53',
            }}
          />
        </>
      ),
    },
  ];

  const exportExcel = async () => {
    exportRental({ ...params, fileName: "EZpass_data" });
  };
  const getUserOptions = () =>
    usersRoleData?.data
      ?.map(({ id, firstName }) => ({
        value: id,
        label: firstName,
      }))
      ?.sort((a, b) => a.label?.localeCompare(b.label));

  const filterOptions = [
    {
      fieldName: 'Borrowed Date',
      BE_keyName: 'borrowedAt',
      fieldType: 'dateRange',
    },
    {
      fieldName: 'Deadline Date',
      BE_keyName: 'deadline_date',
      fieldType: 'dateRange',
    },
    {
      fieldName: 'Returned Date',
      BE_keyName: 'returnedAt',
      fieldType: 'dateRange',
    },
    {
      fieldName: 'Rental Status',
      BE_keyName: 'status',
      fieldType: 'select',
      Options: [
        { label: 'Borrowed', value: 1 },
        { label: 'Returned', value: 2 },
        { label: 'Overdue', value: 3 },
        { label: 'Missing', value: 4 },
      ],
    },
    {
      fieldName: 'User',
      BE_keyName: 'user',
      fieldType: 'select',
      isMulti: true,
      Options: getUserOptions(),
    },
  ];

  const handleFilterSubmit = (filters) => {
    const formattedFilters = {};

    Object.entries(filters).forEach(([key, value]) => {
      if ((key.endsWith('_start') || key.endsWith('_end')) && value) {
        formattedFilters[key] = moment(value).format('YYYY-MM-DD');
      } else if (key === 'user' && Array.isArray(value)) {
        formattedFilters[key] = value.filter(Boolean);
      } else {
        formattedFilters[key] = value;
      }
    });

    setParams({
      ...params,
      ...formattedFilters,
      page: '1',
    });
  };

  const renderModal = () => (
    <CustomActionModal
      closeModal={() => setModal(null)}
      isLoading={statusLoading}
      message={`Are you sure you want to charge amount of $${modal?.data.balanceDue} for this user?`}
      button={{ primary: 'Yes', secondary: 'No' }}
      onSubmit={() => {
        postChangeStatus({
          id: modal?.data.id,
          balanceDue: modal?.data.balanceDue,
        });
        setModal(null);
      }}
      showModal={modal?.mode === 'warning'}
      isWarning
    />
  );

  return (
    <>
      {renderModal()}
      <CommonHeader
        onSearch={debouncedSearch}
        exportExcel={rentalData?.data?.length ? exportExcel : null}
        exportLoading={isExportLoading}
        filterOptions={filterOptions}
        submitFilter={handleFilterSubmit}
        clearOptions={() => {
          setParams(initialParams);
        }}
        type="ezpass"
        uploadExcel
        onExcelUpload={(data) => uploadEzPass(data)}
        uploadTitle="Import EZ Pass"
        uploadLoading={userActionLoading}
      // addButton={{ type: 'button', name: 'Add EZ Pass', action: () => {} }}
      />
      <CustomTable
        pagination={{ currentPage: params.page, limit: params.limit }}
        count={rentalData?.pagination?.totalPages}
        columns={columns}
        data={rentalData?.data || []}
        isLoading={isRentalLoading}
        onPageChange={handlePageChange}
        setLimit={handleLimitChange}
        onSortChange={handleSortChange}
        wrapClasses="ezpass-table-wrap"
      />
      {modal?.mode === 'transaction' && (
        <ViewTransactionModal
          showModal={!!modal}
          closeModal={() => setModal(null)}
          data={modal.data}
        />
      )}
      {modal?.mode === 'history' && (
        <BillingHistoryModal
          showModal={!!modal}
          closeModal={() => setModal(null)}
          data={modal.data}
        />
      )}
    </>
  );
};

export default EZPassBilling;
