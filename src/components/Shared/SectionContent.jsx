import { twMerge } from "tailwind-merge";

const SectionContent = ({ children, className }) => {
  return (
    <div
      className={twMerge(
        "p-0 m-0 w-[430px] mx-auto flex flex-col space-y-[16px]",
        className
      )}
    >
      {children}
    </div>
  );
};
 
export default SectionContent;
