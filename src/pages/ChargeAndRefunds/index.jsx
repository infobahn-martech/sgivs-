import React, { useMemo, useState, useEffect } from 'react';
import { Tooltip } from 'react-tooltip';
import moment from 'moment';

import '../../assets/scss/usermanagement.scss';

import deleteIcon from '../../assets/images/delete.svg';
import editIcon from '../../assets/images/edit.svg';

import CommonHeader from '../../components/common/CommonHeader';
import CustomTable from '../../components/common/CustomTable';
import useChargeAndRefundsReducer from '../../stores/ChargeAndRefundsReducer';
import { formatDate } from '../../config/config';
import { debounce } from 'lodash';
import CustomActionModal from '../../components/common/CustomActionModal';

const ChargeAndRefunds = () => {
  // ✅ Toggle this (VERY useful for large admin projects)
  const USE_MOCK = true;

  const { getData, chargeAndRefundsData, isLoadingGet, deleteData, isLoadingDelete } =
    useChargeAndRefundsReducer((state) => state);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const initialParams = {
    search: '',
    page: 1,
    limit: 10,
    fromDate: null,
    toDate: null,
    sortBy: 'createdAt',
    sortOrder: 'DESC',
    isExcelExport: 'false',
  };

  const [params, setParams] = useState(initialParams);

  // ✅ Dummy Data (UPDATED as per required fields)
  const mockChargeAndRefundsData = {
    total: 6,
    data: [
      {
        id: 1,
        referenceNo: 'REF-20001',
        applicationType: 'New',
        name: 'Akhil Thomas',
        service: 'Courier',
        amount: 120,
        paymentMode: 'Cash',
        transactionType: 'Charge',
        onBy: '2025-01-10T09:30:00Z',
        createdAt: '2025-01-10T09:30:00Z',
      },
      {
        id: 2,
        referenceNo: 'REF-20002',
        applicationType: 'Renewal',
        name: 'Fathima Ali',
        service: 'Typing',
        amount: 85,
        paymentMode: 'Card',
        transactionType: 'Refund',
        onBy: '2025-02-14T12:15:00Z',
        createdAt: '2025-02-14T12:15:00Z',
      },
      {
        id: 3,
        referenceNo: 'REF-20003',
        applicationType: 'Urgent',
        name: 'Sajith Kumar',
        service: 'SMS',
        amount: 25,
        paymentMode: 'Online',
        transactionType: 'Charge',
        onBy: '2025-03-05T08:45:00Z',
        createdAt: '2025-03-05T08:45:00Z',
      },
      {
        id: 4,
        referenceNo: 'REF-20004',
        applicationType: 'New',
        name: 'Noor Hassan',
        service: 'Photograph',
        amount: 35,
        paymentMode: 'Card',
        transactionType: 'Charge',
        onBy: '2025-03-20T10:00:00Z',
        createdAt: '2025-03-20T10:00:00Z',
      },
      {
        id: 5,
        referenceNo: 'REF-20005',
        applicationType: 'Renewal',
        name: 'Vishnu Menon',
        service: 'Photocopy',
        amount: 15,
        paymentMode: 'Cash',
        transactionType: 'Refund',
        onBy: '2025-04-02T11:20:00Z',
        createdAt: '2025-04-02T11:20:00Z',
      },
      {
        id: 6,
        referenceNo: 'REF-20006',
        applicationType: 'Urgent',
        name: 'Mary Joseph',
        service: 'Form Filling',
        amount: 60,
        paymentMode: 'Online',
        transactionType: 'Charge',
        onBy: '2025-04-10T15:10:00Z',
        createdAt: '2025-04-10T15:10:00Z',
      },
    ],
  };

  const onRefreshChargeAndRefunds = () => {
    if (!USE_MOCK) {
      getData(params);
    }
    setDeleteModalOpen(false);
  };

  // ✅ Call API only if not mock
  useEffect(() => {
    if (!USE_MOCK) {
      getData(params);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const handleSortChange = (selector) => {
    setParams((prevParams) => ({
      ...prevParams,
      sortBy: selector,
      sortOrder: prevParams.sortOrder === 'ASC' ? 'DESC' : 'ASC',
    }));
  };

  const renderAction = (row) => {
    return (
      <>
        <Tooltip id="edit" place="bottom" content="Edit" style={{ backgroundColor: '#051a53' }} />
        <Tooltip id="delete" place="bottom" content="Delete" style={{ backgroundColor: '#051a53' }} />

        <img src={editIcon} alt="edit" data-tooltip-id="edit" />

        <img
          src={deleteIcon}
          alt="delete"
          data-tooltip-id="delete"
          onClick={() => setDeleteModalOpen(row)}
        />
      </>
    );
  };

  const columns = [
    {
      name: 'Reference No',
      selector: 'referenceNo',
    },
    {
      name: 'Application Type',
      selector: 'applicationType',
    },
    {
      name: 'Name',
      selector: 'name',
    },
    {
      name: 'Service',
      selector: 'service',
    },
    {
      name: 'Amount',
      selector: 'amount',
      cell: (row) => <span>{row?.amount ?? '-'}</span>,
    },
    {
      name: 'Payment Mode',
      selector: 'paymentMode',
    },
    {
      name: 'Transaction Type',
      selector: 'transactionType',
    },
    {
      name: 'On / By',
      selector: 'onBy',
      cell: (row) => <span>{row?.onBy ? formatDate(row?.onBy) : '-'}</span>,
    },
    // {
    //   name: 'Action',
    //   contentClass: 'action-wrap',
    //   disableViewClick: true,
    //   thclass: 'actions-edit employee-actn-edit',
    //   cell: (row) => (
    //     <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
    //       <span style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
    //         {renderAction(row)}
    //       </span>
    //     </div>
    //   ),
    // },
  ];

  // ✅ Stable debounce
  const debouncedSearch = useMemo(
    () =>
      debounce((searchValue) => {
        setParams((prevParams) => ({
          ...prevParams,
          search: searchValue,
          page: 1,
        }));
      }, 500),
    []
  );

  const handleDelete = () => {
    if (USE_MOCK) {
      setDeleteModalOpen(false);
      return;
    }

    if (deleteModalOpen?.id) {
      deleteData(deleteModalOpen?.id, () => {
        onRefreshChargeAndRefunds();
      });
    }
  };

  // ✅ Decide dataset
  const tableData = USE_MOCK ? mockChargeAndRefundsData : chargeAndRefundsData;
  const loading = USE_MOCK ? false : isLoadingGet;

  return (
    <>
      <CommonHeader
        hideFilter
        onSearch={debouncedSearch}
        submitFilter={(filters) => {
          const { fromDate, toDate, ...rest } = filters;

          setParams({
            ...params,
            ...rest,
            fromDate: fromDate ? moment(fromDate).format('YYYY-MM-DD') : null,
            toDate: toDate ? moment(toDate).format('YYYY-MM-DD') : null,
            page: 1,
          });
        }}
        clearOptions={() => {
          setParams(initialParams);
        }}
      />

      <CustomTable
        pagination={{ currentPage: params.page, limit: params.limit }}
        count={tableData?.total || 0}
        columns={columns}
        data={tableData?.data || []}
        isLoading={loading}
        onPageChange={(page) => setParams({ ...params, page })}
        setLimit={(limit) => setParams({ ...params, limit })}
        onSortChange={handleSortChange}
        wrapClasses="inventory-table-wrap"
      />

      {deleteModalOpen && (
        <CustomActionModal
          isDelete
          isLoading={USE_MOCK ? false : isLoadingDelete}
          showModal={deleteModalOpen}
          closeModal={() => setDeleteModalOpen(false)}
          message={`Are you sure you want to delete this ${deleteModalOpen?.referenceNo || deleteModalOpen?.name || ''
            }?`}
          onCancel={() => setDeleteModalOpen(false)}
          onSubmit={handleDelete}
        />
      )}
    </>
  );
};

export default ChargeAndRefunds;