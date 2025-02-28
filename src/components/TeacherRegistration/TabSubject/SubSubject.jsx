import { CustomNextUiTextareaWithMaxLength } from "../../Shared/MaxFormLengthFields";
import InputBGWrapperIcon from "../../Shared/InputBGWrapperIcon";
import CustomNextUiInput from "../../Shared/CustomNextUiInput";

// External imports
import { Controller } from "react-hook-form";

// Icons
import { UserSpeakingRightIcon, TrashBinIcon } from "../../Icons";

const SubSubject = ({
  handleDeleteSelectedSubSuject,
  handleUpdateSubSubject,
  subSubject,
  control,
  index,
  name,
}) => {
  return (
    <div>
      <div className="flex items-end mt-10 mb-2.5 gap-2">
        {/* Selected sub-subject */}
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
                  <UserSpeakingRightIcon fillColor={"fill-primary-color-P4"} />
                </InputBGWrapperIcon>
              }
              type="text"
              {...field}
              isReadOnly
            />
          )}
        />

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
      <Controller
        name={`${name}.${index}.description`}
        defaultValue={subSubject?.description}
        control={control}
        render={({ field }) => (
          <CustomNextUiTextareaWithMaxLength
            onChange={(e) => {
              field.onChange(e);
              
              handleUpdateSubSubject(index, {
                ...subSubject,
                description: e.target.value,
              });
            }}
            descError={"The text cannot exceed 20 characters."}
            typeError={"Max Length Exceeded"}
            nameTextarea={"description"}
            inputClassName={"h-[150px]"}
            placeholder={"Enter a text"}
            maxCharactersLengthText={2}
            maxCharactersLength={20}
            labelDisabled={true}
            {...field}
            // backgroundError={
            //   errors?.[name]?.[index]?.description?.message && "form-input-error"
            // }
          />
        )}
      />
    </div>
  );
};

export default SubSubject;
