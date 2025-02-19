export const getLeftStickInputColorStatus = (frontEndErrors, backEndErrors, inputValue, propertyName) => {
  switch (true) {
    case Boolean(frontEndErrors?.[propertyName]?.type || backEndErrors?.message):
      return "bg-septenary-color-MA5";
    case Boolean(!frontEndErrors?.[propertyName]?.type && !backEndErrors?.message && inputValue):
      return "bg-quinary-color-VS5";
    default:
      return "bg-primary-color-P11 group-hover:bg-quaternary-color-A5";
  }
};
