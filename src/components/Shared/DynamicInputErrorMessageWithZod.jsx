import ErrorMessageiPractis from "./ErrorMessageiPractis";

export const DynamicInputErrorMessageWithZod = ({
  frontEndErrors,
  backEndErrors,
  fieldName,
}) => {
  const fieldFrontendErrors = frontEndErrors[fieldName];
  const fieldBackendErrors = backEndErrors?.field === fieldName ? backEndErrors : null;

  if (fieldFrontendErrors) {
    const { message } = fieldFrontendErrors;
    const splittedDetails = message?.split("---");
    
    if (!message) return;

    return (
      <ErrorMessageiPractis typeError={splittedDetails[0]} descError={splittedDetails[1]} />
    );
  }

  // Backend errors to display
  if (fieldBackendErrors) {
    return (
      <ErrorMessageiPractis
        typeError={fieldBackendErrors?.title}
        descError={fieldBackendErrors?.message}
      />
    );
  }

  // No errors
  return null;
};