// Images && icons
import { CustomNextUiTextareaWithMaxLength } from "../../Globals/MaxFormLengthFields";
import { UserSpeakingRightIcon, TrashBinIcon } from "../../Icons";
import InputBGWrapperIcon from "../../Globals/InputBGWrapperIcon";
import CustomNextUiInput from "../../Globals/CustomNextUiInput";

const SubSubject = ({
  handleDeleteSelectedSubSuject,
  descriptionSubSubjectOnChange,
  descriptionSubSubject,
  selectedSubSubject,
  selected,
}) => {
  return (
    <div>
      <div className="flex items-end mt-10 mb-2.5 gap-2">
        {/* Selected sub-subject */}
        <CustomNextUiInput
          isReadOnly
          type="text"
          defaultValue={selectedSubSubject}
          name="selectedSubSuject"
          className="pointer-events-none"
          placeholder="Selected sub-subject"
          startContent={
            <InputBGWrapperIcon>
              <UserSpeakingRightIcon fillColor={"fill-primary-color-P4"} />
            </InputBGWrapperIcon>
          }
        />

        <button
          className="bg-primary-color-P11 hover:bg-secondary-color-S9 animation-fade flex justify-center items-center w-12 h-12 p-3 rounded-2xl"
          onClick={() => handleDeleteSelectedSubSuject(selected)}
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
        nameTextarea={"descriptionSubjectToTeach"}
        inputClassName={"h-[150px]"}
        value={descriptionSubSubject}
        onChange={(e) => descriptionSubSubjectOnChange(e, selected)}
        placeholder={"Enter a text"}
        maxCharactersLength={20}
        typeError={"Max Length Exceeded"}
        descError={"The text cannot exceed 20 characters."}
        labelDisabled={true}
      />
    </div>
  );
};

export default SubSubject;
