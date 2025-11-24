import { useImperativeHandle, useState, useEffect, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const Spinner = ({ className = "w-4 h-4", ariaHidden = true, title = "Loading" }) => (
  <svg
    className={"animate-spin text-current " + className}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    aria-hidden={ariaHidden}
    role="img"
  >
    <title>{title}</title>
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
    ></path>
  </svg>
);

const ButtonSubmitForm = (
  {
    buttonClassName,
    children,
    loading: controlledLoading,
    loadingText = "Loading...",
    showLoadingText = false,
    spinnerClassName = "w-4 h-4 text-primary-color-P1",
    disabled: controlledDisabled,
    type = "submit",
    ...rest
  },
  ref
) => {
  const [isLoading, setIsLoading] = useState(false);

  // allow controlled loading prop
  useEffect(() => {
    if (typeof controlledLoading === "boolean") setIsLoading(controlledLoading);
  }, [controlledLoading]);

  useImperativeHandle(ref, () => ({
    loading() {
      setIsLoading(true);
    },
    notIsLoading() {
      setIsLoading(false);
    },
    setLoading(v) {
      setIsLoading(!!v);
    },
  }));

  const isDisabled = typeof controlledDisabled === "boolean" ? controlledDisabled : isLoading;
  const disabledClasses = isLoading
    ? "disabled:pointer-events-none"
    : "disabled:opacity-20 disabled:pointer-events-none";

  // subtle dim while loading so background remains visible but indicates activity
  const loadingDimClass = isLoading ? "opacity-95" : "";

  return (
    <button
      className={twMerge(`${disabledClasses} ${loadingDimClass} inline-flex items-center justify-center gap-2 relative`, buttonClassName)}
      disabled={isDisabled}
      aria-busy={isLoading}
      type={type}
      {...rest}
    >
      {/* Main content: either loading text or children. Add left padding while spinner is visible. */}
      <span className={twMerge("flex items-center justify-center", isLoading ? "pl-10" : "")}>{isLoading && showLoadingText ? loadingText : children}</span>

      {/* Spinner: always visible when loading, positioned to the left */}
      {isLoading ? (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center" aria-hidden={!showLoadingText}>
          <Spinner className={spinnerClassName} />
        </span>
      ) : null}
    </button>
  );
};

export default forwardRef(ButtonSubmitForm);
