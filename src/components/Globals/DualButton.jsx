import { twMerge } from "tailwind-merge";

const DualButton = ({
  leftButtonText,
  leftButtonClassName,
  rightButtonText,
  rightButtonType,
  rightButtonDisabled,
  rightButtonClassName,
  dualButtonWrapper,
  onClickLeftButton,
  onClickRightButton,
}) => {
  return (
    <div className={twMerge("flex gap-4 items-center", dualButtonWrapper)}>
      <button
        type="button"
        className={twMerge(`btn btn-primary w-full MT-SB-1 rounded-2xl py-3 px-4`, leftButtonClassName)}
        onClick={onClickLeftButton}
      >
        {leftButtonText}
      </button>

      <button
        className={twMerge(`btn btn-secondary w-full MT-SB-1 rounded-2xl py-3 px-4`, rightButtonClassName)}
        disabled={rightButtonDisabled}
        onClick={onClickRightButton}
        type={rightButtonType}
      >
        {rightButtonText}
      </button>
    </div>
  );
};

export default DualButton;
