import { CustomNextUiTextareaWithMaxLength } from "../../Shared/MaxFormLengthFields";
import { getInputStatusBorder } from "@/src/lib/utils/getInputStatusBorder";
import { SplitDynamicErrorZod } from "@/src/lib/utils/getZodValidations";
import InputLeftStickStatus from "../../Shared/InputLeftStickStatus";
import InputBGWrapperIcon from "../../Shared/InputBGWrapperIcon";
import CustomNextUiInput from "../../Shared/CustomNextUiInput";

// External imports
import { Controller, useController } from "react-hook-form";

// Icons
import { UserSpeakingRightIcon, TrashBinIcon } from "../../Icons";

const SubSubject = ({
  handleDeleteSelectedSubSuject,
  subSubject,
  control,
  errors,
  index,
  name,
}) => {
  const {
    field: descriptionField,
    fieldState: { error: descriptionError },
  } = useController({
    name: `${name}.${index}.description`,
    defaultValue: subSubject?.description,
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
      <div className="flex items-end mt-10 mb-2.5 gap-2">
        {/* Selected sub-subject */}
        <div className="flex-1">
          <InputLeftStickStatus
            inputBarStatusClassName={`${getInputStatusBorder(
              errors,
              subSubject?.selected,
              `subSubject.${index}.selected`
            )}`}
          >
            <Controller
              name={`${name}.${index}.selected`}
              defaultValue={subSubject?.selected}
              control={control}
              render={({ field }) => (
                <CustomNextUiInput
                  name="selectedSubSuject"
                  className="pointer-events-none"
                  placeholder="Selected sub-subject"
                  startContent={
                    <InputBGWrapperIcon>
                      <UserSpeakingRightIcon
                        fillColor={"fill-primary-color-P4"}
                      />
                    </InputBGWrapperIcon>
                  }
                  type="text"
                  {...field}
                  isReadOnly
                />
              )}
            />
          </InputLeftStickStatus>
        </div>

        {/* Delete button */}
        <button
          className="bg-primary-color-P11 hover:bg-secondary-color-S9 animation-fade flex justify-center items-center w-12 h-12 p-3 rounded-2xl"
          onClick={() => handleDeleteSelectedSubSuject(index)}
          type="button"
        >
          <TrashBinIcon
            fillColor={"fill-primary-color-P4"}
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
            placeholder={"Enter a text"}
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
