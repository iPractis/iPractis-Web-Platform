import ErrorMessageiPractis from "./ErrorMessageiPractis";

export const DynamicInputErrorMessage = ({ errors, error, fieldName, errorMessages }) => {
  if (error?.title) {
    return (
      <ErrorMessageiPractis
        typeError={error?.title}
        descError={error?.message}
      />
    );
  }

  // Check for field-specific validation errors
  const fieldErrors = errors[fieldName];

  if (fieldErrors?.type && errorMessages[fieldName]?.[fieldErrors?.type]) {
    const { typeError, descError } = errorMessages[fieldName][fieldErrors?.type];
    return <ErrorMessageiPractis typeError={typeError} descError={descError} />;
  }

  // No errors to display
  return null;
};
