import React, { useEffect, useMemo, useState } from 'react';
import { Tooltip } from 'react-tooltip';
import moment from 'moment';

import '../../assets/scss/usermanagement.scss';

import deleteIcon from '../../assets/images/delete.svg';
import editIcon from '../../assets/images/edit.svg';

import CommonHeader from '../../components/common/CommonHeader';
import CustomTable from '../../components/common/CustomTable';
import { formatDate } from '../../config/config';
import { AddEditModal } from './AddEditModal';
import { debounce } from 'lodash';
import CustomActionModal from '../../components/common/CustomActionModal';
import useAFSManagerReducer from '../../stores/AFSManagerReducer';

const AFSManager = () => {
  // ✅ Toggle mock/static data
  const USE_MOCK = true;

  const {
    getData,
    afsManagerData,
    isLoadingGet,
    deleteData,
    isLoadingDelete,
  } = useAFSManagerReducer((state) => state);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [modal, setModal] = useState(false);

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

  // ✅ Dummy data based on screenshot columns
  const mockAFSManagerData = {
    total: 6,
    data: [
      {
        id: 1,
        receiptNo: 'RCPT-1001',
        passportNo: 'P1234567',
        applicationType: 'Normal',
        afsType: 'Photocopy',
        quantity: 2,
        amount: 20,
        onBy: 'Admin',
      },
      {
        id: 2,
        receiptNo: 'RCPT-1002',
        passportNo: 'P7654321',
        applicationType: 'Urgent',
        afsType: 'SMS',
        quantity: 1,
        amount: 10,
        onBy: 'Operator',
      },
      {
        id: 3,
        receiptNo: 'RCPT-1003',
        passportNo: 'N9876543',
        applicationType: 'Normal',
        afsType: 'Photograph',
        quantity: 3,
        amount: 30,
        onBy: 'Supervisor',
      },
      {
        id: 4,
        receiptNo: 'RCPT-1004',
        passportNo: 'M4567890',
        applicationType: 'Premium',
        afsType: 'Form Filling',
        quantity: 1,
        amount: 50,
        onBy: 'Admin',
      },
      {
        id: 5,
        receiptNo: 'RCPT-1005',
        passportNo: 'K2468101',
        applicationType: 'Normal',
        afsType: 'Photocopy',
        quantity: 5,
        amount: 25,
        onBy: 'Operator',
      },
      {
        id: 6,
        receiptNo: 'RCPT-1006',
        passportNo: 'J1357911',
        applicationType: 'Urgent',
        afsType: 'SMS',
        quantity: 2,
        amount: 20,
        onBy: 'Supervisor',
      },
    ],
  };

  const onRefreshAFSManager = () => {
    if (!USE_MOCK) getData(params);
    setModal(false);
    setDeleteModalOpen(false);
  };

  // ✅ Call API only if not mock
  useEffect(() => {
    if (!USE_MOCK) getData(params);
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

        <img
          src={editIcon}
          alt="edit"
          data-tooltip-id="edit"
          onClick={() => setModal(row)}
        />
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
      name: 'Receipt No',
      selector: 'receiptNo',
      cell: (row) => <span>{row?.receiptNo || '-'}</span>,
      sort: true,
    },
    {
      name: 'Passport No',
      selector: 'passportNo',
      cell: (row) => <span>{row?.passportNo || '-'}</span>,
      sort: true,
    },
    {
      name: 'Application Type',
      selector: 'applicationType',
      cell: (row) => <span>{row?.applicationType || '-'}</span>,
      sort: true,
    },
    {
      name: 'AFS Type',
      selector: 'afsType',
      cell: (row) => <span>{row?.afsType || '-'}</span>,
      sort: true,
    },
    {
      name: 'Quantity',
      selector: 'quantity',
      cell: (row) => <span>{row?.quantity ?? '-'}</span>,
      sort: true,
    },
    {
      name: 'Amount',
      selector: 'amount',
      cell: (row) => <span>{row?.amount ?? '-'}</span>,
      sort: true,
    },
    {
      name: 'On / By',
      selector: 'onBy',
      cell: (row) => <span>{row?.onBy || '-'}</span>,
      sort: true,
    },
    {
      name: 'Action',
      disableViewClick: true,
      contentClass: 'action-wrap',
      thclass: 'actions-edit employee-actn-edit',
      cell: (row) => renderAction(row),
    },
  ];

  // ✅ stable debounce
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
        onRefreshAFSManager();
      });
    }
  };

  // ✅ Use mock data or API data
  const tableData = USE_MOCK ? mockAFSManagerData : afsManagerData;
  const loading = USE_MOCK ? false : isLoadingGet;

  return (
    <>
      <CommonHeader
        addButton={{
          name: 'Add Item',
          type: 'button',
          action: () => setModal(true),
        }}
        hideFilter
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
        onSearch={debouncedSearch}
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
          onRefreshAFSManager={onRefreshAFSManager}
        />
      )}

      {deleteModalOpen && (
        <CustomActionModal
          isDelete
          isLoading={USE_MOCK ? false : isLoadingDelete}
          showModal={deleteModalOpen}
          closeModal={() => setDeleteModalOpen(false)}
          message={`Are you sure you want to delete this ${deleteModalOpen?.counterName || deleteModalOpen?.name || ''}?`}
          onCancel={() => setDeleteModalOpen(false)}
          onSubmit={handleDelete}
        />
      )}
    </>
  );
};

export default AFSManager;
