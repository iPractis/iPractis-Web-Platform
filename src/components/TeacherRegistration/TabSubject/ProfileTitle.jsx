import { CustomNextUiInputWithMaxLength } from "../../Shared/MaxFormLengthFields";
import { getInputStatusBorder } from "@/src/lib/utils/getInputStatusBorder";
import { SplitDynamicErrorZod } from "../../../lib/utils/getZodValidations";
import InputLeftStickStatus from "../../Shared/InputLeftStickStatus";
import InputBGWrapperIcon from "../../Shared/InputBGWrapperIcon";

// External imports
import { useController } from "react-hook-form";

// Icons
import { CloseIcon, ThreeXBlocks, QuestionMark } from "../../Icons";

const ProfileTitle = ({ control, errors }) => {
  const {
    field: profileTitle,
    fieldState: { error: profileTitleError },
  } = useController({
    name: "profileTitle",
    control,
  });

  const profileTitleTextOnChange = (e) => {
    const textValue = e?.target?.value;

    if (textValue?.length <= 120) {
      profileTitle.onChange(textValue);
    }
  };

  const handleClearInput = () => {
    profileTitle.onChange("");
  };

  return (
    <div>
      <div className="flex flex-col mb-2 ps-1.5">
        <span className="flex gap-1.5 items-center text-primary-color-P4 MT-SB-1">
          Write a catchy headline
          <QuestionMark fillcolor={"fill-primary-color-P4"} />
        </span>
        <span className="text-primary-color-P4 ST-3">
          Pick an engaging title that reflects your lessons.
        </span>
      </div>
      <InputLeftStickStatus
        inputBarStatusClassName={`${getInputStatusBorder(
          errors,
          profileTitle?.value,
          "profileTitle"
        )}`}
      >
        <div className="[&_.input-wrapper-ipractis]:!bg-[#F8F7F5]">
          <CustomNextUiInputWithMaxLength
          base={"!mt-0"}
          nameInput={"profileTitle"}
          labelDisabled={true}
          nameTextarea={"profileTitle"}
          value={profileTitle?.value}
          onChange={profileTitleTextOnChange}
          placeholder={"Enter a profile title"}
          inputClassName={"!pe-3"}
          maxCharactersLength={120}
          typeError={"Max Length Exceeded"}
          descError={"The text cannot exceed 120 characters."}
          startContent={
            <InputBGWrapperIcon>
              <ThreeXBlocks fillcolor={"fill-primary-color-P4"} />
            </InputBGWrapperIcon>
          }
          endContent={
            profileTitle?.value && profileTitle?.value?.length > 0 && (
              <InputBGWrapperIcon
                className={"cursor-pointer"}
                onClick={handleClearInput}
              >
                <CloseIcon strokeColor={"stroke-primary-color-P4"} />
              </InputBGWrapperIcon>
            )
          }
          backgroundError={profileTitleError?.message}
          inputProps={{ onBlur: profileTitle.onBlur }}
          />
        </div>
      </InputLeftStickStatus>

      <SplitDynamicErrorZod message={profileTitleError?.message} />
    </div>
  );
};

export default ProfileTitle;
