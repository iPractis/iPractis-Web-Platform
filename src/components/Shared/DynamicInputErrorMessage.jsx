import ErrorMessageiPractis from "./ErrorMessageiPractis";

export const DynamicInputErrorMessage = ({
  errorMessages,
  frontEndErrors,
  backEndErrors,
  fieldName,
}) => {
  const fieldFrontendErrors = frontEndErrors[fieldName];
  const fieldBackendErrors = backEndErrors?.field === fieldName ? backEndErrors : null;

  // Frontend errors to display
  if (fieldFrontendErrors?.type && errorMessages[fieldName]?.[fieldFrontendErrors.type]) {
    const { typeError, descError } = errorMessages[fieldName][fieldFrontendErrors.type];
    return <ErrorMessageiPractis typeError={typeError} descError={descError} />;
  }

  // Backend errors to display
  if (fieldBackendErrors) {
    return (
      <ErrorMessageiPractis
        typeError={fieldBackendErrors.title} 
        descError={fieldBackendErrors.message} 
      />
    );
  }

  // No errors
  return null;
};