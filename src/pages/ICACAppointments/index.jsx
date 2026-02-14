import React, { useMemo, useState, useEffect } from 'react';
import { Tooltip } from 'react-tooltip';
import moment from 'moment';

import '../../assets/scss/usermanagement.scss';

import CommonHeader from '../../components/common/CommonHeader';
import CustomTable from '../../components/common/CustomTable';
import useICACAppointmentsReducer from '../../stores/ICACAppointmentsReducer';
import { formatDate } from '../../config/config';
import { debounce } from 'lodash';

const ICACAppointments = () => {
  // ✅ Toggle this (VERY useful for large admin projects)
  const USE_MOCK = true;

  const { getData, icacAppointmentsData, isLoadingGet } = useICACAppointmentsReducer((state) => state);

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

  // ✅ Dummy Data (UPDATED as per screenshot)
  // Columns:
  // Appointment/Mission Ref No | Mission/Center Name | Name | Email | Passport No | App Date/Time
  // Application Type | Service | Payment Details | Status/On | Action (Print)
  const mockICACAppointmentsData = {
    total: 6,
    data: [
      {
        id: 1,
        appointmentMissionRefNo: 'APT-10001',
        missionCenterName: 'Dubai Center',
        name: 'Akhil Thomas',
        email: 'akhil.thomas@mail.com',
        passportNo: 'P1234567',
        appDateTime: '2025-01-10T09:30:00Z',
        applicationType: 'Passport',
        service: 'Form Filling',
        paymentDetails: 'Cash - 30 AED',
        statusOn: 'Completed / 2025-01-10T09:30:00Z',
        createdAt: '2025-01-10T09:30:00Z',
      },
      {
        id: 2,
        appointmentMissionRefNo: 'POST-20012',
        missionCenterName: 'Abu Dhabi Center',
        name: 'Fathima Ali',
        email: 'fathima.ali@mail.com',
        passportNo: 'N7654321',
        appDateTime: '2025-02-14T12:15:00Z',
        applicationType: 'Visa',
        service: 'Photograph',
        paymentDetails: 'Card - 25 AED',
        statusOn: 'Pending / 2025-02-14T12:15:00Z',
        createdAt: '2025-02-14T12:15:00Z',
      },
      {
        id: 3,
        appointmentMissionRefNo: 'APT-10045',
        missionCenterName: 'Sharjah Center',
        name: 'Sajith Kumar',
        email: 'sajith.kumar@mail.com',
        passportNo: 'M9876543',
        appDateTime: '2025-03-05T08:45:00Z',
        applicationType: 'OCI',
        service: 'Photocopy',
        paymentDetails: 'Online - 50 AED',
        statusOn: 'Completed / 2025-03-05T08:45:00Z',
        createdAt: '2025-03-05T08:45:00Z',
      },
      {
        id: 4,
        appointmentMissionRefNo: 'POST-20055',
        missionCenterName: 'Ajman Center',
        name: 'Noor Hassan',
        email: 'noor.hassan@mail.com',
        passportNo: 'K4567890',
        appDateTime: '2025-03-20T10:00:00Z',
        applicationType: 'Attestation',
        service: 'SMS',
        paymentDetails: 'Cash - 15 AED',
        statusOn: 'Cancelled / 2025-03-20T10:00:00Z',
        createdAt: '2025-03-20T10:00:00Z',
      },
      {
        id: 5,
        appointmentMissionRefNo: 'APT-10110',
        missionCenterName: 'Dubai Center',
        name: 'Vishnu Menon',
        email: 'vishnu.menon@mail.com',
        passportNo: 'J2468101',
        appDateTime: '2025-04-02T11:20:00Z',
        applicationType: 'Visa',
        service: 'Courier',
        paymentDetails: 'Card - 40 AED',
        statusOn: 'Pending / 2025-04-02T11:20:00Z',
        createdAt: '2025-04-02T11:20:00Z',
      },
      {
        id: 6,
        appointmentMissionRefNo: 'POST-20101',
        missionCenterName: 'Fujairah Center',
        name: 'Mary Joseph',
        email: 'mary.joseph@mail.com',
        passportNo: 'H1357911',
        appDateTime: '2025-04-10T15:10:00Z',
        applicationType: 'Passport',
        service: 'Photocopy',
        paymentDetails: 'Cash - 75 AED',
        statusOn: 'Completed / 2025-04-10T15:10:00Z',
        createdAt: '2025-04-10T15:10:00Z',
      },
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

  const handlePrint = (row) => {
    // TODO: Replace with your print flow (open print page / download PDF / call API)
    console.log('Print:', row);
    // window.print(); // (if you want browser print)
  };

  const renderAction = (row) => {
    return (
      <>
        <Tooltip id="print" place="bottom" content="Print" style={{ backgroundColor: '#051a53' }} />
        <button
          type="button"
          className="btn btn-sm btn-outline-primary"
          data-tooltip-id="print"
          onClick={() => handlePrint(row)}
          style={{ cursor: 'pointer' }}
        >
          Print
        </button>
      </>
    );
  };

  const columns = [
    {
      name: 'Appointment/Mission Ref No',
      selector: 'appointmentMissionRefNo',
      sort: true,
      cell: (row) => <span>{row?.appointmentMissionRefNo || '-'}</span>,
    },
    {
      name: 'Mission/Center Name',
      selector: 'missionCenterName',
      sort: true,
      cell: (row) => <span>{row?.missionCenterName || '-'}</span>,
    },
    {
      name: 'Name',
      selector: 'name',
      sort: true,
      cell: (row) => <span>{row?.name || '-'}</span>,
    },
    {
      name: 'Email',
      selector: 'email',
      sort: true,
      cell: (row) => <span>{row?.email || '-'}</span>,
    },
    {
      name: 'Passport No',
      selector: 'passportNo',
      sort: true,
      cell: (row) => <span>{row?.passportNo || '-'}</span>,
    },
    {
      name: 'App Date/Time',
      selector: 'appDateTime',
      sort: true,
      cell: (row) => <span>{row?.appDateTime ? formatDate(row?.appDateTime) : '-'}</span>,
    },
    {
      name: 'Application Type',
      selector: 'applicationType',
      sort: true,
      cell: (row) => <span>{row?.applicationType || '-'}</span>,
    },
    {
      name: 'Service',
      selector: 'service',
      sort: true,
      cell: (row) => <span>{row?.service || '-'}</span>,
    },
    {
      name: 'Payment Details',
      selector: 'paymentDetails',
      cell: (row) => <span>{row?.paymentDetails || '-'}</span>,
    },
    {
      name: 'Status/ On',
      selector: 'statusOn',
      cell: (row) => <span>{row?.statusOn || '-'}</span>,
    },
    {
      name: 'Action',
      contentClass: 'action-wrap',
      disableViewClick: true,
      thclass: 'actions-edit employee-actn-edit',
      cell: (row) => (
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {renderAction(row)}
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

  // ✅ Decide dataset
  const tableData = USE_MOCK ? mockICACAppointmentsData : icacAppointmentsData;
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

export default ICACAppointments;