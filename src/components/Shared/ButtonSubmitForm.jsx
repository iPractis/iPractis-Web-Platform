import { useFormStatus } from "react-dom";

const ButtonSubmitForm = ({ buttonClassName, children }) => {
  const { pending } = useFormStatus();

  return (
    <button className={buttonClassName} disabled={pending} type="submit">
      {pending ? "Loading..." : children}
    </button>
  );
};

export default ButtonSubmitForm;
