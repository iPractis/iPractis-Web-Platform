import { CustomNextUiTextareaWithMaxLength } from "../../Shared/MaxFormLengthFields";
import { getInputStatusBorder } from "@/src/lib/utils/getInputStatusBorder";
import { SplitDynamicErrorZod } from "@/src/lib/utils/getZodValidations";
import InputLeftStickStatus from "../../Shared/InputLeftStickStatus";

// External imports
import { useController } from "react-hook-form";

// Icons
import { QuestionMark } from "../../Icons";

const AboutYourSelfIntro = ({ control, errors }) => {
  const {
    field: introduction,
    fieldState: { error: introductionError },
  } = useController({
    name: "introduction",
    control,
  });

  const introTextOnChange = (e) => {
    const textValue = e?.target?.value;

    if (textValue?.length <= 1000) {
      introduction.onChange(textValue);
    }
  };

  return (
    <div>
      <InputLeftStickStatus
        inputBarStatusClassName={`${getInputStatusBorder(
          errors,
          introduction.value,
          "introduction"
        )} -translate-y-0 top-[30%] h-[129px]`}
      >
        <div className="[&_.textarea-wrapper]:!bg-secondary-color-S11">
          <CustomNextUiTextareaWithMaxLength
            value={introduction.value}
            nameTextarea="introduction"
            inputClassName={"h-[150px]"}
            onChange={introTextOnChange}
            placeholder={"Enter a description"}
            maxCharactersLength={1000}
            typeError={"Max Length Exceeded"}
            descError={"The text cannot exceed 1000 characters."}
            labelTitle={"Write Introduction about yourself"}
            labelSubtitle={
              "Introduce yourself and highlight your unique interests."
            }
            backgroundError={introductionError?.message}
            inputProps={{ onBlur: introduction.onBlur }}
            labelIcon={<QuestionMark fillcolor={"fill-primary-color-P4"} />}
          />
        </div>
      </InputLeftStickStatus>

      <SplitDynamicErrorZod message={introductionError?.message} />
    </div>
  );
};

export default AboutYourSelfIntro;
