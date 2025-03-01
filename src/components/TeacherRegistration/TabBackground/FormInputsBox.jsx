import { getLeftStickInputColorStatus } from "@/src/lib/utils/getLeftStickInputColorStatus";
import { SplitDynamicErrorZod } from "@/src/lib/utils/getZodValidations";
import InputLeftStickStatus from "../../Shared/InputLeftStickStatus";
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
import { Controller } from "react-hook-form";

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
  frontEndErrors,
  backEndErrors,
  handleDelete,
  control,
  index,
  item,
}) => {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2.5">
        {/* Company */}
        <div className="flex-[40%]">
          <Controller
            name={`careerExperience[${index}].company`}
            defaultValue={item?.company}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <>
                <CustomNextUiInput
                  classNames={{
                    inputWrapper: error?.message && "form-input-error",
                  }}
                  placeholder="Example: Google"
                  startContent={
                    <InputBGWrapperIcon>
                      <LuggageBiggerIcon fillColor={"fill-primary-color-P4"} />
                    </InputBGWrapperIcon>
                  }
                  {...field}
                  type="text"
                />

                <SplitDynamicErrorZod message={error?.message} />
              </>
            )}
          />
        </div>

        {/* Calendar FROM */}
        <div className="flex-[15%]">
          <Controller
            name={`careerExperience[${index}].from`}
            control={control}
            defaultValue={item?.from}
            render={({ field, fieldState: { error } }) => (
              <>
                <CustomNextUiInput
                  {...field}
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
                          <ChevronDownBigIcon
                            fillColor={"fill-primary-color-P4"}
                          />
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
                              field.onChange(validDate?.toString());
                            }}
                            disableAnimation
                          />
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  }
                  classNames={{
                    inputWrapper: error?.message && "form-input-error",
                    input: "!pe-1",
                  }}
                />

                <SplitDynamicErrorZod message={error?.message} />
              </>
            )}
          />
        </div>

        {/* Calendar TO */}
        <div className="flex-[15%]">
          <Controller
            name={`careerExperience[${index}].to`}
            defaultValue={item?.to}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <>
                <CustomNextUiInput
                  {...field}
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
                          <ChevronDownBigIcon
                            fillColor={"fill-primary-color-P4"}
                          />
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
                              field.onChange(validDate?.toString());
                            }}
                            disableAnimation
                          />
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  }
                  classNames={{
                    inputWrapper: error?.message && "form-input-error",
                    input: "!pe-1",
                  }}
                />

                <SplitDynamicErrorZod message={error?.message} />
              </>
            )}
          />
        </div>

        {/* File (PDF, PNG, JPEG) */}
        <div className="flex-1">
          <Controller
            name={`careerExperience[${index}].uploadFile`}
            defaultValue={item?.uploadFile}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <label className="relative cursor-pointer">
                <input
                  className="opacity-0 absolute inset-0 z-10 cursor-pointer"
                  onChange={(e) => field.onChange(e.target.files?.[0])}
                  accept=".pdf, .png, .jpeg"
                  type="file"
                />

                <InputBGWrapperIcon
                  className={`btn-septenary rounded-2xl ${
                    error?.message ? "form-input-error" : "bg-primary-color-P11"
                  } w-[48px] h-[48px] cursor-pointer`}
                >
                  {field.value ? (
                    <CheckedDocumentIcon fillColor={"fill-primary-color-P4"} />
                  ) : (
                    <TopArrowCloudIcon fillColor={"fill-primary-color-P4"} />
                  )}
                </InputBGWrapperIcon>

                <SplitDynamicErrorZod message={error?.message} />
              </label>
            )}
          />
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

      {/* Description */}
      <Controller
        name={`careerExperience[${index}].description`}
        defaultValue={item?.description}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <InputLeftStickStatus
              inputBarStatusClassName={`${getLeftStickInputColorStatus(
                frontEndErrors,
                backEndErrors,
                field?.value,
                "description"
              )} h-[129px]`}
            >
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
            </InputLeftStickStatus>

            <SplitDynamicErrorZod message={error?.message} />
          </>
        )}
      />
    </div>
  );
};

export default FormInputsBox;
