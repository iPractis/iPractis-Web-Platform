import { getInputStatusBorder } from "@/src/lib/utils/getInputStatusBorder";
import InputLeftStickStatus from "../../Shared/InputLeftStickStatus";
import InputBGWrapperIcon from "../../Shared/InputBGWrapperIcon";
import CustomNextUiInput from "../../Shared/CustomNextUiInput";
import SectionHeader from "../../Shared/SectionHeader";
import { maskEmail } from "@/src/lib/utils/maskEmail";

// React imports
import { useMemo, useState } from "react";

// Icons
import {
  RightArrowBiggerIcon,
  EyeWithoutDashIcon,
  EyeWithDashIcon,
  QuestionMark,
  UserBigIcon,
} from "../../Icons";

const LogInID = ({ errors, userEmail }) => {
  const [showEmail, setShowEmail] = useState(false);

  const displayedEmail = useMemo(() => {
    return showEmail ? userEmail : maskEmail(userEmail);
  }, [showEmail, userEmail]);

  return (
    <div>
      <SectionHeader
        wrapperSectionHeaderClassName="bg-primary-color-P11 px-4 rounded-[32px] !p-[32px] mb-8"
        descriptionText={
          "Manage the primary contact details associated with your account for login and recovery purposes."
        }
        titleIcon={<RightArrowBiggerIcon fillcolor={"fill-primary-color-P1"} />}
        descriptionClassName={"mt-[4px]"}
        titleText={"Log in ID"}
        titleClassName="MT-SB-1"
      />

      <div className="grid lg:grid-cols-2 grid-cols-1 lg:px-8">
        <div className="mt-3">
          <InputLeftStickStatus
            inputBarStatusClassName={getInputStatusBorder(
              errors,
              userEmail,
              "email"
            )}
          >
            <CustomNextUiInput
              name="email"
              type="text"
              placeholder="Enter your email"
              readOnly
              label={
                <span className="flex gap-1.5 items-center">
                  Email <QuestionMark fillcolor={"fill-primary-color-P4"} />
                </span>
              }
              labelPlacement="outside"
              startContent={
                <InputBGWrapperIcon>
                  <UserBigIcon fillcolor={"fill-primary-color-P4"} />
                </InputBGWrapperIcon>
              }
              endContent={
                <InputBGWrapperIcon
                  className={"absolute right-2 cursor-pointer"}
                  onClick={() => setShowEmail(!showEmail)}
                >
                  {showEmail ? (
                    <EyeWithoutDashIcon fillcolor={"fill-primary-color-P4"} />
                  ) : (
                    <EyeWithDashIcon fillcolor={"fill-primary-color-P4"} />
                  )}
                </InputBGWrapperIcon>
              }
              value={displayedEmail}
            />
          </InputLeftStickStatus>
        </div>
      </div>
    </div>
  );
};

export default LogInID;
