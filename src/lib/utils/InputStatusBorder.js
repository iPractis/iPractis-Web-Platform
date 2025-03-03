export const getInputStatusBorder = (
  errors,
  inputValue,
  propertyName,
  requiredFieldColor = true
) => {
  switch (true) {
    case Boolean(errors[propertyName]):
      return "bg-septenary-color-MA5";

    case Boolean(inputValue?.length > 0):
      return "bg-quinary-color-VS5";

    default:
      return `${
        requiredFieldColor ? "bg-senary-color-W8" : "bg-primary-color-P11"
      } group-hover:bg-quaternary-color-A5`;
  }
};
