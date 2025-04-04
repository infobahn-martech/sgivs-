import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import '../../assets/scss/add-inventory.scss';
import '../../assets/scss/forms.scss';

import userIcon from '../../assets/images/inventory_management.svg';
import barcodeIcon from '../../assets/images/barcode.svg';
import closMarkIcon from '../../assets/images/close-mark.svg';
import Close_LGIcon from '../../assets/images/Close_LG.svg';
import CloseGroup from '../../assets/images/close-btn-grp.svg';
import Upload__icon from '../../assets/images/Upload__icon.svg';
import CustomSelect from '../../components/common/CustomSelect';

import useInventoryStore from '../../stores/InventoryReducer';
import useAlertReducer from '../../stores/AlertReducer';
import CustomActionModal from '../../components/common/CustomActionModal';
import useCommonStore from '../../stores/CommonStore';
import { Spinner } from 'react-bootstrap';

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
    redirectId,
  } = useInventoryStore((state) => state);
  const { uploadFiles, files, isUploading, deleteFile } = useCommonStore(
    (state) => state
  );
  const { error, clear } = useAlertReducer((state) => state);

  const params = useParams();
  const navigate = useNavigate();
  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    getValues, // Added getValues
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

  // Use useFieldArray for dynamic parts management
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'parts',
  });

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [newPart, setNewPart] = useState('');
  const [customError, setCustomError] = useState({});
  const [modalConfig, setModalConfig] = useState({ type: null, action: null });
  const [partsList, setPartsList] = useState([]); // Store entered parts
  useEffect(() => {
    clear();
    set({
      isLoading: false,
      barcodeId: null,
      inventoryItem: null,
      barcodeKey: null,
      isBarcodeLoading: false,
      redirectId: null,
      redirectToList: false,
    });
  }, []);

  useEffect(() => {
    if (files.length) {
      setUploadedFiles([...uploadedFiles, ...files]);
    }
  }, [files]);

  useEffect(() => {
    if (params?.id) getItemById(params.id);
    clearItemById();
  }, [params]);

  useEffect(() => {
    if (barcodeId) {
      setValue('itemId', barcodeId);
      clearErrors('itemId');
    }
  }, [barcodeId]);

  useEffect(() => {
    if (redirectToList) {
      if (redirectId) {
        navigate(`/inventory-management/view/${redirectId}`);
      } else navigate('/inventory-management');
      set({ redirectToList: false });
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
        inventoryItem.eZPassNumber !== 'null' &&
        inventoryItem.eZPassNumber !== ''
      ) {
        setValue('isEZPass', true);
        setValue('plateNumber', inventoryItem.eZPassNumber);
      }
  
      if (inventoryItem.hasParts) {
        setValue('buttonLabel', inventoryItem.label);
  
        // ✅ Set parts field
        const formattedParts = inventoryItem.inventory_parts.map((part) => ({
          value: part.partName,
        }));
        setValue('parts', formattedParts);
  
        // ✅ Also update `partsList` so that UI updates
        setPartsList(formattedParts);
      } else {
        setPartsList([]); // Ensure it's empty when no parts
      }
  
      // ✅ Set uploaded images
      setUploadedFiles(inventoryItem.images || []);
    } else {
      reset();
      setUploadedFiles([]);
      setCustomError(null);
      setNewPart('');
      setPartsList([]); // Reset partsList when no inventory item
    }
  }, [inventoryItem, setValue]);
  

  // watchers
  const isAddPartChecked = watch('addPart', false);
  const itemId = watch('itemId', null);
  // const parts = watch('parts', null);
  const isEZPass = watch('isEZPass', null);

  useEffect(() => {
    if (!isAddPartChecked) {
      remove();
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
    const formData = new FormData();

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

      formData.append('files', file);
      newFiles.push(file);
    }
    formData.append('folderPath', 'inventory');
    uploadFiles(formData);
    // setUploadedFiles(newFiles);
    clearErrors('fileUpload');
  };

  const handleRemoveFile = async (key) => {
    const newFiles = uploadedFiles.filter((file) => file.key !== key);
    setUploadedFiles(newFiles);
    if (newFiles.length === 0)
      setError('fileUpload', {
        type: 'manual',
        message: 'At least one image is required.',
      });
    else if (params.id) {
      await deleteFile(key);
      const data = handleGetFormValues();
      const parts = [];
      if (data.addPart && data.parts) {
        data.parts.forEach((part) => {
          parts.push(part.value);
        });
      }

      const imageKeys = [];
      if (newFiles.length) {
        newFiles.forEach((file) => {
          imageKeys.push(file.key);
        });
      }

      const payload = {
        itemId: data.itemId?.toUpperCase(),
        // barcode: !params?.id ? barcodeKey : inventoryItem.barcode,
        itemName: data.itemName,
        hasParts: data.addPart,
        parts: isAddPartChecked ? parts.join(',') : null,
        images: imageKeys.join(','),
        eZPassNumber: isEZPass ? data.plateNumber || null : null,
        label: isAddPartChecked ? data.buttonLabel : null,
      };

      updateInventoryItem(payload, params.id, true, params);
    }
  };
  // const quantityOptions = Array.from({ length: 10 }, (_, i) => ({
  //   value: (i + 1).toString(),
  //   label: `${i + 1}`,
  // }));

  // Handle Add Part
  const handleAddPart = () => {
    if (newPart.trim()) {
      const isDuplicate = fields.some(
        (field) =>
          field.value.trim().toLowerCase() === newPart.trim().toLowerCase()
      );

      if (isDuplicate) {
        setCustomError({ parts: 'This part is already added!' });
        return;
      }

      // 🔹 Ensure new parts are added to the state
      append({ value: newPart.trim() });

      // 🔹 Force a state update by updating the partList
      setPartsList([...fields, { value: newPart.trim() }]); // ✅ Fix

      // Reset input & error
      setNewPart('');
      const tempError = { ...customError };
      delete tempError.parts;
      setCustomError(tempError);
    }
  };

  const handleRemovePart = (index) => {
    remove(index); // Remove from useFieldArray

    // 🔹 Ensure the state updates correctly
    setPartsList((prevParts) => prevParts.filter((_, i) => i !== index));
  };

  const onSubmit = async (data) => {
    if (data.hasParts && (!data.parts || data.parts.length === 0)) {
      setError('parts', {
        type: 'manual',
        message: 'At least one part is required when "Add Part" is checked.',
      });
      return;
    }

    if (uploadedFiles.length === 0) {
      setError('fileUpload', {
        type: 'manual',
        message: 'At least one image is required.',
      });
      return;
    }
    console.log('first', barcodeId, itemId, params.id);
    if (!barcodeId && itemId && !params?.id) {
      error('Please generate barcode before submitting!');
      return;
    }

    const parts =
      data.addPart && data.parts ? data.parts.map((part) => part.value) : [];

    const imageKeys = uploadedFiles?.map((file) => file.key);
    const payload = {
      itemId: data.itemId?.toUpperCase(),
      itemName: data.itemName,
      hasParts: data.addPart,
      parts: isAddPartChecked ? parts.join(',') : undefined,
      images: imageKeys.join(','),
      eZPassNumber: isEZPass ? data.plateNumber || null : null,
      label: isAddPartChecked ? data.buttonLabel : undefined,
    };

    if (!params?.id) {
      payload.barcode = barcodeKey;
    }

    if (params.id) {
      await updateInventoryItem(payload, params.id, false, params);
    } else {
      await createInventoryItem(payload, params);
    }
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

  // Example function to log all form values
  const handleGetFormValues = () => {
    return getValues();
  };
  console.log('errors', errors);
  return (
    <>
      {renderModal()}
      <div className="inner-scroll-outer add-inventory">
        <form
          className="add-inventory common-layout"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="profile-title">
            <span className="pro-pic m-2 mt-0 mb-0">
              <img src={userIcon} alt="pro-pic" />
            </span>
            <span>Add Inventory</span>
          </div>

          <div className="inventory-box inner-layout">
            <div className="inner-sec">
              <div className="form">
                <div className="row mb-3">
                  <div className="col-md-6 form-group">
                    <label htmlFor="itemName" className="form-label">
                      Item Name<small classname="req">*</small>
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
                <div className="mb-3 form-group">
                  <label className="form-label">
                    Upload Image<small classname="text-danger">*</small>
                  </label>
                  <div
                    className="upload-box"
                    onDrop={handleDrop}
                    onDragOver={(e) => !isUploading && e.preventDefault()}
                  >
                    {isUploading ? (
                      <Spinner
                        size="lg"
                        as="span"
                        animation="border"
                        variant="dark"
                        aria-hidden="true"
                        className="custom-spinner"
                      />
                    ) : (
                      <div className="upload-ico">
                        <img src={Upload__icon} alt="upload-ico" />
                      </div>
                    )}
                    <p className="txt">
                      Drag & drop files or{' '}
                      <label
                        htmlFor="fileUpload"
                        className="browse-link cursor-pointer"
                        style={{ cursor: 'pointer' }}
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
                      disabled={isUploading}
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
                    <div className="uploaded-files">
                      {uploadedFiles.map((file, index) => (
                        <div key={index} className="file-preview">
                          <img
                            className="pro-pic"
                            src={file.url || file}
                            alt={`Uploaded file ${index + 1}`}
                          />
                          <button
                            type="button"
                            className="btn close-btn"
                            onClick={() => handleRemoveFile(file.key)}
                          >
                            <img src={closMarkIcon} alt="Remove image" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="itemId" className="form-label">
                        Item ID<small classname="text-danger">*</small>
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
                        onInput={(e) =>
                          (e.target.value = e.target.value.toUpperCase())
                        } // Converts to uppercase as user types
                        style={{ textTransform: 'uppercase' }} // Ensures visual uppercase input
                      />
                      {errors.itemId && (
                        <p className="error">{errors.itemId.message}</p>
                      )}
                    </div>
                  </div>
                  {(!barcodeId && !params?.id && (
                    <div className="col-md-4 d-flex align-items-end">
                      <div className="form-group">
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
                          {isBarcodeLoading
                            ? 'Please wait...'
                            : 'Generate Barcode'}
                        </button>
                      </div>
                    </div>
                  )) ||
                    null}
                </div>

                {/* EZ pass Checkbox */}
                <div className="mb-3 form-group">
                  <div className="form-check">
                  <label className="form-check-label" htmlFor="isEZPass">
                      Is this an EZ Pass Device ?
                    </label>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="isEZPass"
                      {...register('isEZPass')}
                    />
                  </div>
                </div>

                {/* Dynamic Part Fields */}
                {isEZPass && (
                  <div className="mb-3">
                    <div className="col-md-10 form-group">
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
                      {errors.plateNumber && (
                        <p className="error">{errors.plateNumber.message}</p>
                      )}
                    </div>
                  </div>
                )}
                {/* Add Part Checkbox */}
                <div className="mb-3">
                  <div className="form-check">
                    <label className="form-check-label" htmlFor="addPart">
                      Add Part
                    </label>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="addPart"
                      {...register('addPart')}
                    />
                  </div>
                </div>

                {/* Dynamic Part Fields */}
                {isAddPartChecked && (
                  <div id="partFields" className="mb-3">
                    <div className="part-sec">
                      {/* <div className="form-group add-btn-wrp">
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
                      </div> */}
                      <div className="col-md-10 form-group">
                      <label htmlFor="itemId" className="form-label">
                      Button Label
                      </label>
                      <input
                            type="text"
                            className="form-control"
                            placeholder="Button Label"
                            id="buttonLabel"
                            {...register('buttonLabel', {
                              required: isAddPartChecked
                                ? 'Button label is required'
                                : false,
                            })}
                          />
                          {errors.buttonLabel && (
                            <p className="error">
                              {errors.buttonLabel.message}
                            </p>
                          )}
                      </div>
                    </div>
                    <div className="part-sec">
                    <div className="col-md-10 form-group">
                      <label htmlFor="itemId" className="form-label">
                      Part Titile
                      </label>
                      <input
                          type="text"
                          className="form-control"
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
                    </div>
                    <ul className="groups">
                      <li>Part Pop up Titile<span><img src={CloseGroup} alt="" /></span></li>
                      <li>Part Pop up Titile<span><img src={CloseGroup} alt="" /></span></li>
                    </ul>
                    {/* <label htmlFor="partPopupTitle" className="form-label">
                      Part Pop-up Title
                    </label> */}
                    {/* <div className="part-sec">
                      <div className="part-col-title">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
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
                      </div>
                      <div className="part-col-label">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Button Label"
                            id="buttonLabel"
                            {...register('buttonLabel', {
                              required: isAddPartChecked
                                ? 'Button label is required'
                                : false,
                            })}
                          />
                          {errors.buttonLabel && (
                            <p className="error">
                              {errors.buttonLabel.message}
                            </p>
                          )}
                        </div>
                      </div>

                    </div> */}

                    {/* List of Entered Parts */}
                    {partsList.length > 0 && (
                      <div className="mt-3">
                        {partsList.map((part, index) => (
                          <div className="part-sec part-sec1" key={index}>
                            <div className="part-col-title">
                              <input
                                type="text"
                                className="form-control"
                                value={part.value} // ✅ Use part.value instead of part
                                readOnly
                              />
                            </div>
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
                      </div>
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
              {/* <button
                type="button"
                className="btn btn-info"
                onClick={() => {
                  setModalConfig({ type: 'cancel' });
                }}
              >
                Cancel
              </button> */}
              <button
                type="submit"
                className="btn btn-submit"
                disabled={isLoading || isBarcodeLoading}
              >
                {isLoading ? (
                  <Spinner
                    size="sm"
                    as="span"
                    animation="border"
                    variant="light"
                    aria-hidden="true"
                    className="custom-spinner"
                  />
                ) : params.id ? (
                  'Update'
                ) : (
                  'Submit'
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default InventoryForm;
