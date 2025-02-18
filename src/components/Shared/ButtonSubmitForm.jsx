import { useImperativeHandle, useState } from "react";

const ButtonSubmitForm = ({ buttonClassName, children, ref}) => {
  const [isLoading, setIsLoading] = useState(false);

  useImperativeHandle(ref, () => ({
    loading() {
      setIsLoading(true);
    },
    notIsLoading() {
      setIsLoading(false);
    },
  }));

  return (
    <button className={buttonClassName} disabled={isLoading} type="submit">
      {isLoading ? "Loading..." : children}
    </button>
  );
};

export default ButtonSubmitForm;
