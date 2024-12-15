import InputBGWrapperIcon from "../../Globals/InputBGWrapperIcon";
import { FemaleIcon, MaleIcon, QuestionMark } from "../../Icons";
import CustomNextUiInput from "../../Globals/CustomNextUiInput";
import { Checkbox } from "@nextui-org/react";
import { useState } from "react";

const PersonalInfoGenderCheck = () => {
  const [selectedGender, setSelectedGender] = useState(null);

  const handleCheckboxChange = (gender) => {
    setSelectedGender(gender);
  };

  return (
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
          <Checkbox
            className="border border-red-500"
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
          <Checkbox
            isSelected={selectedGender === "female"}
            onChange={() => handleCheckboxChange("female")}
          />
        }
      />
    </div>
  );
};

export default PersonalInfoGenderCheck;
