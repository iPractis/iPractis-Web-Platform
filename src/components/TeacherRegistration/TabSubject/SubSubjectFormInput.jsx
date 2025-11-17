import { CustomNextUiTextareaWithMaxLength } from "../../Shared/MaxFormLengthFields";
import { getInputStatusBorder } from "@/src/lib/utils/getInputStatusBorder";
import { SplitDynamicErrorZod } from "@/src/lib/utils/getZodValidations";
import InputLeftStickStatus from "../../Shared/InputLeftStickStatus";
import InputBGWrapperIcon from "../../Shared/InputBGWrapperIcon";
import CustomNextUiInput from "../../Shared/CustomNextUiInput";

// External imports
import { useController } from "react-hook-form";

// Icons
import {
  UserSpeakingRightIcon,
  TrashBinIcon,
} from "../../Icons";

const SubSubjectFormInput = ({
  handleDelete,
  control,
  errors,
  array,
  index,
  item,
}) => {
  const {
    field: selectedField,
    fieldState: { error: selectedError },
  } = useController({
    name: `${array}.${index}.selected`,
    control: control,
    defaultValue: item?.selected,
  });

  const {
    field: descriptionField,
    fieldState: { error: descriptionError },
  } = useController({
    name: `${array}.${index}.description`,
    control: control,
    defaultValue: item?.description,
  });

  const descriptionTextOnChange = (e) => {
    const textValue = e?.target?.value;
    if (textValue?.length <= 1000) {
      descriptionField.onChange(textValue);
    }
  };

  return (
    <div className="mb-8 ml-2">
      {/* Sub-subject Name with Delete Button */}
      <div className="flex items-center gap-2.5 mb-2.5">
        <div className="flex-1">
          <InputLeftStickStatus
            inputBarStatusClassName={`${getInputStatusBorder(
              errors,
              selectedField.value,
              `${array}.${index}.selected`
            )}`}
          >
            <CustomNextUiInput
              classNames={{
                inputWrapper: `${selectedError?.message ? "form-input-error" : ""} !bg-[#f8f7f5] data-[hover=true]:!bg-[#f8f7f5] data-[focus=true]:!bg-[#f8f7f5]`,
              }}
              placeholder="Enter sub-subject name"
              startContent={
                <InputBGWrapperIcon>
                  <UserSpeakingRightIcon fillcolor={"fill-primary-color-P4"} />
                </InputBGWrapperIcon>
              }
              {...selectedField}
              type="text"
            />
          </InputLeftStickStatus>
        </div>

        {/* Delete Button */}
        <div className="flex-shrink-0">
          <button type="button" onClick={() => handleDelete(index)}>
            <InputBGWrapperIcon
              className={"btn-septenary rounded-2xl bg-[#f8f7f5] w-[48px] h-[48px]"}
            >
              <TrashBinIcon strokeColor={"stroke-primary-color-P4"} fillcolor={"fill-primary-color-P4"} />
            </InputBGWrapperIcon>
          </button>
        </div>
      </div>

      <SplitDynamicErrorZod message={selectedError?.message} />

      {/* Description */}
      <div className="mt-2.5">
        <InputLeftStickStatus
          inputBarStatusClassName={`${getInputStatusBorder(
            errors,
            descriptionField.value,
            `${array}.${index}.description`
          )} h-[129px] ${
            descriptionField?.value?.length === 1000 ? "top-[32%]" : "top-[46%]"
          }`}
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
            maxCharactersLengthText={1000}
            labelDisabled={true}
          />
        </InputLeftStickStatus>

        <SplitDynamicErrorZod message={descriptionError?.message} />
      </div>
    </div>
  );
};

export default SubSubjectFormInput;