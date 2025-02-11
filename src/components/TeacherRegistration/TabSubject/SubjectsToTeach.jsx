import { teachingSubjects } from "@/src/data/dataTeacherRegistration";
import InputBGWrapperIcon from "../../Globals/InputBGWrapperIcon";
import SectionHeader from "../../Globals/SectionHeader";
import { Select, SelectItem } from "@nextui-org/react";
import ProfileTitle from "./ProfileTitle";
import { useState } from "react";

// Images && icons
import {
  ChevronDownBigIcon,
  NotebookOpenedIconBigger,
  QuestionMark,
  UserBoxIcon,
} from "../../Icons";

import { ErrorZodResponse } from "../../Globals/ErrorMessageiPractis";
import { findInputErrorZod } from "@/src/lib/utils/getZodValidations";
import { CustomNextUiTextareaWithMaxLength } from "../../Globals/MaxFormLengthFields";

const SubjectsToTeach = ({
  setSubjectToTeach,
  subjectToTeach,
  errors,
  draft,
}) => {
  const [descText, setDescText] = useState(draft?.subjectIntroduction);
  const [isOpen, setIsOpen] = useState();

  const descTextOnChange = (e) => {
    const textValue = e?.target?.value;

    if (textValue?.length <= 1000) return setDescText(textValue);
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

      <div className="space-y-[50px] md:px-8">
        <div className="grid grid-cols-2 gap-[50px] items-end">
          {/* Select subject to teach */}
          <div>
            <div className="flex items-end gap-2 mt-20">
              <Select
                name="subject"
                label={
                  <div className="flex flex-col mb-2">
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
                onOpenChange={(open) => open !== isOpen && setIsOpen(open)}
                selectedKeys={[subjectToTeach]}
                labelPlacement="outside"
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
                    "select-wrapper-ipractis",
                    findInputErrorZod(errors, "subject")?.message &&
                      "form-input-error",
                  ],
                  innerWrapper: ["select-ipractis", "w-full"],
                  value: [
                    "group-data-[has-value=true]:text-primary-color-P4 text-primary-color-P4 ST-3",
                  ],
                  listbox: ["text-primary-color-P4"],
                }}
                onChange={(e) => setSubjectToTeach(e.target.value)}
              >
                {teachingSubjects?.map((teachingSubject) => (
                  <SelectItem key={teachingSubject} value={teachingSubject}>
                    {teachingSubject}
                  </SelectItem>
                ))}
              </Select>
            </div>

            <ErrorZodResponse errors={errors} fieldName={"subject"} />
          </div>

          {/* Profile title and description */}
          <ProfileTitle errors={errors} draft={draft} />
        </div>

        <div>
          <CustomNextUiTextareaWithMaxLength
            defaultValue={draft?.subjectIntroduction}
            labelTitle={"Subject Introduction"}
            labelSubtitle={
              "Describe your teaching methods, experience, and expertise in this subject."
            }
            labelClassName={"!top-3"}
            nameTextarea={"subjectIntroduction"}
            inputClassName={"h-[150px]"}
            value={descText}
            onChange={descTextOnChange}
            placeholder={"Enter a description"}
            maxCharactersLength={1000}
            typeError={"Max Length Exceeded"}
            descError={"The text cannot exceed 1000 characters."}
            labelDisabled={false}
            backgroundError={
              findInputErrorZod(errors, "subjectIntroduction")?.message
            }
          />

          <ErrorZodResponse errors={errors} fieldName={"subjectIntroduction"} />
        </div>
      </div>
    </div>
  );
};

export default SubjectsToTeach;
