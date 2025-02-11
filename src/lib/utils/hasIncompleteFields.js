export const hasIncompleteFields = (
  fieldsFn,
  object,
  predicate = (field) =>
    field === "" ||
    field === false ||
    field?.length === 0 ||
    field === undefined
) => {
  return Object.values(fieldsFn(object)).some(predicate);
};
