import { CustomNextUiTextareaWithMaxLength } from "../../Globals/MaxFormLengthFields";
import { useState } from "react";

const AboutYourSelfIntro = () => {
  const [introText, setIntroText] = useState("");

  const introTextOnChange = (e) => {
    const textValue = e?.target?.value;

    if (textValue?.length <= 1000) return setIntroText(textValue);
  };

  return (
    <div className="!mt-6">
      <CustomNextUiTextareaWithMaxLength
        nameTextarea="introductionAboutYourself"
        inputClassName={"h-[150px]"}
        value={introText}
        onChange={introTextOnChange}
        placeholder={"Enter a text"}
        maxCharactersLength={1000}
        typeError={"Max Length Exceeded"}
        descError={"The text cannot exceed 1000 characters."}
        labelTitle={"Write Introduction about yourself"}
        labelSubtitle={
          "Introduce yourself and highlight your unique interests."
        }
      />
    </div>
  );
};

export default AboutYourSelfIntro;
