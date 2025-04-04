import React, { useState } from 'react';
import moment from 'moment';

import '../../assets/scss/usermanagement.scss';

import CommonHeader from '../../components/common/CommonHeader';
import CustomTable from '../../components/common/CustomTable';
import penIcon from '../../assets/images/pen.svg';
import camaraIcon from '../../assets/images/camera.svg';
import tagIcon from '../../assets/images/tag.svg';
import image from '../../assets/images/avatar.png';
import InitialsAvatar from '../../components/common/InitialsAvatar';

const data = [
  {
    id: 1,
    user: 'Chris  Stephanie Nicol',
    image: image,
    itemId: '#5845854',
    borrowDate: new Date(),
    deadline: new Date(),
    returnDate: new Date(),
    status: 3,
    due: 25,
  },
  {
    id: 1,
    user: 'Chris  Stephanie Nicol',
    image: image,
    itemId: '#5845854',
    borrowDate: new Date(),
    deadline: new Date(),
    returnDate: new Date(),
    status: 1,
    due: 25,
  },
  {
    id: 1,
    user: 'Chris  Stephanie Nicol',
    image: image,
    itemId: '#5845854',
    borrowDate: new Date(),
    deadline: new Date(),
    returnDate: new Date(),
    status: 1,
    due: 25,
  },
  {
    id: 1,
    user: 'Chris  Stephanie Nicol',
    image: image,
    itemId: '#5845854',
    borrowDate: new Date(),
    deadline: new Date(),
    returnDate: new Date(),
    status: 2,
    due: 25,
  },
  {
    id: 1,
    user: 'Chris  Stephanie Nicol',
    image: image,
    itemId: '#5845854',
    borrowDate: new Date(),
    deadline: new Date(),
    returnDate: new Date(),
    status: 1,
    due: 25,
  },
  {
    id: 1,
    user: 'Chris  Stephanie Nicol',
    image: image,
    itemId: '#5845854',
    borrowDate: new Date(),
    deadline: new Date(),
    returnDate: new Date(),
    status: 1,
    due: 25,
  },
];
const EZPassBilling = () => {
  const [pagination, setPagination] = useState({
    currentPage: 1,
    limit: 10,
    totalRecords: data.length,
  });
  const formatDateTime = (date) =>
    date ? moment(date).format('MMM D, YYYY : hh:mm A') : '-';

  const renderStatusClass = (status) => {
    switch (status) {
      case 1:
        return '';
      case 2:
        return 'returned';
      case 3:
        return 'missing';

      default:
        break;
    }
  };
  const renderStatus = (status) => {
    switch (status) {
      case 1:
        return 'Overdue';
      case 2:
        return 'Returned';
      case 3:
        return 'Missing';

      default:
        break;
    }
  };

  const columns = [
    {
      name: 'User',
      selector: 'user.firstName',
      titleClasses: 'tw1',
      contentClass: 'user-pic',
      cell: (row) => (
        <>
          <InitialsAvatar name={row.user} />
          {/* <figure>
            <img src={row.image} alt="" className="img" />
          </figure> */}
          <span>{row.user || '-'}</span>
        </>
      ),
    },
    {
      name: 'EZ pass item ID',
      selector: 'itemId',
    },
    {
      name: 'Borrowed On',
      cell: (row) => formatDateTime(row?.borrowDate),
      titleClasses: 'tw6',
    },
    {
      name: 'Deadline',
      cell: (row) => formatDateTime(row?.deadline),
      titleClasses: 'tw6',
    },
    {
      name: 'Returned date and time',
      cell: (row) => formatDateTime(row?.returnDate),
      titleClasses: 'tw6',
    },
    {
      name: 'Loan Status',
      selector: 'status',
      titleClasses: 'tw6',
      cell: (row) => (
        <>
          <div class={`status-wrap ${renderStatusClass(row.status)}`}>
            <span>{renderStatus(row.status)}</span>{' '}
            <img src={penIcon} alt="" className="img" />
          </div>
        </>
      ),
    },
    {
      name: 'Balance Due',
      cell: (row) => `$ ${row.due}`,
    },
    {
      name: 'Action',
      selector: 'action',
      titleClasses: 'tw7',
      contentClass: 'action-wrap',
      cell: () => (
        <>
          <img src={camaraIcon} alt="cam" />
          <img src={tagIcon} alt="tag" />
        </>
      ),
    },
  ];
  return (
    <>
      <CommonHeader hideFilter />
      <CustomTable
        pagination={pagination}
        count={pagination.totalRecords}
        columns={columns}
        data={data}
        isLoading={false}
        onPageChange={(page) => setPagination({ ...pagination, page })}
        setLimit={(limit) => setPagination({ ...pagination, limit })}
        onSortChange={() => {}}
        wrapClasses="ezpass-table-wrap"
      />
    </>
  );
};

export default EZPassBilling;
