import { twMerge } from "tailwind-merge";
import Link from "next/link";

const DualButton = ({
  leftButtonHref = "#",
  leftButtonDisabled,
  leftButtonText,
  leftButtonClassName,
  rightButtonText,
  rightButtonType,
  rightButtonDisabled,
  rightButtonClassName,
  dualButtonWrapper,
  onClickLeftButton,
  onClickRightButton,
  customSubmitButton,
}) => {
  return (
    <div className={twMerge("flex gap-4 items-center", dualButtonWrapper)}>
      <Link
        className={twMerge(
          `btn btn-primary w-full MT-SB-1 rounded-2xl py-3 px-4`,
          leftButtonClassName
        )}
        href={leftButtonHref}
        disabled={leftButtonDisabled}
        onClick={onClickLeftButton}
        type="button"
      >
        {leftButtonText}
      </Link>

      {customSubmitButton ? (
        customSubmitButton
      ) : (
        <button
          className={twMerge(
            `btn btn-secondary w-full MT-SB-1 rounded-2xl py-3 px-4`,
            rightButtonClassName
          )}
          disabled={rightButtonDisabled}
          onClick={onClickRightButton}
          type={rightButtonType}
        >
          {rightButtonText}
        </button>
      )}
    </div>
  );
};

export default DualButton;
