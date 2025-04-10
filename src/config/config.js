import moment from 'moment';
import Gateway from './gateway';
import * as XLSX from 'xlsx';
import userImage from '../assets/images/user.svg';
import transactions from '../assets/images/transaction-header.svg';
import ezpassImage from '../assets/images/ezpass.svg';
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
  { title: 'Category Management', icon: messageIcon, path: '/category' },
  { title: 'Subcategory', icon: messageIcon, path: '/sub-category' },
  {
    title: 'Loan Management',
    path: '/loan-management',
    icon: loanImg,
  },
  {
    title: 'Unmapped Transactions',
    icon: transactions,
    path: '/ez-pass-billing/unmapped-transactions',
  },
  {
    title: 'EZ Pass Billing',
    icon: ezpassImage,
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

export const handleDownloadSample = (type = 'inventory') => {
  const handleDownloadInventorySample = () => {
    const sampleData = [
      ['itemName', 'EzPassNumber', 'parts', 'images'], // headers
      [
        'usetest 4',
        '123456',
        'abc',
        'https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D',
      ],
      [
        'test 22',
        '654321',
        'test',
        'https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D',
      ],
      [
        'sample 4',
        '123456',
        'abc',
        'https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D',
      ],
    ];

    const csvContent = sampleData.map((row) => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'sample_template.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const handleDownloadLoanSample = () => {
    const sampleData = [
      ['itemName', 'EzPassNumber', 'parts', 'images'], // headers
      [
        'usetest 4',
        '123456',
        'abc',
        'https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D',
      ],
      [
        'test 22',
        '654321',
        'test',
        'https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D',
      ],
      [
        'sample 4',
        '123456',
        'abc',
        'https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D',
      ],
    ];

    const csvContent = sampleData.map((row) => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'sample_template.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const handleDownloadEzPassSample = () => {
    const sampleData = [
      ['licensePlate', 'tollAmount', 'tollDate'], // headers
      ['ABC-1234', 25.32, '2024-03-10T12:30:00Z'],
      ['XYZ-5678', 15.75, '2024-03-11T14:45:00Z'],
      ['LMN-9012', 10.5, '2024-03-12T09:15:00Z'],
    ];

    const csvContent = sampleData.map((row) => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'sample_template.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  switch (type) {
    case 'inventory':
      return handleDownloadInventorySample();
    case 'loan':
      return handleDownloadLoanSample();
    case 'ezpass':
      return handleDownloadEzPassSample();
    default:
      return null;
  }
};

export const getCsvHeaders = (type) => {
  switch (type) {
    case 'inventory':
      return ['itemName', 'EzPassNumber', 'parts', 'images'];
    case 'loan':
      return ['itemName', 'EzPassNumber', 'parts', 'images'];
    case 'ezpass':
      return ['licensePlate', 'tollAmount', 'tollDate'];
    default:
      return [];
  }
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
