import React, { useMemo, useState, useEffect } from 'react';
import { Tooltip } from 'react-tooltip';
import moment from 'moment';
import { debounce } from 'lodash';

import '../../assets/scss/usermanagement.scss';

import deleteIcon from '../../assets/images/delete.svg';
import editIcon from '../../assets/images/edit.svg';

import CommonHeader from '../../components/common/CommonHeader';
import CustomTable from '../../components/common/CustomTable';
import usePassportTrackingReducer from '../../stores/PassportTrackingReducer';
import { formatDate } from '../../config/config';
import { AddEditModal } from './AddEditModal';
import CustomActionModal from '../../components/common/CustomActionModal';

const PassportTracking = () => {
  const USE_MOCK = true;

  const {
    getData,
    passportTrackingData,
    isLoadingPassportTracking,
  } = usePassportTrackingReducer((state) => state);

  const [modal, setModal] = useState(false);

  const initialParams = {
    search: '',
    page: 1,
    limit: 10,
    fromDate: null,
    toDate: null,
    sortBy: 'statusOn',
    sortOrder: 'DESC',
    isExcelExport: 'false',
  };

  const [params, setParams] = useState(initialParams);

  // ✅ Mock Data (Required fields)
  const mockPassportTrackingData = {
    total: 5,
    data: [
      {
        id: 1,
        status: 'Submitted',
        statusComments: 'Application submitted successfully',
        statusBy: 'Admin',
        statusOn: '2025-01-10T09:30:00Z',
      },
      {
        id: 2,
        status: 'In Review',
        statusComments: 'Document verification in progress',
        statusBy: 'Operator',
        statusOn: '2025-02-14T12:15:00Z',
      },
      {
        id: 3,
        status: 'Approved',
        statusComments: 'Approved by supervisor',
        statusBy: 'Supervisor',
        statusOn: '2025-03-05T08:45:00Z',
      },
      {
        id: 4,
        status: 'Printed',
        statusComments: 'Passport printed and ready',
        statusBy: 'Admin',
        statusOn: '2025-03-20T10:00:00Z',
      },
      {
        id: 5,
        status: 'Delivered',
        statusComments: 'Delivered to customer',
        statusBy: 'Courier',
        statusOn: '2025-04-02T11:20:00Z',
      },
    ],
  };

  const onRefreshPassportTracking = () => {
    if (!USE_MOCK) getData(params);
    setModal(false);
  };

  useEffect(() => {
    if (!USE_MOCK) getData(params);
  }, [params, USE_MOCK, getData]);

  const handleSortChange = (selector) => {
    setParams((prev) => ({
      ...prev,
      sortBy: selector,
      sortOrder: prev.sortOrder === 'ASC' ? 'DESC' : 'ASC',
    }));
  };

  const columns = [
    {
      name: 'Status',
      selector: 'status',
      sortable: true,
      sortField: 'status',
      cell: (row) => <span>{row?.status || '-'}</span>,
    },
    {
      name: 'Status Comments',
      selector: 'statusComments',
      sortable: true,
      sortField: 'statusComments',
      cell: (row) => <span>{row?.statusComments || '-'}</span>,
    },
    {
      name: 'Status By',
      selector: 'statusBy',
      sortable: true,
      sortField: 'statusBy',
      cell: (row) => <span>{row?.statusBy || '-'}</span>,
    },
    {
      name: 'Status On',
      selector: 'statusOn',
      sortable: true,
      sortField: 'statusOn',
      cell: (row) => <span>{row?.statusOn ? formatDate(row?.statusOn) : '-'}</span>,
    },
  ];

  const debouncedSearch = useMemo(
    () =>
      debounce((searchValue) => {
        setParams((prev) => ({
          ...prev,
          search: searchValue,
          page: 1,
        }));
      }, 500),
    []
  );

  useEffect(() => {
    return () => debouncedSearch.cancel();
  }, [debouncedSearch]);

  const tableData = USE_MOCK ? mockPassportTrackingData : passportTrackingData;
  const loading = USE_MOCK ? false : isLoadingPassportTracking;

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
        clearOptions={() => setParams(initialParams)}
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

      {modal && (
        <AddEditModal
          showModal={modal}
          closeModal={() => setModal(false)}
          onRefreshPassportTracking={onRefreshPassportTracking}
        />
      )}
    </>
  );
};

export default PassportTracking;
