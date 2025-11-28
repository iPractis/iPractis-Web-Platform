import { SplitDynamicErrorZod } from "../../../lib/utils/getZodValidations";
import { getInputStatusBorder } from "@/src/lib/utils/getInputStatusBorder";
import { CustomNextUiCheckbox } from "../../Shared/CustomNextUiCheckbox";
import InputLeftStickStatus from "../../Shared/InputLeftStickStatus";
import InputBGWrapperIcon from "../../Shared/InputBGWrapperIcon";
import CustomNextUiInput from "../../Shared/CustomNextUiInput";

// External imports
import { useController } from "react-hook-form";

// Icons
import { GenderIcon, QuestionMark, ManIcon, WomanIcon } from "../../Icons";

const PersonalInfoGenderCheck = ({ control, errors, watch }) => {
  const {
    field: gender,
    fieldState: { error: genderError },
  } = useController({
    name: "gender",
    control: control,
  });

  const selectedGender = watch("gender");

  const handleCheckboxChange = (gen) => {
    gender.onChange(gen);
  };

  return (
    <div>
      <span className="flex ps-[5px] gap-1.5 items-center ST-SB-4 mb-1 text-primary-color-P4 relative z-20">
        Gender <QuestionMark fillcolor={"fill-primary-color-P4"} />
      </span>

      <InputLeftStickStatus
        inputBarStatusClassName={getInputStatusBorder(
          errors,
          gender?.value,
          "gender"
        )}
      >
        <div className="flex items-center gap-2">
          <div
            className={`flex items-center gap-1.5 w-full rounded-2xl p-1.5 ST-3 bg-secondary-color-S11 group-hover:bg-secondary-color-S9`}
          >
            <InputBGWrapperIcon>
              <GenderIcon/>
            </InputBGWrapperIcon>

            <CustomNextUiInput
              isReadOnly
              type="text"
              name="gender"
              placeholder="Male"
              labelPlacement="outside"
              startContent={<div className="px-3"><ManIcon /></div>}
              endContent={
                <CustomNextUiCheckbox
                  className="checkbox-label-ipractis"
                  isSelected={selectedGender === "male"}
                  onChange={() => handleCheckboxChange("male")}
                  size="sm"
                />
              }
              classNames={{
                input: "!px-1.5 group",
                inputWrapper: genderError?.message
                  ? "form-input-error"
                  : "!bg-primary-color-P12 input-wrapper-ipractis-custom",
              }}
            />

            <CustomNextUiInput
              isReadOnly
              name="gender"
              type="text"
              placeholder="Female"
              labelPlacement="outside"
              startContent={<div className="px-3"><WomanIcon /></div>}
              endContent={
                <CustomNextUiCheckbox
                  className="checkbox-label-ipractis"
                  isSelected={selectedGender === "female"}
                  onChange={() => handleCheckboxChange("female")}
                  size="sm"
                />
              }
              classNames={{
                input: "!px-1.5 group",
                inputWrapper: genderError?.message
                  ? "form-input-error"
                  : "!bg-primary-color-P12 input-wrapper-ipractis-custom",
              }}
            />
          </div>
        </div>
      </InputLeftStickStatus>

      <SplitDynamicErrorZod message={genderError?.message} />
    </div>
  );
};

export default PersonalInfoGenderCheck;
