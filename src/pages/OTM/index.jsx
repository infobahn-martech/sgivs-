import React, { useMemo, useState, useEffect } from 'react';
import moment from 'moment';
import { debounce } from 'lodash';

import '../../assets/scss/usermanagement.scss';

import CommonHeader from '../../components/common/CommonHeader';
import CustomTable from '../../components/common/CustomTable';
import useOTMReducer from '../../stores/OTMReducer';
import { formatDate } from '../../config/config';
import CustomActionModal from '../../components/common/CustomActionModal';
import AddEditModal from './AddEditModal';

const OTM = () => {
  const USE_MOCK = true;

  // ✅ Add retrieveData here if your store has it
  const { getData, otmData, isLoadingGet, isLoadingDelete /*, retrieveData */ } =
    useOTMReducer((state) => state);

  const [retrieveModalOpen, setRetrieveModalOpen] = useState(false);

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
  const [selectedOTM, setSelectedOTM] = useState(null);
  // ✅ Dummy Data (Required fields)
  const mockOTMData = {
    total: 5,
    data: [
      {
        id: 1,
        date: '2025-01-10T09:30:00Z',
        center: 'Dubai Center',
        by: 'Admin',
        totalApplication: 12,
      },
      {
        id: 2,
        date: '2025-02-14T12:15:00Z',
        center: 'Abu Dhabi Center',
        by: 'Operator',
        totalApplication: 7,
      },
      {
        id: 3,
        date: '2025-03-05T08:45:00Z',
        center: 'Sharjah Center',
        by: 'Admin',
        totalApplication: 19,
      },
      {
        id: 4,
        date: '2025-03-20T10:00:00Z',
        center: 'Ajman Center',
        by: 'Supervisor',
        totalApplication: 5,
      },
      {
        id: 5,
        date: '2025-04-02T11:20:00Z',
        center: 'Dubai Center',
        by: 'Admin',
        totalApplication: 9,
      },
    ],
  };

  const onRefresh = () => {
    if (!USE_MOCK) getData(params);
    setRetrieveModalOpen(false);
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
      name: 'Date',
      selector: 'date',
      sortable: true,
      sortField: 'date',
      cell: (row) => <span>{row?.date ? formatDate(row?.date) : '-'}</span>,
    },
    {
      name: 'Center',
      selector: 'center',
      sortable: true,
      sortField: 'center',
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

  const handleRetrieve = () => {
    if (USE_MOCK) {
      setRetrieveModalOpen(false);
      return;
    }

    // ✅ Replace with your actual API call
    // if (retrieveModalOpen?.id) {
    //   retrieveData(retrieveModalOpen.id, () => onRefresh());
    // }

    setRetrieveModalOpen(false);
  };

  const tableData = USE_MOCK ? mockOTMData : otmData;
  const loading = USE_MOCK ? false : isLoadingGet;

  return (
    <>
      <CommonHeader
        addButton={{
          name: 'Add Item',
          type: 'button',
          action: () => {
            setAddEditModal(true);
            setSelectedOTM(null);
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

      {retrieveModalOpen && (
        <CustomActionModal
          showModal={retrieveModalOpen}
          closeModal={() => setRetrieveModalOpen(false)}
          isLoading={USE_MOCK ? false : isLoadingDelete}
          message={`Are you sure you want to retrieve this record?`}
          onCancel={() => setRetrieveModalOpen(false)}
          onSubmit={handleRetrieve}
        />
      )}
      {addEditModal && (
        <AddEditModal
          showModal={addEditModal}
          closeModal={() => setAddEditModal(false)}
          onRefreshOTM={() => getData(params)}
          selectedOTM={selectedOTM}
        />
      )}
    </>
  );
};

export default OTM;
