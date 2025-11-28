import { twMerge } from "tailwind-merge";

const InputBGWrapperIcon = ({ children, className, onClick }) => {
  return (
    <div
      className={twMerge(
        "bg-primary-color-P12 p-[6px] flex justify-center items-center rounded-[10px]",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default InputBGWrapperIcon;
