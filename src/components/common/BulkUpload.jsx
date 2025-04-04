// components/BulkUpload.jsx
import React, { useRef, useState } from 'react';
import * as XLSX from 'xlsx';

import Upload__icon from '../../assets/images/Upload__icon.svg';
import CustomModal from './CustomModal';
import { Spinner } from 'react-bootstrap';
import { handleDownloadSample } from '../../config/config';

const BulkUpload = ({
  show,
  onClose,
  uploadTitle = '',
  onExcelUpload,
  uploadLoading,
}) => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploadError, setUploadError] = useState(null);
  const fileInputRef = useRef(null);

  const maxSize = 5 * 1024 * 1024; // 5MB
  const validTypes = ['.xlsx', '.xls'];

  const validateAndSetFiles = (files) => {
    setUploadError(null);
    const validFiles = [];
    const errors = [];

    Array.from(files).forEach((file) => {
      const ext = '.' + file.name.split('.').pop().toLowerCase();

      if (!validTypes.includes(ext)) {
        errors.push(`${file.name} is not a supported format.`);
      } else if (file.size > maxSize) {
        errors.push(`${file.name} exceeds 5MB.`);
      } else {
        validFiles.push(file);
      }
    });

    if (errors.length) {
      setUploadError(errors.join(' '));
    }

    if (validFiles.length) {
      setUploadedFiles(validFiles);
    }
  };

  const handleFileUpload = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      validateAndSetFiles(files);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer.files.length > 0) {
      validateAndSetFiles(e.dataTransfer.files);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const clearUpload = () => {
    setUploadedFiles([]);
    setUploadError(null);
  };

  const onUploadSubmit = async () => {
    if (!uploadedFiles.length) {
      setUploadError('Upload at least one file.');
      return;
    }

    try {
      const readFileAsJson = (file) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();

          reader.onload = (e) => {
            try {
              const workbook = XLSX.read(e.target.result, { type: 'array' }); // Updated
              const sheetName = workbook.SheetNames[0];
              const worksheet = workbook.Sheets[sheetName];
              const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
              resolve({ fileName: file.name, data });
            } catch (err) {
              reject(`Error processing ${file.name}`);
            }
          };

          reader.onerror = () => reject(`Failed to read ${file.name}`);
          reader.readAsArrayBuffer(file);
        });

      const allFilesData = await Promise.all(
        uploadedFiles?.map(readFileAsJson)
      );

      onExcelUpload(allFilesData);
      onClose();
    } catch (error) {
      setUploadError(error.toString());
    }
  };

  const renderUploadBody = () => (
    <>
      <div
        className="modal-body"
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
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

        <ul className="uploaded-files-list">
          {uploadedFiles.map((file, i) => (
            <li key={i}>{file.name}</li>
          ))}
        </ul>

        <input
          type="file"
          ref={fileInputRef}
          multiple
          accept=".xlsx, .xls"
          style={{ display: 'none' }}
          onChange={handleFileUpload}
        />

        <button
          className="download-btn"
          type="button"
          onClick={handleDownloadSample}
        >
          <span className="dwnld-ico"></span>Download sample excel template
        </button>
      </div>

      <div className="modal-footer bottom-btn-sec">
        <button type="button" className="btn btn-cancel" onClick={clearUpload}>
          Clear
        </button>
        <button
          type="submit"
          className="btn btn-submit"
          onClick={onUploadSubmit}
        >
          {uploadLoading ? (
            <Spinner
              size="sm"
              as="span"
              animation="border"
              variant="light"
              aria-hidden="true"
              className="custom-spinner"
            />
          ) : (
            ' Submit  '
          )}
        </button>
      </div>
    </>
  );

  return (
    <CustomModal
      closeButton
      className="modal fade upload-modal"
      dialgName="modal-dialog modal-dialog-centered"
      show={show}
      closeModal={onClose}
      header={
        <h5 className="modal-title" id="uploadModalLabel">
          {uploadTitle}
        </h5>
      }
      contentClassName="modal-content"
      body={renderUploadBody()}
    />
  );
};

export default BulkUpload;
