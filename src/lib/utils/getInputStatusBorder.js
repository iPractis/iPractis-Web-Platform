export const getInputStatusBorder = (
  errors,
  inputValue,
  propertyName,
  requiredFieldColor = true
) => {
  const hasValue = inputValue instanceof File || inputValue?.length > 0;

  switch (true) {
    case Boolean(errors[propertyName]):
      return "bg-septenary-color-MA5";

    case hasValue:
      return "bg-quinary-color-VS5";

    default:
      return `${
        requiredFieldColor ? "bg-senary-color-W8" : "bg-primary-color-P11"
      } group-hover:bg-quaternary-color-A5`;
  }
};
