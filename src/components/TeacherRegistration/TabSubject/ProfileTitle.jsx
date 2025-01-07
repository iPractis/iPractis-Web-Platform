// Images && icons
import {
  CustomNextUiInputWithMaxLength,
  CustomNextUiTextareaWithMaxLength,
} from "../../Globals/MaxFormLengthFields";
import InputBGWrapperIcon from "../../Globals/InputBGWrapperIcon";
import { CloseIcon, ThreeXBlocks } from "../../Icons";
import { useState } from "react";

const ProfileTitle = () => {
  const [profileTitleText, setProfileTitleText] = useState("");
  const [descText, setDescText] = useState("");

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
      <div>
        <CustomNextUiInputWithMaxLength
          nameTextarea={"profileTitle"}
          value={profileTitleText}
          onChange={profileTitleTextOnChange}
          placeholder={"Enter a profile title"}
          maxCharactersLength={120}
          typeError={"Max Length Exceeded"}
          descError={"The text cannot exceed 120 characters."}
          labelDisabled={true}
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
        />
      </div>

      <div>
        <CustomNextUiTextareaWithMaxLength
          nameTextarea={"descriptionSubjectToTeach"}
          inputClassName={"h-[150px]"}
          value={descText}
          onChange={descTextOnChange}
          placeholder={"Enter a description"}
          maxCharactersLength={1000}
          typeError={"Max Length Exceeded"}
          descError={"The text cannot exceed 1000 characters."}
          labelDisabled={true}
        />
      </div>
    </>
  );
};

export default ProfileTitle;
