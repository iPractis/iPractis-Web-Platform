import { DynamicInputErrorMessageWithZod } from "../../Shared/DynamicInputErrorMessageWithZod";
import { getLeftStickInputColorStatus } from "@/src/lib/utils/getLeftStickInputColorStatus";
import { CustomNextUiInputWithMaxLength } from "../../Shared/MaxFormLengthFields";
import InputLeftStickStatus from "../../Shared/InputLeftStickStatus";
import InputBGWrapperIcon from "../../Shared/InputBGWrapperIcon";

// Images && icons
import { CloseIcon, ThreeXBlocks } from "../../Icons";

const ProfileTitle = ({
  frontEndErrors,
  backEndErrors,
  setValue,
  register,
  watch,
}) => {
  const profileTitleText = watch("profileTitle", "");

  const profileTitleTextOnChange = (e) => {
    const textValue = e?.target?.value;

    if (textValue?.length <= 120) setValue("profileTitle", textValue);
  };

  return (
    <div>
      <InputLeftStickStatus
        inputBarStatusClassName={`${getLeftStickInputColorStatus(
          frontEndErrors,
          backEndErrors,
          watch("profileTitle"),
          "profileTitle"
        )} -translate-y-0 ${
          profileTitleText?.length === 120 ? "top-[12%]" : "top-[25%]"
        }`}
      >
        <CustomNextUiInputWithMaxLength
          base={"!mt-0"}
          nameInput={"profileTitle"}
          labelTitle={"Write a catchy headline"}
          labelSubtitle={"Find a catchy title"}
          labelClassName={"!-top-[52px]"}
          labelDisabled={false}
          nameTextarea={"profileTitle"}
          value={profileTitleText}
          onChange={profileTitleTextOnChange}
          placeholder={"Enter a profile title"}
          inputClassName={"!pe-3"}
          maxCharactersLength={120}
          typeError={"Max Length Exceeded"}
          descError={"The text cannot exceed 120 characters."}
          startContent={
            <InputBGWrapperIcon>
              <ThreeXBlocks fillColor={"fill-primary-color-P4"} />
            </InputBGWrapperIcon>
          }
          endContent={
            <InputBGWrapperIcon
              className={"cursor-pointer"}
              onClick={() => setValue("profileTitle", "")}
            >
              <CloseIcon strokeColor={"stroke-primary-color-P4"} />
            </InputBGWrapperIcon>
          }
          backgroundError={
            frontEndErrors?.profileTitle?.type || backEndErrors?.message
          }
          inputProps={{ ...register("profileTitle") }}
        />
      </InputLeftStickStatus>

      <DynamicInputErrorMessageWithZod
        frontEndErrors={frontEndErrors}
        backEndErrors={backEndErrors}
        fieldName="profileTitle"
      />
    </div>
  );
};

export default ProfileTitle;
