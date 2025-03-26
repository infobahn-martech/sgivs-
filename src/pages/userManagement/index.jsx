import React, { useEffect, useState } from 'react';
import { Tooltip } from 'react-tooltip';
import CustomTable from '../../components/common/CustomTable';
import deleteIcon from '../../assets/images/delete.svg';
import closseIcon from '../../assets/images/close.svg';
import dummyImg from '../../assets/images/avatar.png';
import '../../assets/scss/usermanagement.scss';
import CommonHeader from '../../components/common/CommonHeader';
import useAuthReducer from '../../stores/AuthReducer';
import { formatBoolean, formatDate } from '../../config/config';
import CustomActionModal from '../../components/CustomActionModal';

const UserManagement = () => {
  const {
    getAllUsers,
    usersData,
    isUsersLoading,
    usersAction,
    userActionLoading,
  } = useAuthReducer((state) => state);

  const [params, setParams] = useState({
    page: 1,
    limit: 10,
    search: '',
    sortOrder: 'DESC',
    sortBy: 'joinedDate',
    isCardAdded: 1,
    status: 1,
    fromDate: null,
    toDate: null,
  });

  const [statusModalOpen, setstatusModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);

  const handleGetAllUsers = () => {
    getAllUsers(params);
  };

  useEffect(() => {
    handleGetAllUsers();
  }, [params]);

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
        setstatusModalOpen(false);
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
          <figure>
            <img src={dummyImg} alt="" className="img" />
          </figure>
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
      cell: (row) => <span>{formatBoolean(row.isCreditCardAvailable)}</span>,
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
          <Tooltip id="delete-tooltip" place="top" effect="solid" />

          <img
            src={closseIcon}
            alt={row?.status === 2 ? 'Blocked' : 'Active'}
            data-tooltip-id={`status-tooltip-${row.id}`}
            data-tooltip-content={row?.status === 2 ? 'Blocked' : 'Active'}
            className="cursor-pointer"
            onClick={() => handleStatusClick(row)}
          />
          <Tooltip id={`status-tooltip-${row.id}`} place="top" effect="solid" />
        </>
      ),
    },
  ];

  return (
    <>
      <CommonHeader />
      <CustomTable
        pagination={{ currentPage: params.page, limit: params.limit }}
        count={usersData?.pagination?.totalPages}
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
          isLoading={userActionLoading}
          showModal={deleteModalOpen}
          closeModal={() => setDeleteModalOpen(false)}
          message={`Are you sure you want to ${
            selectedUser.status === 2 ? 'Activate' : 'Block'
          } ${selectedUser?.firstName} ?`}
          onCancel={() => setDeleteModalOpen(false)}
          onSubmit={handleDeleUser}
        />
      )}
    </>
  );
};

export default UserManagement;
