import React, { useMemo, useState, useEffect } from 'react';
import moment from 'moment';
import { debounce } from 'lodash';

import '../../assets/scss/usermanagement.scss';

import CommonHeader from '../../components/common/CommonHeader';
import CustomTable from '../../components/common/CustomTable';
import useVisaDigitizationReducer from '../../stores/VisaDigitizationReducer';
import { formatDate } from '../../config/config';
import { AddEditModal } from './AddEditModal';

const VisaDigitization = () => {
  const USE_MOCK = true;

  const { getData, visaDigitizationData, isLoadingGet, isLoadingPost, isLoadingPatch, isLoadingDelete } =
    useVisaDigitizationReducer((state) => state);

  const [modal, setModal] = useState(false);

  const initialParams = {
    search: '',
    page: 1,
    limit: 10,
    fromDate: null,
    toDate: null,
    sortBy: 'applicationDate',
    sortOrder: 'DESC',
    isExcelExport: 'false',
  };

  const [params, setParams] = useState(initialParams);

  // ✅ Mock Data (Required fields)
  const mockVisaDigitizationData = {
    total: 5,
    data: [
      {
        id: 1,
        fileNo: 'FILE-0001',
        passportNo: 'P1234567',
        applicantName: 'Arjun Kumar',
        dateOfBirth: '1996-04-12',
        gender: 'Male',
        issueDate: '2025-01-10',
        visaNumber: 'VISA-981122',
        fatherName: 'Kumar Raj',
        applicationDate: '2025-01-10T09:30:00Z',
        applicationType: 'Tourist',
      },
      {
        id: 2,
        fileNo: 'FILE-0002',
        passportNo: 'P7654321',
        applicantName: 'Sara Ahmed',
        dateOfBirth: '1999-11-02',
        gender: 'Female',
        issueDate: '2025-02-14',
        visaNumber: 'VISA-772210',
        fatherName: 'Ahmed Ali',
        applicationDate: '2025-02-14T12:15:00Z',
        applicationType: 'Visit',
      },
      {
        id: 3,
        fileNo: 'FILE-0003',
        passportNo: 'P9988776',
        applicantName: 'John Mathew',
        dateOfBirth: '1993-07-21',
        gender: 'Male',
        issueDate: '2025-03-05',
        visaNumber: 'VISA-556677',
        fatherName: 'Mathew Joseph',
        applicationDate: '2025-03-05T08:45:00Z',
        applicationType: 'Work',
      },
      {
        id: 4,
        fileNo: 'FILE-0004',
        passportNo: 'P1122334',
        applicantName: 'Fatima Noor',
        dateOfBirth: '1998-01-30',
        gender: 'Female',
        issueDate: '2025-03-20',
        visaNumber: 'VISA-334455',
        fatherName: 'Noor Hassan',
        applicationDate: '2025-03-20T10:00:00Z',
        applicationType: 'Family',
      },
      {
        id: 5,
        fileNo: 'FILE-0005',
        passportNo: 'P5566778',
        applicantName: 'Vishnu Das',
        dateOfBirth: '1995-09-18',
        gender: 'Male',
        issueDate: '2025-04-02',
        visaNumber: 'VISA-119900',
        fatherName: 'Das Krishnan',
        applicationDate: '2025-04-02T11:20:00Z',
        applicationType: 'Student',
      },
    ],
  };

  const onRefreshVisaDigitization = () => {
    if (!USE_MOCK) getData(params);
    setModal(false);
  };

  useEffect(() => {
    if (!USE_MOCK) getData(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params, USE_MOCK]);

  const handleSortChange = (selector) => {
    setParams((prev) => ({
      ...prev,
      sortBy: selector,
      sortOrder: prev.sortOrder === 'ASC' ? 'DESC' : 'ASC',
    }));
  };

  const columns = [
    {
      name: 'File No',
      selector: 'fileNo',
      sortable: true,
      sortField: 'fileNo',
      cell: (row) => <span>{row?.fileNo || '-'}</span>,
    },
    {
      name: 'Passport No',
      selector: 'passportNo',
      sortable: true,
      sortField: 'passportNo',
      cell: (row) => <span>{row?.passportNo || '-'}</span>,
    },
    {
      name: 'Applicant Name',
      selector: 'applicantName',
      sortable: true,
      sortField: 'applicantName',
      cell: (row) => <span>{row?.applicantName || '-'}</span>,
    },
    {
      name: 'Date of Birth',
      selector: 'dateOfBirth',
      sortable: true,
      sortField: 'dateOfBirth',
      cell: (row) => <span>{row?.dateOfBirth ? formatDate(row?.dateOfBirth) : '-'}</span>,
    },
    {
      name: 'Gender',
      selector: 'gender',
      sortable: true,
      sortField: 'gender',
      cell: (row) => <span>{row?.gender || '-'}</span>,
    },
    {
      name: 'Issue Date',
      selector: 'issueDate',
      sortable: true,
      sortField: 'issueDate',
      cell: (row) => <span>{row?.issueDate ? formatDate(row?.issueDate) : '-'}</span>,
    },
    {
      name: 'Visa Number',
      selector: 'visaNumber',
      sortable: true,
      sortField: 'visaNumber',
      cell: (row) => <span>{row?.visaNumber || '-'}</span>,
    },
    {
      name: 'Father Name',
      selector: 'fatherName',
      sortable: true,
      sortField: 'fatherName',
      cell: (row) => <span>{row?.fatherName || '-'}</span>,
    },
    {
      name: 'Application Date',
      selector: 'applicationDate',
      sortable: true,
      sortField: 'applicationDate',
      cell: (row) =>
        <span>{row?.applicationDate ? formatDate(row?.applicationDate) : '-'}</span>,
    },
    {
      name: 'Application Type',
      selector: 'applicationType',
      sortable: true,
      sortField: 'applicationType',
      cell: (row) => <span>{row?.applicationType || '-'}</span>,
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

  const tableData = USE_MOCK ? mockVisaDigitizationData : visaDigitizationData;
  const loading = USE_MOCK ? false : isLoadingGet || isLoadingPost || isLoadingPatch || isLoadingDelete;

  return (
    <>
      <CommonHeader
        addButton={{
          name: 'Add File',
          type: 'button',
          action: () => setModal(true),
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

      {modal && (
        <AddEditModal
          showModal={modal}
          closeModal={() => setModal(false)}
          onRefreshVisaDigitization={onRefreshVisaDigitization}
        />
      )}
    </>
  );
};

export default VisaDigitization;
