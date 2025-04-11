// components/common/UserTableColumns.js
import React from 'react';
import deleteIcon from '../../assets/images/delete.svg';
import activeIcon from '../../assets/images/close.svg';
import blockIcon from '../../assets/images/block.svg';
// import alertIcon from '../../assets/images/alert.svg';
// import alertDisableIcon from '../../assets/images/notify-disable.svg';

import { Tooltip } from 'react-tooltip';
import { formatBoolean, formatDate } from '../../config/config';
import InitialsAvatar from '../../components/common/InitialsAvatar';

const getUserTableColumns = ({
  onDeleteClick,
  onStatusClick,
  showActions = true,
  isDashboard = false,
  onUserNotify,
}) => {
  const columns = [
    {
      name: 'First Name',
      selector: 'firstName',
      titleClasses: isDashboard ? 'th-name' : 'tw1',
      contentClass: 'user-pic',
      cell: (row) => (
        <>
          <InitialsAvatar name={row.firstName} />
          <span>{row.firstName}</span>
        </>
      ),
    },
    {
      name: 'Last Name',
      selector: 'lastName',
      titleClasses: isDashboard ? 'th-last-name' : 'tw2',
    },
    {
      name: 'Email',
      selector: 'email',
      titleClasses: isDashboard ? 'th-email' : 'tw3',
    },
    {
      name: 'Phone',
      selector: 'phone',
      titleClasses: isDashboard ? 'th-phone' : 'tw4',
      cell: (row) => `${row?.countryCode || ''} ${row?.phone || ''}`.trim(),
    },
    {
      name: 'Joined Date',
      selector: 'createdAt',
      titleClasses: isDashboard ? 'th-date' : 'tw5',
      cell: (row) => <span>{formatDate(row?.createdAt)}</span>,
      sort: true,
    },
    {
      name: 'Credit Card Available',
      selector: 'isCreditCardAvailable',
      titleClasses: isDashboard ? 'th-card' : 'tw6',
      cell: (row) => <span>{formatBoolean(row?.isCreditCardAvailable)}</span>,
      colClassName: 'text-center',
    },
  ];

  if (showActions) {
    columns.push({
      name: 'Action',
      selector: 'action',
      titleClasses: 'tw7',
      contentClass: 'action-wrap',
      cell: (row) => (
        <>
          <div
            className="form-check form-switch"
            data-tooltip-id="alert-tooltip"
            data-tooltip-content={
              row?.isNotificationEnabled
                ? 'Notification Disable'
                : 'Notification Enable'
            }
          >
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckChecked"
              checked={row?.isNotificationEnabled}
              onChange={() => onUserNotify(row)}
            />
          </div>

          {/* <img
            src={row?.isNotificationEnabled ? alertDisableIcon : alertIcon}
            alt="Alert"
            data-tooltip-id="alert-tooltip"
            data-tooltip-content={
              row?.isNotificationEnabled ? 'Disable' : 'Enable'
            }
            onClick={() => onUserNotify(row)}
          /> */}

          <Tooltip
            id="alert-tooltip"
            place="top"
            effect="solid"
            style={{
              backgroundColor: '#2ca0da',
            }}
          />
          <img
            src={deleteIcon}
            alt="Delete"
            data-tooltip-id="delete-tooltip"
            data-tooltip-content="Delete"
            className="cursor-pointer"
            onClick={() => onDeleteClick(row)}
          />
          <Tooltip
            id="delete-tooltip"
            place="top"
            effect="solid"
            style={{ backgroundColor: '#2ca0da' }}
          />

          <img
            src={row?.status === 2 ? activeIcon : blockIcon}
            alt={row?.status === 2 ? 'Active' : 'Blocked'}
            data-tooltip-id={`status-tooltip-${row?.id}`}
            data-tooltip-content={row?.status === 2 ? 'Active' : 'Block'}
            className="cursor-pointer"
            onClick={() => onStatusClick(row)}
          />
          <Tooltip
            id={`status-tooltip-${row?.id}`}
            place="top"
            effect="solid"
            style={{ backgroundColor: '#2ca0da' }}
          />
        </>
      ),
    });
  }

  return columns;
};

export default getUserTableColumns;
