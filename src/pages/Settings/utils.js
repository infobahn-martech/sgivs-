export const durationOption = [
  { label: 'Days', value: 1 },
  { label: 'Hours', value: 2 },
];

export const isValid = (obj) => {
  const errObj = {};
  Object.keys(obj).forEach((key) => {
    if (['', null, undefined].includes(obj[key]) && key !== 'notification') {
      return (errObj[key] = 'Deadline and Interval is required');
    }
  });

  return errObj;
};
