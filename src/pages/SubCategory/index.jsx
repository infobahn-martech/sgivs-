import React, { useEffect, useState } from 'react';
import { Tooltip } from 'react-tooltip';
import moment from 'moment';

import '../../assets/scss/usermanagement.scss';

import CommonHeader from '../../components/common/CommonHeader';
import CustomTable from '../../components/common/CustomTable';
import { formatDate } from '../../config/config';
import { AddEditModal } from './AddEditModal';
import { debounce } from 'lodash';
import CustomActionModal from '../../components/common/CustomActionModal';
import useSubCategoryReducer from '../../stores/SubCategoryReducer';

const Category = () => {
  const {
    getData,
    subCategoryData,
    isLoadingGet,
    successMessage,
    deleteData,
    isLoadingDelete,
  } = useSubCategoryReducer((state) => state);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  console.log(' subCategoryData', subCategoryData);

  const [modal, setModal] = useState(false);

  console.log('modal', modal);

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

  useEffect(() => {
    if (successMessage) {
      getData(params);
      setModal(false);
      setDeleteModalOpen(false);
    }
  }, [successMessage]);

  useEffect(() => {
    getData(params);
  }, [params]);

  const handleSortChange = (selector) => {
    setParams((prevParams) => ({
      ...prevParams,
      sortBy: selector,
      sortOrder: prevParams.sortOrder === 'ASC' ? 'DESC' : 'ASC',
    }));
  };

  const showActions = [];
  {
    showActions.push({
      name: 'Action',
      disableViewClick: true,
      thclass: 'actions-edit employee-actn-edit',
      cell: (row) => renderAction(row),
    });
  }

  const renderAction = (row) => {
    return (
      <div className="d-flex">
        <Tooltip id="edit" place="bottom" content="Edit" />
        <Tooltip id="delete" place="bottom" content="Delete" />
        <a
          data-tooltip-id="edit"
          className="edit"
          onClick={() => {
            setModal(row);
          }}
        >
          <img src="" alt="edit" />
        </a>
        <a
          data-tooltip-id="delete"
          className="delete-icn"
          onClick={() => {
            setDeleteModalOpen(row);
          }}
        >
          <img src="" alt="delete" />
        </a>
      </div>
    );
  };

  const columns = [
    {
      name: 'Name',
      selector: 'name',
      // titleClasses: isDashboard ? 'th-name' : 'tw1',
      contentClass: 'user-pic',
    },
    {
      name: 'Created Date',
      selector: 'createdAt',
      // titleClasses: isDashboard ? 'th-date' : 'tw5',
      cell: (row) => <span>{formatDate(row?.createdAt)}</span>,
      sort: true,
    },

    ...showActions,
  ];

  const debouncedSearch = debounce((searchValue) => {
    console.log(' searchValue', searchValue);
    setParams((prevParams) => ({
      ...prevParams,
      search: searchValue,
      page: 1,
    }));
  }, 500);

  const handleDelete = () => {
    if (deleteModalOpen?.id) {
      deleteData(deleteModalOpen?.id);
    }
  };

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
            page: '1',
          });
        }}
        clearOptions={() => {
          setParams(initialParams);
        }}
        onSearch={debouncedSearch}
      />
      <CustomTable
        pagination={{ currentPage: params.page, limit: params.limit }}
        count={subCategoryData?.total}
        columns={columns}
        data={subCategoryData?.data}
        isLoading={isLoadingGet}
        onPageChange={(page) => setParams({ ...params, page })}
        setLimit={(limit) => setParams({ ...params, limit })}
        onSortChange={handleSortChange}
        wrapClasses="inventory-table-wrap"
      />
      {modal && (
        <AddEditModal showModal={modal} closeModal={() => setModal(false)} />
      )}
      {deleteModalOpen && (
        <CustomActionModal
          isDelete
          isLoading={isLoadingDelete}
          showModal={deleteModalOpen}
          closeModal={() => setDeleteModalOpen(false)}
          message="Are you sure you want to delete this?"
          onCancel={() => setDeleteModalOpen(false)}
          onSubmit={handleDelete}
        />
      )}
    </>
  );
};

export default Category;
