import React, { useEffect, useState } from 'react'
import useRentalReducer from '../../stores/RentalReducer';
import CustomTable from '../../components/common/CustomTable'
import CommonHeader from '../../components/common/CommonHeader'

import '../../assets/scss/usermanagement.scss';

import penIcon from '../../assets/images/pen.svg';
import noteIcon from '../../assets/images/note.svg';
import alertIcon from '../../assets/images/alert.svg';
import dummyImg from '../../assets/images/avatar.png';
import { debounce } from 'lodash';

const RentalManagement = () => {
  const {
    getAllRentals,
    rentalData,
    isRentalLoading,
  } = useRentalReducer((state) => state);

    const [params, setParams] = useState({
        page: 1,
        limit: 10,
        search: '',
        sortOrder: 'DESC',
        // sortBy: 'joinedDate',
        // fromDate: null,
        // toDate: null,
      });
      const [pagination, setPagination] = useState({ currentPage: 1, limit: 10 });
      const [modalConfig, setModalConfig] = useState({ type: null, data: null });

   const handleGetAllUsers = () => {
    getAllRentals(params);
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
        selector: 'id',
        titleClasses: 'tw2',
      },
      {
        name: 'Item Name',
        selector: 'inventory.itemName',
        titleClasses: 'tw3',
      },
      {
        name: 'Borrowed On',
        selector: 'borrowedAt',
        titleClasses: 'tw4',
      },
      {
        name: 'Deadline',
        selector: 'dueDate',
        titleClasses: 'tw5',
        sort: true,
      },
      {
        name: 'Returned date and time',
        selector: 'returnedAt',
        titleClasses: 'tw6',
      },
      {
        name: 'Rental Status',
        selector: 'status',
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
     onSearch={debouncedSearch}
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
        pagination={{ currentPage: params.page, limit: params.limit }}
        count={rentalData?.pagination?.totalPages}
        columns={columns}
        data={rentalData?.data || []}
        isLoading={isRentalLoading}
        onPageChange={(currentPage) =>
          setPagination({ ...pagination, currentPage })
        }
        setLimit={(limit) => setPagination({ ...pagination, limit })}
        // onSortChange={handleSortChange}
      />
    </>
  )
}

export default RentalManagement