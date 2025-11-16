import { CustomNextUiInputWithMaxLength } from "../../Shared/MaxFormLengthFields";
import { getInputStatusBorder } from "@/src/lib/utils/getInputStatusBorder";
import { SplitDynamicErrorZod } from "../../../lib/utils/getZodValidations";
import InputLeftStickStatus from "../../Shared/InputLeftStickStatus";
import InputBGWrapperIcon from "../../Shared/InputBGWrapperIcon";

// External imports
import { useController } from "react-hook-form";

// Icons
import { CloseIcon, ThreeXBlocks } from "../../Icons";

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
      <InputLeftStickStatus
        inputBarStatusClassName={`${getInputStatusBorder(
          errors,
          profileTitle?.value,
          "profileTitle"
        )} -translate-y-0 ${
          profileTitle?.value?.length === 120 ? "top-[12%]" : "top-[25%]"
        }`}
      >
        <div className="[&_.input-wrapper-ipractis]:!bg-[#F8F7F5]">
          <CustomNextUiInputWithMaxLength
          base={"!mt-0"}
          nameInput={"profileTitle"}
          labelTitle={"Write a catchy headline"}
          labelSubtitle={"Pick an engaging title that reflects your lessons."}
          labelClassName={"!-top-[52px]"}
          labelDisabled={false}
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
