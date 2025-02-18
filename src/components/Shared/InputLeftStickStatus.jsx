import { twMerge } from "tailwind-merge";

const InputLeftStickStatus = ({ inputColorStatus, children }) => {
  return (
    <div className="relative group">
      <div
        className={twMerge(
          `pointer-events-none w-1 h-4 rounded-sm absolute top-1/2 -left-2 transform -translate-y-1/2 z-10`,
          inputColorStatus
        )}
      ></div>

      {children}
    </div>
  );
};

export default InputLeftStickStatus;
