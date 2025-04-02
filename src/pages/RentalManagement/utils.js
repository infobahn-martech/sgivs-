export const paymentStatus = [
  { value: 1, label: 'BORROWED', className: 'borrowed' },
  { value: 2, label: 'RETURNED', className: 'returned' },
  { value: 3, label: 'OVERDUE', className: 'overdue' },
  { value: 4, label: 'MISSING', className: 'missing' },
];

export const getPaymentStatus = (statusId) =>
  paymentStatus.find((each) => each.value === statusId) ?? {};
