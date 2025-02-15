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

// Icons
import {
  CalendarAddIcon,
  CheckedDocumentIcon,
  ChevronDownBigIcon,
  LuggageBiggerIcon,
  TopArrowCloudIcon,
  TrashBinIcon,
} from "../../Icons";
import { CalendarDate } from "@internationalized/date";

import { ErrorMultipleZodResponse } from "../../Shared/ErrorMessageiPractis";
import { findInputMultipleErrorZod } from "@/src/lib/utils/getZodValidations";
import { useState } from "react";

const IndividualEducation = ({
  handleDeleteEducation,
  handleUpdateEducation,
  education,
  errors,
  index,
}) => {
  const [image, setImage] = useState({});
  const certainEducationPosition = education?.index === index;

  const handleInputChange = (field, value) => {
    const updatedEducation = { ...education, [field]: value };
    handleUpdateEducation(index, updatedEducation);
  };

  return (
    <div className="mb-8">
      <div className="flex items-center gap-2.5">
        {/* Company */}
        <div className="flex-[40%]">
          <CustomNextUiInput
            value={education?.company}
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
                certainEducationPosition &&
                findInputMultipleErrorZod(errors, "company", 2)?.message &&
                "form-input-error",
            }}
          />
        </div>

        {/* Calendar FROM */}
        <div className="flex-[15%]">
          <CustomNextUiInput
            type="text"
            isReadOnly
            value={education?.from}
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
                certainEducationPosition &&
                findInputMultipleErrorZod(errors, "from", 2)?.message &&
                "form-input-error",
            }}
          />
        </div>

        {/* Calendar TO */}
        <div className="flex-[15%]">
          <CustomNextUiInput
            type="text"
            isReadOnly
            value={education?.to}
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
                certainEducationPosition &&
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
              accept=".pdf, .png, .jpeg"
              name="uploadEducationFile"
              type="file"
            />

            <InputBGWrapperIcon
              className={`${
                certainEducationPosition &&
                findInputMultipleErrorZod(errors, "uploadEducationFile", 2)
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
          <button type="button" onClick={() => handleDeleteEducation(index)}>
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

      {certainEducationPosition && (
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
            fieldName={"uploadEducationFile"}
            errors={errors}
            pathIndex={2}
          />
        </>
      )}

      {/* Description */}
      <CustomNextUiTextarea
        value={education?.description}
        onChange={(e) => handleInputChange("description", e.target.value)}
        classNames={{
          base: "mt-2.5",
          inputWrapper:
            certainEducationPosition &&
            findInputMultipleErrorZod(errors, "description", 2)?.message &&
            "form-input-error",
          input: "h-[150px]",
        }}
        placeholder="Enter a text"
        size="primaryiPractis"
        name="description"
        disableAutosize
      />

      {certainEducationPosition && (
        <ErrorMultipleZodResponse
          fieldName={"description"}
          pathIndex={2}
          errors={errors}
        />
      )}
    </div>
  );
};

export default IndividualEducation;
