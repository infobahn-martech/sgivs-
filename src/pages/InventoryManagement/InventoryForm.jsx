import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import Select from 'react-select';

import '../../assets/scss/add-inventory.scss';

import userIcon from '../../assets/images/pro-pic.svg';
import barcodeIcon from '../../assets/images/barcode.svg';
import closMarkIcon from '../../assets/images/close-mark.svg';
import Close_LGIcon from '../../assets/images/Close_LG.svg';
import Upload__icon from '../../assets/images/Upload__icon.svg';
import CustomSelect from '../../components/common/CustomSelect';

const InventoryForm = () => {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    clearErrors,
    setError,
    getValues
  } = useForm({
    defaultValues: {
      addPart: false,
      parts: []
    }
  });

  console.log((getValues('quantity')))

  // Use useFieldArray for dynamic parts management
  const { fields, append, remove } = useFieldArray({
    control,
    name: "parts"
  });

  console.log(' errors', errors);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [newPart, setNewPart] = useState('');
  const [customError, setCustomError] = useState({});
  const isAddPartChecked = watch('addPart', false);

  useEffect(() => {
    if (!isAddPartChecked) {
      remove(); // Clear parts when checkbox is unchecked
    }
  }, [isAddPartChecked, remove]);

  const allowedTypes = ['image/jpeg', 'image/png'];
  // Handle Drag & Drop
  const handleDrop = (e) => {
    e.preventDefault();
    handleFileUpload(Array.from(e.dataTransfer.files));
  };

  const handleFileSelect = (e) => {
    handleFileUpload(Array.from(e.target.files));
  };

  // Handle File Upload Logic
  const handleFileUpload = (files) => {
    let newFiles = [...uploadedFiles];

    for (let file of files) {
      if (!allowedTypes.includes(file.type)) {
        setError('fileUpload', {
          type: 'manual',
          message: 'Only JPEG and PNG files are allowed.',
        });
        return;
      }

      if (newFiles.length >= 5) {
        setError('fileUpload', {
          type: 'manual',
          message: 'You can upload a maximum of 5 images.',
        });
        return;
      }

      newFiles.push(file);
    }

    setUploadedFiles(newFiles);
    clearErrors('fileUpload');
  };

  // Handle File Removal
  const handleRemoveFile = (index) => {
    const newFiles = uploadedFiles.filter((_, i) => i !== index);
    setUploadedFiles(newFiles);
    if (newFiles.length === 0)
      setError('fileUpload', {
        type: 'manual',
        message: 'At least one image is required.',
      });
  };
  // Custom Select Options
  const quantityOptions = Array.from({ length: 10 }, (_, i) => ({
    value: (i + 1).toString(),
    label: `${i + 1}`,
  }));

  // Handle Add Part
  const handleAddPart = () => {
    if (newPart.trim()) {
      // Check for duplicate parts (case-insensitive)
      const isDuplicate = fields.some(
        field => field.value.trim().toLowerCase() === newPart.trim().toLowerCase()
      );

      if (isDuplicate) {
        setCustomError({ parts: 'This part is already added!' });
        return;
      }

      // Add the part using useFieldArray
      append({ value: newPart.trim() });
      setNewPart('');
      const tempError = { ...customError };
      delete tempError.parts;
      setCustomError(tempError);
    }
  };

  // Handle Remove Part
  const handleRemovePart = (index) => {
    remove(index);
  };

  // Handle Form Submission
  const onSubmit = (data) => {
    console.log(' data', data);
    // If addPart is not checked, ensure parts array is empty
    if (data.addPart && (!data.parts || data.parts.length === 0)) {
      setError('parts', {
        type: 'manual',
        message: 'At least one part is required when "Add Part" is checked'
      });
      return;
    }

    console.log('Form Data:', data);
    console.log('Uploaded File:', uploadedFiles);
    console.log('Parts:', data.parts);
    alert('Form Submitted Successfully!');
  };

  return (
    <form
      className="add-inventory common-layout"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="profile-title">
        <span className="pro-pic">
          <img src={userIcon} alt="pro-pic" />
        </span>
        <span>Add Inventory</span>
      </div>

      <div className="inventory-box inner-layout">
        <div className="inner-sec">
          <div className="form">
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="itemName" className="form-label">
                  Item Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="itemName"
                  placeholder="Enter Item Name Here"
                  {...register('itemName', {
                    required: 'Item Name is required',
                  })}
                />
                {errors.itemName && (
                  <p className="error">{errors.itemName.message}</p>
                )}
              </div>

              <div className="col-md-6">
                <label htmlFor="quantity" className="form-label">
                  Quantity
                </label>
                <CustomSelect
                  className="form-select form-control"
                  options={quantityOptions}
                  onChange={(selectedOption) => {
                    setValue('quantity', selectedOption);
                    clearErrors('quantity')
                  }}
                  name='quantity'
                  {...register('quantity', {
                    required: 'Quantity is required',
                  })}
                />
                {errors.quantity && (
                  <p className="error">{errors.quantity.message}</p>
                )}
              </div>
            </div>

            {/* Drag & Drop Upload Box */}
            <div className="mb-3">
              <label className="form-label">Upload Image</label>
              <div
                className="upload-box"
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
              >
                <div className="upload-ico">
                  <img src={Upload__icon} alt="upload-ico" />
                </div>
                <p className="txt">
                  Drag & drop files or{' '}
                  <label
                    htmlFor="fileUpload"
                    className="browse-link cursor-pointer"
                  >
                    Browse
                  </label>
                </p>
                <input
                  type="file"
                  id="fileUpload"
                  style={{ display: 'none' }}
                  accept="image/jpeg, image/png"
                  multiple
                  onChange={handleFileSelect}
                />
                <span className="btm-txt">
                  Supported formats: JPEG, PNG (Max: 5 images)
                </span>
              </div>
              {errors.fileUpload && (
                <p className="error">{errors.fileUpload.message}</p>
              )}

              {/* Display Uploaded Images */}
              {uploadedFiles.length > 0 && (
                <div className="uploaded-files d-flex">
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="file-preview">
                      <span className="pt-2">{file.name}</span>
                      <button
                        type="button"
                        className="btn close-btn"
                        onClick={() => handleRemoveFile(index)}
                      >
                        <span className="plus">
                          <img src={closMarkIcon} alt="Remove image" />
                        </span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="itemId" className="form-label">
                  Item Id
                </label>
                <input
                  type="text"
                  className="form-control cursor-not"
                  id="itemId"
                  value="#54885658"
                  readOnly
                />
              </div>
              <div className="col-md-4 d-flex align-items-end">
                <button type="button" className="btn generate-btn">
                  <span className="bar-code">
                    <img src={barcodeIcon} alt="bar-code" />
                  </span>
                  Generate Barcode
                </button>
              </div>
            </div>

            {/* Add Part Checkbox */}
            <div className="mb-3">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="addPart"
                  {...register('addPart')}
                />
                <label className="form-check-label" htmlFor="addPart">
                  Add Part
                </label>
              </div>
            </div>

            {/* Dynamic Part Fields */}
            {isAddPartChecked && (
              <div id="partFields" className="mb-3">
                <label htmlFor="partPopupTitle" className="form-label">
                  Part Pop-up Title
                </label>
                <div className="part-sec">
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Part Pop-up Title"
                    value={newPart}
                    onChange={(e) => {
                      setNewPart(e.target.value);
                      const temp = { ...customError };
                      delete temp.parts;
                      setCustomError(temp);
                    }}
                  />
                  {customError.parts && (
                    <p className="error mt-5 pt-4">{customError.parts}</p>
                  )}
                  <button
                    type="button"
                    className="btn add-btn"
                    onClick={handleAddPart}
                  >
                    <span className="plus">
                      <img src={Close_LGIcon} alt="Add Part" />
                    </span>{' '}
                    Add Part
                  </button>
                </div>

                {fields.map((field, index) => (
                  <div className="part-sec part-sec1" key={field.id}>
                    <input
                      type="text"
                      className="form-control mb-2"
                      value={field.value}
                      readOnly
                    />
                    <button
                      type="button"
                      className="btn close-btn"
                      onClick={() => handleRemovePart(index)}
                    >
                      <span className="plus">
                        <img src={closMarkIcon} alt="Remove Part" />
                      </span>
                    </button>
                  </div>
                ))}
                 {errors.parts && (
            <p className="error">{errors.parts.message}</p>
          )}
              </div>
            )}
          </div>
        </div>

        <div className="bottom-btn-sec">
          <button
            type="button"
            className="btn btn-cancel"
            onClick={() => window.location.reload()}
          >
            Clear
          </button>
          <button type="submit" className="btn btn-submit">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default InventoryForm;