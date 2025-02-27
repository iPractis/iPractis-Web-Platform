// Images && icons
import { CustomNextUiTextareaWithMaxLength } from "../../Shared/MaxFormLengthFields";
import { UserSpeakingRightIcon, TrashBinIcon } from "../../Icons";
import InputBGWrapperIcon from "../../Shared/InputBGWrapperIcon";
import CustomNextUiInput from "../../Shared/CustomNextUiInput";
import { useState } from "react";

const SubSubject = ({
  handleDeleteSelectedSubSuject,
  handleUpdateSubSubject,
  subSubject,
  errors,
  index,
}) => {
  const [descriptionSubSubject, setDescriptionSubSubject] = useState("");

  const handleInputChange = (field, value) => {
    if (value?.length > 20) return;

    const updatedEducation = { ...subSubject, [field]: value };

    handleUpdateSubSubject(index, updatedEducation);

    setDescriptionSubSubject(value);
  };

  return (
    <div>
      <div className="flex items-end mt-10 mb-2.5 gap-2">
        {/* Selected sub-subject */}
        <CustomNextUiInput
          isReadOnly
          type="text"
          name="selectedSubSuject"
          className="pointer-events-none"
          placeholder="Selected sub-subject"
          defaultValue={subSubject?.selected}
          startContent={
            <InputBGWrapperIcon>
              <UserSpeakingRightIcon fillColor={"fill-primary-color-P4"} />
            </InputBGWrapperIcon>
          }
        />

        <button
          className="bg-primary-color-P11 hover:bg-secondary-color-S9 animation-fade flex justify-center items-center w-12 h-12 p-3 rounded-2xl"
          onClick={() => handleDeleteSelectedSubSuject(subSubject?.selected)}
          type="button"
        >
          <TrashBinIcon
            fillColor={"fill-primary-color-P4"}
            strokeColor={"stroke-primary-color-P4"}
          />
        </button>
      </div>

      {/* Enter a text - textarea */}
      <CustomNextUiTextareaWithMaxLength
        nameTextarea={"description"}
        inputClassName={"h-[150px]"}
        value={descriptionSubSubject}
        onChange={(e) =>
          handleInputChange("description", e?.target?.value)
        }
        placeholder={"Enter a text"}
        maxCharactersLength={20}
        typeError={"Max Length Exceeded"}
        descError={"The text cannot exceed 20 characters."}
        labelDisabled={true}
        maxCharactersLengthText={2}
        // backgroundError={
        //   findInputMultipleErrorZod(errors, getFieldName("description", index))
        //     ?.message && "form-input-error"
        // }
      />
    </div>
  );
};

export default SubSubject;
