import moment from 'moment';
import Gateway from './gateway';
import * as XLSX from 'xlsx';
import userImage from '../assets/images/user.svg';
import settingsIcon from '../assets/images/Settings.svg';
import messageIcon from '../assets/images/message-ico.svg';
import loanImg from '../assets/images/Loan_Management.svg';
import inventoryImg from '../assets/images/inventory_management.svg';

export const headerConfig = [
  {
    title: 'Inventory Management',
    icon: inventoryImg,
    path: '/inventory-management',
  },
  {
    title: 'Loan Management',
    path: '/loan-management',
    icon: loanImg,
  },
  {
    title: 'EZ Pass Billing',
    icon: userImage,
    path: '/ez-pass-billing',
  },
  { title: 'Messages', icon: messageIcon, path: '/messages' },
  { title: 'Settings', icon: settingsIcon, path: '/settings' },
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

export const handleDownloadSample = () => {
  const sampleData = [
    ['Name', 'Email', 'Phone'], // headers
    ['John Doe', 'john@example.com', '1234567890'],
    ['Jane Smith', 'jane@example.com', '9876543210'],
  ];

  const worksheet = XLSX.utils.aoa_to_sheet(sampleData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'SampleTemplate');

  XLSX.writeFile(workbook, 'sample_template.xlsx');
};

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
