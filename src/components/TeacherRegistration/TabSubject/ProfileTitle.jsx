// Images && icons
import { CustomNextUiInputWithMaxLength } from "../../Shared/MaxFormLengthFields";
import { ErrorZodResponse } from "../../Shared/ErrorMessageiPractis";
import { findInputErrorZod } from "@/src/lib/utils/getZodValidations";
import InputBGWrapperIcon from "../../Shared/InputBGWrapperIcon";
import { useState } from "react";

// Images && icons
import { CloseIcon, ThreeXBlocks } from "../../Icons";

const ProfileTitle = ({ draft, errors }) => {
  const [profileTitleText, setProfileTitleText] = useState(draft?.profileTitle);

  const profileTitleTextOnChange = (e) => {
    const textValue = e?.target?.value;

    if (textValue?.length <= 120) return setProfileTitleText(textValue);
  };

  return (
    <>
      <div className="-mb-5">
        <CustomNextUiInputWithMaxLength
          defaultValue={draft?.profileTitle}
          nameInput={"profileTitle"}
          labelTitle={"Write a catchy headline"}
          labelSubtitle={
            "Find a catchy title"
          }
          labelClassName={"!-top-[52px]"}
          labelDisabled={false}
          nameTextarea={"profileTitle"}
          value={profileTitleText}
          onChange={profileTitleTextOnChange}
          placeholder={"Enter a profile title"}
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
              onClick={() => setProfileTitleText("")}
            >
              <CloseIcon strokeColor={"stroke-primary-color-P4"} />
            </InputBGWrapperIcon>
          }
          backgroundError={findInputErrorZod(errors, "profileTitle")?.message}
        />

        <ErrorZodResponse errors={errors} fieldName={"profileTitle"} />
      </div>
    </>
  );
};

export default ProfileTitle;
