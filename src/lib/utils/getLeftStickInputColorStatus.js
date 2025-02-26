export const getLeftStickInputColorStatus = (frontEndErrors, backEndErrors, inputValue, propertyName, requiredFieldColor = true) => {
  switch (true) {
    case Boolean(frontEndErrors?.[propertyName]?.type || backEndErrors?.message):
      return "bg-septenary-color-MA5";
    case Boolean(!frontEndErrors?.[propertyName]?.type && !backEndErrors?.message && inputValue?.length > 0):
      return "bg-quinary-color-VS5";
    default:
      return `${requiredFieldColor ? "bg-senary-color-W8" : "bg-primary-color-P11"} group-hover:bg-quaternary-color-A5`;
  }
};
