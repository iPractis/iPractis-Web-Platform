export const hasIncompleteFields = (
  fieldsFn,
  object,
  predicate = (field) => field === "" || field === false
) => {
  return Object.values(fieldsFn(object)).some(predicate);
};
