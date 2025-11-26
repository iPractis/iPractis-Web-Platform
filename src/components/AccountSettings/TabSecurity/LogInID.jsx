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
        titleIcon={<RightArrowBiggerIcon fillcolor={"fill-primary-color-P1"} />}
        titleText={"Log in information"}
        descriptionText={
          "Manage your account log in information."
        }
      />

      <div className="max-w-[430px] mx-auto">
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
