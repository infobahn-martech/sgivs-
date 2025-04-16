import React from 'react';
import InitialsAvatar from '../../components/common/InitialsAvatar';
import deleteIcon from '../../assets/images/delete.svg';
import { Tooltip } from 'react-tooltip';
import useRelativeTime from './RelativeTime';

const ContactItem = ({
  contact,
  selectedId,
  onSelectContact,
  colorMap,
  onDelete,
}) => {
  const lastMsg = [...(contact?.messages || [])].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  )[0];

  const time = useRelativeTime(lastMsg?.createdAt); // ✅ NOW valid usage

  return (
    <li
      key={contact?.id}
      className={selectedId === contact?.id ? 'active' : ''}
      onClick={() => onSelectContact(contact.id)}
    >
      <InitialsAvatar
        name={contact?.name}
        uniqueKey={contact?.id}
        colorClass={colorMap?.[contact?.id]}
      />
      <div className="name-msg-wrap">
        <div className="name">{contact?.name}</div>
        <div className="msg">{lastMsg?.message || 'No messages yet'}</div>
      </div>
      <div className="time">{time}</div>

      {selectedId === contact?.id && (
        <img
          src={deleteIcon}
          alt="Delete"
          data-tooltip-id={`delete-tooltip-${contact?.id}`}
          data-tooltip-content="Delete"
          className="cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(contact);
          }}
        />
      )}
      <Tooltip
        id={`delete-tooltip-${contact?.id}`}
        place="top"
        effect="solid"
        style={{ backgroundColor: '#2ca0da' }}
      />
    </li>
  );
};

export default ContactItem;
