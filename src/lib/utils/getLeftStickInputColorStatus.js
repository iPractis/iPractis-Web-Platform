export const getLeftStickInputColorStatus = (frontEndErrors, backEndErrors, inputValue) => {
  switch (true) {
    case Boolean(frontEndErrors?.email?.type || backEndErrors?.message):
      return "bg-septenary-color-MA5";
    case Boolean(!frontEndErrors?.email?.type && !backEndErrors?.message && inputValue):
      return "bg-quinary-color-VS5";
    default:
      return "bg-primary-color-P11 group-hover:bg-quaternary-color-A5";
  }
};
