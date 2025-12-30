import Link from "next/link";
import { PlayIcon } from "../Icons";
import { twMerge } from "tailwind-merge";

const ActionButtonRightIcon = ({
    description,
    className,
    icon = <PlayIcon />,
    iconClassName,
    href = "/dashboard",
}) => {
	return (
		<Link
			className={twMerge("bg-primary-color-P1 text-primary-color-P12 p-[6px] rounded-[16px] w-[390px] flex justify-between items-center", className)}
			type="button"
			href={href}
		>
			<span className="px-[10px] ST-SB-3">{description}</span>
			<div className={twMerge("bg-primary-color-P12 p-[8px] rounded-[10px]", iconClassName)}>
                {icon}
			</div>
		</Link>
	);
};

export default ActionButtonRightIcon;
