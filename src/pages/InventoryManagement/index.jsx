import React, { useEffect, useState } from 'react';
import { Tooltip } from 'react-tooltip';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { debounce } from 'lodash';

import deleteIcon from '../../assets/images/delete.svg';
import viewIcon from '../../assets/images/eye.svg';
import showHideIcon from '../../assets/images/eye-close.svg';
import editIcon from '../../assets/images/edit.svg';
import downloadIcon from '../../assets/images/download.svg';
import dummyImage from '../../assets/images/dummyIcon.svg';

import '../../assets/scss/usermanagement.scss';

import CommonHeader from '../../components/common/CommonHeader';
import CustomTable from '../../components/common/CustomTable';
import useInventoryStore from '../../stores/InventoryReducer';
import { downloadContent } from '../../helpers/utils';
import CustomActionModal from '../../components/common/CustomActionModal';
import InventoryView from './InventoryView';
import CommonSkeleton from '../../components/common/CommonSkeleton';

const InventoryManagement = () => {
  const {
    getInventoryList,
    inventoryList,
    pagination,
    deleteItemById,
    isLoading,
    isListLoading,
    getItemById,
    inventoryItem,
  } = useInventoryStore((state) => state);
  const navigate = useNavigate();
  console.log(' inventoryList', inventoryList);
  const [modalConfig, setModalConfig] = useState({ type: null, action: null });
  const [modal, setModal] = useState(null);

  const initialParams = {
    search: '',
    page: '1',
    limit: '10',
    fromDate: null,
    toDate: null,
    sortBy: 'createdAt',
    sortOrder: 'DESC',
  };

  const [params, setParams] = useState(initialParams);

  useEffect(() => {
    getInventoryList(params);
  }, [params]);

  const handleSortChange = (selector) => {
    setParams((prevParams) => ({
      ...prevParams,
      sortBy: selector,
      sortOrder: prevParams.sortOrder === 'ASC' ? 'DESC' : 'ASC',
    }));
  };

  const [imageLoading, setimageLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const columns = [
    {
      name: 'Image',
      selector: 'image',
      titleClasses: 'tw1',
      contentClass: '',
      cell: (row) => (
        <figure className="in-img">
          {/* Skeleton Loader */}
          {imageLoading && <CommonSkeleton height={40} />}

          {/* Image */}
          <img
            src={hasError || !row.images[0] ? dummyImage : row.images[0]}
            alt="Item"
            className="img"
            onLoad={() => setimageLoading(false)}
            onError={() => {
              setimageLoading(false);
              setHasError(true);
            }}
            style={{ display: imageLoading ? 'none' : 'block' }}
          />
        </figure>
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
      name: 'EZ Pass Number',
      selector: 'eZPassNumber',
      titleClasses: 'tw1',
      contentClass: 'user-pic',
      cell: (row) =>
        row?.eZPassNumber && row.eZPassNumber !== 'null'
          ? row.eZPassNumber
          : '-',
    },
    // {
    //   name: 'Quantity Available',
    //   selector: 'quantity',
    //   titleClasses: 'tw1',
    //   contentClass: 'user-pic',
    // },
    // {
    //   name: 'Quantity Available After Borrowing',
    //   selector: 'quantityAvailable',
    //   titleClasses: 'tw1',
    //   contentClass: 'user-pic',
    // },
    {
      name: 'Item Created date',
      selector: 'createdAt',
      titleClasses: 'tw1',
      contentClass: 'user-pic',
      cell: (row) => moment(row.createdAt).format('DD MMM, YYYY'),
      // sort: true,
    },
    {
      name: 'Have Parts',
      selector: 'haveParts',
      titleClasses: 'tw1',
      contentClass: 'user-pic',
      cell: (row) => <span>{row.hasParts ? 'Yes' : 'No'}</span>,
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
            }}
          />
          <span
            data-tooltip-id={`tooltip-${row.id || rowIndex}`} // Unique ID for the tooltip
            data-tooltip-content={'View'} // Tooltip content
            onClick={() => {
              setModal({ id: row.id, mode: 'VIEW' });
              getItemById(row.id);
            }}
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
          {/* <span
            data-tooltip-id={`tooltip-${row.id || rowIndex}`} // Unique ID for the tooltip
            data-tooltip-content={'Hide/Show'} // Tooltip content
            onClick={() => setModalConfig({ id: row.id, type: 'show' })}
          >
            <img src={showHideIcon} alt="Hide/Show" />
          </span> */}
          <span
            data-tooltip-id={`tooltip-${row.id || rowIndex}`} // Unique ID for the tooltip
            data-tooltip-content={'Delete'} // Tooltip content
            onClick={() => setModalConfig({ id: row.id, type: 'delete' })}
          >
            <img src={deleteIcon} alt="Delete" />
          </span>
          <span
            data-tooltip-id={`tooltip-${row.id || rowIndex}`} // Unique ID for the tooltip
            data-tooltip-content={'Download Barcode'} // Tooltip content
            onClick={() => {
              downloadContent(row.barcode, `${row.itemId}.png`);
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
        return 'Are you sure you want to delete this item?';
      case 'show':
        return 'Are you sure you want to show this item?';
      case 'hide':
        return 'Are you sure you want to hide this item?';
      default:
        break;
    }
  };
  const renderModal = () => (
    <CustomActionModal
      closeModal={closeModal}
      isLoading={isLoading}
      message={renderMessage()}
      onSubmit={() => {
        switch (modalConfig.type) {
          case 'delete':
            deleteItemById(modalConfig.id, params);
            break;
          case 'show':
            break;
          case 'hide':
            break;

          default:
            break;
        }
        setModalConfig({ type: null, action: null });
      }}
      showModal={modalConfig.type}
      isDelete={modalConfig.type === 'delete'}
    />
  );

  const debouncedSearch = debounce((searchValue) => {
    console.log(' searchValue', searchValue);
    setParams((prevParams) => ({
      ...prevParams,
      search: searchValue,
      page: 1,
    }));
  }, 500);

  const filterOptions = [
    {
      fieldName: 'Visibility',
      BE_keyName: 'isVisible',
      fieldType: 'select',
      Options: [
        { label: 'Shown', value: true },
        { label: 'Hidden', value: false },
      ],
    },
    {
      fieldName: 'PartsFound',
      BE_keyName: 'hasParts',
      fieldType: 'radio',
      Options: ['Yes', 'No'],
    },
    {
      showDateRange: true,
    },
  ];

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
        onSearch={debouncedSearch}
        filterOptions={filterOptions}
        submitFilter={(filters) => {
          const { startDate, endDate, ...rest } = filters;

          setParams({
            ...params,
            ...rest,
            fromDate: startDate ? moment(startDate).format('YYYY-MM-DD') : null,
            toDate: endDate ? moment(endDate).format('YYYY-MM-DD') : null,
            // page: '1',
          });
        }}
        clearOptions={() => {
          setParams(initialParams);
        }}
      />
      <CustomTable
        pagination={pagination}
        count={pagination.totalRecords}
        columns={columns}
        data={inventoryList}
        isLoading={isListLoading}
        onPageChange={(page) => setParams({ ...params, page })}
        setLimit={(limit) => setParams({ ...params, limit })}
        onSortChange={handleSortChange}
        wrapClasses="inventory-table-wrap"
      />
      {modal?.mode === 'VIEW' && (
        <InventoryView
          showModal={modal}
          closeModal={() => setModal(null)}
          inventoryItem={inventoryItem}
        />
      )}
    </>
  );
};

export default InventoryManagement;
