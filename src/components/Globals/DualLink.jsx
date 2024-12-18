import { twMerge } from "tailwind-merge";
import Link from "next/link";

const DualLink = ({
  leftLinkHref,
  leftLinkText,
  rightLinkText,
  rightLinkHref,
  dualLinkWrapper,
}) => {
  return (
    <div className={twMerge("flex gap-4 items-center", dualLinkWrapper)}>
      <Link
        href={leftLinkHref}
        className="btn btn-primary w-full MT-SB-1 rounded-2xl py-3 px-4"
      >
        {leftLinkText}
      </Link>

      <Link
        href={rightLinkHref}
        className="btn btn-secondary w-full MT-SB-1 rounded-2xl py-3 px-4"
      >
        {rightLinkText}
      </Link>
    </div>
  );
};

export default DualLink;
