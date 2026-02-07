import React, { useMemo, useState } from 'react';
import CustomTable from '../../components/common/CustomTable';
import '../../assets/scss/usermanagement.scss';
import CommonHeader from '../../components/common/CommonHeader';
import useAuthReducer from '../../stores/AuthReducer';
import CustomActionModal from '../../components/common/CustomActionModal';
import { debounce } from 'lodash';
import moment from 'moment';
import getUserTableColumns from './getUserTableColumns';

const UserManagement = () => {
  // ✅ Toggle this to switch between static data and API data
  const USE_MOCK = true;

  const {
    getAllUsers,
    usersData,
    isUsersLoading,
    usersAction,
    userActionLoading,
    userNotification,
    userNotifyLoading,
  } = useAuthReducer((state) => state);

  const initialParams = {
    search: '',
    page: 1,
    limit: 10,
    fromDate: null,
    toDate: null,
    sortBy: 'createdAt',
    sortOrder: 'DESC',
    // status: undefined, // (optional filter key if your BE supports)
  };

  const [params, setParams] = useState(initialParams);

  const [statusModalOpen, setstatusModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [notifyModal, setnotifyModal] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);

  // ✅ Static mock data (UI testing without API)
  const staticUsersData = {
    data: [
      {
        id: 1,
        firstName: 'John',
        lastName: 'Mathew',
        email: 'john@test.com',
        role: 'Admin',
        status: 1, // 1=Active, 2=Blocked
        isNotificationEnabled: true,
        createdAt: '2025-01-12T10:20:00Z',
      },
      {
        id: 2,
        firstName: 'Akhil',
        lastName: 'Thomas',
        email: 'akhil@test.com',
        role: 'Manager',
        status: 2,
        isNotificationEnabled: false,
        createdAt: '2025-02-20T09:10:00Z',
      },
      {
        id: 3,
        firstName: 'Nabeela',
        lastName: 'K',
        email: 'nabeela@test.com',
        role: 'User',
        status: 1,
        isNotificationEnabled: true,
        createdAt: '2025-03-05T12:00:00Z',
      },
      {
        id: 4,
        firstName: 'Dany',
        lastName: 'Thomas',
        email: 'dany@test.com',
        role: 'Full Stack Dev',
        status: 1,
        isNotificationEnabled: false,
        createdAt: '2025-11-10T08:30:00Z',
      },
    ],
    pagination: {
      totalRecords: 4,
    },
  };

  const handleGetAllUsers = () => {
    // ✅ If you want API later, set USE_MOCK=false and uncomment useEffect below
    if (!USE_MOCK) getAllUsers(params);
  };

  // ✅ API mode (enable later)
  // React.useEffect(() => {
  //   if (!USE_MOCK) handleGetAllUsers();
  // }, [params]);

  // ✅ Debounced search (stable reference)
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
    setParams((prevParams) => ({ ...prevParams, limit, page: 1 }));
  };

  const handleStatusClick = (row) => {
    setSelectedUser(row);
    setstatusModalOpen(true);
  };

  const handleStatusUpdate = () => {
    if (!selectedUser) return;

    if (USE_MOCK) {
      // ✅ MOCK: just close modal (no real update)
      setstatusModalOpen(false);
      return;
    }

    const newStatus = selectedUser.status === 2 ? 1 : 2;
    usersAction(selectedUser.id, newStatus, () => {
      setstatusModalOpen(false);
      handleGetAllUsers();
    });
  };

  const handleDeleteClick = (row) => {
    setSelectedUser(row);
    setDeleteModalOpen(true);
  };

  const handleNotification = (row) => {
    setSelectedUser(row);
    setnotifyModal(true);
  };

  const handleDeleUser = () => {
    if (!selectedUser) return;

    if (USE_MOCK) {
      // ✅ MOCK: just close modal (no real delete)
      setDeleteModalOpen(false);
      return;
    }

    usersAction(selectedUser.id, 3, () => {
      setDeleteModalOpen(false);
      handleGetAllUsers();
    });
  };

  const onSubmitUserNotify = () => {
    if (!selectedUser) return;

    if (USE_MOCK) {
      // ✅ MOCK: just close modal (no real notify update)
      setnotifyModal(false);
      return;
    }

    userNotification(
      {
        userId: selectedUser?.id,
        notifications: !selectedUser?.isNotificationEnabled,
      },
      () => {
        setnotifyModal(false);
        handleGetAllUsers();
      }
    );
  };

  const columns = getUserTableColumns({
    onDeleteClick: handleDeleteClick,
    onStatusClick: handleStatusClick,
    onUserNotify: handleNotification,
    showActions: true,
  });

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

  // ✅ Decide which dataset to use
  const tableData = USE_MOCK ? staticUsersData : usersData;
  const loading = USE_MOCK ? false : isUsersLoading;

  return (
    <>
      <CommonHeader
        onSearch={debouncedSearch}
        filterOptions={filterOptions}
        submitFilter={(filters) => {
          const { fromDate, toDate, ...rest } = filters;

          setParams((prev) => ({
            ...prev,
            ...rest,
            fromDate: fromDate ? moment(fromDate).format('YYYY-MM-DD') : null,
            toDate: toDate ? moment(toDate).format('YYYY-MM-DD') : null,
            page: 1,
          }));
        }}
        clearOptions={() => {
          setParams(initialParams);
        }}
      />

      <CustomTable
        pagination={{ currentPage: params.page, limit: params.limit }}
        count={tableData?.pagination?.totalRecords || 0}
        columns={columns}
        data={tableData?.data || []}
        isLoading={loading}
        onPageChange={handlePageChange}
        setLimit={handleLimitChange}
        onSortChange={handleSortChange}
      />

      {statusModalOpen && selectedUser && (
        <CustomActionModal
          isLoading={USE_MOCK ? false : userActionLoading}
          showModal={statusModalOpen}
          closeModal={() => setstatusModalOpen(false)}
          message={`Are you sure you want to ${selectedUser.status === 2 ? 'Activate' : 'Block'
            } ${selectedUser?.firstName} ?`}
          onCancel={() => setstatusModalOpen(false)}
          onSubmit={handleStatusUpdate}
        />
      )}

      {deleteModalOpen && selectedUser && (
        <CustomActionModal
          isDelete
          isLoading={USE_MOCK ? false : userActionLoading}
          showModal={deleteModalOpen}
          closeModal={() => setDeleteModalOpen(false)}
          message={`Are you sure you want to delete ${selectedUser?.firstName} ?`}
          onCancel={() => setDeleteModalOpen(false)}
          onSubmit={handleDeleUser}
        />
      )}

      {notifyModal && selectedUser && (
        <CustomActionModal
          isLoading={USE_MOCK ? false : userNotifyLoading}
          showModal={notifyModal}
          closeModal={() => setnotifyModal(false)}
          message={`Are you sure you want to ${selectedUser?.isNotificationEnabled ? 'Disable' : 'Enable'
            } notifications for ${selectedUser?.firstName}?`}
          onCancel={() => setnotifyModal(false)}
          onSubmit={onSubmitUserNotify}
        />
      )}
    </>
  );
};

export default UserManagement;
