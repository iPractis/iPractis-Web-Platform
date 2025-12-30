import { twMerge } from "tailwind-merge";

const SectionWrapper = ({ children, className }) => {
  return (
    <div
      className={twMerge(
        "p-0 m-0 flex flex-col gap-[32px]",
        className
      )}
    >
      {children}
    </div>
  );
};

export default SectionWrapper;
