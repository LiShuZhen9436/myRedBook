export const formatPhone = (phone: string): string => {
  const trim = phone.replace(/\s+/g, '');
  const result = [trim.slice(0, 3), trim.slice(3, 7), trim.slice(7, 11)]
    .filter(item => !!item)
    .join(' ');
  return result;
};

export const replacePhone = (phone: string): string => {
  const res = phone ? phone.replace(/\s+/g, '') : '';
  return res;
};
