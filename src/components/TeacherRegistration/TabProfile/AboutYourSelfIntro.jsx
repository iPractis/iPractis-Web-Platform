import { DynamicInputErrorMessageWithZod } from "../../../lib/utils/getZodValidations";
import { getLeftStickInputColorStatus } from "@/src/lib/utils/getLeftStickInputColorStatus";
import { CustomNextUiTextareaWithMaxLength } from "../../Shared/MaxFormLengthFields";
import InputLeftStickStatus from "../../Shared/InputLeftStickStatus";

const AboutYourSelfIntro = ({
  frontEndErrors,
  backEndErrors,
  register,
  setValue,
  watch,
}) => {
  const introText = watch("introduction", "");

  const introTextOnChange = (e) => {
    const textValue = e?.target?.value;

    if (textValue?.length <= 1000) {
      setValue("introduction", textValue);
    }
  };

  return (
    <div className="!mt-9">
      <InputLeftStickStatus
        inputBarStatusClassName={`${getLeftStickInputColorStatus(
          frontEndErrors,
          backEndErrors,
          watch("introduction"),
          "introduction"
        )} -translate-y-0 top-[30%] h-[129px]`}
      >
        <CustomNextUiTextareaWithMaxLength
          value={introText}
          nameTextarea="introduction"
          inputClassName={"h-[150px]"}
          onChange={introTextOnChange}
          placeholder={"Enter a text"}
          maxCharactersLength={1000}
          typeError={"Max Length Exceeded"}
          descError={"The text cannot exceed 1000 characters."}
          labelTitle={"Write Introduction about yourself"}
          labelSubtitle={
            "Introduce yourself and highlight your unique interests."
          }
          backgroundError={
            frontEndErrors?.introduction?.type || backEndErrors?.message
          }
          inputProps={{ ...register("introduction") }}
        />
      </InputLeftStickStatus>

      <DynamicInputErrorMessageWithZod
        frontEndErrors={frontEndErrors}
        backEndErrors={backEndErrors}
        fieldName="introduction"
      />
    </div>
  );
};

export default AboutYourSelfIntro;
