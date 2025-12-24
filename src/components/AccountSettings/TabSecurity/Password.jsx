import Link from "next/link";
import InputBGWrapperIcon from "../../Shared/InputBGWrapperIcon";
import InputLeftStickStatus from "../../Shared/InputLeftStickStatus";

// --- Local Icon Definitions ---

const ChevronRightIcon = ({ fillcolor = "fill-primary-color-P1" }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={fillcolor.replace('fill-', 'text-')} />
  </svg>
);

const ThreeAsterisksIcon = ({ fillcolor = "fill-primary-color-P1" }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 12H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={fillcolor.replace('fill-', 'text-')} strokeDasharray="0 4" />
    <circle cx="8" cy="12" r="2" className={fillcolor} />
    <circle cx="12" cy="12" r="2" className={fillcolor} />
    <circle cx="16" cy="12" r="2" className={fillcolor} />
  </svg>
);

// -----------------------------------------------------------

const Password = () => {
  return (
    <div className="w-full mt-4 pt-4 border-t border-secondary-color-S11/50">
      <InputLeftStickStatus inputBarStatusClassName="bg-primary-color-P1">
        <Link
          href="/password-recovery" 
          className="group w-full bg-secondary-color-S11 hover:bg-secondary-color-S9 transition-colors rounded-2xl p-1.5 flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <InputBGWrapperIcon>
              <ThreeAsterisksIcon fillcolor={"fill-primary-color-P1"} />
            </InputBGWrapperIcon>
            <span className="text-primary-color-P1 text-sm font-medium pl-1">
              Update password
            </span>
          </div>
          
          <div className="pr-1">
            <ChevronRightIcon fillcolor={"fill-primary-color-P1"} />
          </div>
        </Link>
      </InputLeftStickStatus>
    </div>
  );
};

export default Password;