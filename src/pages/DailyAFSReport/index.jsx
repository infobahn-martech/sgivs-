import React, { useMemo, useState, useEffect } from 'react';
import moment from 'moment';

import '../../assets/scss/usermanagement.scss';

import CommonHeader from '../../components/common/CommonHeader';
import CustomTable from '../../components/common/CustomTable';
import useDailyAFSReportReducer from '../../stores/DailyAFSReportReducer';
import { debounce } from 'lodash';

const DailyAFSReport = () => {
  // ✅ Toggle this (VERY useful for large admin projects)
  const USE_MOCK = true;

  const { getData, dailyAFSReportData, isLoadingGet } = useDailyAFSReportReducer((state) => state);

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

  // ✅ Dummy Data for: S No | VAS NAME | COUNT
  const mockDailyAFSReportData = {
    total: 6,
    data: [
      { id: 1, sNo: 1, vasName: 'Photocopy', count: 12 },
      { id: 2, sNo: 2, vasName: 'Photograph', count: 8 },
      { id: 3, sNo: 3, vasName: 'Form Filling', count: 5 },
      { id: 4, sNo: 4, vasName: 'SMS', count: 10 },
      { id: 5, sNo: 5, vasName: 'Courier', count: 3 },
      { id: 6, sNo: 6, vasName: 'Printing', count: 7 },
    ],
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

  const columns = [
    {
      name: 'S No',
      selector: 'sNo',
      sort: true,
      cell: (row, index) => <span>{row?.sNo ?? index + 1}</span>,
    },
    {
      name: 'Vas Name',
      selector: 'vasName',
      sort: true,
      cell: (row) => <span>{row?.vasName || '-'}</span>,
    },
    {
      name: 'Count',
      selector: 'count',
      sort: true,
      cell: (row) => <span>{row?.count ?? '-'}</span>,
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

  // ✅ Decide dataset
  const tableData = USE_MOCK ? mockDailyAFSReportData : dailyAFSReportData;
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
    </>
  );
};

export default DailyAFSReport;