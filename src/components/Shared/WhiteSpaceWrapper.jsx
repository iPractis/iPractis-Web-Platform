import { twMerge } from "tailwind-merge";

const WhiteSpaceWrapper = ({ children, className }) => {
  return (
    <div className={twMerge("p-8 rounded-2xl bg-primary-color-P12", className)}>
      {children}
    </div>
  );
};

export default WhiteSpaceWrapper;
