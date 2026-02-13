import React, { useMemo, useState, useEffect } from 'react';
import { Tooltip } from 'react-tooltip';
import moment from 'moment';

import '../../assets/scss/usermanagement.scss';

import deleteIcon from '../../assets/images/delete.svg';
import editIcon from '../../assets/images/edit.svg';

import CommonHeader from '../../components/common/CommonHeader';
import CustomTable from '../../components/common/CustomTable';
import useDailyCashCollectionReducer from '../../stores/DailyCashCollectionReducer';
import { formatDate } from '../../config/config';
import { debounce } from 'lodash';
import CustomActionModal from '../../components/common/CustomActionModal';

const DailyCashCollection = () => {
  // ✅ Toggle this (VERY useful for large admin projects)
  const USE_MOCK = true;

  const { getData, dailyCashCollectionData, isLoadingGet, deleteData, isLoadingDelete } =
    useDailyCashCollectionReducer((state) => state);

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
  const mockDailyCashCollectionData = {
    total: 6,
    data: [
      {
        id: 1,
        country: 'UAE',
        mission: 'Dubai Mission',
        depositDate: '2025-01-10T09:30:00Z',
        amount: 1200,
        file: 'deposit-slip-001.pdf',
        remarks: 'Collected and deposited',
        onBy: '2025-01-10T09:30:00Z',
        createdAt: '2025-01-10T09:30:00Z',
      },
      {
        id: 2,
        country: 'India',
        mission: 'Abu Dhabi Mission',
        depositDate: '2025-02-14T12:15:00Z',
        amount: 850,
        file: 'deposit-slip-002.pdf',
        remarks: 'Card payment included',
        onBy: '2025-02-14T12:15:00Z',
        createdAt: '2025-02-14T12:15:00Z',
      },
      {
        id: 3,
        country: 'Pakistan',
        mission: 'Sharjah Mission',
        depositDate: '2025-03-05T08:45:00Z',
        amount: 250,
        file: 'deposit-slip-003.pdf',
        remarks: 'Pending confirmation',
        onBy: '2025-03-05T08:45:00Z',
        createdAt: '2025-03-05T08:45:00Z',
      },
      {
        id: 4,
        country: 'Bangladesh',
        mission: 'Ajman Mission',
        depositDate: '2025-03-20T10:00:00Z',
        amount: 350,
        file: 'deposit-slip-004.pdf',
        remarks: 'Cash verified',
        onBy: '2025-03-20T10:00:00Z',
        createdAt: '2025-03-20T10:00:00Z',
      },
      {
        id: 5,
        country: 'Nepal',
        mission: 'Dubai Mission',
        depositDate: '2025-04-02T11:20:00Z',
        amount: 150,
        file: 'deposit-slip-005.pdf',
        remarks: 'Small deposit',
        onBy: '2025-04-02T11:20:00Z',
        createdAt: '2025-04-02T11:20:00Z',
      },
      {
        id: 6,
        country: 'Sri Lanka',
        mission: 'Abu Dhabi Mission',
        depositDate: '2025-04-10T15:10:00Z',
        amount: 600,
        file: 'deposit-slip-006.pdf',
        remarks: 'End of day deposit',
        onBy: '2025-04-10T15:10:00Z',
        createdAt: '2025-04-10T15:10:00Z',
      },
    ],
  };

  const onRefreshDailyCashCollection = () => {
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

        <img src={editIcon} alt="edit" data-tooltip-id="edit" style={{ cursor: 'pointer' }} />

        <img
          src={deleteIcon}
          alt="delete"
          data-tooltip-id="delete"
          style={{ cursor: 'pointer' }}
          onClick={() => setDeleteModalOpen(row)}
        />
      </>
    );
  };

  const columns = [
    {
      name: 'Country',
      selector: 'country',
    },
    {
      name: 'Mission',
      selector: 'mission',
    },
    {
      name: 'Deposit Date',
      selector: 'depositDate',
      cell: (row) => <span>{row?.depositDate ? formatDate(row?.depositDate) : '-'}</span>,
    },
    {
      name: 'Amount',
      selector: 'amount',
      cell: (row) => <span>{row?.amount ?? '-'}</span>,
    },
    {
      name: 'File',
      selector: 'file',
      cell: (row) => <span>{row?.file || '-'}</span>,
    },
    {
      name: 'Remarks',
      selector: 'remarks',
      cell: (row) => <span>{row?.remarks || '-'}</span>,
    },
    {
      name: 'On / By',
      selector: 'onBy',
      cell: (row) => <span>{row?.onBy ? formatDate(row?.onBy) : '-'}</span>,
    },
    {
      name: 'Action',
      contentClass: 'action-wrap',
      disableViewClick: true,
      thclass: 'actions-edit employee-actn-edit',
      cell: (row) => (
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>{renderAction(row)}</span>
        </div>
      ),
    },
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
        onRefreshDailyCashCollection();
      });
    }
  };

  // ✅ Decide dataset
  const tableData = USE_MOCK ? mockDailyCashCollectionData : dailyCashCollectionData;
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
          message={`Are you sure you want to delete this ${deleteModalOpen?.mission || ''}?`}
          onCancel={() => setDeleteModalOpen(false)}
          onSubmit={handleDelete}
        />
      )}
    </>
  );
};

export default DailyCashCollection;