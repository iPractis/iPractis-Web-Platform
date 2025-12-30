import { twMerge } from "tailwind-merge";

const InputLeftStickStatus = ({ inputBarStatusClassName, children }) => {
  return (
    <div className="relative group">
      <div
        className={twMerge(
          `pointer-events-none w-1 h-4 rounded-sm absolute top-1/2 -left-1.5 transform -translate-y-1/2 z-10`,
          inputBarStatusClassName
        )}
      ></div>

      {children}
    </div>
  );
};

export default InputLeftStickStatus;
