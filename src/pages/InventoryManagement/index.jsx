import React, { useEffect, useState } from 'react';
import { Tooltip } from 'react-tooltip';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { debounce } from 'lodash';

import deleteIcon from '../../assets/images/delete.svg';
import editIcon from '../../assets/images/edit.svg';
import viewIcon from '../../assets/images/eye.svg';
import showHideIcon from '../../assets/images/eye-close.svg';
import downloadIcon from '../../assets/images/download.svg';

import '../../assets/scss/usermanagement.scss';

import CommonHeader from '../../components/common/CommonHeader';
import CustomTable from '../../components/common/CustomTable';
import useInventoryStore from '../../stores/InventoryReducer';
import { downloadContent } from '../../helpers/utils';
import CustomActionModal from '../../components/common/CustomActionModal';
import InventoryView from './InventoryView';
import CommonSkeleton from '../../components/common/CommonSkeleton';
import { Spinner } from 'react-bootstrap';
import ImageCell from './ImageCell';
import { getInventoryColumns } from './getInventoryColumns';
import useSubCategoryReducer from '../../stores/SubCategoryReducer';

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
    showHide,
    exportInventory,
    isExportLoading,
    bulkUploadFiles,
    isUploading,
  } = useInventoryStore((state) => state);
  const {
    getAllCategory,
    getCategory,
    isLoadingCat,
    getAllSubCategory,
    subCategories,
    clearSubCategoryData
  } = useSubCategoryReducer((state) => state);
  const navigate = useNavigate();

  const [modalConfig, setModalConfig] = useState({
    type: null,
    action: null,
    name: null,
  });
  const [modal, setModal] = useState(null);

  const initialParams = {
    search: '',
    page: 1,
    limit: 10,
    fromDate: null,
    toDate: null,
    sortBy: 'createdAt',
    sortOrder: 'DESC',
    isExcelExport: 'false',
  };

  const [params, setParams] = useState(initialParams);

  useEffect(() => {
    getCategory();
  }, []);

  useEffect(() => {
    getInventoryList(params);
  }, [params]);
  console.log(' params', params);

  const handleSortChange = (selector) => {
    setParams((prevParams) => ({
      ...prevParams,
      sortBy: selector,
      sortOrder: prevParams.sortOrder === 'ASC' ? 'DESC' : 'ASC',
    }));
  };
  const handleRowClick = (row) => {
    setModal({ mode: 'VIEW', id: row.id });
    getItemById(row.id);
  };
  // const [imageLoading, setimageLoading] = useState(true);
  const [downloadingRowId, setDownloadingRowId] = useState(null);
  // const [hasError, setHasError] = useState(false);
  const columns = getInventoryColumns({
    showAction: true,
    setModal,
    getItemById,
    navigate,
    setModalConfig,
    downloadContent,
    viewIcon,
    editIcon,
    showHideIcon,
    deleteIcon,
    downloadIcon,
    downloadingRowId,
    setDownloadingRowId,
  });

  const handleExcelUpload = (files, onClose) => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('file', file);
    });

    bulkUploadFiles(formData, params, onClose);
  };

  const closeModal = () => {
    setModalConfig({ type: null, action: null, name: null });
  };

  const renderMessage = () => {
    switch (modalConfig.type) {
      case 'delete':
        return `Are you sure you want to delete item ${modalConfig.name} ?`;
      case 'show':
        return `Are you sure you want to hide item ${modalConfig.name}?`;
      case 'hide':
        return `Are you sure you want to show item ${modalConfig.name}?`;
      default:
        break;
    }
  };

  const renderModal = () => (
    <CustomActionModal
      closeModal={closeModal}
      isLoading={isLoading}
      message={renderMessage()}
      onSubmit={async () => {
        if (!modalConfig.id) return;

        try {
          switch (modalConfig.type) {
            case 'delete':
              await deleteItemById(modalConfig.id, params);
              break;
            case 'show':
              await showHide(modalConfig.id, false, params);
              break;
            case 'hide':
              await showHide(modalConfig.id, true, params);
              break;
            default:
              break;
          }
          setModalConfig({ type: null, action: null, name: null });
        } catch (error) {
          console.error('Error in modal action:', error);
        }
      }}
      showModal={modalConfig.type}
      isDelete={modalConfig.type === 'delete'}
      isWarning={modalConfig.type === 'show' || modalConfig.type === 'hide'}
    />
  );

  const debouncedSearch = debounce((searchValue) => {
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
      fieldName: 'Category',
      BE_keyName: 'category',
      fieldType: 'select',
      Options: getAllCategory?.map((item) => ({
        label: item.name,
        value: item.id,
      })),
      callBack: (value) => {
        if (value) {
          clearSubCategoryData();
          getAllSubCategory(value);
        }
      },
    },
    {
      fieldName: 'Sub Category',
      isLoading: isLoadingCat,
      BE_keyName: 'subcategory',
      fieldType: 'select',
      Options: subCategories?.map((item) => ({
        label: item.name,
        value: item.id,
      })),
      noOptionsMessage: 'Select a category first',
    },
    {
      fieldName: 'PartsFound',
      BE_keyName: 'hasParts',
      fieldType: 'radio',
      Options: ['Yes', 'No'],
    },
    {
      fieldName: 'Created Date',
      fieldType: 'dateRangeCombined',
      fromKey: 'fromDate',
      toKey: 'toDate',
    },
  ];
  const exportExcel = async () => {
    exportInventory(params);
  };
  return (
    <>
      {renderModal()}
      <CommonHeader
        exportExcel={inventoryList?.length ? exportExcel : null}
        exportLoading={isExportLoading}
        uploadExcel
        uploadLoading={isUploading}
        onExcelUpload={handleExcelUpload}
        uploadTitle="Bulk Upload Inventory"
        addButton={{
          name: 'Add Item',
          type: 'link',
          path: '/inventory-management/add',
        }}
        onSearch={debouncedSearch}
        filterOptions={filterOptions}
        type="inventory"
        submitFilter={(filters) => {
          const { fromDate, toDate, ...rest } = filters;

          setParams({
            ...params,
            ...rest,
            fromDate: fromDate ? moment(fromDate).format('YYYY-MM-DD') : null,
            toDate: toDate ? moment(toDate).format('YYYY-MM-DD') : null,
            page: '1',
          });
        }}
        clearOptions={() => {
          setParams(initialParams);
        }}
      />
      <CustomTable
        pagination={{ currentPage: params.page, limit: params.limit }}
        count={pagination.totalRecords}
        columns={columns}
        data={inventoryList}
        isLoading={isListLoading}
        onPageChange={(page) => setParams({ ...params, page })}
        setLimit={(limit) => setParams({ ...params, limit })}
        onSortChange={handleSortChange}
        wrapClasses="inventory-table-wrap"
        onRowClick={handleRowClick}
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
