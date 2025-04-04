import React, { useEffect, useState } from 'react';
import { Tooltip } from 'react-tooltip';
import CustomTable from '../../components/common/CustomTable';
import deleteIcon from '../../assets/images/delete.svg';
import activeIcon from '../../assets/images/close.svg';
import blockIcon from '../../assets/images/block.svg';
// import dummyImg from '../../assets/images/avatar.png';
import '../../assets/scss/usermanagement.scss';
import CommonHeader from '../../components/common/CommonHeader';
import useAuthReducer from '../../stores/AuthReducer';
import { formatBoolean, formatDate } from '../../config/config';
import CustomActionModal from '../../components/common/CustomActionModal';
import { debounce } from 'lodash';
import InitialsAvatar from '../../components/common/InitialsAvatar';
import moment from 'moment';

const UserManagement = () => {
  const {
    getAllUsers,
    usersData,
    isUsersLoading,
    usersAction,
    userActionLoading,
  } = useAuthReducer((state) => state);

  const initialParams = {
    search: '',
    page: 1,
    limit: 10,
    fromDate: null,
    toDate: null,
    sortBy: 'firstName',
    sortOrder: 'ASC',
  };

  const [params, setParams] = useState(initialParams);

  const [statusModalOpen, setstatusModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);

  const handleGetAllUsers = () => {
    getAllUsers(params);
  };

  useEffect(() => {
    handleGetAllUsers();
  }, [params]);

  const debouncedSearch = debounce((searchValue) => {
    setParams((prevParams) => ({
      ...prevParams,
      search: searchValue,
      page: 1,
    }));
  }, 500);

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

  const handleStatusClick = (row) => {
    setSelectedUser(row);
    setstatusModalOpen(true);
  };

  const handleStatusUpdate = () => {
    if (selectedUser) {
      const newStatus = selectedUser.status === 2 ? 1 : 2;
      usersAction(selectedUser.id, newStatus, () => {
        setstatusModalOpen(false);
        handleGetAllUsers();
      });
    }
  };

  const handleDeleteClick = (row) => {
    setSelectedUser(row);
    setDeleteModalOpen(true);
  };
  const handleDeleUser = () => {
    if (selectedUser) {
      usersAction(selectedUser.id, 3, () => {
        setDeleteModalOpen(false);
        handleGetAllUsers();
      });
    }
  };

  const columns = [
    {
      name: 'First Name',
      selector: 'firstName',
      titleClasses: 'tw1',
      contentClass: 'user-pic',
      cell: (row) => (
        <>
          <InitialsAvatar name={row.firstName} />
          <span>{row.firstName}</span>
        </>
      ),
    },
    {
      name: 'Last Name',
      selector: 'lastName',
      titleClasses: 'tw2',
    },
    {
      name: 'Email',
      selector: 'email',
      titleClasses: 'tw3',
    },
    {
      name: 'Phone',
      selector: 'phone',
      titleClasses: 'tw4',
      cell: (row) => `${row?.countryCode || ''} ${row?.phone || ''}`.trim(),
    },
    {
      name: 'Joined Date',
      selector: 'createdAt',
      titleClasses: 'tw5',
      cell: (row) => <span>{formatDate(row?.createdAt)}</span>,
      sort: true,
    },
    {
      name: 'Credit Card Available',
      selector: 'isCreditCardAvailable',
      titleClasses: 'tw6',
      cell: (row) => <span>{formatBoolean(row?.isCreditCardAvailable)}</span>,
      colClassName: 'text-center',
    },
    {
      name: 'Action',
      selector: 'action',
      titleClasses: 'tw7',
      contentClass: 'action-wrap',
      cell: (row) => (
        <>
          <img
            src={deleteIcon}
            alt="Delete"
            data-tooltip-id="delete-tooltip"
            data-tooltip-content="Delete"
            className="cursor-pointer"
            onClick={() => handleDeleteClick(row)}
          />
          <Tooltip
            id="delete-tooltip"
            place="top"
            effect="solid"
            style={{
              backgroundColor: '#2ca0da',
            }}
          />

          <img
            src={row?.status === 2 ? activeIcon : blockIcon}
            alt={row?.status === 2 ? 'Active' : 'Blocked'}
            data-tooltip-id={`status-tooltip-${row?.id}`}
            data-tooltip-content={row?.status === 2 ? 'Active' : 'Block'}
            className="cursor-pointer"
            onClick={() => handleStatusClick(row)}
          />
          <Tooltip
            id={`status-tooltip-${row?.id}`}
            place="top"
            effect="solid"
            style={{
              backgroundColor: '#2ca0da',
            }}
          />
        </>
      ),
    },
  ];

  const filterOptions = [
    {
      fieldName: 'User Status',
      BE_keyName: 'status',
      fieldType: 'select',
      Options: [
        { label: 'Active', value: 1 },
        { label: 'Blocked', value: 2 },
      ],
    },
    {
      fieldName: 'Joined Date',
      fieldType: 'dateRangeCombined',
      fromKey: 'fromDate',
      toKey: 'toDate',
    },
  ];

  return (
    <>
      <CommonHeader
        onSearch={debouncedSearch}
        filterOptions={filterOptions}
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
      />
      <CustomTable
        pagination={{ currentPage: params.page, limit: params.limit }}
        count={usersData?.pagination?.totalRecords}
        columns={columns}
        data={usersData?.data || []}
        isLoading={isUsersLoading}
        onPageChange={handlePageChange}
        setLimit={handleLimitChange}
        onSortChange={handleSortChange}
      />
      {statusModalOpen && selectedUser && (
        <CustomActionModal
          isLoading={userActionLoading}
          showModal={statusModalOpen}
          closeModal={() => setstatusModalOpen(false)}
          message={`Are you sure you want to ${
            selectedUser.status === 2 ? 'Activate' : 'Block'
          } ${selectedUser?.firstName} ?`}
          onCancel={() => setstatusModalOpen(false)}
          onSubmit={handleStatusUpdate}
        />
      )}
      {deleteModalOpen && selectedUser && (
        <CustomActionModal
          isDelete
          isLoading={userActionLoading}
          showModal={deleteModalOpen}
          closeModal={() => setDeleteModalOpen(false)}
          message={`Are you sure you want to delete ${selectedUser?.firstName} ?`}
          onCancel={() => setDeleteModalOpen(false)}
          onSubmit={handleDeleUser}
        />
      )}
    </>
  );
};

export default UserManagement;
