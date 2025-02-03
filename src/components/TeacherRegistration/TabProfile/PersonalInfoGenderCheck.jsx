import { CustomNextUiCheckbox } from "../../Globals/CustomNextUiCheckbox";
import { ErrorZodResponse } from "../../Globals/ErrorMessageiPractis";
import InputBGWrapperIcon from "../../Globals/InputBGWrapperIcon";
import CustomNextUiInput from "../../Globals/CustomNextUiInput";
import { FemaleIcon, MaleIcon } from "../../Icons";

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
    <div className="!mt-6">
      <div className="flex gap-4 items-end">
        <CustomNextUiInput
          isReadOnly
          type="text"
          name="gender"
          placeholder="Male"
          label={<span className="">Gender</span>}
          labelPlacement="outside"
          startContent={
            <InputBGWrapperIcon>
              <MaleIcon />
            </InputBGWrapperIcon>
          }
          endContent={
            <CustomNextUiCheckbox
              className="checkbox-label-ipractis"
              isSelected={selectedGender === "male"}
              onChange={() => handleCheckboxChange("male")}
            />
          }
          classNames={{
            inputWrapper:
              findInputErrorZod(errors, "gender")?.message &&
              "form-input-error",
          }}
        />

        <CustomNextUiInput
          isReadOnly
          name="gender"
          type="text"
          placeholder="Female"
          labelPlacement="outside"
          startContent={
            <InputBGWrapperIcon>
              <FemaleIcon />
            </InputBGWrapperIcon>
          }
          endContent={
            <CustomNextUiCheckbox
              className="checkbox-label-ipractis"
              isSelected={selectedGender === "female"}
              onChange={() => handleCheckboxChange("female")}
            />
          }
          classNames={{
            inputWrapper:
              findInputErrorZod(errors, "gender")?.message &&
              "form-input-error",
          }}
        />
      </div>

      <ErrorZodResponse errors={errors} fieldName={"gender"} />
    </div>
  );
};

export default PersonalInfoGenderCheck;
