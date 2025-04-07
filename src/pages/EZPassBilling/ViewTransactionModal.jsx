import React from 'react';
import CustomModal from '../../components/common/CustomModal';



const ViewTransactionModal = ({ showModal, closeModal }) => {
  const renderUploadBody = () => (
    <div className="modal-body">
      <div class="info-round-wrp">
        <div class="info-round-blks">
          <div class="box-title">Borrowed date and time</div>
          <div class="box-value">23 Feb 2025 : 02:00 PM</div>
        </div>
        <div class="info-round-blks">
          <div class="box-title">Returned date and time</div>
          <div class="box-value">23 Feb 2025 : 02:00 PM</div>
        </div>
        <div class="info-round-blks">
          <div class="box-title">Balance Due</div>
          <div class="box-value">$5254</div>
        </div>
      </div>
      <div class="table-wrap table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th class="th-date">Transaction Date</th>
              <th class="th-tag">Tag/Plate Number</th>
              <th class="th-agency">Agency</th>
              <th class="th-id">Plaza Id</th>
              <th class="th-time">Entry Time</th>
              <th class="th-amount">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Mar 3, 2025</td>
              <td>Mar 3, 2025</td>
              <td>XYZ Agency</td>
              <td>#5485458</td>
              <td>02:00 PM</td>
              <td>$5246</td>
            </tr>
            <tr>
              <td>Mar 3, 2025</td>
              <td>Mar 3, 2025</td>
              <td>XYZ Agency</td>
              <td>#5485458</td>
              <td>02:00 PM</td>
              <td>$5246</td>
            </tr>
            <tr>
              <td>Mar 3, 2025</td>
              <td>Mar 3, 2025</td>
              <td>XYZ Agency</td>
              <td>#5485458</td>
              <td>02:00 PM</td>
              <td>$5246</td>
            </tr>
            <tr>
              <td>Mar 3, 2025</td>
              <td>Mar 3, 2025</td>
              <td>XYZ Agency</td>
              <td>#5485458</td>
              <td>02:00 PM</td>
              <td>$5246</td>
            </tr>
            <tr>
              <td>Mar 3, 2025</td>
              <td>Mar 3, 2025</td>
              <td>XYZ Agency</td>
              <td>#5485458</td>
              <td>02:00 PM</td>
              <td>$5246</td>
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

export default ViewTransactionModal;
