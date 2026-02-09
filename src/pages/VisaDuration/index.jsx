import React, { useMemo, useState, useEffect } from 'react';
import { Tooltip } from 'react-tooltip';
import moment from 'moment';

import '../../assets/scss/usermanagement.scss';

import deleteIcon from '../../assets/images/delete.svg';
import editIcon from '../../assets/images/edit.svg';

import CommonHeader from '../../components/common/CommonHeader';
import CustomTable from '../../components/common/CustomTable';
import useVisaDurationReducer from '../../stores/VisaDurationReducer';
import { formatDate } from '../../config/config';
import { AddEditModal } from './AddEditModal';
import { debounce } from 'lodash';
import CustomActionModal from '../../components/common/CustomActionModal';

const VisaDuration = () => {
  // ✅ Toggle this (VERY useful for large admin projects)
  const USE_MOCK = true;

  const { getData, visaDurationData, isLoadingGet, deleteData, isLoadingDelete } =
    useVisaDurationReducer((state) => state);

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

  // ✅ Dummy Data
  const mockVisaDurationData = {
    total: 5,
    data: [
      {
        id: 1,
        name: 'Visa Duration 1',
        createdAt: '2025-01-10T09:30:00Z',
      },
      {
        id: 2,
        name: 'Visa Duration 2',
        createdAt: '2025-02-14T12:15:00Z',
      },
      {
        id: 3,
        name: 'Visa Duration 3',
        createdAt: '2025-03-05T08:45:00Z',
      },
      {
        id: 4,
        name: 'Visa Duration 4',
        createdAt: '2025-03-20T10:00:00Z',
      },
      {
        id: 5,
        name: 'Visa Duration 5',
        createdAt: '2025-04-02T11:20:00Z',
      },
    ],
  };

  const onRefreshVisaDuration = () => {
    if (!USE_MOCK) {
      getData(params);
    }
    setModal(false);
    setDeleteModalOpen(false);
  };

  // ✅ Call API only if not mock
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
      name: 'Name',
      selector: 'name',
      contentClass: 'user-pic',
    },
    {
      name: 'Created Date',
      selector: 'createdAt',
      cell: (row) => <span>{formatDate(row?.createdAt)}</span>,
    },
    {
      name: 'Action',
      contentClass: 'action-wrap',
      disableViewClick: true,
      thclass: 'actions-edit employee-actn-edit',
      cell: (row) => renderAction(row),
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
        onRefreshVisaDuration();
      });
    }
  };

  // ✅ Decide dataset
  const tableData = USE_MOCK ? mockVisaDurationData : visaDurationData;
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

      {modal && (
        <AddEditModal
          showModal={modal}
          closeModal={() => setModal(false)}
          onRefreshVisaDuration={onRefreshVisaDuration}
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

export default VisaDuration;
