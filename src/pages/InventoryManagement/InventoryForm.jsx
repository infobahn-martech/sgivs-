import React from 'react';

import '../../assets/scss/add-inventory.scss';

import userIcon from '../../assets/images/pro-pic.svg';
import barcodeIcon from '../../assets/images/barcode.svg';
import closMarkIcon from '../../assets/images/close-mark.svg';
import Close_LGIcon from '../../assets/images/Close_LG.svg';
import Upload__icon from '../../assets/images/Upload__icon.svg';

const InventoryForm = () => {
  return (
    <div class="add-inventory common-layout">
      <div class="profile-title">
        <span class="pro-pic">
          <img src={userIcon} alt="pro-pic" />
        </span>
        <span>Profile</span>
      </div>
      <div class="inventory-box inner-layout">
        <div class="inner-sec">
          <div class="form">
            <div class="row mb-3">
              <div class="col-md-6">
                <label for="itemName" class="form-label">
                  Item Name
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="itemName"
                  placeholder="Enter Image Name Here"
                />
              </div>
              <div class="col-md-6">
                <label for="quantity" class="form-label">
                  Quantity
                </label>
                <select class="form-select form-control" id="quantity">
                  <option selected>06</option>
                  <option>01</option>
                  <option>02</option>
                  <option>03</option>
                </select>
              </div>
            </div>

            <div class="mb-3">
              <label class="form-label">Upload Image</label>
              <div class="upload-box">
                <div class="upload-ico">
                  <img src={Upload__icon} alt="upload-ico" />
                </div>
                <p class="txt">
                  Drag & drop files or{' '}
                  <a href="#" class="browse-link">
                    Browse
                  </a>
                </p>
                <span class="btm-txt">Supported formats: JPEG, PNG</span>
              </div>
            </div>

            <div class="row mb-3">
              <div class="col-md-6">
                <label for="itemId" class="form-label">
                  Item Id
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="itemId"
                  value="#54885658"
                  readonly
                />
              </div>
              <div class="col-md-4 d-flex align-items-end">
                <button type="button" class="btn generate-btn">
                  <span class="bar-code">
                    <img src={barcodeIcon} alt="bar-code" />
                  </span>
                  Generate Barcode
                </button>
              </div>
            </div>

            <div class="mb-3">
              <div class="form-check">
                <label class="form-check-label" for="addPart">
                  Add Part
                </label>
                <input class="form-check-input" type="checkbox" id="addPart" />
              </div>
            </div>

            <div id="partFields" class="mb-3">
              <label for="partPopupTitle" class="form-label">
                Part Pop up Title
              </label>
              <div class="part-sec">
                <input
                  type="text"
                  class="form-control mb-2"
                  id="partPopupTitle"
                  placeholder="Part Pop up Title"
                />
                <button type="button" class="btn add-btn">
                  <span class="plus">
                    <img src={Close_LGIcon} alt="Close_LG" />
                  </span>{' '}
                  Add Part
                </button>
              </div>
              <div class="part-sec part-sec1">
                <input
                  type="text"
                  class="form-control mb-2"
                  id="partPopupTitle"
                  placeholder="Part Pop up Title"
                />
                <button type="button" class="btn close-btn">
                  <span class="plus">
                    <img src={closMarkIcon} alt="Close_LG" />
                  </span>
                </button>
              </div>
              <div class="part-sec part-sec1">
                <input
                  type="text"
                  class="form-control mb-2"
                  id="partPopupTitle"
                  placeholder="Part Pop up Title"
                />
                <button type="button" class="btn close-btn">
                  <span class="plus">
                    <img src={closMarkIcon} alt="Close_LG" />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="bottom-btn-sec">
          <button type="button" class="btn btn-cancel">
            Clear
          </button>
          <button type="submit" class="btn btn-submit">
            {' '}
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default InventoryForm;
