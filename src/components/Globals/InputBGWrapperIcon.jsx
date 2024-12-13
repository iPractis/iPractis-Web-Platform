import { twMerge } from "tailwind-merge";

const InputBGWrapperIcon = ({ children, className, onClick }) => {
  return (
    <div
      className={twMerge(
        "bg-primary-color-P12 p-1.5 flex justify-center items-center rounded-[10px] w-9 h-9",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default InputBGWrapperIcon;
