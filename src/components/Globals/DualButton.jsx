import { twMerge } from "tailwind-merge";

const DualButton = ({
  leftButtonText,
  rightButtonText,
  rightButtonType,
  dualButtonWrapper,
  onClickLeftButton,
  onClickRightButton,
}) => {
  return (
    <div className={twMerge("flex gap-4 items-center", dualButtonWrapper)}>
      <button
        type="button"
        className="btn btn-primary w-full MT-SB-1 rounded-2xl py-3 px-4"
        onClick={onClickLeftButton}
      >
        {leftButtonText}
      </button>

      <button
        className="btn btn-secondary w-full MT-SB-1 rounded-2xl py-3 px-4"
        onClick={onClickRightButton}
        type={rightButtonType}
      >
        {rightButtonText}
      </button>
    </div>
  );
};

export default DualButton;
