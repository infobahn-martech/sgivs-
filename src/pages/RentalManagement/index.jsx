import React, { useState } from 'react'
import CommonHeader from '../../components/common/CommonHeader'
import CustomTable from '../../components/common/CustomTable'
import '../../assets/scss/usermanagement.scss';

import noteIcon from '../../assets/images/note.svg';
import penIcon from '../../assets/images/pen.svg';
import alertIcon from '../../assets/images/alert.svg';
import dummyImg from '../../assets/images/avatar.png';

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
const RentalManagement = () => {
    const [pagination, setPagination] = useState({ currentPage: 1, limit: 10 });
    const [modalConfig, setModalConfig] = useState({ type: null, data: null });

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
        name: 'User',
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
        name: 'Item Id',
        selector: 'lastName',
        titleClasses: 'tw2',
      },
      {
        name: 'Item Name',
        selector: 'email',
        titleClasses: 'tw3',
      },
      {
        name: 'Borrowed On',
        selector: 'phone',
        titleClasses: 'tw4',
      },
      {
        name: 'Deadline',
        selector: 'joinedDate',
        titleClasses: 'tw5',
        sort: true,
      },
      {
        name: 'Returned date and time',
        selector: 'creditCardAvailable',
        titleClasses: 'tw6',
      },
      {
        name: 'Rental Status',
        selector: 'creditCardAvailable',
        titleClasses: 'tw6',
        cell: (row) => (
          <>
            <div class="status-wrap">
                  <span>Overdue</span> <img src={penIcon} alt="" class="img" />
                </div>
          </>
        ),
      },
      {
        name: 'Action',
        selector: 'action',
        titleClasses: 'tw7',
        contentClass: 'action-wrap',
        cell: () => (
          <>
            <img src={noteIcon} alt="Note" />
            <img src={alertIcon} alt="Alert" />
          </>
        ),
      },
    ];
    const handleExcelUpload = (data) => {
      // Process the uploaded Excel data
      console.log('Processed Excel data:', data);
    };
  return (
    <>
    <CommonHeader 
     exportExcel={() => {}}
     uploadExcel
     onExcelUpload={handleExcelUpload}
     addButton={{
       name: 'Add Item',
       type: 'link',
       path: '/inventory-management/add',
       action: () => {
         setModalConfig({ data: null, type: 'add' });
       },
     }}
    />
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
  )
}

export default RentalManagement