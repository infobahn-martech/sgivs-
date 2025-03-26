import React, { useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import * as XLSX from 'xlsx';

import { headerConfig } from '../../config/config';
import filterImg from '../../assets/images/sort.svg';
import exportIcon from '../../assets/images/export-excel.svg';
import upload from '../../assets/images/upload-excel.svg';

const CommonHeader = ({
  exportExcel,
  uploadExcel,
  onExcelUpload,
  addButton,
  hideRightSide = false,
}) => {
  const location = useLocation();
  const fileInputRef = useRef(null);

  const currentPath = location.pathname;

  const headerInfo = headerConfig?.find((item) =>
    currentPath?.startsWith(item.path)
  ) || {
    title: 'Page Not Found',
    icon: 'img/default.svg',
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const workbook = XLSX.read(e.target.result, { type: 'binary' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];

          // Convert worksheet to JSON
          const excelData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

          // Optional: Remove header row if needed
          const processedData = excelData;

          // Call the callback if provided
          if (onExcelUpload) {
            onExcelUpload(processedData);
          } else {
            console.log('Uploaded Excel data:', processedData);
          }
        } catch (error) {
          console.error('Error processing Excel file:', error);
        }
      };
      reader.readAsBinaryString(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const renderAddButton = (type) => {
    switch (type) {
      case 'link':
        return (
          <Link to={addButton.path} className="btn export">
            {addButton.name}
          </Link>
        );
      case 'button':
        return (
          <button className="btn export" onClick={addButton.action}>
            {addButton.name}
          </button>
        );
      default:
        return (
          <button className="btn export" onClick={addButton.action}>
            {addButton.name}
          </button>
        );
    }
  };

  return (
    <div className="table-header-wrap">
      <div className="left-wrap">
        <div className="icon-title">
          <img src={headerInfo?.icon} alt="" className="img" />
          <span>{headerInfo?.title}</span>
        </div>
      </div>
      {!hideRightSide && (
        <div className="right-wrap">
          <div className="search-wrap">
            <input type="text" className="txt" placeholder="Search Controls" />
          </div>
          <div className="filter-wrap">
            <span>Filter</span>
            <img src={filterImg} alt="" className="img" />
          </div>
          <div className="button-wrap">
            {exportExcel && (
              <button className="btn export">
                <img src={exportIcon} alt="" className="img" />{' '}
                <span>Export as Excel</span>
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
                <button className="btn upload" onClick={triggerFileInput}>
                  <img src={upload} alt="" className="img" />{' '}
                  <span>Upload Excel</span>
                </button>
              </>
            )}
            {addButton && renderAddButton(addButton.type)}
          </div>
        </div>
      )}
    </div>
  );
};

export default CommonHeader;
