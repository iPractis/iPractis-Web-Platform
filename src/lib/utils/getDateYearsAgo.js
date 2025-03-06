export const getDateYearsAgo = (years) => {
  const today = new Date();

  return new Date(
    today.getFullYear() - years,
    today.getMonth(),
    today.getDate()
  );
};
