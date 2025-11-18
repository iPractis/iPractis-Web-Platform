import { useState, useEffect } from "react";
import { CustomNextUiTextareaWithMaxLength } from "../../Shared/MaxFormLengthFields";
import { getInputStatusBorder } from "@/src/lib/utils/getInputStatusBorder";
import { SplitDynamicErrorZod } from "@/src/lib/utils/getZodValidations";
import InputLeftStickStatus from "../../Shared/InputLeftStickStatus";
import InputBGWrapperIcon from "../../Shared/InputBGWrapperIcon";
import CustomNextUiInput from "../../Shared/CustomNextUiInput";

// External imports
import { useController } from "react-hook-form";

// Icons
import {
  CalendarAddIcon,
  PersonWithGraduationCapIcon,
  TopArrowCloudIcon,
  TrashBinIcon,
} from "../../Icons";

const FormInputsBox = ({
  firstInputPlaceholder,
  handleDelete,
  control,
  errors,
  array,
  index,
  item,
}) => {
  const {
    field: companyField,
    fieldState: { error: companyError },
  } = useController({
    name: `${array}.${index}.company`,
    control: control,
    defaultValue: item?.company,
  });

  const {
    field: calendarFromField,
    fieldState: { error: calendarFromError },
  } = useController({
    name: `${array}.${index}.from`,
    control: control,
    defaultValue: item?.from,
  });

  const {
    field: calendarToField,
    fieldState: { error: calendarToError },
  } = useController({
    name: `${array}.${index}.to`,
    control: control,
    defaultValue: item?.to ? new Date(item?.to, 0, 1) : null,
  });

  const {
    field: uploadFile,
    fieldState: { error: uploadFileError },
  } = useController({
    name: `${array}.${index}.uploadFile`,
    control: control,
    defaultValue: item?.uploadFile || null,
  });

  const {
    field: descriptionField,
    fieldState: { error: descriptionError },
  } = useController({
    name: `${array}.${index}.description`,
    control: control,
    defaultValue: item?.description,
  });

  // Local UI state for upload status
  const [uploadStatus, setUploadStatus] = useState(
    uploadFile?.value ? "uploaded" : null
  );
  useEffect(() => {
    setUploadStatus(uploadFile?.value ? "uploaded" : null);
  }, [uploadFile?.value]);

  const descriptionTextOnChange = (e) => {
    const textValue = e?.target?.value;
    if (textValue?.length <= 1000) {
      descriptionField.onChange(textValue);
    }
  };

  // handle file select: uploads new file, updates form field with returned metadata,
  // then attempts to delete the old path (best-effort).
  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0];
    // clear input value so same file can be reselected later
    e.target.value = "";

    if (!file) return;

    // keep the old path before uploading
    const oldPath = uploadFile?.value?.path || item?.uploadFile?.path || null;

    // quick client-side validation (optional)
    const allowedTypes = ["application/pdf", "image/png", "image/jpeg"];
    if (!allowedTypes.includes(file.type)) {
      // optionally set a form error; here we just return and could show uploadFileError
      console.warn("Unsupported file type:", file.type);
      return;
    }

    setUploadStatus("uploading");

    try {
      const fd = new FormData();
      fd.append("file", file);
      // optionally append userId: fd.append("userId", currentUserId);

      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const json = await res.json();

      if (!res.ok) {
        console.error("Upload failed:", json);
        setUploadStatus("failed");
        return;
      }

      // json should be: { name, path, url, type, size, uploaded_at }
      const newMeta = json;

      // update react-hook-form field with metadata (not raw file)
      uploadFile.onChange(newMeta);
      setUploadStatus("uploaded");

      // best-effort deletion of old file after successful upload
      if (oldPath) {
        try {
          await fetch("/api/delete-file", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ path: oldPath }),
          });
        } catch (deleteErr) {
          console.warn("Failed to delete old file (scheduled for cleanup):", deleteErr);
          // don't block user flow; rely on cron/cleanup or uploads table
        }
      }
    } catch (err) {
      console.error("Upload error:", err);
      setUploadStatus("failed");
      // keep previous value (do not override) so user doesn't lose previous uploaded file
    }
  };

  return (
    <div className="mb-8 ml-2">
      {/* Company/Experience Title with Delete Button */}
      <div className="flex items-center gap-2.5 mb-2.5">
        <div className="flex-1">
          <InputLeftStickStatus
            inputBarStatusClassName={`${getInputStatusBorder(
              errors,
              companyField.value,
              `${array}.${index}.company`
            )}`}
          >
            <CustomNextUiInput
              classNames={{
                inputWrapper: `${companyError?.message ? "form-input-error" : ""} !bg-[#f8f7f5] data-[hover=true]:!bg-[#f8f7f5] data-[focus=true]:!bg-[#f8f7f5]`,
              }}
              placeholder={firstInputPlaceholder}
              startContent={
                <InputBGWrapperIcon>
                  <PersonWithGraduationCapIcon fillcolor={"fill-primary-color-P4"} />
                </InputBGWrapperIcon>
              }
              {...companyField}
              type="text"
            />
          </InputLeftStickStatus>
        </div>

        {/* Delete Button */}
        <div className="flex-shrink-0">
          <button type="button" onClick={() => handleDelete(index)}>
            <InputBGWrapperIcon
              className={"btn-septenary rounded-2xl bg-[#f8f7f5] w-[48px] h-[48px]"}
            >
              <TrashBinIcon strokeColor={"stroke-primary-color-P4"} fillcolor={"fill-primary-color-P4"} />
            </InputBGWrapperIcon>
          </button>
        </div>
      </div>

      {/* Date Fields */}
      <div className="flex items-center gap-2.5 mb-2.5">
        {/* Calendar FROM */}
        <div className="flex-[50%]">
          <InputLeftStickStatus
            inputBarStatusClassName={`${getInputStatusBorder(
              errors,
              calendarFromField.value,
              `${array}.${index}.from`
            )}`}
          >
            <CustomNextUiInput
              {...calendarFromField}
              type="text"
              placeholder="Starting year"
              startContent={
                <InputBGWrapperIcon>
                  <CalendarAddIcon fillcolor={"fill-primary-color-P4"} />
                </InputBGWrapperIcon>
              }
              classNames={{
                inputWrapper: `${calendarFromError?.message ? "form-input-error" : ""} !bg-[#f8f7f5] data-[hover=true]:!bg-[#f8f7f5] data-[focus=true]:!bg-[#f8f7f5]`,
                input: "!pe-1",
              }}
            />
          </InputLeftStickStatus>
        </div>

        {/* Calendar TO */}
        <div className="flex-[50%]">
          <InputLeftStickStatus
            inputBarStatusClassName={`${getInputStatusBorder(
              errors,
              calendarToField.value,
              `${array}.${index}.to`
            )}`}
          >
            <CustomNextUiInput
              {...calendarToField}
              type="text"
              placeholder="Ending year"
              startContent={
                <InputBGWrapperIcon>
                  <CalendarAddIcon fillcolor={"fill-primary-color-P4"} />
                </InputBGWrapperIcon>
              }
              classNames={{
                inputWrapper: `${calendarToError?.message ? "form-input-error" : ""} !bg-[#f8f7f5] data-[hover=true]:!bg-[#f8f7f5] data-[focus=true]:!bg-[#f8f7f5]`,
                input: "!pe-1",
              }}
            />
          </InputLeftStickStatus>
        </div>
      </div>

      <SplitDynamicErrorZod message={companyError?.message} />

      <SplitDynamicErrorZod message={calendarFromError?.message} />

      <SplitDynamicErrorZod message={calendarToError?.message} />

      {/* Description */}
      <div className="mt-2.5">
        <InputLeftStickStatus
          inputBarStatusClassName={`${getInputStatusBorder(
            errors,
            descriptionField.value,
            `${array}.${index}.description`
          )} h-[129px] ${
            descriptionField?.value?.length === 1000 ? "top-[32%]" : "top-[46%]"
          }`}
        >
          <CustomNextUiTextareaWithMaxLength
            backgroundError={descriptionError?.message && "form-input-error"}
            descError={"The text cannot exceed 1000 characters."}
            inputProps={{ onBlur: descriptionField.onBlur }}
            inputClassName={"h-[150px] resize-y"}
            typeError={"Max Length Exceeded"}
            onChange={descriptionTextOnChange}
            value={descriptionField.value}
            nameTextarea={"description"}
            placeholder={"Enter a text"}
            maxCharactersLength={1000}
            maxCharactersLengthText={1000}
            labelDisabled={true}
          />
        </InputLeftStickStatus>

        <SplitDynamicErrorZod message={descriptionError?.message} />
      </div>

      {/* Upload Document Button - Below Description */}
      <div className="mt-2.5">
        <InputLeftStickStatus
          inputBarStatusClassName={`${getInputStatusBorder(
            errors,
            uploadFile.value,
            `${array}.${index}.uploadFile`
          )}`}
        >
          <label className="relative cursor-pointer">
            <input
              className="opacity-0 absolute inset-0 z-10 cursor-pointer"
              onChange={handleFileSelect}
              accept=".pdf, .png, .jpeg"
              type="file"
            />
            <div className={`w-full h-[48px] flex items-center`}>
              {/* Left Upload Icon Container */}
              <div className="w-[54px] h-[48px] bg-[#F8F7F5] rounded-2xl flex items-center justify-center">
                <TopArrowCloudIcon fillcolor={"fill-primary-color-P4"} />
              </div>
              
              {/* Increased Gap */}
              <div className="w-[8px] h-[48px]"></div>
              
              {/* Right Section with Text and Plus */}
              <div className="w-[366px] h-[48px] bg-[#F8F7F5] rounded-[16px] flex items-center justify-between pt-[6px] pr-[6px] pb-[6px] pl-[16px]">
                <span className="text-primary-color-P4 ST-3">
                  {uploadStatus === "uploading" 
                    ? "Uploading..." 
                    : uploadFile?.value 
                      ? "Document uploaded" 
                      : "Upload your document"
                  }
                </span>
                <div className="flex items-center justify-center w-[36px] h-[36px] bg-white rounded-[10px]">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-primary-color-P1" role="img" aria-label="Add document">
                    <title>Add document</title>
                    <path
                      d="M8 2V14M2 8H14"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </label>
        </InputLeftStickStatus>
        <SplitDynamicErrorZod message={uploadFileError?.message} />
      </div>
    </div>
  );
};

export default FormInputsBox;
