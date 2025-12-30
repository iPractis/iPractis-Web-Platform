import { useController } from "react-hook-form";

import { getInputStatusBorder } from "@/src/lib/utils/getInputStatusBorder";
import { SplitDynamicErrorZod } from "@/src/lib/utils/getZodValidations";
import CustomNextUiInput from "../../Shared/CustomNextUiInput";
import InputBGWrapperIcon from "../../Shared/InputBGWrapperIcon";
import InputLeftStickStatus from "../../Shared/InputLeftStickStatus";
import { CustomNextUiTextareaWithMaxLength } from "../../Shared/MaxFormLengthFields";

import { TrashBinIcon, UserSpeakingRightIcon } from "../../Icons";

const SubSubject = ({
  handleDeleteSelectedSubSuject,
  subSubject,
  control,
  errors,
  index,
  name,
}) => {
  const {
    field: selectedField,
    fieldState: { error: selectedError },
  } = useController({
    name: `${name}.${index}.selected`,
    defaultValue: subSubject?.selected || "",
    control,
  });

  const {
    field: descriptionField,
    fieldState: { error: descriptionError },
  } = useController({
    name: `${name}.${index}.description`,
    defaultValue: subSubject?.description || "",
    control,
  });

  const descriptionTextOnChange = (e) => {
    const textValue = e?.target?.value;

    if (textValue?.length <= 1000) {
      descriptionField.onChange(textValue);
    }
  };

  return (
    <div>
      <div className="flex items-end mb-2.5 gap-2">
        {/* Sub-subject name input */}
        <div className="flex-1">
          <InputLeftStickStatus
            inputBarStatusClassName={`${getInputStatusBorder(
              errors,
              selectedField.value,
              `subSubject.${index}.selected`
            )}`}
          >
            <CustomNextUiInput
              name="selectedSubSubject"
              placeholder="Conversational"
              startContent={
                <InputBGWrapperIcon>
                  <UserSpeakingRightIcon
                    fillcolor={"fill-primary-color-P4"}
                  />
                </InputBGWrapperIcon>
              }
              type="text"
              value={selectedField.value}
              onChange={selectedField.onChange}
              onBlur={selectedField.onBlur}
              classNames={{
                inputWrapper: "!bg-[#f8f7f5]"
              }}
            />
          </InputLeftStickStatus>

          <SplitDynamicErrorZod message={selectedError?.message} />
        </div>

        {/* Delete button */}
        <button
          className="bg-[#f8f7f5] hover:bg-secondary-color-S9 animation-fade flex justify-center items-center w-12 h-12 p-3 rounded-2xl"
          onClick={() => handleDeleteSelectedSubSuject(index)}
          type="button"
        >
          <TrashBinIcon
            fillcolor={"fill-primary-color-P4"}
            strokeColor={"stroke-primary-color-P4"}
          />
        </button>
      </div>

      {/* Enter a text - textarea */}
      <div>
        <InputLeftStickStatus
          inputBarStatusClassName={`${getInputStatusBorder(
            errors,
            descriptionField.value,
            `subSubject.${index}.description`
          )} top-[75px] h-[129px]`}
        >
          <CustomNextUiTextareaWithMaxLength
            backgroundError={descriptionError?.message && "form-input-error"}
            descError={"The text cannot exceed 1000 characters."}
            inputProps={{ onBlur: descriptionField.onBlur }}
            inputClassName={"h-[150px] resize-y"}
            typeError={"Max Length Exceeded"}
            onChange={descriptionTextOnChange}
            value={descriptionField.value}
            nameTextarea={"description"}
            placeholder={"Enter a description"}
            maxCharactersLength={1000}
            labelDisabled={true}
          />
        </InputLeftStickStatus>

        <SplitDynamicErrorZod message={descriptionError?.message} />
      </div>
    </div>
  );
};

export default SubSubject;
