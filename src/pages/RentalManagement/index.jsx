import React, { useEffect, useRef, useState } from 'react';
import useRentalReducer from '../../stores/RentalReducer';
import CustomTable from '../../components/common/CustomTable';
import CommonHeader from '../../components/common/CommonHeader';

import '../../assets/scss/usermanagement.scss';

import penIcon from '../../assets/images/pen.svg';
import noteIcon from '../../assets/images/note.svg';
import alertIcon from '../../assets/images/alert.svg';
import dummyImg from '../../assets/images/avatar.png';
import { debounce } from 'lodash';
import moment from 'moment';
import { getPaymentStatus, paymentStatus } from './utils';
import CustomSelect from '../../components/common/CommonSelect';

const RentalManagement = () => {
  const {
    getAllRentals,
    rentalData,
    isRentalLoading,
    exportRental,
    isExportLoading,
    changeStatus: postChangeStatus,
    successMessage,
  } = useRentalReducer((state) => state);

  const [changeStatus, setChangeStatus] = useState({});

  console.log('changeStatus', changeStatus);

  const [params, setParams] = useState({
    page: 1,
    limit: 10,
    search: '',
    sortOrder: 'DESC',
    // sortBy: 'joinedDate',
    // fromDate: null,
    // toDate: null,
  });
  // const [modalConfig, setModalConfig] = useState({ type: null, data: null });

  const statusEditRef = useRef(null);

  useEffect(() => {
    // Event listener to detect click outside the status edit div
    const handleClickOutside = (event) => {
      if (
        statusEditRef.current &&
        !statusEditRef.current.contains(event.target)
      ) {
        // Clear changeStatus if click is outside
        setChangeStatus({});
      }
    };

    // Adding event listener for clicks
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup the event listener when component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (successMessage) {
      handleGetAllRentals();
      setChangeStatus({});
      useRentalReducer.setState({ successMessage: '' });
    }
  }, [successMessage]);

  const handleGetAllRentals = () => {
    getAllRentals(params);
  };

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
  useEffect(() => {
    handleGetAllRentals();
  }, [params]);

  const debouncedSearch = debounce((searchValue) => {
    setParams((prevParams) => ({
      ...prevParams,
      search: searchValue,
      page: 1,
    }));
  }, 500);

  const formatDateTime = (date) =>
    date ? moment(date).format('MMMM D, YYYY : hh:mm A') : '-';

  const renderStatus = (row) => {
    const { label, className } = getPaymentStatus(row.status);
    if (changeStatus.id === row.id) {
      const handleSubmit = () => {
        if (row.status === changeStatus.status) {
          // Prevent submit if no change
          setChangeStatus({});
          return;
        }
        postChangeStatus({
          id: changeStatus.id,
          status: changeStatus.status,
        });
      };

      return (
        <div className="d-flex" ref={statusEditRef}>
          <CustomSelect
            classNamePrefix="status-select"
            showIndicator
            isClearable={false}
            options={paymentStatus}
            value={row.status}
            onChange={({ value }) =>
              setChangeStatus((prev) => ({
                ...prev,
                status: value,
              }))
            }
          />
          <button onClick={handleSubmit} className="btn-save-trans">
            Save
          </button>
        </div>
      );
    }

    return (
      <>
        <div className="d-flex justify-content-center">
          <span className={`status-wrap ${className}`}>{label}</span>
          {!row.isOld && (
            <span
              className=" ms-2 cursor-pointer flex-shrink-0"
              onClick={() => {
                setChangeStatus({
                  id: row.id,
                  status: row.status,
                });
              }}
            >
              <img
                style={{ cursor: 'pointer' }}
                src={penIcon}
                alt="edit-icon"
              />
            </span>
          )}
        </div>
      </>
    );
  };

  const columns = [
    {
      name: 'User',
      selector: 'user.firstName',
      titleClasses: 'tw1',
      contentClass: 'user-pic',
      cell: (row) => (
        <>
          <figure>
            <img src={dummyImg} alt="" className="img" />
          </figure>
          <span>{row?.['user.firstName'] || '-'}</span>
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
      cell: (row) => formatDateTime(row?.borrowedAt),
      titleClasses: 'tw4',
    },
    {
      name: 'Deadline',
      cell: (row) => formatDateTime(row?.dueDate),
      titleClasses: 'tw5',
    },
    {
      name: 'Returned date and time',
      cell: (row) => formatDateTime(row?.returnedAt),
      titleClasses: 'tw6',
    },
    {
      name: 'Rental Status',
      selector: 'status',
      titleClasses: 'tw6',
      cell: (row) => renderStatus(row),
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
    exportRental({
      page: 1,
      limit: 10,
      search: '',
      sortOrder: 'DESC',
      // sortBy: 'joinedDate',
      // fromDate: null,
      // toDate: null,
    });
  };

  const exportExcel = async () => {
    exportRental(params);
  };

  return (
    <>
      <CommonHeader
        onSearch={debouncedSearch}
        exportExcel={rentalData?.data?.length && exportExcel}
        exportLoading={isExportLoading}
        uploadExcel
        onExcelUpload={handleExcelUpload}
        hideFilter
      />
      <CustomTable
        pagination={{ currentPage: params.page, limit: params.limit }}
        count={rentalData?.pagination?.totalPages}
        columns={columns}
        data={rentalData?.data || []}
        isLoading={isRentalLoading}
        onPageChange={handlePageChange}
        setLimit={handleLimitChange}
        onSortChange={handleSortChange}
        wrapClasses="rm-table-wrap"
      />
    </>
  );
};

export default RentalManagement;
