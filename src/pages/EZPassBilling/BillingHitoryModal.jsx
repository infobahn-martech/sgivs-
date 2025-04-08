import React, { useEffect } from 'react';
import moment from 'moment';

import CustomModal from '../../components/common/CustomModal';
import useRentalReducer from '../../stores/RentalReducer';
import NoTableData from '../../components/common/NoTableData';
import CustomLoader from '../../components/common/CustomLoader';

const BillingHistoryModal = ({ showModal, closeModal, data }) => {
  const { getBillingHistory, billingHistory, isRentalLoading } =
    useRentalReducer((state) => state);

  useEffect(() => {
    if (data) {
      getBillingHistory({
        userId: data['user.id'],
      });
    }
  }, [data]);

  const columns = [
    { name: 'Amount', selector: 'amount', sortable: true },
    { name: 'Charged Date', selector: 'chargedDate', sortable: true },
  ];

  const renderUploadBody = () => (
    <div className="modal-body">
      <div class="info-round-wrp">
        <div class="info-round-blks">
          <div class="box-title">User Name</div>
          <div class="box-value">
            {data['user.firstName'] + ' ' + data['user.lastName']}{' '}
          </div>
        </div>
        <div class="info-round-blks">
          <div class="box-title">Total Charged</div>
          <div class="box-value">${parseFloat(data.totalDue).toFixed(2)}</div>
        </div>
      </div>
      <div class="table-wrap table-responsive">
        {!isRentalLoading ? (
          !billingHistory?.length ? (
            <NoTableData columns={columns} />
          ) : (
            <table class="table">
              <thead>
                <tr>
                  <th class="th-date">Amount</th>
                  <th class="th-tag">Charged Date</th>
                </tr>
              </thead>
              <tbody>
                {billingHistory?.map((item, index) => (
                  <tr key={item.id + index}>
                    <td>${parseFloat(item.totalAmount).toFixed(2)}</td>
                    <td>{moment(item.chargedDate).format('MMM D, YYYY')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
        ) : (
          <CustomLoader columns={columns} limit={5} />
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
          Billing History
        </h5>
      }
      contentClassName="modal-content"
      body={renderUploadBody()}
    />
  );
};

export default BillingHistoryModal;
