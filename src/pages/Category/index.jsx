import React, { useEffect, useState } from 'react';
import { Tooltip } from 'react-tooltip';
import moment from 'moment';

import '../../assets/scss/usermanagement.scss';

import deleteIcon from '../../assets/images/delete.svg';
import editIcon from '../../assets/images/edit.svg';

import CommonHeader from '../../components/common/CommonHeader';
import CustomTable from '../../components/common/CustomTable';
import useCategoryReducer from '../../stores/CategoryReducer';
import { formatDate } from '../../config/config';
import { AddEditModal } from './AddEditModal';
import { debounce } from 'lodash';
import CustomActionModal from '../../components/common/CustomActionModal';

const Category = () => {
  const {
    getData,
    categoryData,
    isLoadingGet,
    successMessage,
    deleteData,
    isLoadingDelete,
  } = useCategoryReducer((state) => state);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  console.log(' categoryData', categoryData);

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
          <img src={editIcon} alt="edit" />
        </a>
        <a
          data-tooltip-id="delete"
          className="delete-icn"
          onClick={() => {
            setDeleteModalOpen(row);
          }}
        >
          <img src={deleteIcon} alt="delete" />
        </a>
      </div>
    );
  };

  const columns = [
    {
      name: 'Category Name',
      selector: 'name',
      // titleClasses: isDashboard ? 'th-name' : 'tw1',
      contentClass: 'user-pic',
    },
    {
      name: 'Total Items',
      selector: 'totalItems',
      contentClass: 'user-pic',
    },
    {
      name: 'Loaned Items',
      selector: 'loanedItems',
      contentClass: 'user-pic',
    },
    {
      name: 'Available Items',
      selector: 'availableItems',
      contentClass: 'user-pic',
    },
    {
      name: 'Category Created Date',
      selector: 'createdAt',
      // titleClasses: isDashboard ? 'th-date' : 'tw5',
      cell: (row) => <span>{formatDate(row?.createdAt)}</span>,
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
        count={categoryData?.total}
        columns={columns}
        data={categoryData?.data}
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
          message={`Are you sure you want to delete this ${deleteModalOpen?.name}?`}
          onCancel={() => setDeleteModalOpen(false)}
          onSubmit={handleDelete}
        />
      )}
    </>
  );
};

export default Category;
