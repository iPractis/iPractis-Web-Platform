import { SplitDynamicErrorZod } from "@/src/lib/utils/getZodValidations";
import CustomNextUiTextarea from "../../Shared/CustomNextUiTextarea";
import InputBGWrapperIcon from "../../Shared/InputBGWrapperIcon";
import CustomNextUiInput from "../../Shared/CustomNextUiInput";

// External imports
import {
  Calendar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  Button,
  DropdownItem,
} from "@nextui-org/react";
import { CalendarDate } from "@internationalized/date";
import { Controller, useController } from "react-hook-form";

// Icons
import {
  CalendarAddIcon,
  CheckedDocumentIcon,
  ChevronDownBigIcon,
  LuggageBiggerIcon,
  TopArrowCloudIcon,
  TrashBinIcon,
} from "../../Icons";

const FormInputsBox = ({
  handleDelete,
  control,
  array,
  index,
  item,
}) => {
  const {
    field: companyField,
    fieldState: { error: companyError },
  } = useController({
    name: `${array}[${index}].company`,
    control: control,
    defaultValue: item?.company,
  });

  const {
    field: calendarFromField,
    fieldState: { error: calendarFromError },
  } = useController({
    name: `${array}[${index}].from`,
    control: control,
    defaultValue: item?.from,
  });

  const {
    field: calendarToField,
    fieldState: { error: calendarToError },
  } = useController({
    name: `${array}[${index}].to`,
    control: control,
    defaultValue: item?.to,
  });

  const {
    field: uploadFile,
    fieldState: { error: uploadFileError },
  } = useController({
    name: `${array}[${index}].uploadFile`,
    control: control,
    defaultValue: item?.uploadFile,
  });

  return (
    <div className="mb-8">
      <div className="flex items-center gap-2.5">
        {/* Company */}
        <div className="flex-[40%]">
          <CustomNextUiInput
            classNames={{
              inputWrapper: companyError?.message && "form-input-error",
            }}
            placeholder="Example: Google"
            startContent={
              <InputBGWrapperIcon>
                <LuggageBiggerIcon fillColor={"fill-primary-color-P4"} />
              </InputBGWrapperIcon>
            }
            {...companyField}
            type="text"
          />
        </div>

        {/* Calendar FROM */}
        <div className="flex-[15%]">
          <CustomNextUiInput
            {...calendarFromField}
            type="text"
            isReadOnly
            placeholder="From"
            startContent={
              <InputBGWrapperIcon>
                <CalendarAddIcon fillColor={"fill-primary-color-P4"} />
              </InputBGWrapperIcon>
            }
            endContent={
              <Dropdown
                classNames={{
                  content: "p-0 shadow-none",
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
                    base: "data-[hover=true]:bg-transparent shadow-none",
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
                        calendarFromField.onChange(validDate?.toString());
                      }}
                      disableAnimation
                    />
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            }
            classNames={{
              inputWrapper: calendarFromError?.message && "form-input-error",
              input: "!pe-1",
            }}
          />
        </div>

        {/* Calendar TO */}
        <div className="flex-[15%]">
          <CustomNextUiInput
            {...calendarToField}
            type="text"
            isReadOnly
            placeholder="To"
            startContent={
              <InputBGWrapperIcon>
                <CalendarAddIcon fillColor={"fill-primary-color-P4"} />
              </InputBGWrapperIcon>
            }
            endContent={
              <Dropdown
                classNames={{
                  content: "p-0 shadow-none",
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
                    base: "data-[hover=true]:bg-transparent shadow-none",
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
                        calendarToField.onChange(validDate?.toString());
                      }}
                      disableAnimation
                    />
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            }
            classNames={{
              inputWrapper: calendarToError?.message && "form-input-error",
              input: "!pe-1",
            }}
          />
        </div>

        {/* File (PDF, PNG, JPEG) */}
        <div className="flex-1">
          <label className="relative cursor-pointer">
            <input
              className="opacity-0 absolute inset-0 z-10 cursor-pointer"
              onChange={(e) => {
                const file = e.target.files?.[0];

                if (file) {
                  uploadFile.onChange(file);
                }
              }}
              accept=".pdf, .png, .jpeg"
              type="file"
            />

            <InputBGWrapperIcon
              className={`btn-septenary rounded-2xl ${
                uploadFileError?.message
                  ? "form-input-error"
                  : "bg-primary-color-P11"
              } w-[48px] h-[48px] cursor-pointer`}
            >
              {uploadFile?.value ? (
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

      <SplitDynamicErrorZod message={companyError?.message} />

      <SplitDynamicErrorZod message={calendarFromError?.message} />

      <SplitDynamicErrorZod message={calendarToError?.message} />

      <SplitDynamicErrorZod message={uploadFileError?.message} />

      {/* Description */}
      <Controller
        name={`${array}[${index}].description`}
        defaultValue={item?.description}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <CustomNextUiTextarea
              classNames={{
                inputWrapper: error?.message && "form-input-error",
                input: "h-[150px]",
                base: "mt-2.5",
              }}
              placeholder="Enter a text"
              size="primaryiPractis"
              disableAutosize
              {...field}
            />

            <SplitDynamicErrorZod message={error?.message} />
          </>
        )}
      />
    </div>
  );
};

export default FormInputsBox;
