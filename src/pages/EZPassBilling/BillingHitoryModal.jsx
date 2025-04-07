import React from 'react';
import CustomModal from '../../components/common/CustomModal';

const BillingHistoryModal = ({ showModal, closeModal }) => {
  const renderUploadBody = () => (
    <div className="modal-body">
      <div class="info-round-wrp">
        <div class="info-round-blks">
          <div class="box-title">User Name</div>
          <div class="box-value">John Doe</div>
        </div>
        <div class="info-round-blks">
          <div class="box-title">Total Charged</div>
          <div class="box-value">$525</div>
        </div>
      </div>
      <div class="table-wrap table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th class="th-date">Amount</th>
              <th class="th-tag">Charged Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>$5246</td>
              <td>Mar 3, 2025</td>
            </tr>
            <tr>
              <td>$5246</td>
              <td>Mar 3, 2025</td>
            </tr>
            <tr>
              <td>$5246</td>
              <td>Mar 3, 2025</td>
            </tr>
            <tr>
              <td>$5246</td>
              <td>Mar 3, 2025</td>
            </tr>
            <tr>
              <td>$5246</td>
              <td>Mar 3, 2025</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <CustomModal
      closeButton
      className="modal fade transaction-view-modal"
      dialgName="modal-dialog modal-dialog-centered modal-dialog-scrollable"
      show={showModal}
      closeModal={closeModal}
      header={
        <h5 className="modal-title" id="uploadModalLabel">
          View Transactions
        </h5>
      }
      contentClassName="modal-content"
      body={renderUploadBody()}
    />
  );
};

export default BillingHistoryModal;
