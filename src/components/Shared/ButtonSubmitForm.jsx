import { useImperativeHandle, useState } from "react";
import { twMerge } from "tailwind-merge";

const ButtonSubmitForm = ({ buttonClassName, children, ref }) => {
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
    <button
      className={twMerge(
        "disabled:opacity-20 disabled:pointer-events-none",
        buttonClassName
      )}
      disabled={isLoading}
      type="submit"
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
};

export default ButtonSubmitForm;
