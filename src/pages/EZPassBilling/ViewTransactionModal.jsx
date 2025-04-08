import React, { useEffect } from 'react';
import moment from 'moment';

import CustomModal from '../../components/common/CustomModal';
import useRentalReducer from '../../stores/RentalReducer';
import CustomLoader from '../../components/common/CustomLoader';
import NoTableData from '../../components/common/NoTableData';

const ViewTransactionModal = ({ showModal, closeModal, data }) => {
  const { getTransactions, transactions, isRentalLoading } = useRentalReducer(
    (state) => state
  );
  console.log(' transactions', transactions);

  useEffect(() => {
    if (data) {
      getTransactions({
        id: data['inventory.eZPassNumber'],
        borrowedAt: moment(data.borrowedAt).format('YYYY-MM-DD'),
        // borrowedAt: '2025-03-14',
        returnedAt: moment(data.returnedAt).format('YYYY-MM-DD'),
        // returnedAt: '2025-03-17',
      });
    }
  }, [data]);
  const columns = [
    { name: 'Transaction Date', selector: 'transactionDate', sortable: true },
    { name: 'Tag/Plate Number', selector: 'tagPlateNumber', sortable: true },
    { name: 'Agency', selector: 'agency', sortable: true },
    { name: 'Plaza Id', selector: 'plazaId', sortable: true },
    { name: 'Entry Time', selector: 'entryTime', sortable: true },
    { name: 'Amount', selector: 'amount', sortable: true },
  ];
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
        {!isRentalLoading ? (
          !transactions?.length ? (
            <NoTableData columns={columns} />
          ) : (
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
                {transactions.map((data, idx) => (
                  <tr key={`row${idx + data.id}`}>
                    <td>
                      {moment(data.transactionDate).format('MMM D, YYYY')}
                    </td>
                    <td>{data.tagPlateNumber}</td>
                    <td>{data.agency}</td>
                    <td>{data.plazaId}</td>
                    <td>
                      {moment(data.entryTime, 'HH:mm:ss').format('hh:mm A')}
                    </td>
                    <td>${data.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
        ) : (
          <CustomLoader columns={columns} limit={10} />
        )}
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
