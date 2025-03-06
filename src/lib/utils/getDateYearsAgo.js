export const getDateYearsAgo = (years) => {
  const today = new Date();
  return new Date(today.getFullYear() - years, 0, 1);
};
