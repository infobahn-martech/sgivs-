import React, { useEffect, useState } from 'react';
import { Tooltip } from 'react-tooltip';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

import deleteIcon from '../../assets/images/delete.svg';
import viewIcon from '../../assets/images/eye.svg';
import showHideIcon from '../../assets/images/eye-close.svg';
import editIcon from '../../assets/images/edit.svg';
import downloadIcon from '../../assets/images/download.svg';

import '../../assets/scss/usermanagement.scss';

import CommonHeader from '../../components/common/CommonHeader';
import CustomTable from '../../components/common/CustomTable';
import useInventoryStore from '../../stores/InventoryReducer';
import { downloadContent } from '../../helpers/utils';
import CustomActionModal from '../../components/common/CustomActionModal';

const InventoryManagement = () => {
  const { getInventoryList, inventoryList, pagination, deleteItemById } =
    useInventoryStore((state) => state);
  const navigate = useNavigate();
  console.log(' inventoryList', inventoryList);
  const [modalConfig, setModalConfig] = useState({ type: null, action: null });
  const [params, setParams] = useState({
    search: '',
    page: '1',
    limit: '10',
    fromDate: null,
    toDate: null,
    sortBy: 'createdAt',
    sortOrder: 'DESC',
  });

  useEffect(() => {
    getInventoryList(params);
  }, []);

  // const [data, setData] = useState(dummyData);

  const handleSortChange = (selector) => {
    console.log(' selector', selector);
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
            <img src={row.images[0]} alt="" className="img" />
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
      cell: (row) => moment(row.createdAt).format('DD MMM, YYYY'),
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
              navigate(`/inventory-management/edit/${row.id}`);
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
            onClick={() =>
              setModalConfig({ action: deleteItemById(row.id), type: 'delete' })
            }
          >
            <img src={deleteIcon} alt="Delete" />
          </span>
          <span
            data-tooltip-id={`tooltip-${row.id || rowIndex}`} // Unique ID for the tooltip
            data-tooltip-content={'Download Barcode'} // Tooltip content
            onClick={() => {
              const barcodeUrl =
                'https://spericorn-development-bucket.s3.us-east-2.amazonaws.com/inventory/string.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAYQP66NNME4MHNDPT%2F20250326%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20250326T134913Z&X-Amz-Expires=3600&X-Amz-Signature=8ba99e0b4bed6b5071e849b322076f8bf1ba515c0a4fe8f8d2ad7891c89668c5&X-Amz-SignedHeaders=host&response-content-type=&x-amz-checksum-mode=ENABLED&x-id=GetObject';
              // const a = document.createElement('a');
              // a.href = barcodeUrl;
              // a.download = `${row.itemId}.png`;
              // document.body.appendChild(a);
              // a.click();
              // document.body.removeChild(a);
              // window.URL.revokeObjectURL(barcodeUrl);
              downloadContent(barcodeUrl, `${row.itemId}.png`);
            }}
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
  const closeModal = () => {
    setModalConfig({ type: null, action: null });
  };

  const renderMessage = () => {
    switch (modalConfig.type) {
      case 'delete':
        return 'Are you sure you want to delete this?';

      default:
        break;
    }
  };
  const renderModal = () => 
    <CustomActionModal
      closeModal={closeModal}
      isLoading={false}
      message={renderMessage()}
      onSubmit={()=>modalConfig.action()}
      showModal={modalConfig.type}
      isDelete

    />;
  

  return (
    <>
      {renderModal()}
      <CommonHeader
        exportExcel={() => {}}
        uploadExcel
        onExcelUpload={handleExcelUpload}
        uploadTitle="Bulk Upload Inventory"
        addButton={{
          name: 'Add Item',
          type: 'link',
          path: '/inventory-management/add',
        }}
      />
      <CustomTable
        pagination={pagination}
        count={pagination}
        columns={columns}
        data={inventoryList}
        isLoading={false}
        onPageChange={(page) => setParams({ ...params, page })}
        setLimit={(limit) => setParams({ ...params, limit })}
        onSortChange={handleSortChange}
      />
    </>
  );
};

export default InventoryManagement;
