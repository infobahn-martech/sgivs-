import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import '../../assets/scss/add-inventory.scss';

import userIcon from '../../assets/images/pro-pic.svg';
import barcodeIcon from '../../assets/images/barcode.svg';
import closMarkIcon from '../../assets/images/close-mark.svg';
import Close_LGIcon from '../../assets/images/Close_LG.svg';
import Upload__icon from '../../assets/images/Upload__icon.svg';
import CustomSelect from '../../components/common/CustomSelect';

import useInventoryStore from '../../stores/InventoryReducer';
import useAlertReducer from '../../stores/AlertReducer';
import CustomActionModal from '../../components/common/CustomActionModal';

const InventoryForm = () => {
  const {
    createInventoryItem,
    isLoading,
    generateBarcode,
    barcodeId,
    getItemById,
    updateInventoryItem,
    inventoryItem,
    clearItemById,
    barcodeKey,
    isBarcodeLoading,
    redirectToList,
    set,
  } = useInventoryStore((state) => state);
  console.log(' inventoryItem', inventoryItem);
  const { error, clear } = useAlertReducer((state) => state);

  const params = useParams();
  const navigate = useNavigate();
  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    clearErrors,
    setError,
    reset,
  } = useForm({
    defaultValues: {
      addPart: false,
      parts: [],
    },
  });
  console.log(' errors', errors);

  // Use useFieldArray for dynamic parts management
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'parts',
  });

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [newPart, setNewPart] = useState('');
  const [customError, setCustomError] = useState({});
  const [modalConfig, setModalConfig] = useState({ type: null, action: null });

  useEffect(() => {
    clear();
    set({
      isLoading: false,
      barcodeId: null,
      inventoryItem: null,
      barcodeKey: null,
      isBarcodeLoading: false,
    });
  }, []);

  useEffect(() => {
    if (params?.id) getItemById(params.id);
    clearItemById();
  }, [params]);

  useEffect(() => {
    if (barcodeId) setValue('itemId', barcodeId);
  }, [barcodeId]);

  useEffect(() => {
    if (redirectToList) {
      navigate('/inventory-management'); // Replace with your desired route
      set({ redirectToList: false }); // Reset the redirect state
    }
  }, [redirectToList, navigate, set]);

  useEffect(() => {
    if (Object.keys(errors).length) {
      const hasParts = watch('addPart');
      const parts = watch('parts');
      if (hasParts && (!parts || parts.length === 0)) {
        setCustomError({
          parts: 'At least one part is required',
        });
      }

      if (uploadedFiles.length === 0)
        setError('fileUpload', {
          type: 'manual',
          message: 'At least one image is required.',
        });
      else clearErrors('fileUpload');
    }
  }, [
    // eslint-disable-next-line react-hooks/exhaustive-deps
    Object.keys(errors).length,
    errors,
    setError,
    uploadedFiles.length,
    clearErrors,
    watch,
  ]);

  useEffect(() => {
    if (inventoryItem) {
      setValue('itemId', inventoryItem.itemId);
      setValue('itemName', inventoryItem.itemName);
      setValue('addPart', inventoryItem.hasParts);
      if (
        inventoryItem.eZPassNumber &&
        (inventoryItem.eZPassNumber !== 'null' ||
          inventoryItem.eZPassNumber !== '')
      ) {
        setValue('isEZPass', true);
        setValue('plateNumber', inventoryItem.eZPassNumber);
      }
      if (inventoryItem.hasParts) {
        setValue('buttonLabel', inventoryItem.label);
        setValue(
          'parts',
          inventoryItem.inventory_parts.map((part) => ({
            value: part.partName,
          }))
        );
      }
      // setValue('quantity', '1');
      setUploadedFiles(inventoryItem.images || []);
    } else {
      reset();
      setUploadedFiles([]);
      setCustomError(null);
      setNewPart('');
    }
  }, [inventoryItem, setValue]);

  // watchers
  const isAddPartChecked = watch('addPart', false);
  const itemId = watch('itemId', null);
  // const parts = watch('parts', null);
  const isEZPass = watch('isEZPass', null);
  // console.log(' parts', parts);

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

      if (newFiles.length >= 10) {
        setError('fileUpload', {
          type: 'manual',
          message: 'You can upload a maximum of 10 images.',
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
  // const quantityOptions = Array.from({ length: 10 }, (_, i) => ({
  //   value: (i + 1).toString(),
  //   label: `${i + 1}`,
  // }));

  // Handle Add Part
  const handleAddPart = () => {
    if (newPart.trim()) {
      // Check for duplicate parts (case-insensitive)
      const isDuplicate = fields.some(
        (field) =>
          field.value.trim().toLowerCase() === newPart.trim().toLowerCase()
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
    if (data.hasParts && (!data.parts || data.parts.length === 0)) {
      setCustomError({
        parts: 'At least one part is required when "Add Part" is checked',
      });
      return;
    }

    if (uploadedFiles.length === 0)
      setError('fileUpload', {
        type: 'manual',
        message: 'At least one image is required.',
      });
    if (!barcodeId && itemId) {
      error('Please generate barcode before submit!');
      return;
    }
    console.log('data', data);

    // Validate parts when hasParts is true

    // Create FormData
    const formData = new FormData();

    // Append basic form fields
    formData.append('itemName', data.itemName);
    // formData.append('quantity', data.quantity.toString());
    formData.append('eZPassNumber', isEZPass ? data.plateNumber || null : null);
    formData.append('itemId', data.itemId);
    formData.append('hasParts', data.addPart.toString());
    formData.append('barcode', barcodeKey);
    formData.append('label', isAddPartChecked ? data.buttonLabel : null);

    // Append parts if added
    if (data.addPart && data.parts) {
      const parts = [];
      data.parts.forEach((part) => {
        console.log(' part', part);
        parts.push(part.value);
      });
      formData.append('parts', parts.join(','));
    }

    // Append files
    if (uploadedFiles.length) {
      uploadedFiles.forEach((file) => {
        formData.append(`images`, file);
      });
    }

    // Log FormData values
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    if (params.id) updateInventoryItem(formData, params.id);
    else createInventoryItem(formData);
  };

  const handleBarcode = () => {
    generateBarcode(itemId || null);
  };

  const renderMessage = () => {
    switch (modalConfig.type) {
      case 'clear':
        return 'Are you sure you want to clear this form?';
      case 'cancel':
        return 'Are you sure you want to cancel this and go back to listing?';

      default:
        break;
    }
  };

  const renderModal = () => (
    <CustomActionModal
      closeModal={() => setModalConfig({ type: null, action: null })}
      isLoading={isLoading}
      message={renderMessage()}
      button={{ primary: 'Yes', secondary: 'No' }}
      onSubmit={() => {
        switch (modalConfig.type) {
          case 'clear':
            reset();
            setCustomError(null);
            setNewPart('');
            setUploadedFiles([]);
            break;
          case 'cancel':
            reset();
            setCustomError(null);
            setNewPart('');
            setUploadedFiles([]);
            navigate('/inventory-management');
            break;
          default:
            break;
        }
        setModalConfig({ type: null, action: null });
      }}
      showModal={modalConfig.type}
      isWarning
    />
  );

  return (
    <>
      {renderModal()}
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

                {/* <div className="col-md-6">
                <label htmlFor="quantity" className="form-label">
                  Quantity
                </label>
                <CustomSelect
                  className="form-select form-control"
                  options={quantityOptions}
                  value={quantity}
                  onChange={() => {
                    // console.log(' selectedOption', selectedOption);
                    // setValue('quantity', selectedOption);
                    clearErrors('quantity');
                  }}
                  name="quantity"
                  {...register('quantity', {
                    required: 'Quantity is required',
                  })}
                />
                {errors.quantity && (
                  <p className="error">{errors.quantity.message}</p>
                )}
              </div> */}
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
                    Supported formats: JPEG, PNG (Max: 10 images)
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
                        <img
                          className="pt-2 pro-pic"
                          src={
                            file instanceof File
                              ? URL.createObjectURL(file)
                              : file
                          }
                          alt={`Uploaded file ${index + 1}`}
                          style={{ width: 75 }}
                        />
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
                    Item ID
                  </label>
                  <input
                    type="text"
                    className={`${
                      (barcodeId || params.id ? 'cursor-not' : '') +
                      ' form-control'
                    }`}
                    id="itemId"
                    readOnly={!!barcodeId || params?.id || isBarcodeLoading}
                    {...register('itemId', {
                      required: 'Item ID is required',
                    })}
                  />
                  {errors.itemId && (
                    <p className="error">{errors.itemId.message}</p>
                  )}
                </div>
                <div className="col-md-4 d-flex align-items-end pt-2">
                  <button
                    type="button"
                    className="btn generate-btn"
                    onClick={handleBarcode}
                  >
                    {!isBarcodeLoading && (
                      <span className="bar-code">
                        <img src={barcodeIcon} alt="bar-code" />
                      </span>
                    )}
                    {isBarcodeLoading ? 'Please wait...' : 'Generate Barcode'}
                  </button>
                </div>
              </div>

              {/* EZ pass Checkbox */}
              <div className="mb-3">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="isEZPass"
                    {...register('isEZPass')}
                  />
                  <label className="form-check-label" htmlFor="isEZPass">
                    Is this an EZ Pass Device ?
                  </label>
                </div>
              </div>

              {/* Dynamic Part Fields */}
              {isEZPass && (
                <div className="mb-3">
                  <div className="col-md-10">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Tag Plate Number"
                      {...register('plateNumber', {
                        required: isEZPass
                          ? 'Tag Plate Number is required'
                          : false,
                      })}
                    />
                  </div>
                  {errors.plateNumber && (
                    <p className="error">{errors.plateNumber.message}</p>
                  )}
                </div>
              )}
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
                    <div>
                      <input
                        type="text"
                        className="form-control m-2"
                        placeholder="Part Pop-up Title"
                        value={newPart}
                        onChange={(e) => {
                          setNewPart(e.target.value);
                          const temp = { ...customError };
                          delete temp.parts;
                          setCustomError(temp);
                        }}
                      />
                      {customError?.parts && (
                        <p className="error">{customError.parts}</p>
                      )}
                    </div>
                    <div>
                      <input
                        type="text"
                        className="form-control m-2"
                        placeholder="Button Label"
                        id="buttonLabel"
                        {...register('buttonLabel', {
                          required: isAddPartChecked
                            ? 'Button label is required'
                            : false,
                        })}
                      />
                      {errors.buttonLabel && (
                        <p className="error">{errors.buttonLabel.message}</p>
                      )}
                    </div>
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
              onClick={() => {
                setModalConfig({ type: 'clear' });
              }}
            >
              Clear
            </button>
            <button
              type="button"
              className="btn export"
              onClick={() => {
                setModalConfig({ type: 'cancel' });
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-submit"
              disabled={isLoading || isBarcodeLoading}
            >
              {isLoading ? 'Loading...' : params.id ? 'Update' : 'Submit'}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default InventoryForm;
