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

import { findInputMultipleErrorZod } from "@/src/lib/utils/getZodValidations";
import { ErrorMultipleZodResponse } from "../../Globals/ErrorMessageiPractis";
import { useState } from "react";

const getFieldName = (arrayOfField, fieldName, index) => {
  return [arrayOfField, index, fieldName];
};

const FormInputsBox = ({
  arrayOfField,
  handleDelete,
  handleUpdate,
  errors,
  index,
  item,
}) => {
  const [image, setImage] = useState({});

  const handleInputChange = (field, value) => {
    const updatedItem = { ...item, [field]: value };
    handleUpdate(index, updatedItem);
  };

  const onImageChange = (e) => {
    const file = e.target.files[0];

    setImage(file);

    handleInputChange("uploadFile", file);
  };

  return (
    <div className="mb-8">
      <div className="flex items-center gap-2.5">
        {/* Company */}
        <div className="flex-[40%]">
          <CustomNextUiInput
            value={item?.company}
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
                  getFieldName(arrayOfField, "company", index)
                )?.message && "form-input-error",
            }}
          />
        </div>

        {/* Calendar FROM */}
        <div className="flex-[15%]">
          <CustomNextUiInput
            type="text"
            isReadOnly
            value={item?.from}
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
                findInputMultipleErrorZod(
                  errors,
                  getFieldName(arrayOfField, "from", index)
                )?.message && "form-input-error",
            }}
          />
        </div>

        {/* Calendar TO */}
        <div className="flex-[15%]">
          <CustomNextUiInput
            type="text"
            isReadOnly
            value={item?.to}
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
                findInputMultipleErrorZod(
                  errors,
                  getFieldName(arrayOfField, "to", index)
                )?.message && "form-input-error",
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
              name="uploadFile"
              type="file"
            />

            <InputBGWrapperIcon
              className={`${
                findInputMultipleErrorZod(
                  errors,
                  getFieldName(arrayOfField, "uploadFile", index)
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
          <button type="button" onClick={() => handleDelete(index)}>
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
        fieldName={getFieldName(arrayOfField, "company", index)}
        errors={errors}
      />

      <ErrorMultipleZodResponse
        fieldName={getFieldName(arrayOfField, "from", index)}
        errors={errors}
      />

      <ErrorMultipleZodResponse
        fieldName={getFieldName(arrayOfField, "to", index)}
        errors={errors}
      />

      <ErrorMultipleZodResponse
        fieldName={getFieldName(arrayOfField, "uploadFile", index)}
        errors={errors}
      />

      {/* Description */}
      <CustomNextUiTextarea
        value={item?.description}
        onChange={(e) => handleInputChange("description", e.target.value)}
        classNames={{
          base: "mt-2.5",
          inputWrapper:
            findInputMultipleErrorZod(
              errors,
              getFieldName(arrayOfField, "description", index)
            )?.message && "form-input-error",
          input: "h-[150px]",
        }}
        placeholder="Enter a text"
        size="primaryiPractis"
        name="description"
        disableAutosize
      />

      <ErrorMultipleZodResponse
        fieldName={getFieldName(arrayOfField, "description", index)}
        errors={errors}
      />
    </div>
  );
};

export default FormInputsBox;
