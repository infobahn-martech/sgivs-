import React, { useState } from 'react';
import { Tooltip } from 'react-tooltip';

import deleteIcon from '../../assets/images/delete.svg';
import viewIcon from '../../assets/images/eye.svg';
import showHideIcon from '../../assets/images/eye-close.svg';
import editIcon from '../../assets/images/edit.svg';
import downloadIcon from '../../assets/images/download.svg';

import '../../assets/scss/usermanagement.scss';

import userImage from '../../assets/images/user-1.png';

import CommonHeader from '../../components/common/CommonHeader';
import CustomTable from '../../components/common/CustomTable';

const dummyData = [
  {
    id: 1232,
    itemId: '#FAS44SS',
    itemName: 'Riding Jacket',
    quantity: '06',
    quantityAvailable: '04',
    createdAt: 'Mar 3, 2025',
    haveParts: true,
    image: userImage,
  },
  {
    id: 12312,
    itemId: '#AS44SS',
    itemName: 'Riding Gloves',
    quantity: '10',
    quantityAvailable: '07',
    createdAt: 'Mar 14, 2025',
    haveParts: false,
    image: userImage,
  },
  {
    id: 123123,
    itemId: '#RAS33VS',
    itemName: 'Helmet',
    quantity: '06',
    quantityAvailable: '04',
    createdAt: 'Mar 1, 2025',
    haveParts: false,
    image: userImage,
  },
  {
    id: 1231232,
    itemId: '#FAS44SS',
    itemName: 'Riding Jacket',
    quantity: '06',
    quantityAvailable: '04',
    createdAt: 'Mar 3, 2025',
    haveParts: true,
    image: userImage,
  },
];

const InventoryManagement = () => {
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
      name: 'Image',
      selector: 'image',
      titleClasses: 'tw1',
      contentClass: 'user-pic',
      cell: (row) => (
        <>
          <figure>
            <img src={row.image} alt="" className="img" />
          </figure>
        </>
      ),
    },
    {
      name: 'Item ID',
      selector: 'itemId',
      titleClasses: 'tw1',
    },
    {
      name: 'Item Name',
      selector: 'itemName',
      titleClasses: 'tw1',
      contentClass: 'user-pic',
    },
    {
      name: 'Quantity Available',
      selector: 'quantity',
      titleClasses: 'tw1',
      contentClass: 'user-pic',
    },
    {
      name: 'Quantity Available After Borrowing',
      selector: 'quantityAvailable',
      titleClasses: 'tw1',
      contentClass: 'user-pic',
    },
    {
      name: 'Item Created date',
      selector: 'createdAt',
      titleClasses: 'tw1',
      contentClass: 'user-pic',
      sort: true,
    },
    {
      name: 'Have Parts',
      selector: 'haveParts',
      titleClasses: 'tw1',
      contentClass: 'user-pic',
      cell: (row) => <span>{row.haveParts ? 'Yes' : 'No'}</span>,
    },

    {
      name: 'Action',
      selector: 'action',
      titleClasses: 'tw7',
      contentClass: 'action-wrap',
      cell: (row, rowIndex) => (
        <>
          <Tooltip
            id={`tooltip-${row.id || rowIndex}`}
            place="bottom"
            style={{
              backgroundColor: '#2ca0da',
              maxWidth: 500,
            }}
          />
          <span
            data-tooltip-id={`tooltip-${row.id || rowIndex}`} // Unique ID for the tooltip
            data-tooltip-content={'View'} // Tooltip content
          >
            <img src={viewIcon} alt="view" />
          </span>
          <span
            data-tooltip-id={`tooltip-${row.id || rowIndex}`} // Unique ID for the tooltip
            data-tooltip-content={'Edit'} // Tooltip content
            onClick={() => {
              setModalConfig({ data: row, type: 'edit' });
            }}
          >
            <img src={editIcon} alt="Edit" />
          </span>
          <span
            data-tooltip-id={`tooltip-${row.id || rowIndex}`} // Unique ID for the tooltip
            data-tooltip-content={'Hide/Show'} // Tooltip content
          >
            <img src={showHideIcon} alt="Hide/Show" />
          </span>
          <span
            data-tooltip-id={`tooltip-${row.id || rowIndex}`} // Unique ID for the tooltip
            data-tooltip-content={'Delete'} // Tooltip content
          >
            <img src={deleteIcon} alt="Delete" />
          </span>
          <span
            data-tooltip-id={`tooltip-${row.id || rowIndex}`} // Unique ID for the tooltip
            data-tooltip-content={'Download Barcode'} // Tooltip content
          >
            <img src={downloadIcon} alt="Download" />
          </span>
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
  );
};

export default InventoryManagement;
