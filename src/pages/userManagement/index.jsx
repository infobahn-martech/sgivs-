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

const UserManagement = () => {
  const { getAllUsers, usersData, isUsersLoading } = useAuthReducer(
    (state) => state
  );

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

  useEffect(() => {
    getAllUsers(params);
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
      cell: () => (
        <>
          <img
            src={deleteIcon}
            alt="Delete"
            data-tooltip-id="delete-tooltip"
            data-tooltip-content="Delete"
            className="cursor-pointer"
          />
          <Tooltip id="delete-tooltip" place="top" effect="solid" />

          <img
            src={closseIcon}
            alt="Close"
            data-tooltip-id="close-tooltip"
            data-tooltip-content="Disable"
            className="cursor-pointer"
          />
          <Tooltip id="close-tooltip" place="top" effect="solid" />
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
    </>
  );
};

export default UserManagement;
