import { CustomNextUiCheckbox } from "../../Shared/CustomNextUiCheckbox";
import { ErrorZodResponse } from "../../Shared/ErrorMessageiPractis";
import InputBGWrapperIcon from "../../Shared/InputBGWrapperIcon";
import CustomNextUiInput from "../../Shared/CustomNextUiInput";

import { PersonIcon, QuestionMark } from "../../Icons";

const PersonalInfoGenderCheck = ({
  findInputErrorZod,
  setSelectedGender,
  selectedGender,
  errors,
}) => {
  const handleCheckboxChange = (gender) => {
    setSelectedGender(gender);
  };

  return (
    <div className="!mt-4">
      <span className="flex gap-1.5 items-center MT-SB-1 mb-1 text-primary-color-P4">
        Gender <QuestionMark fillColor={"fill-primary-color-P4"} />
      </span>

      <div className="flex items-center gap-2">
        <div
          className={`flex items-center gap-1.5 rounded-2xl p-1.5 ST-3 bg-primary-color-P11 group-hover:bg-secondary-color-S9"
          }`}
        >
          <InputBGWrapperIcon>
            <PersonIcon fillColor={"fill-primary-color-P4"} />
          </InputBGWrapperIcon>

          <CustomNextUiInput
            isReadOnly
            type="text"
            name="gender"
            placeholder="Male"
            labelPlacement="outside"
            endContent={
              <CustomNextUiCheckbox
                className="checkbox-label-ipractis"
                isSelected={selectedGender === "male"}
                onChange={() => handleCheckboxChange("male")}
                size="sm"
              />
            }
            classNames={{
              input: "!px-1.5", 
              inputWrapper: findInputErrorZod(errors, "gender")?.message
                ? "form-input-error"
                : "!bg-primary-color-P12",
            }}
          />

          <CustomNextUiInput
            isReadOnly
            name="gender"
            type="text"
            placeholder="Female"
            labelPlacement="outside"
            endContent={
              <CustomNextUiCheckbox
                className="checkbox-label-ipractis"
                isSelected={selectedGender === "female"}
                onChange={() => handleCheckboxChange("female")}
                size="sm"
              />
            }
            classNames={{
              input: "!px-1.5", 
              inputWrapper: findInputErrorZod(errors, "gender")?.message
                ? "form-input-error"
                : "!bg-primary-color-P12",
            }}
          />
        </div>
      </div>

      <ErrorZodResponse errors={errors} fieldName={"gender"} />
    </div>
  );
};

export default PersonalInfoGenderCheck;
