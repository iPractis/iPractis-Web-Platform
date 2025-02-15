import CustomNextUiTextarea from "../../Shared/CustomNextUiTextarea";
import InputBGWrapperIcon from "../../Shared/InputBGWrapperIcon";
import CustomNextUiInput from "../../Shared/CustomNextUiInput";

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

import { findInputMultipleErrorZod } from "@/src/lib/utils/getZodValidations";
import { ErrorMultipleZodResponse } from "../../Shared/ErrorMessageiPractis";
import { useState } from "react";

const getFieldName = (fieldName, index) => {
  return ["careerExperience", index, fieldName];
};

const IndividualExperience = ({
  handleDeleteExperience,
  handleUpdateExperience,
  experience,
  errors,
  index,
}) => {
  const [image, setImage] = useState({});

  const handleInputChange = (field, value) => {
    const updatedExperience = { ...experience, [field]: value };
    handleUpdateExperience(index, updatedExperience);
  };

  const onImageChange = (e) => {
    const file = e.target.files[0];

    setImage(file);

    handleInputChange("uploadExperienceFile", file);
  };

  return (
    <div className="mb-8">
      <div className="flex items-center gap-2.5">
        {/* Company */}
        <div className="flex-[40%]">
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
                findInputMultipleErrorZod(
                  errors,
                  getFieldName("company", index)
                )?.message && "form-input-error",
            }}
          />
        </div>

        {/* Calendar FROM */}
        <div className="flex-[15%]">
          <CustomNextUiInput
            type="text"
            isReadOnly
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
                    className="data-[hover=true]:opacity-100 border-0 min-w-fit bg-primary-color-P12 animation-fade flex justify-center items-center w-9 h-9 p-0 px-1.5 rounded-[10px] shadow-none"
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
                findInputMultipleErrorZod(errors, getFieldName("from", index))
                  ?.message && "form-input-error",
            }}
          />
        </div>

        {/* Calendar TO */}
        <div className="flex-[15%]">
          <CustomNextUiInput
            type="text"
            isReadOnly
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
                    className="data-[hover=true]:opacity-100 border-0 min-w-fit bg-primary-color-P12 animation-fade flex justify-center items-center w-9 h-9 p-0 px-1.5 rounded-[10px] shadow-none"
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
                findInputMultipleErrorZod(errors, getFieldName("to", index))
                  ?.message && "form-input-error",
            }}
          />
        </div>

        {/* File (PDF, PNG, JPEG) */}
        <div className="flex-1">
          <label className="relative cursor-pointer">
            <input
              className="opacity-0 absolute inset-0 z-10 cursor-pointer"
              onChange={onImageChange}
              accept=".pdf, .png, .jpeg"
              name="uploadExperienceFile"
              type="file"
            />

            <InputBGWrapperIcon
              className={`${
                findInputMultipleErrorZod(
                  errors,
                  getFieldName("uploadExperienceFile", index)
                )?.message
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
          </label>
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

      <ErrorMultipleZodResponse
        fieldName={getFieldName("company", index)}
        errors={errors}
      />

      <ErrorMultipleZodResponse
        fieldName={getFieldName("from", index)}
        errors={errors}
      />

      <ErrorMultipleZodResponse
        fieldName={getFieldName("to", index)}
        errors={errors}
      />

      <ErrorMultipleZodResponse
        fieldName={getFieldName("uploadExperienceFile", index)}
        errors={errors}
      />

      {/* Description */}
      <CustomNextUiTextarea
        value={experience?.description}
        onChange={(e) => handleInputChange("description", e.target.value)}
        classNames={{
          base: "mt-2.5",
          inputWrapper:
            findInputMultipleErrorZod(
              errors,
              getFieldName("description", index)
            )?.message && "form-input-error",
          input: "h-[150px]",
        }}
        placeholder="Enter a text"
        size="primaryiPractis"
        name="description"
        disableAutosize
      />

      <ErrorMultipleZodResponse
        fieldName={getFieldName("description", index)}
        errors={errors}
      />
    </div>
  );
};

export default IndividualExperience;
