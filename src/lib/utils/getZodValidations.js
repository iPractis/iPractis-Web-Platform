export const getTitleAndDescZod = (string) => {
  const [title, desc] = string.split("---");

  return { title, desc };
};

export const findInputErrorZod = (errors = [], inputName) => {
  return errors?.find((error) => (error?.path[0] === inputName ? error : null));
};

export const findInputMultipleErrorZod = (
  errors = [],
  inputName,
  pathIndex
) => {
  return errors?.find((error) =>
    error?.path[pathIndex] === inputName ? error : null
  );
};
