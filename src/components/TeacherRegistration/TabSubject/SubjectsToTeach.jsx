import { CustomNextUiTextareaWithMaxLength } from "../../Shared/MaxFormLengthFields";
import { SplitDynamicErrorZod } from "../../../lib/utils/getZodValidations";
import { getInputStatusBorder } from "@/src/lib/utils/getInputStatusBorder";
import { teachingSubjects } from "@/src/data/dataTeacherRegistration";
import InputLeftStickStatus from "../../Shared/InputLeftStickStatus";
import InputBGWrapperIcon from "../../Shared/InputBGWrapperIcon";
import SectionHeader from "../../Shared/SectionHeader";
import ProfileTitle from "./ProfileTitle";

// External imports
import { useController } from "react-hook-form";
import { Select, SelectItem } from "@nextui-org/react";

// React imports
import { useState } from "react";

// Images && icons
import {
  ChevronDownBigIcon,
  NotebookOpenedIconBigger,
  QuestionMark,
  UserBoxIcon,
} from "../../Icons";

const SubjectsToTeach = ({ errors, control }) => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    field: subjectIntroduction,
    fieldState: { error: subjectIntroductionError },
  } = useController({
    name: "subjectIntroduction",
    control,
  });

  const {
    field: subject,
    fieldState: { error: errorSubject },
  } = useController({
    name: "subject",
    control,
  });

  const descTextOnChange = (e) => {
    const textValue = e?.target?.value;

    if (textValue?.length <= 1000) {
      subjectIntroduction.onChange(textValue);
    }
  };

  return (
    <div>
      <SectionHeader
        descriptionText="Remember, students rely on this information to choose their teacher."
        wrapperSectionHeaderClassName="bg-primary-color-P11 p-8 rounded-[22px]"
        titleIcon={<UserBoxIcon fillColor={"fill-primary-color-P1"} />}
        titleText="Set up your teaching subject"
        titleClassName="MT-SB-1"
      />

      <div className="space-y-[40px] md:px-8">
        <div className="grid md:grid-cols-2 grid-cols-1 md:gap-[50px] gap-20 mt-[90px]">
          {/* Select subject to teach */}
          <div>
            <InputLeftStickStatus
              inputBarStatusClassName={`${getInputStatusBorder(
                errors,
                subject.value,
                "subject"
              )} ${errorSubject?.message && "top-[20%]"}`}
            >
              <Select
                selectedKeys={new Set([subject.value])}
                onSelectionChange={(keys) => {
                  const key = Array.from(keys)[0];
                  subject.onChange(key);
                }}
                onOpenChange={(open) => {
                  setIsOpen(open);

                  if (!open) {
                    subject.onBlur();
                  }
                }}
                labelPlacement="outside"
                label={
                  <div className="flex flex-col mb-2 ps-1.5">
                    <span className="flex gap-1.5 items-center text-primary-color-P4 MT-SB-1">
                      Select the subject you wish to teach{" "}
                      <QuestionMark fillColor={"fill-primary-color-P4"} />
                    </span>

                    <div className="self-start">
                      <span className=" text-primary-color-P4 ST-3">
                        You can teach only one subject.
                      </span>
                    </div>
                  </div>
                }
                placeholder="Select a teaching subject"
                selectorIcon={<span></span>}
                isOpen={isOpen}
                startContent={
                  <InputBGWrapperIcon>
                    <NotebookOpenedIconBigger
                      fillColor={"fill-primary-color-P4"}
                    />
                  </InputBGWrapperIcon>
                }
                endContent={
                  <InputBGWrapperIcon>
                    <ChevronDownBigIcon fillColor={"fill-primary-color-P1"} />
                  </InputBGWrapperIcon>
                }
                classNames={{
                  trigger: [
                    "select-wrapper-ipractis min-h-fit",
                    errorSubject?.message && "form-input-error",
                  ],
                  innerWrapper: ["select-ipractis w-full"],
                  value: [
                    "group-data-[has-value=true]:text-primary-color-P4 text-primary-color-P4 ST-3",
                  ],
                  listbox: ["text-primary-color-P4"],
                  base: "!mt-0",
                }}
              >
                {teachingSubjects?.map((teachingSubject) => (
                  <SelectItem key={teachingSubject} value={teachingSubject}>
                    {teachingSubject}
                  </SelectItem>
                ))}
              </Select>

              <SplitDynamicErrorZod
                message={
                  errorSubject?.message &&
                  "Invalid field --- You must select a subject."
                }
              />
            </InputLeftStickStatus>
          </div>

          {/* Profile title and description */}
          <ProfileTitle errors={errors} control={control} />
        </div>

        <div>
          <InputLeftStickStatus
            inputBarStatusClassName={`${getInputStatusBorder(
              errors,
              subjectIntroduction.value,
              "subjectIntroduction"
            )} -translate-y-0 top-[30%] h-[129px]`}
          >
            <CustomNextUiTextareaWithMaxLength
              labelTitle={"Subject Introduction"}
              labelSubtitle={
                "Describe your teaching methods, experience, and expertise in this subject."
              }
              labelClassName={"!top-3"}
              nameTextarea={"subjectIntroduction"}
              inputClassName={"h-[150px]"}
              value={subjectIntroduction.value}
              onChange={descTextOnChange}
              placeholder={"Enter a description"}
              maxCharactersLength={1000}
              typeError={"Max Length Exceeded"}
              descError={"The text cannot exceed 1000 characters."}
              labelDisabled={false}
              backgroundError={subjectIntroductionError?.message}
              inputProps={{ onBlur: subjectIntroduction.onBlur }}
            />
          </InputLeftStickStatus>

          <SplitDynamicErrorZod message={subjectIntroductionError?.message} />
        </div>
      </div>
    </div>
  );
};

export default SubjectsToTeach;
