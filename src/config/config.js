import userImage from '../assets/images/user.svg';
import InventoryIcon from '../assets/images/inventory-count.svg';
import RentalManageIcon from '../assets/images/dashboard-4.svg';

export const headerConfig = [
  {
    title: 'Inventory Management',
    icon: InventoryIcon,
    path: '/inventory-management',
  },
  {
    title: 'Rental Management',
    icon: RentalManageIcon,
    path: '/rental-management',
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
