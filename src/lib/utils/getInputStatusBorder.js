export const getInputStatusBorder = (
  errors,
  inputValue,
  propertyName,
  requiredFieldColor = true
) => {
  const hasValue =
    inputValue instanceof File ||
    (Array.isArray(inputValue) &&
      inputValue.length > 0 &&
      inputValue.some((item) => item !== "")) ||
    (typeof inputValue === "string" && inputValue.length > 0) ||
    (typeof inputValue === "number" && inputValue > 0);

  // Also count plain objects that carry uploaded-file metadata or other meaningful keys
  const isObjectValue =
    inputValue &&
    typeof inputValue === "object" &&
    !(inputValue instanceof File) &&
    !Array.isArray(inputValue) &&
    // treat objects with at least one non-empty value key as a real value
    Object.keys(inputValue).some((k) => {
      const v = inputValue[k];
      return v !== undefined && v !== null && v !== "";
    });

  // Check if the propertyName is a nested path (e.g., "languages.0.level")
  const errorPath = propertyName.split(".");
  let errorExists = false;

  // Traverse the errors object to check for nested errors
  let currentErrorLevel = errors;

  for (const key of errorPath) {
    if (currentErrorLevel?.[key]) {
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

    case hasValue || isObjectValue:
      return "bg-quinary-color-VS5";

    default:
      return `${
        requiredFieldColor ? "bg-senary-color-W8" : "bg-primary-color-P11"
      } group-hover:bg-quaternary-color-A5`;
  }
};
