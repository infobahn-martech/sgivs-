import React, { useState } from 'react';
import CustomTable from '../../components/common/CustomTable';
import deleteIcon from '../../assets/images/delete.svg';
import closseIcon from '../../assets/images/close.svg';
import dummyImg from '../../assets/images/avatar.png';
import '../../assets/scss/usermanagement.scss';
import CommonHeader from '../../components/common/CommonHeader';

const dummyData = [
  {
    id: 1,
    firstName: 'Chris',
    lastName: 'Stephanie Nicol',
    email: 'k.p.allen@aol.com',
    phone: '(602) 309-9604',
    joinedDate: 'Mar 3, 2025',
    creditCardAvailable: 'Yes',
    profilePic: 'img/user-1.png',
  },
  {
    id: 2,
    firstName: 'Dennis Callis',
    lastName: 'Kenneth Allen',
    email: 'rodger913@aol.com',
    phone: '(602) 309-9604',
    joinedDate: 'Mar 3, 2025',
    creditCardAvailable: 'Yes',
    profilePic: 'img/user-2.png',
  },
  {
    id: 3,
    firstName: 'Jerry Helfer',
    lastName: 'Daniel Hamilton',
    email: 'Daniel_hamilton@aol.com',
    phone: '(602) 309-9604',
    joinedDate: 'Mar 3, 2025',
    creditCardAvailable: 'No',
    profilePic: 'img/user-3.png',
  },
  {
    id: 4,
    firstName: 'Kimberly',
    lastName: 'Kurt Bates',
    email: 'k.p.allen@aol.com',
    phone: '(602) 309-9604',
    joinedDate: 'Mar 3, 2025',
    creditCardAvailable: 'Yes',
    profilePic: 'img/user-4.png',
  },
];

const UserManagement = () => {
  const [pagination, setPagination] = useState({ currentPage: 1, limit: 10 });

  const [data, setData] = useState(dummyData);

  const handleSortChange = (selector) => {
    setData((prevData) => {
      const isAscending =
        prevData[0][selector] > prevData[prevData.length - 1][selector];
      return [...prevData].sort((a, b) =>
        isAscending
          ? a[selector] > b[selector]
            ? -1
            : 1
          : a[selector] < b[selector]
          ? -1
          : 1
      );
    });
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
      selector: 'joinedDate',
      titleClasses: 'tw5',
      sort: true,
    },
    {
      name: 'Credit Card Available',
      selector: 'creditCardAvailable',
      titleClasses: 'tw6',
    },
    {
      name: 'Action',
      selector: 'action',
      titleClasses: 'tw7',
      contentClass: 'action-wrap',
      cell: () => (
        <>
          <img src={deleteIcon} alt="Delete" />
          <img src={closseIcon} alt="Close" />
        </>
      ),
    },
  ];

  return (
    <>
      <CommonHeader />
      <CustomTable
        pagination={pagination}
        count={dummyData?.length}
        columns={columns}
        data={data}
        isLoading={false}
        onPageChange={(currentPage) =>
          setPagination({ ...pagination, currentPage })
        }
        setLimit={(limit) => setPagination({ ...pagination, limit })}
        onSortChange={handleSortChange}
      />
    </>
  );
};

export default UserManagement;
