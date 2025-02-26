import { DynamicInputErrorMessageWithZod } from "../../Shared/DynamicInputErrorMessageWithZod";
import { getLeftStickInputColorStatus } from "@/src/lib/utils/getLeftStickInputColorStatus";
import { CustomNextUiCheckbox } from "../../Shared/CustomNextUiCheckbox";
import InputLeftStickStatus from "../../Shared/InputLeftStickStatus";
import InputBGWrapperIcon from "../../Shared/InputBGWrapperIcon";
import CustomNextUiInput from "../../Shared/CustomNextUiInput";

// Icons
import { PersonIcon, QuestionMark } from "../../Icons";

const PersonalInfoGenderCheck = ({
  frontEndErrors,
  backEndErrors,
  setValue,
  watch,
}) => {
  const selectedGender = watch("gender");

  const handleCheckboxChange = (gender) => {
    setValue("gender", gender);
  };

  return (
    <div className="!mt-4">
      <span className="flex gap-1.5 items-center MT-SB-1 mb-1 text-primary-color-P4">
        Gender <QuestionMark fillColor={"fill-primary-color-P4"} />
      </span>

      <InputLeftStickStatus
        inputBarStatusClassName={getLeftStickInputColorStatus(
          frontEndErrors,
          backEndErrors,
          watch("gender"),
          "gender"
        )}
      >
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
                inputWrapper:
                  frontEndErrors?.gender?.type || backEndErrors?.message
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
                inputWrapper:
                  frontEndErrors?.gender?.type || backEndErrors?.message
                    ? "form-input-error"
                    : "!bg-primary-color-P12",
              }}
            />
          </div>
        </div>
      </InputLeftStickStatus>

      <DynamicInputErrorMessageWithZod
        frontEndErrors={frontEndErrors}
        backEndErrors={backEndErrors}
        fieldName="gender"
      />
    </div>
  );
};

export default PersonalInfoGenderCheck;
