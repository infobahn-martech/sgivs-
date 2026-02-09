import React, { useEffect, useState } from 'react';
import { debounce } from 'lodash';
import moment from 'moment';

import '../../assets/scss/usermanagement.scss';

import useAppointmentSettingsReducer from '../../stores/AppointmentSettingsReducer';
import CustomTable from '../../components/common/CustomTable';
import CommonHeader from '../../components/common/CommonHeader';
import InitialsAvatar from '../../components/common/InitialsAvatar';
import useAuthReducer from '../../stores/AuthReducer';

const UnmappedTransactions = () => {
  const {
    isAppointmentSettingsLoading,

    isExportLoading,
    successMessage,
    getAppointmentSettingsUnMappedTransactions,
    appointmentSettingsUnMappedTransactions,
  } = useAppointmentSettingsReducer((state) => state);
  console.log(' appointmentSettingsUnMappedTransactions', appointmentSettingsUnMappedTransactions);

  const { getAllUsersListByRole } = useAuthReducer((state) => state);

  const initialParams = {
    page: 1,
    limit: 10,
    search: '',
    sortOrder: 'DESC',
    isEzPass: true,
  };

  const [params, setParams] = useState(initialParams);
  // const [modalConfig, setModalConfig] = useState({ type: null, data: null });

  useEffect(() => {
    if (successMessage) {
      handleGetAllAppointmentSettings();
      useAppointmentSettingsReducer.setState({ successMessage: '' });
    }
  }, [successMessage]);

  useEffect(() => {
    getAllUsersListByRole({ role: 2 });
  }, []);

  const handleGetAllAppointmentSettings = () => {
    getAppointmentSettingsUnMappedTransactions(params);
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
    handleGetAllAppointmentSettings();
  }, [params]);

  const debouncedSearch = debounce((searchValue) => {
    setParams((prevParams) => ({
      ...prevParams,
      search: searchValue,
      page: 1,
    }));
  }, 500);

  const formatDateTime = (date, format) =>
    date ? moment.utc(date).format(format || 'MMM D, YYYY : hh:mm A') : '-';

  const columns = [
    {
      name: 'Transaction Date',
      selector: 'transactionDate',
      cell: (row) => formatDateTime(row?.transactionDate, 'MMMM D, YYYY'),
      titleClasses: 'tw4',
    },

    {
      name: 'Tag/Plate Number',
      selector: 'tagPlateNumber',
      titleClasses: 'tw2',
    },
    {
      name: 'Agency',
      selector: 'agency',
      titleClasses: 'tw3',
    },
    {
      name: 'Plaza Id',
      selector: 'plazaId',
      titleClasses: 'tw5',
    },
    {
      name: 'Entry Time',
      selector: 'entryTime',
      cell: (row) => moment(row?.entryTime, 'HH:mm:ss').format('hh:mm A'),
      titleClasses: 'tw6',
    },

    {
      name: 'Amount',
      selector: 'amount',
      titleClasses: 'tw6',
      colClassName: 'balance-due',
      cell: (row) => `$${row?.amount || 0}`,
    },
  ];

  const filterOptions = [
    {
      fieldName: 'Transaction Date',
      BE_keyName: 'transactionDate',
      fieldType: 'dateRange',
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

  return (
    <>
      <CommonHeader
        onSearch={debouncedSearch}
        // exportExcel={rentalData?.data?.length ? exportExcel : null}
        exportLoading={isExportLoading}
        filterOptions={filterOptions}
        submitFilter={handleFilterSubmit}
        clearOptions={() => {
          setParams(initialParams);
        }}
      />
      <CustomTable
        pagination={{ currentPage: params.page, limit: params.limit }}
        count={appointmentSettingsUnMappedTransactions?.pagination?.totalRecords}
        columns={columns}
        data={appointmentSettingsUnMappedTransactions?.data}
        isLoading={isAppointmentSettingsLoading}
        onPageChange={handlePageChange}
        setLimit={handleLimitChange}
        onSortChange={handleSortChange}
        wrapClasses="ezpass-table-wrap"
      />
    </>
  );
};

export default UnmappedTransactions;
