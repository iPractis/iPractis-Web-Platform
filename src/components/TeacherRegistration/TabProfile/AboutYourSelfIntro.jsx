import CustomNextUiTextarea from "../../Globals/CustomNextUiTextarea";
import ErrorMessageiPractis from "../../Globals/ErrorMessageiPractis";
import { QuestionMark } from "../../Icons";
import { useState } from "react";

const AboutYourSelfIntro = () => {
  const [introText, setIntroText] = useState("");

  const introTextOnChange = (e) => {
    const textValue = e?.target?.value;

    if (textValue?.length <= 1000) return setIntroText(textValue);
  };

  return (
    <div className="flex-1 w-full">
      <CustomNextUiTextarea
        label={
          <div className="mb-2">
            <span className="flex gap-1.5 items-center text-primary-color-P4 MT-SB-1">
              Write Introduction about yourself{" "}
              <QuestionMark fillColor={"fill-primary-color-P4"} />
            </span>

            <span className="text-primary-color-P4 ST-3">
              Introduce yourself and highlight your unique interests.
            </span>
          </div>
        }
        onChange={introTextOnChange}
        value={introText}
        labelPlacement="outside"
        placeholder="Enter a text"
        classNames={{
          input: "h-[150px]",
          inputWrapper: introText?.length === 1000 && "form-input-error",
        }}
        size="primaryiPractis"
        disableAutosize
      />

      <div className="flex items-center justify-between text-primary-color-P4 mt-0.5 ST-2">
        <h4>Limited to 1000 characters</h4>
        <h4>{introText?.length}/1000</h4>
      </div>

      {introText?.length === 1000 && (
        <ErrorMessageiPractis
          typeError={"Max Length Exceeded"}
          descError={"The text cannot exceed 1000 characters."}
        />
      )}
    </div>
  );
};

export default AboutYourSelfIntro;
