export const durationOption = [
  { label: 'Day', value: 1 },
  { label: 'Month', value: 2 },
];

export const isValid = (obj) => {
  const errObj = {};
  Object.keys(obj).forEach((key) => {
    if (['', null, undefined].includes(obj[key]) && key !== 'notification') {
      return (errObj[key] = 'Hour and Interval is required');
    }
  });

  return errObj;
};
