import CustomNextUiTextarea from "../../Globals/CustomNextUiTextarea";
import InputBGWrapperIcon from "../../Globals/InputBGWrapperIcon";
import CustomNextUiInput from "../../Globals/CustomNextUiInput";

// Next ui imports
import {
  Calendar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  Button,
  DropdownItem,
} from "@nextui-org/react";
import { CalendarDate } from "@internationalized/date";

// Icons
import {
  CalendarAddIcon,
  CheckedDocumentIcon,
  ChevronDownBigIcon,
  LuggageBiggerIcon,
  TopArrowCloudIcon,
  TrashBinIcon,
} from "../../Icons";

import { ErrorMultipleZodResponse } from "../../Globals/ErrorMessageiPractis";
import { findInputMultipleErrorZod } from "@/src/lib/utils/getZodValidations";
import { useState } from "react";

const IndividualExperience = ({
  handleDeleteExperience,
  handleUpdateExperience,
  experience,
  errors,
  index,
}) => {
  const [image, setImage] = useState({});
  const certainExperiencePosition = experience?.index === index;

  const handleInputChange = (field, value) => {
    const updatedExperience = { ...experience, [field]: value };
    handleUpdateExperience(index, updatedExperience);
  };

  return (
    <div className="mb-8">
      <div className="flex items-center gap-2.5">
        {/* Company */}
        <div className="flex-[50%]">
          <CustomNextUiInput
            value={experience?.company}
            onChange={(e) => handleInputChange("company", e.target.value)}
            type="text"
            name="company"
            placeholder="Example: Google"
            startContent={
              <InputBGWrapperIcon>
                <LuggageBiggerIcon fillColor={"fill-primary-color-P4"} />
              </InputBGWrapperIcon>
            }
            classNames={{
              inputWrapper:
                certainExperiencePosition &&
                findInputMultipleErrorZod(errors, "company", 2)?.message &&
                "form-input-error",
            }}
          />
        </div>

        {/* Calendar FROM */}
        <div className="flex-1">
          <CustomNextUiInput
            type="text"
            value={experience?.from}
            name="from"
            placeholder="From"
            startContent={
              <InputBGWrapperIcon>
                <CalendarAddIcon fillColor={"fill-primary-color-P4"} />
              </InputBGWrapperIcon>
            }
            endContent={
              <Dropdown
                classNames={{
                  content: "p-0",
                }}
                closeOnSelect={false}
              >
                <DropdownTrigger>
                  <Button
                    className="data-[hover=true]:opacity-100 border-0 min-w-fit bg-primary-color-P12 animation-fade flex justify-center items-center w-9 h-9 p-0 px-1.5 rounded-[10px]"
                    variant="flat"
                    type="button"
                  >
                    <ChevronDownBigIcon fillColor={"fill-primary-color-P4"} />
                  </Button>
                </DropdownTrigger>

                <DropdownMenu
                  className="p-0 h-0"
                  itemClasses={{
                    base: "data-[hover=true]:bg-transparent",
                  }}
                >
                  <DropdownItem className="p-0">
                    <Calendar
                      onChange={(date) => {
                        let validDate = new CalendarDate(
                          date?.year,
                          date?.month,
                          date?.day
                        );

                        handleInputChange("from", validDate?.toString());
                      }}
                      disableAnimation
                    />
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            }
            classNames={{
              inputWrapper:
                certainExperiencePosition &&
                findInputMultipleErrorZod(errors, "from", 2)?.message &&
                "form-input-error",
            }}
          />
        </div>

        {/* Calendar TO */}
        <div className="flex-1">
          <CustomNextUiInput
            type="text"
            value={experience?.to}
            name="to"
            placeholder="To"
            startContent={
              <InputBGWrapperIcon>
                <CalendarAddIcon fillColor={"fill-primary-color-P4"} />
              </InputBGWrapperIcon>
            }
            endContent={
              <Dropdown
                classNames={{
                  content: "p-0",
                }}
                closeOnSelect={false}
              >
                <DropdownTrigger>
                  <Button
                    className="data-[hover=true]:opacity-100 border-0 min-w-fit bg-primary-color-P12 animation-fade flex justify-center items-center w-9 h-9 p-0 px-1.5 rounded-[10px]"
                    variant="flat"
                    type="button"
                  >
                    <ChevronDownBigIcon fillColor={"fill-primary-color-P4"} />
                  </Button>
                </DropdownTrigger>

                <DropdownMenu
                  className="p-0 h-0"
                  itemClasses={{
                    base: "data-[hover=true]:bg-transparent",
                  }}
                >
                  <DropdownItem className="p-0">
                    <Calendar
                      onChange={(date) => {
                        let validDate = new CalendarDate(
                          date?.year,
                          date?.month,
                          date?.day
                        );

                        handleInputChange("to", validDate?.toString());
                      }}
                      disableAnimation
                    />
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            }
            classNames={{
              inputWrapper:
                certainExperiencePosition &&
                findInputMultipleErrorZod(errors, "to", 2)?.message &&
                "form-input-error",
            }}
          />
        </div>

        {/* Download */}
        <div className="flex-1">
          <button type="button" className="relative">
            <input
              className="opacity-0 absolute inset-0 z-10 cursor-pointer"
              onChange={(e) => setImage(e.target.files[0])}
              accept=".pdf, image/png, image/jpeg"
              name="uploadExperienceFile"
              type="file"
            />

            <InputBGWrapperIcon
              className={`${
                certainExperiencePosition &&
                findInputMultipleErrorZod(errors, "uploadExperienceFile", 2)
                  ?.message
                  ? "form-input-error"
                  : "bg-primary-color-P11"
              } btn-septenary rounded-2xl w-[48px] h-[48px] cursor-pointer`}
            >
              {image?.name ? (
                <CheckedDocumentIcon fillColor={"fill-primary-color-P4"} />
              ) : (
                <TopArrowCloudIcon fillColor={"fill-primary-color-P4"} />
              )}
            </InputBGWrapperIcon>
          </button>
        </div>

        {/* Recycle bin */}
        <div className="flex-1">
          <button type="button" onClick={() => handleDeleteExperience(index)}>
            <InputBGWrapperIcon
              className={
                "btn-septenary rounded-2xl bg-primary-color-P11 w-[48px] h-[48px]"
              }
            >
              <TrashBinIcon
                strokeColor={"stroke-primary-color-P4"}
                fillColor={"fill-primary-color-P4"}
              />
            </InputBGWrapperIcon>
          </button>
        </div>
      </div>

      {certainExperiencePosition && (
        <>
          <ErrorMultipleZodResponse
            fieldName={"company"}
            errors={errors}
            pathIndex={2}
          />

          <ErrorMultipleZodResponse
            fieldName={"from"}
            errors={errors}
            pathIndex={2}
          />

          <ErrorMultipleZodResponse
            fieldName={"to"}
            errors={errors}
            pathIndex={2}
          />

          <ErrorMultipleZodResponse
            fieldName={"uploadExperienceFile"}
            errors={errors}
            pathIndex={2}
          />
        </>
      )}

      {/* Description */}
      <CustomNextUiTextarea
        value={experience?.description}
        onChange={(e) => handleInputChange("description", e.target.value)}
        classNames={{
          base: "mt-2.5",
          inputWrapper:
            certainExperiencePosition &&
            findInputMultipleErrorZod(errors, "description", 2)?.message &&
            "form-input-error",
          input: "h-[150px]",
        }}
        placeholder="Enter a text"
        size="primaryiPractis"
        name="description"
        disableAutosize
      />

      {certainExperiencePosition && (
        <ErrorMultipleZodResponse
          fieldName={"description"}
          pathIndex={2}
          errors={errors}
        />
      )}
    </div>
  );
};

export default IndividualExperience;
