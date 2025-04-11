import React, { useState } from 'react';
import plusIcon from '../../assets/images/plus.svg';
import AddNewMessageModal from './AddNewMessageModal';
import CommonHeader from '../../components/common/CommonHeader';

const MessageListSidebar = ({ contacts, selectedId, onSelectContact }) => {
  const [addNewMessageModal, setAddNewMessageModal] = useState(false);

  return (
    <>
      <div className="message-left-wrap">
        <div className="head">
          <CommonHeader hideFilter hideRightSide />
          {/* <div className="msg-title">Messages</div> */}
          <div
            className="icon cursor-pointer"
            onClick={() => setAddNewMessageModal(true)}
          >
            <img src={plusIcon} alt="plus" />
          </div>
        </div>

        <div className="msg-listing-wrap">
          <div className="search">
            <input type="text" className="txt" placeholder="Search messages" />
          </div>

          <ul className="listing">
            {contacts?.map((contact) => (
              <li
                key={contact.id}
                className={selectedId === contact.id ? 'active' : ''}
                onClick={() => onSelectContact(contact.id)}
              >
                <figure className="img">
                  <img src={contact.img} alt={contact.name} />
                </figure>
                <div className="name-msg-wrap">
                  <div className="name">{contact.name}</div>
                  <div className="msg">
                    {contact.lastMsg || 'No messages yet'}
                  </div>
                </div>
                <div className="time">{contact.time || ''}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <AddNewMessageModal
        showModal={addNewMessageModal}
        closeModal={() => setAddNewMessageModal(false)}
        contacts={contacts}
        onAdd={() => {
          console.log('User added');
          setAddNewMessageModal(false);
        }}
      />
    </>
  );
};

export default MessageListSidebar;
