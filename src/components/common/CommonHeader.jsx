import React, { useRef } from 'react';
import { useLocation } from 'react-router-dom';
import * as XLSX from 'xlsx';
import { headerConfig } from '../../config/config';
import filterImg from '../../assets/images/sort.svg';

const CommonHeader = ({ exportExcel, uploadExcel, onExcelUpload }) => {
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
          alert('Failed to process the Excel file. Please check the file format.');
        }
      };
      reader.readAsBinaryString(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="table-header-wrap">
      <div className="left-wrap">
        <div className="icon-title">
          <img src={headerInfo?.icon} alt="" className="img" />
          <span>{headerInfo?.title}</span>
        </div>
      </div>
      <div className="right-wrap">
        <div className="search-wrap">
          <input type="text" className="txt" placeholder="Search Controls" />
        </div>
        <div className="filter-wrap">
          <span>Filter</span>
          <img src={filterImg} alt="" className="img" />
        </div>

        {exportExcel && (
          <button className="btn btn-primary">Export As Excel</button>
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
              className="btn btn-primary" 
              onClick={triggerFileInput}
            >
              Upload Excel
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CommonHeader;