import { CustomNextUiCheckbox } from "../../Globals/CustomNextUiCheckbox";
import InputBGWrapperIcon from "../../Globals/InputBGWrapperIcon";
import { FemaleIcon, MaleIcon, QuestionMark } from "../../Icons";
import CustomNextUiInput from "../../Globals/CustomNextUiInput";
import { useState } from "react";

const PersonalInfoGenderCheck = () => {
  const [selectedGender, setSelectedGender] = useState(null);

  const handleCheckboxChange = (gender) => {
    setSelectedGender(gender);
  };

  return (
    <div className="!mt-6">
      <div className="flex gap-4 items-end">
        <CustomNextUiInput
          isReadOnly
          type="text"
          placeholder="Male"
          label={
            <span className="flex gap-1.5 items-center">
              Gender <QuestionMark fillColor={"fill-primary-color-P4"} />
            </span>
          }
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
        />

        <CustomNextUiInput
          isReadOnly
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
        />
      </div>
    </div>
  );
};

export default PersonalInfoGenderCheck;
