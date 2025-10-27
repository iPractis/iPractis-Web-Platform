export const hasIncompleteFields = (
  fieldsFn,
  object,
  predicate = (field) => {
    // Boolean false is a valid value, not incomplete
    if (typeof field === 'boolean') return false;
    
    return (
      field === "" ||
      field?.length === 0 ||
      field === undefined ||
      field === "undefined" ||
      field === null
    );
  }
) => {
  return Object.values(fieldsFn(object)).some(predicate);
};
