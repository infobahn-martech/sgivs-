import React from 'react';
import CustomModal from '../../components/common/CustomModal';

const AddNewMessageModal = ({
  showModal,
  closeModal,
  contacts = [],
  onAdd,
}) => {
  const renderHeader = () => (
    <h5 className="modal-title" id="uploadModalLabel">
      Add New
    </h5>
  );

  const renderBody = () => (
    <div className="modal-body">
      <ul className="msg-list-wrp">
        {contacts?.map((user, index) => (
          <li className="msg-list" key={index}>
            <div className="prof-img">
              <img src={user.img} alt={user.name} />
            </div>
            <div className="prof-dtl">
              <div className="info">
                <div className="name">{user.name}</div>
                <div className="status">{user.status}</div>
              </div>
              <div className="time">{user.time}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );

  const renderFooter = () => (
    <div className="modal-footer">
      <button className="btn btn-primary" onClick={onAdd}>
        <span className="icon">Add</span>
      </button>
    </div>
  );

  return (
    <CustomModal
      closeButton
      className="modal fade add-new-msg-modal"
      dialgName="modal-dialog modal-dialog-centered modal-dialog-scrollable"
      show={showModal}
      closeModal={closeModal}
      header={renderHeader()}
      body={renderBody()}
      footer={renderFooter()}
    />
  );
};

export default AddNewMessageModal;
