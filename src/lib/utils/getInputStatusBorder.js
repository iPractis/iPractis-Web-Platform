export const getInputStatusBorder = (
  errors,
  inputValue,
  propertyName,
  requiredFieldColor = true
) => {
  const hasValue = inputValue instanceof File || inputValue?.length > 0 || inputValue > 0;

  // Check if the propertyName is a nested path (e.g., "languages.0.level")
  const errorPath = propertyName.split(".");
  let errorExists = false;

  // Traverse the errors object to check for nested errors
  let currentErrorLevel = errors;
  
  for (const key of errorPath) {
    if (currentErrorLevel && currentErrorLevel[key]) {
      currentErrorLevel = currentErrorLevel[key];
    } else {
      currentErrorLevel = undefined;
      break;
    }
  }

  errorExists = Boolean(currentErrorLevel);

  switch (true) {
    case errorExists:
      return "bg-septenary-color-MA5"; 

    case hasValue:
      return "bg-quinary-color-VS5";

    default:
      return `${
        requiredFieldColor ? "bg-senary-color-W8" : "bg-primary-color-P11"
      } group-hover:bg-quaternary-color-A5`;
  }
};
