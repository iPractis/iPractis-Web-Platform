import { twMerge } from "tailwind-merge";
import Link from "next/link";

const DualAction = ({
  leftLinkText,
  leftLinkHref,
  rightButtonText,
  rightButtonType,
  dualActionWrapper,
  onClickRightButton,
  rightButtonDisabled,
}) => {
  return (
    <div className={twMerge("flex gap-4 items-center", dualActionWrapper)}>
      <Link
        className="btn btn-primary w-full MT-SB-1 rounded-2xl py-3 px-4"
        href={leftLinkHref}
      >
        {leftLinkText}
      </Link>

      <button
        className="btn btn-secondary w-full MT-SB-1 rounded-2xl py-3 px-4"
        disabled={rightButtonDisabled}
        onClick={onClickRightButton}
        type={rightButtonType}
      >
        {rightButtonText}
      </button>
    </div>
  );
};

export default DualAction;
