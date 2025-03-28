import moment from 'moment';

import userImage from '../assets/images/user.svg';
import InventoryIcon from '../assets/images/inventory-count.svg';
import dashboard from '../assets/images/dashboard-info-icon.svg';
import Gateway from './gateway';

export const headerConfig = [
  {
    title: 'Dashboard',
    icon: dashboard,
    path: '/',
  },
  {
    title: 'Inventory Management',
    icon: InventoryIcon,
    path: '/inventory-management',
  },
  {
    title: 'Loan Management',
    // icon: RentalManageIcon,
    icon: userImage,
    path: '/loan-management',
  },
  {
    title: 'EZ Pass Billing',
    icon: 'img/billing.svg',
    path: '/ez-pass-billing',
  },
  { title: 'Messages', icon: 'img/messages.svg', path: '/messages' },
  { title: 'Settings', icon: 'img/settings.svg', path: '/settings' },
  { title: 'User Management', icon: userImage, path: '/user-management' },
];

export const getFirstLetters = (name) => {
  const words = name?.split(' ');

  if (words?.length >= 2) {
    const firstLetters = words?.slice(0, 2)?.map((word) => word[0]);
    return firstLetters?.join('')?.toUpperCase();
  }
  if (words?.length === 1) {
    return words[0][0]?.toUpperCase();
  }
  return '';
};

export const formatDate = (date) => moment(date)?.format('MMM D, YYYY');

export const formatBoolean = (value) => (value ? 'Yes' : 'No');

// excel export
const baseUrl = import.meta.env.VITE_API_ENDPOINT;

export const downloadFile = async ({
  url,
  params,
  fileName,
  method = 'GET',
  extractFilePath,
}) => {
  try {
    const response = await Gateway({
      url,
      method,
      params: { ...params, isExcelExport: true },
      headers: {
        'x-timezone-offset': -new Date().getTimezoneOffset(),
        'x-response-format': 'excel',
      },
    });

    let filePath = extractFilePath(response);

    if (!filePath) {
      throw new Error('No file path received from API.');
    }

    if (!filePath.startsWith('http')) {
      filePath = `${baseUrl}${filePath}`;
    }

    const fileResponse = await fetch(filePath);
    const blob = await fileResponse.blob();

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (err) {
    throw new Error(err?.message ?? 'File download failed.');
  }
};
