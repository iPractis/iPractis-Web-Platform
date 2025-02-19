import ErrorMessageiPractis from "./ErrorMessageiPractis";

export const DynamicInputErrorMessage = ({ frontEndErrors, backEndErrors, fieldName, errorMessages }) => {
  if (backEndErrors?.title) {
    return (
      <ErrorMessageiPractis
        typeError={backEndErrors?.title}
        descError={backEndErrors?.message}
      />
    );
  }
  
  console.log(frontEndErrors, 'aquii')

  // Check for field-specific validation errors
  const fieldErrors = frontEndErrors[fieldName];

  if (fieldErrors?.type && errorMessages[fieldName]?.[fieldErrors?.type]) {
    const { typeError, descError } = errorMessages[fieldName][fieldErrors?.type];
    return <ErrorMessageiPractis typeError={typeError} descError={descError} />;
  }

  // No errors to display
  return null;
};
