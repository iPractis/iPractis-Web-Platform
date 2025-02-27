import ErrorMessageiPractis from "@/src/components/Shared/ErrorMessageiPractis";

export const DynamicInputErrorMessageWithZod = ({
  nestedFieldName,
  frontEndErrors,
  backEndErrors,
  fieldName,
}) => {
  const fieldFrontendErrors = frontEndErrors[fieldName];
  const fieldBackendErrors = backEndErrors?.field === fieldName ? backEndErrors : null;

  if (fieldFrontendErrors) {
    // If it's an array of object (errors)
    if (Array.isArray(fieldFrontendErrors)) {
      return fieldFrontendErrors?.map((error, index) => {
        const { message } = error[nestedFieldName];

        if (!message) return;

        const splittedDetails = message?.split("---");

        return (
          <ErrorMessageiPractis
            typeError={splittedDetails[0]}
            descError={splittedDetails[1]}
            key={index}
          />
        );
      });
    }

    // If it's a normal error
    const { message } = fieldFrontendErrors;

    if (!message) return;

    const splittedDetails = message?.split("---");

    return (
      <ErrorMessageiPractis
        typeError={splittedDetails[0]}
        descError={splittedDetails[1]}
      />
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