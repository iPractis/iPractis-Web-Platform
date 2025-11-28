import { getInputStatusBorder } from "@/src/lib/utils/getInputStatusBorder";
import InputLeftStickStatus from "../../Shared/InputLeftStickStatus";

// Icons
import {
  PlayIcon,
  MailSmallIcon,
  PasswordDotsDashIcon,
} from "../../Icons";
import SectionContent from "../../Shared/SectionContent";

const LogInID = ({ errors, userEmail }) => {

  return (
    <SectionContent>
      {/* Edit email Button */}
      <InputLeftStickStatus
        inputBarStatusClassName={getInputStatusBorder(
          errors,
          userEmail,
          "email"
        )}
      >
        <div className="w-full bg-primary-color-P1 p-[6px] rounded-[16px] flex items-center">
          <div className="bg-primary-color-P12 rounded-[10px] p-[8px]">
            <MailSmallIcon fillcolor={"fill-primary-color-P1"}/>
          </div>
          <div className="flex items-center ml-[16px]">
            <span className="ST-3 text-primary-color-P12">Edit email</span>
          </div>
          <div className="bg-primary-color-P12 rounded-[10px] p-[8px] ml-auto">
            <PlayIcon fillcolor={"fill-primary-color-P1"}/>
          </div>
        </div>
      </InputLeftStickStatus>
      <InputLeftStickStatus
        inputBarStatusClassName={getInputStatusBorder(
          errors,
          userEmail,
          "email"
        )}
      >
        <div className="w-full bg-primary-color-P1 p-[6px] rounded-[16px] flex items-center">
          <div className="bg-primary-color-P12 rounded-[10px] p-[8px]">
            <PasswordDotsDashIcon fillcolor={"fill-primary-color-P1"}/>
          </div>
          <div className="flex items-center ml-[16px]">
            <span className="ST-3 text-primary-color-P12">Edit password</span>
          </div>
          <div className="bg-primary-color-P12 rounded-[10px] p-[8px] ml-auto">
            <PlayIcon fillcolor={"fill-primary-color-P1"}/>
          </div>
        </div>
      </InputLeftStickStatus>
    </SectionContent>
  );
};

export default LogInID;
