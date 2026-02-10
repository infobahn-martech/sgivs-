import React, { useMemo, useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Tooltip } from 'react-tooltip';
import moment from 'moment';
import { debounce } from 'lodash';

import '../../assets/scss/usermanagement.scss';

import CommonHeader from '../../components/common/CommonHeader';
import CustomTable from '../../components/common/CustomTable';
import usePassportApplicationReducer from '../../stores/PassportApplicationReducer';
import { formatDate } from '../../config/config';
import { AddEditModal } from './AddEditModal';
import CustomActionModal from '../../components/common/CustomActionModal';

import barcodeIcon from '../../assets/images/barcode.svg';
import eyeIcon from '../../assets/images/eye.svg';
import messageIcon from '../../assets/images/message.svg';
import noteIcon from '../../assets/images/note.svg';
import editIcon from '../../assets/images/edit.svg';
import plusIcon from '../../assets/images/plus.svg';
import deleteIcon from '../../assets/images/delete.svg';
import downloadIcon from '../../assets/images/download.svg';

const PassportApplications = () => {
  const USE_MOCK = true;

  const { getData, passportApplicationsData, isLoadingGet, deleteData, isLoadingDelete } =
    usePassportApplicationReducer((state) => state);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [modal, setModal] = useState(false);

  // ✅ for action dropdown state (per row) + position for portal
  const [openAction, setOpenAction] = useState(null); // { row, top, left }
  const openActionId = openAction?.row?.id ?? null;
  const menuRef = useRef(null);

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

  // ✅ Dummy Data (updated fields)
  const mockPassportApplicationsData = {
    total: 5,
    data: [
      {
        id: 1,
        referenceNo: 'REF-0001',
        name: 'Abdul Rahman',
        center: 'Dubai Center',
        arn: 'ARN-12345',
        ppNo: 'P1234567 / OLD-889900',
        dob: '1996-06-12',
        applicationType: 'New',
        serviceName: 'Normal Service',
        deliveryType: 'Courier',
        status: { value: 'Submitted', by: 'Dennis', on: '2025-01-10T09:30:00Z' },
        createdAt: '2025-01-10T09:30:00Z',
      },
      {
        id: 2,
        referenceNo: 'REF-0002',
        name: 'Haseeb',
        center: 'Abu Dhabi Center',
        arn: 'ARN-77881',
        ppNo: 'P9988776 / OLD-112233',
        dob: '1993-11-22',
        applicationType: 'Renewal',
        serviceName: 'Premium',
        deliveryType: 'Counter',
        status: { value: 'In Process', by: 'Joel', on: '2025-02-14T12:15:00Z' },
        createdAt: '2025-02-14T12:15:00Z',
      },
      {
        id: 3,
        referenceNo: 'REF-0003',
        name: 'Fathima',
        center: 'Sharjah Center',
        arn: 'ARN-55321',
        ppNo: 'P2233445 / OLD-445566',
        dob: '1999-02-02',
        applicationType: 'New',
        serviceName: 'Express',
        deliveryType: 'Courier',
        status: { value: 'Approved', by: 'Admin', on: '2025-03-05T08:45:00Z' },
        createdAt: '2025-03-05T08:45:00Z',
      },
      {
        id: 4,
        referenceNo: 'REF-0004',
        name: 'Joseph',
        center: 'Ajman Center',
        arn: 'ARN-99331',
        ppNo: 'P6655443 / OLD-998877',
        dob: '1988-09-10',
        applicationType: 'Renewal',
        serviceName: 'Normal Service',
        deliveryType: 'Counter',
        status: { value: 'Rejected', by: 'Supervisor', on: '2025-03-20T10:00:00Z' },
        createdAt: '2025-03-20T10:00:00Z',
      },
      {
        id: 5,
        referenceNo: 'REF-0005',
        name: 'Amina',
        center: 'Dubai Center',
        arn: 'ARN-11229',
        ppNo: 'P4455667 / OLD-111222',
        dob: '2000-01-30',
        applicationType: 'New',
        serviceName: 'Premium',
        deliveryType: 'Courier',
        status: { value: 'Delivered', by: 'Courier', on: '2025-04-02T11:20:00Z' },
        createdAt: '2025-04-02T11:20:00Z',
      },
    ],
  };

  const onRefreshPassportApplications = () => {
    if (!USE_MOCK) {
      getData(params);
    }
    setModal(false);
    setDeleteModalOpen(false);
    setOpenAction(null);
  };

  // Close action menu on click outside
  useEffect(() => {
    if (!openAction) return;
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        const isTrigger = e.target.closest('.action-dd-btn');
        if (!isTrigger) setOpenAction(null);
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => document.removeEventListener('click', handleClickOutside, true);
  }, [openAction]);

  useEffect(() => {
    if (!USE_MOCK) {
      getData(params);
    }
  }, [params]);

  const handleSortChange = (selector) => {
    setParams((prevParams) => ({
      ...prevParams,
      sortBy: selector,
      sortOrder: prevParams.sortOrder === 'ASC' ? 'DESC' : 'ASC',
    }));
  };

  // ✅ Action Handlers (replace with your routes/modal later)
  const handleActionClick = (actionKey, row) => {
    setOpenAction(null);

    switch (actionKey) {
      case 'printReceipt':
        console.log('Print Receipt', row);
        break;
      case 'printBarcode':
        console.log('Print Barcode', row);
        break;
      case 'viewApplication':
        console.log('View Application', row);
        break;
      case 'comment':
        console.log('Comment', row);
        break;
      case 'activityLog':
        console.log('Activity Log', row);
        break;
      case 'editApplication':
        setModal(row);
        break;
      case 'changeServiceFee':
        console.log('Change Service/Fee', row);
        break;
      case 'delete':
        setDeleteModalOpen(row);
        break;
      default:
        break;
    }
  };

  const openActionMenu = (e, row) => {
    e.preventDefault();
    e.stopPropagation();
    if (openAction?.row?.id === row?.id) {
      setOpenAction(null);
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    const menuWidth = 320;
    setOpenAction({
      row,
      top: rect.bottom + 4,
      left: Math.max(8, Math.min(rect.right - menuWidth, window.innerWidth - menuWidth - 8)),
    });
  };

  const renderActionDropdown = (row) => {
    const isOpen = openAction?.row?.id === row?.id;

    return (
      <div className="action-dd" onClick={(e) => e.stopPropagation()}>
        <Tooltip id={`action-${row?.id}`} place="bottom" content="Options" style={{ backgroundColor: '#051a53' }} />

        <button
          type="button"
          className="action-dd-btn action-dd-btn--dots"
          data-tooltip-id={`action-${row?.id}`}
          onMouseDown={(e) => openActionMenu(e, row)}
          aria-label="Options"
          aria-expanded={isOpen}
        >
          <span className="action-dots-icon">⋮</span>
        </button>
      </div>
    );
  };

  const actionMenuItems = [
    { key: 'printReceipt', label: 'Print Receipt', icon: downloadIcon },
    { key: 'printBarcode', label: 'Print Barcode', icon: barcodeIcon },
    { key: 'viewApplication', label: 'View Application', icon: eyeIcon },
    { key: 'comment', label: 'Comment', icon: messageIcon },
    { key: 'activityLog', label: 'Activity Log', icon: noteIcon },
    { key: 'editApplication', label: 'Edit Application', icon: editIcon },
    { key: 'changeServiceFee', label: 'Change Service / Fees', icon: plusIcon },
    { key: 'delete', label: 'Delete', labelClass: 'danger', icon: deleteIcon },
  ];

  const columns = [
    { name: 'Reference No', selector: 'referenceNo' },
    { name: 'Name', selector: 'name' },
    { name: 'Center', selector: 'center' },
    { name: 'ARN', selector: 'arn' },
    { name: 'PP No / Old PP No', selector: 'ppNo' },
    {
      name: 'Date of Birth',
      selector: 'dob',
      cell: (row) => <span>{row?.dob ? moment(row.dob).format('DD-MMM-YYYY') : '-'}</span>,
    },
    { name: 'Application Type', selector: 'applicationType' },
    { name: 'Service Name', selector: 'serviceName' },
    { name: 'Delivery Type', selector: 'deliveryType' },
    {
      name: 'Status / By, On',
      selector: 'status',
      cell: (row) => (
        <span>
          {row?.status?.value || '-'}
          {row?.status?.by ? ` / ${row.status.by}` : ''}
          {row?.status?.on ? `, ${formatDate(row.status.on)}` : ''}
        </span>
      ),
    },
    {
      name: 'Action',
      selector: 'action',
      contentClass: 'action-wrap',
      notView: true,
      thclass: 'actions-edit employee-actn-edit',
      cell: (row) => renderActionDropdown(row),
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
        onRefreshPassportApplications();
      });
    }
  };

  const tableData = USE_MOCK ? mockPassportApplicationsData : passportApplicationsData;
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

      {openAction &&
        createPortal(
          <div
            ref={menuRef}
            className="action-dd-menu action-dd-menu--portal action-dd-menu--grid"
            style={{
              position: 'fixed',
              top: openAction.top,
              left: openAction.left,
              zIndex: 10000,
            }}
          >
            {actionMenuItems.map(({ key, label, labelClass, icon }) => (
              <button
                key={key}
                type="button"
                className={labelClass || ''}
                onClick={() => handleActionClick(key, openAction.row)}
              >
                <span className="action-dd-menu-icon">
                  <img src={icon} alt="" width={16} height={16} />
                </span>
                {label}
              </button>
            ))}
          </div>,
          document.body
        )}

      {modal && (
        <AddEditModal
          showModal={modal}
          closeModal={() => setModal(false)}
          onRefreshPassportApplications={onRefreshPassportApplications}
        />
      )}

      {deleteModalOpen && (
        <CustomActionModal
          isDelete
          isLoading={USE_MOCK ? false : isLoadingDelete}
          showModal={deleteModalOpen}
          closeModal={() => setDeleteModalOpen(false)}
          message={`Are you sure you want to delete this ${deleteModalOpen?.name}?`}
          onCancel={() => setDeleteModalOpen(false)}
          onSubmit={handleDelete}
        />
      )}
    </>
  );
};

export default PassportApplications;
