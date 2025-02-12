export const getTitleAndDescZod = (string) => {
  const [title, desc] = string.split("---");

  return { title, desc };
};

export const findInputErrorZod = (errors = [], inputName) => {
  return errors?.find((error) => (error?.path[0] === inputName ? error : null));
};

export const findInputErrorArrayZod = (errors = {}, inputName) => {
  return errors[inputName]._errors ?? [];
};

export const findInputMultipleErrorZod = (errors = [], path = []) => {
  return errors?.find((error) =>
    JSON.stringify(error?.path) === JSON.stringify(path) ? error : null
  );
};
