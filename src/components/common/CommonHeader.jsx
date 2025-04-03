import React, { useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import * as XLSX from 'xlsx';
import { Spinner } from 'react-bootstrap';

import '../../assets/scss/modal.scss';

import { headerConfig } from '../../config/config';
import filterImg from '../../assets/images/sort.svg';
import exportIcon from '../../assets/images/export-excel.svg';
import upload from '../../assets/images/upload-excel.svg';
import Upload__icon from '../../assets/images/Upload__icon.svg';
import addIcon from '../../assets/images/add-icon.svg';
import searchIcon from '../../assets/images/blue-search-icon.svg';
import CustomModal from './CustomModal';
import Filter from './Filter';

const CommonHeader = ({
  exportExcel,
  uploadExcel,
  onExcelUpload,
  addButton,
  hideRightSide = false,
  onSearch,
  uploadTitle = '',
  exportLoading,
  hideFilter,
  filterOptions,
  submitFilter,
  clearOptions,
}) => {
  const [searchInput, setSearchInput] = useState('');
  const [openUpload, setOpenUpload] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  // const [showFilterModal, setShowFilterModal] = useState(false);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchInput(value);
    onSearch(value); // Pass value to parent component after delay
  };

  const location = useLocation();
  const fileInputRef = useRef(null);

  const currentPath = location.pathname;

  const headerInfo = headerConfig?.find(
    (item) =>
      currentPath === item.path ||
      (currentPath !== '/' &&
        currentPath?.startsWith(item.path) &&
        item.path !== '/')
  ) ||
    headerConfig.find((item) => currentPath?.startsWith(item.path)) || {
      title: 'Page Not Found',
      icon: 'img/default.svg',
    };

  const renderAddButton = (type) => {
    switch (type) {
      case 'link':
        return (
          <Link to={addButton.path} className="btn add">
            <img src={addIcon} alt="" className="img" />{' '}
            <span>{addButton?.name}</span>
          </Link>
        );
      case 'button':
        return (
          <button
            type="button"
            className="btn export"
            onClick={addButton?.action}
          >
            <img src={addIcon} alt="" className="img" /> {addButton?.name}
          </button>
        );
      default:
        return (
          <button
            type="button"
            className="btn export"
            onClick={addButton.action}
          >
            <img src={addIcon} alt="" className="img" /> {addButton?.name}
          </button>
        );
    }
  };

  const handleFileUpload = (event) => {
    setUploadError('');
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      const validTypes = ['.xlsx', '.xls'];
      const fileExtension = '.' + file?.name.split('.').pop()?.toLowerCase();

      if (!validTypes.includes(fileExtension)) {
        setUploadError(
          `Invalid file type. Please upload ${validTypes?.join(', ')} files.`
        );
        return;
      }
      setUploadedFile(file);
    }
  };

  const onUploadSubmit = () => {
    if (!uploadedFile) {
      setUploadError('Upload a file first!');
      return;
    }
    const file = uploadedFile;

    // Optionally add file size validation
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      setUploadError('File is too large. Maximum file size is 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const workbook = XLSX.read(e.target.result, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        // Convert worksheet to JSON
        const excelData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        // Call the callback if provided
        if (onExcelUpload) {
          onExcelUpload(excelData);
        } else {
          console.log('Uploaded Excel data:', excelData);
        }

        setOpenUpload(false);
      } catch (error) {
        console.error('Error processing Excel file:', error);
        setUploadError('Failed to process the Excel file. Please try again.');
      }
    };
    reader.readAsBinaryString(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (uploadExcel && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      const fileInput = fileInputRef.current;

      // Create a new FileList
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      fileInput.files = dataTransfer.files;

      // Trigger file upload
      handleFileUpload({ target: fileInput });
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const renderUploadBody = () => (
    <>
      <div
        className="modal-body"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="drop-zone upload-box" onClick={triggerFileInput}>
          <div className="upload-ico">
            <img src={Upload__icon} alt="upload-ico" />
          </div>
          <p className="txt">
            Drag & drop files or{' '}
            <a
              href="#"
              className="browse-link"
              onClick={(e) => e.preventDefault()}
            >
              Browse
            </a>
          </p>
          <span className="btm-txt">Supported formats: xlsx, xls</span>
        </div>
        {uploadError && <p className="error">{uploadError}</p>}
        <span>{uploadedFile?.name}</span>
        <input
          type="file"
          ref={fileInputRef}
          accept=".xlsx, .xls"
          style={{ display: 'none' }}
          onChange={handleFileUpload}
        />
        <button className="download-btn">
          <span className="dwnld-ico"></span>Download sample excel template
        </button>
      </div>
      <div className="modal-footer bottom-btn-sec">
        <button
          type="button"
          className="btn btn-cancel"
          onClick={() => {
            setUploadError(null);
            setUploadedFile(null);
          }}
        >
          Clear
        </button>
        <button
          type="submit"
          className="btn btn-submit"
          onClick={onUploadSubmit}
        >
          Submit
        </button>
      </div>
    </>
  );

  const closeUpload = () => {
    setOpenUpload(false);
    setUploadedFile(null);
    setUploadError(null);
  };
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [savedFilters, setSavedFilters] = useState({});
  const [isFilterApplied, setIsFilterApplied] = useState(false);

  const handleSubmitFilter = (filters) => {
    setSavedFilters(filters); // Persist applied filters
    setIsFilterApplied(true);
    setShowFilterModal(false); // Close modal
    submitFilter(filters); // existing logic
  };

  const handleClearOptions = () => {
    setSavedFilters({}); // Clear applied filters
    setIsFilterApplied(false);
    clearOptions(); // existing logic
  };

  const renderUploadModal = () => (
    <CustomModal
      closeButton
      className="modal fade upload-modal"
      dialgName="modal-dialog modal-dialog-centered"
      show={openUpload}
      closeModal={closeUpload}
      header={
        <h5 className="modal-title" id="uploadModalLabel">
          {uploadTitle}
        </h5>
      }
      contentClassName="modal-content"
      body={renderUploadBody()}
    />
  );

  return (
    <>
      {renderUploadModal()}
      <div className="table-header-wrap">
        {headerInfo.path !== '/' ? (
          <div className="left-wrap">
            <div className="icon-title">
              <img src={headerInfo?.icon} alt="" className="img" />
              <span>{headerInfo?.title}</span>
            </div>
          </div>
        ) : (
          <div className="cta-info-blk p-0">
            <div className="board-info">
              <div className="icon-blk">
                <img src={headerInfo?.icon} alt="" />
              </div>
              <span className="txt">{headerInfo?.title}</span>
            </div>
          </div>
        )}
        {!hideRightSide && (
          <div className="right-wrap">
            <div className="search-wrap">
              <input
                type="text"
                className="txt"
                placeholder="Search"
                value={searchInput}
                onChange={handleSearchChange}
              />
              <button class="btn">
                <img src={searchIcon} alt="" />
              </button>
            </div>
            {!hideFilter && (
              <div className="filter-wrap dropdown">
                <a
                  className="dropdown-toggle "
                  role="button"
                  onClick={() => setShowFilterModal((prev) => !prev)}
                >
                  <span>
                    Filter{' '}
                    {isFilterApplied && (
                      <small className="text-danger dots">●</small>
                    )}
                  </span>
                  <img src={filterImg} alt="" className="img" />
                </a>
                {showFilterModal && (
                  <Filter
                    clearOptions={handleClearOptions}
                    filterOptions={filterOptions}
                    submitFilter={handleSubmitFilter}
                    savedFilters={savedFilters}
                    isFilterApplied={isFilterApplied}
                    onCancel={() => setShowFilterModal(false)} // Close on Cancel
                    show={showFilterModal}
                  />
                )}
              </div>
            )}

            <div className="button-wrap">
              {exportExcel && (
                <button
                  type="button"
                  className="btn export"
                  onClick={exportExcel}
                  disabled={exportLoading}
                >
                  {!exportLoading && (
                    <img src={exportIcon} alt="" className="img" />
                  )}
                  <span>
                    {exportLoading ? (
                      <Spinner
                        size="sm"
                        as="span"
                        animation="border"
                        variant="light"
                        aria-hidden="true"
                        className="custom-spinner"
                      />
                    ) : (
                      'Export as Excel'
                    )}
                  </span>
                </button>
              )}

              {uploadExcel && (
                <>
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept=".xlsx, .xls"
                    style={{ display: 'none' }}
                    onChange={handleFileUpload}
                  />
                  <button
                    type="button"
                    className="btn upload"
                    onClick={() => setOpenUpload(true)}
                  >
                    <img src={upload} alt="" className="img" />{' '}
                    <span>Upload Excel</span>
                  </button>
                </>
              )}
              {addButton && renderAddButton(addButton?.type)}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CommonHeader;
