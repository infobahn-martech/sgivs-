import React, { useMemo, useState, useEffect } from 'react';
import { Tooltip } from 'react-tooltip';
import moment from 'moment';
import { debounce } from 'lodash';

import '../../assets/scss/usermanagement.scss';

import CommonHeader from '../../components/common/CommonHeader';
import CustomTable from '../../components/common/CustomTable';
import useAttestationOTMReducer from '../../stores/AttestationOTMReducer';
import { formatDate } from '../../config/config';
import AddEditModal from './AddEditModal';

const AttestationOTM = () => {
  const USE_MOCK = true;

  const { getData, attestationOTMData, isLoadingGetAttestationOTM } = useAttestationOTMReducer((state) => state);

  const initialParams = {
    search: '',
    page: 1,
    limit: 10,
    fromDate: null,
    toDate: null,
    sortBy: 'date',
    sortOrder: 'DESC',
    isExcelExport: 'false',
  };

  const [params, setParams] = useState(initialParams);
  const [addEditModal, setAddEditModal] = useState(false);
  const [selectedAttestationOTM, setSelectedAttestationOTM] = useState(null);

  // ✅ Dummy Data (Required fields)
  const mockAttestationOTMData = {
    total: 5,
    data: [
      {
        id: 1,
        date: '2025-01-10T09:30:00Z',
        by: 'Admin',
        totalApplication: 12,
        manifestId: 'MAN-0001',
      },
      {
        id: 2,
        date: '2025-02-14T12:15:00Z',
        by: 'Operator',
        totalApplication: 7,
        manifestId: 'MAN-0002',
      },
      {
        id: 3,
        date: '2025-03-05T08:45:00Z',
        by: 'Admin',
        totalApplication: 19,
        manifestId: 'MAN-0003',
      },
      {
        id: 4,
        date: '2025-03-20T10:00:00Z',
        by: 'Supervisor',
        totalApplication: 5,
        manifestId: 'MAN-0004',
      },
      {
        id: 5,
        date: '2025-04-02T11:20:00Z',
        by: 'Admin',
        totalApplication: 9,
        manifestId: 'MAN-0005',
      },
    ],
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

  // ✅ Download handlers (replace with your real API/file urls)
  const downloadDataFiles = (row) => {
    console.log('Download Data Files:', row);
    // Example:
    // window.open(row?.dataFilesUrl, '_blank');
  };

  const downloadImageFile = (row) => {
    console.log('Download Image File:', row);
  };

  const downloadProcessFile = (row) => {
    console.log('Download Process File:', row);
  };

  const downloadDocumentFile = (row) => {
    console.log('Download Document File:', row);
  };

  const renderAction = (row) => {
    return (
      <div className="d-flex gap-2 flex-wrap">
        <Tooltip
          id={`otm-data-${row?.id}`}
          place="bottom"
          content="Download Data Files"
          style={{ backgroundColor: '#051a53' }}
        />
        <Tooltip
          id={`otm-image-${row?.id}`}
          place="bottom"
          content="Download Image File"
          style={{ backgroundColor: '#051a53' }}
        />
        <Tooltip
          id={`otm-process-${row?.id}`}
          place="bottom"
          content="Download Process File"
          style={{ backgroundColor: '#051a53' }}
        />
        <Tooltip
          id={`otm-doc-${row?.id}`}
          place="bottom"
          content="Download Document File"
          style={{ backgroundColor: '#051a53' }}
        />

        <button
          type="button"
          className="btn btn-link p-0"
          data-tooltip-id={`otm-data-${row?.id}`}
          onClick={() => downloadDataFiles(row)}
          style={{ textDecoration: 'none' }}
        >
          Data
        </button>

        <button
          type="button"
          className="btn btn-link p-0"
          data-tooltip-id={`otm-image-${row?.id}`}
          onClick={() => downloadImageFile(row)}
          style={{ textDecoration: 'none' }}
        >
          Image
        </button>

        <button
          type="button"
          className="btn btn-link p-0"
          data-tooltip-id={`otm-process-${row?.id}`}
          onClick={() => downloadProcessFile(row)}
          style={{ textDecoration: 'none' }}
        >
          Process
        </button>

        <button
          type="button"
          className="btn btn-link p-0"
          data-tooltip-id={`otm-doc-${row?.id}`}
          onClick={() => downloadDocumentFile(row)}
          style={{ textDecoration: 'none' }}
        >
          Document
        </button>
      </div>
    );
  };

  const columns = [
    {
      name: 'Date',
      selector: 'date',
      sortable: true,
      sortField: 'date',
      cell: (row) => <span>{row?.date ? formatDate(row?.date) : '-'}</span>,
    },
    {
      name: 'By',
      selector: 'by',
      sortable: true,
      sortField: 'by',
    },
    {
      name: 'Total Application',
      selector: 'totalApplication',
      sortable: true,
      sortField: 'totalApplication',
      cell: (row) => <span>{row?.totalApplication ?? 0}</span>,
    },
    {
      name: 'Manifest ID',
      selector: 'manifestId',
      sortable: true,
      sortField: 'manifestId',
      cell: (row) => <span>{row?.manifestId || '-'}</span>,
    },
    {
      name: 'Action',
      contentClass: 'action-wrap',
      disableViewClick: true,
      thclass: 'actions-edit employee-actn-edit',
      cell: (row) => renderAction(row),
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

  const tableData = USE_MOCK ? mockAttestationOTMData : attestationOTMData;
  const loading = USE_MOCK ? false : isLoadingAttestationOTMGet;

  return (
    <>
      <CommonHeader
        addButton={{
          name: 'Add Item',
          type: 'button',
          action: () => {
            setAddEditModal(true);
            setSelectedAttestationOTM(null);
          },
        }}
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

      {addEditModal && (
        <AddEditModal
          showModal={addEditModal}
          closeModal={() => setAddEditModal(false)}
          onRefreshAttestationOTM={() => getData(params)}
          selectedAttestationOTM={selectedAttestationOTM}
        />
      )}
    </>
  );
};

export default AttestationOTM;
