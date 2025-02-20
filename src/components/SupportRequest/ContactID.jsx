"use client";

import { getLeftStickInputColorStatus } from "@/src/lib/utils/getLeftStickInputColorStatus";
import { DynamicInputErrorMessage } from "../Shared/DynamicInputErrorMessage";
import { errorFormMessages } from "@/src/data/dataSupportRequest";
import InputLeftStickStatus from "../Shared/InputLeftStickStatus";
import InputBGWrapperIcon from "../Shared/InputBGWrapperIcon";
import CustomNextUiInput from "../Shared/CustomNextUiInput";
import SectionHeader from "../Shared/SectionHeader";
import ReasonsSelect from "./ReasonsSelect";

// React imports
import { useState } from "react";

// Icons
import {
  CircleImportantIcon,
  LinkVerticalIcon,
  CloseIcon,
  MailIcon,
} from "../Icons";

const ContactID = ({
  frontEndErrors,
  backEndErrors,
  register,
  control,
  watch,
}) => {
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  return (
    <article>
      <SectionHeader
        descriptionText="We need this information to assist you effectively"
        titleIcon={<CircleImportantIcon />}
        descriptionClassName="mt-1"
        wrapperSectionHeaderClassName="sm:px-4"
        titleClassName="MT-SB-1"
        titleText="Contact ID"
      />

      <div className="my-[50px]">
        {/* Reason */}
        <ReasonsSelect
          frontEndErrors={frontEndErrors}
          backEndErrors={backEndErrors}
          control={control}
          watch={watch}
        />

        {/* Contact email */}
        <div className="mt-2.5">
          <InputLeftStickStatus
            inputBarStatusClassName={getLeftStickInputColorStatus(
              frontEndErrors,
              backEndErrors,
              watch("email"),
              "email"
            )}
          >
            <CustomNextUiInput
              name="email"
              type="text"
              placeholder="Contact Email"
              startContent={
                <InputBGWrapperIcon className={"cursor-pointer"}>
                  <MailIcon fillColor={"fill-primary-color-P4"} />
                </InputBGWrapperIcon>
              }
              endContent={
                <InputBGWrapperIcon className={"cursor-pointer"}>
                  <CloseIcon strokeColor={"stroke-primary-color-P4"} />
                </InputBGWrapperIcon>
              }
              isClearable
              {...register("email", {
                required: "Invalid Email --- Email can't be empty.",
                pattern: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
              })}
              classNames={{
                inputWrapper:
                  (frontEndErrors?.email?.type || backEndErrors?.message) &&
                  "form-input-error",
              }}
            />
          </InputLeftStickStatus>

          <DynamicInputErrorMessage
            errorMessages={errorFormMessages}
            frontEndErrors={frontEndErrors}
            backEndErrors={backEndErrors}
            fieldName="email"
          />
        </div>

        {/* Email related to your account */}
        <div className="mt-2.5">
          <InputLeftStickStatus
            inputBarStatusClassName={getLeftStickInputColorStatus(
              frontEndErrors,
              backEndErrors,
              watch("emailRelated"),
              "emailRelated"
            )}
          >
            <CustomNextUiInput
              type="text"
              name="emailRelated"
              placeholder="Enter email related to your account"
              {...register("emailRelated", {
                required:
                  "Invalid Email Related --- Email related can't be empty.",
                pattern: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
              })}
              startContent={
                <InputBGWrapperIcon className={"cursor-pointer"}>
                  <MailIcon fillColor={"fill-primary-color-P4"} />
                </InputBGWrapperIcon>
              }
              endContent={
                <InputBGWrapperIcon className={"cursor-pointer"}>
                  <CloseIcon strokeColor={"stroke-primary-color-P4"} />
                </InputBGWrapperIcon>
              }
              classNames={{
                inputWrapper:
                  (frontEndErrors?.emailRelated?.type ||
                    backEndErrors?.message) &&
                  "form-input-error",
              }}
              isClearable
            />
          </InputLeftStickStatus>

          <DynamicInputErrorMessage
            errorMessages={errorFormMessages}
            frontEndErrors={frontEndErrors}
            backEndErrors={backEndErrors}
            fieldName="emailRelated"
          />
        </div>

        {/* File Input */}
        <div className="mt-2.5 relative">
          <InputLeftStickStatus
            inputBarStatusClassName={
              fileName
                ? "bg-quinary-color-VS5"
                : "bg-primary-color-P11 group-hover:bg-quaternary-color-A5"
            }
          >
            <input
              type="file"
              name="upload_image"
              onChange={handleFileChange}
              className="opacity-0 absolute inset-0 z-10 cursor-pointer"
            />

            <div className="flex items-center rounded-2xl p-1.5 ST-3 bg-primary-color-P11 hover:bg-secondary-color-S9">
              <InputBGWrapperIcon className={"cursor-pointer"}>
                <LinkVerticalIcon strokeColor={"stroke-primary-color-P4"} />
              </InputBGWrapperIcon>

              <span className="placeholder:text-primary-color-P4 text-primary-color-P4 ps-4 truncate pe-1.5">
                {fileName || "Upload a screenshot (Optional)"}{" "}
              </span>
            </div>
          </InputLeftStickStatus>
        </div>
      </div>
    </article>
  );
};

export default ContactID;
