// Images && icons
import {
  CustomNextUiInputWithMaxLength,
  CustomNextUiTextareaWithMaxLength,
} from "../../Globals/MaxFormLengthFields";
import { ErrorZodResponse } from "../../Globals/ErrorMessageiPractis";
import { findInputErrorZod } from "@/src/lib/utils/getZodValidations";
import InputBGWrapperIcon from "../../Globals/InputBGWrapperIcon";
import { CloseIcon, ThreeXBlocks } from "../../Icons";
import { useState } from "react";

const ProfileTitle = ({ draft, errors }) => {
  const [profileTitleText, setProfileTitleText] = useState(draft?.profileTitle);
  const [descText, setDescText] = useState(draft?.subjectIntroduction);

  const descTextOnChange = (e) => {
    const textValue = e?.target?.value;

    if (textValue?.length <= 1000) return setDescText(textValue);
  };

  const profileTitleTextOnChange = (e) => {
    const textValue = e?.target?.value;

    if (textValue?.length <= 120) return setProfileTitleText(textValue);
  };

  return (
    <>
      <div className="border border-transparent pt-12">
        <CustomNextUiInputWithMaxLength
          defaultValue={draft?.profileTitle}
          nameInput={"profileTitle"}
          labelTitle={"Write a catchy headline"}
          labelSubtitle={
            "Your headline is the first thing peoples are going to read, it will allow you to attract the students you wish to heve."
          }
          labelClassName={"!-top-[65px]"}
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

      <div>
        <CustomNextUiTextareaWithMaxLength
          defaultValue={draft?.subjectIntroduction}
          labelTitle={"Subject Introduction"}
          labelSubtitle={
            "Describe your teaching methods, experience, and expertise in this subject."
          }
          labelClassName={"!top-3"}
          nameTextarea={"subjectIntroduction"}
          inputClassName={"h-[150px]"}
          value={descText}
          onChange={descTextOnChange}
          placeholder={"Enter a description"}
          maxCharactersLength={1000}
          typeError={"Max Length Exceeded"}
          descError={"The text cannot exceed 1000 characters."}
          labelDisabled={false}
          backgroundError={
            findInputErrorZod(errors, "subjectIntroduction")?.message
          }
        />

        <ErrorZodResponse errors={errors} fieldName={"subjectIntroduction"} />
      </div>
    </>
  );
};

export default ProfileTitle;
