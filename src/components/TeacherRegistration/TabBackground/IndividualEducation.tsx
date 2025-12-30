import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

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

const IndividualEducation = ({
  handleDeleteEducation,
  handleUpdateEducation,
  education = {},
  errors,
  index,
}) => {
  // local preview state for file + status
  const [image, setImage] = useState(education.uploadFile || null);
  const [uploadStatus, setUploadStatus] = useState(null); // null | 'uploading' | 'uploaded' | 'failed'

  useEffect(() => {
    setImage(education.uploadFile || null);
  }, [education.uploadFile]);

  const educationIndex = typeof education.index !== "undefined" ? education.index : null;
  const certainEducationPosition = educationIndex === index;

  const handleInputChange = (field, value) => {
    const updatedEducation = { ...education, [field]: value };
    handleUpdateEducation(index, updatedEducation);
  };

  // Upload + replace flow:
  // 1) Upload new file to /api/upload
  // 2) If upload succeeds, attempt to delete old path (best-effort)
  // 3) Update parent with new uploadFile metadata
  const onFileChange = async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    // quick client-side validation (optional)
    const allowed = [".pdf", ".png", ".jpeg", ".jpg"];
    const ext = file.name.split(".").pop()?.toLowerCase() || "";
    // not blocking here — you may want to enforce stricter checks
    setUploadStatus("uploading");
    setImage({ name: file.name, size: file.size, type: file.type });

    try {
      const fd = new FormData();
      fd.append("file", file);
      // optionally append userId: fd.append('userId', userId);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: fd,
      });

      const uploadJson = await uploadRes.json();
      if (!uploadRes.ok) {
        console.error("Upload failed:", uploadJson);
        setUploadStatus("failed");
        return;
      }

      // uploadJson expected: { name, path, url, type, size, uploaded_at }
      const newMeta = uploadJson;

      // attempt to delete old file if exists (best-effort)
      const oldPath = education.uploadFile?.path;
      if (oldPath) {
        try {
          await fetch("/api/delete-file", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ path: oldPath }),
          });
        } catch (delErr) {
          // don't block; schedule cleanup server-side if necessary
          console.warn("Failed to delete old file (best-effort):", delErr);
        }
      }

      // Update local preview and parent state with new metadata
      setImage(newMeta);
      setUploadStatus("uploaded");
      handleInputChange("uploadFile", newMeta);
    } catch (err) {
      console.error("File upload error:", err);
      setUploadStatus("failed");
      // revert preview if you want:
      // setImage(education.uploadFile || null);
    } finally {
      // reset the input value so the same file can be re-selected if needed
      // (we can't access the input directly from here; ensure input has no persistent value)
    }
  };

  return (
    // <div className="mb-8">
    //   <div className="flex items-center gap-2.5">
    //     {/* Company */}
    //     <div className="flex-[40%]">
    //       <CustomNextUiInput
    //         value={education?.company || ""}
    //         onChange={(e) => handleInputChange("company", e.target.value)}
    //         type="text"
    //         name="company"
    //         placeholder="Example: Google"
    //         startContent={
    //           <InputBGWrapperIcon>
    //             <LuggageBiggerIcon fillcolor={"fill-primary-color-P4"} />
    //           </InputBGWrapperIcon>
    //         }
    //       />
    //     </div>

    //     {/* Calendar FROM */}
    //     <div className="flex-[15%]">
    //       <CustomNextUiInput
    //         type="text"
    //         isReadOnly
    //         value={education?.from || ""}
    //         name="from"
    //         placeholder="From"
    //         startContent={
    //           <InputBGWrapperIcon>
    //             <CalendarAddIcon fillcolor={"fill-primary-color-P4"} />
    //           </InputBGWrapperIcon>
    //         }
    //         endContent={
    //           <Dropdown classNames={{ content: "p-0" }} closeOnSelect={false}>
    //             <DropdownTrigger>
    //               <Button
    //                 className="data-[hover=true]:opacity-100 border-0 min-w-fit bg-primary-color-P12 animation-fade flex justify-center items-center w-9 h-9 p-0 px-1.5 rounded-[10px] shadow-none"
    //                 variant="flat"
    //                 type="button"
    //                 aria-label="Open from date picker"
    //               >
    //                 <ChevronDownBigIcon fillcolor={"fill-primary-color-P4"} />
    //               </Button>
    //             </DropdownTrigger>

    //             <DropdownMenu className="p-0 h-0" itemClasses={{ base: "data-[hover=true]:bg-transparent" }}>
    //               <DropdownItem className="p-0">
    //                 <Calendar
    //                   onChange={(date) => {
    //                     if (!date) return;
    //                     const validDate = new CalendarDate(date.year, date.month, date.day);
    //                     handleInputChange("from", validDate.toString());
    //                   }}
    //                   disableAnimation
    //                 />
    //               </DropdownItem>
    //             </DropdownMenu>
    //           </Dropdown>
    //         }
    //       />
    //     </div>

    //     {/* Calendar TO */}
    //     <div className="flex-[15%]">
    //       <CustomNextUiInput
    //         type="text"
    //         isReadOnly
    //         value={education?.to || ""}
    //         name="to"
    //         placeholder="To"
    //         startContent={
    //           <InputBGWrapperIcon>
    //             <CalendarAddIcon fillcolor={"fill-primary-color-P4"} />
    //           </InputBGWrapperIcon>
    //         }
    //         endContent={
    //           <Dropdown classNames={{ content: "p-0" }} closeOnSelect={false}>
    //             <DropdownTrigger>
    //               <Button
    //                 className="data-[hover=true]:opacity-100 border-0 min-w-fit bg-primary-color-P12 animation-fade flex justify-center items-center w-9 h-9 p-0 px-1.5 rounded-[10px] shadow-none"
    //                 variant="flat"
    //                 type="button"
    //                 aria-label="Open to date picker"
    //               >
    //                 <ChevronDownBigIcon fillcolor={"fill-primary-color-P4"} />
    //               </Button>
    //             </DropdownTrigger>

    //             <DropdownMenu className="p-0 h-0" itemClasses={{ base: "data-[hover=true]:bg-transparent" }}>
    //               <DropdownItem className="p-0">
    //                 <Calendar
    //                   onChange={(date) => {
    //                     if (!date) return;
    //                     const validDate = new CalendarDate(date.year, date.month, date.day);
    //                     handleInputChange("to", validDate.toString());
    //                   }}
    //                   disableAnimation
    //                 />
    //               </DropdownItem>
    //             </DropdownMenu>
    //           </Dropdown>
    //         }
    //       />
    //     </div>

    //     {/* Download / Upload file
    //     <div className="flex-1">
    //       <button type="button" className="relative" aria-label="Upload education file">
    //         <input
    //           className="opacity-0 absolute inset-0 z-10 cursor-pointer"
    //           onChange={()=>console.log("hello")}
    //           accept=".pdf, .png, .jpeg"
    //           name="uploadEducationFile"
    //           type="file"
    //           aria-label="Choose a file to upload"
    //         />

    //         <InputBGWrapperIcon>
    //           {uploadStatus === "uploading" ? (
    //             // simple visual hint; replace with spinner component if you have one
    //             <span className="text-xs">Uploading...</span>
    //           ) : image?.name ? (
    //             <CheckedDocumentIcon fillcolor={"fill-primary-color-P4"} />
    //           ) : (
    //             <TopArrowCloudIcon fillcolor={"fill-primary-color-P4"} />
    //           )}
    //         </InputBGWrapperIcon>
    //       </button>
    //     </div> */}

    //     {/* Recycle bin */}
    //     <div className="flex-1">
    //       <button type="button" onClick={() => handleDeleteEducation(index)} aria-label="Delete education entry">
    //         <InputBGWrapperIcon className={"btn-septenary rounded-2xl bg-primary-color-P11 w-[48px] h-[48px]"}>
    //           <TrashBinIcon strokeColor={"stroke-primary-color-P4"} fillcolor={"fill-primary-color-P4"} />
    //         </InputBGWrapperIcon>
    //       </button>
    //     </div>
    //   </div>

    //   {/* Description */}
    //   <CustomNextUiTextarea
    //     value={education?.description || ""}
    //     onChange={(e) => handleInputChange("description", e.target.value)}
    //     classNames={{
    //       base: "mt-2.5",
    //       input: "h-[150px]",
    //     }}
    //     placeholder="Enter a text"
    //     size="primaryiPractis"
    //     name="description"
    //     disableAutosize
    //   />
    // </div>
    <></>
  );
};

IndividualEducation.propTypes = {
  handleDeleteEducation: PropTypes.func.isRequired,
  handleUpdateEducation: PropTypes.func.isRequired,
  education: PropTypes.object,
  errors: PropTypes.any,
  index: PropTypes.number.isRequired,
};

export default IndividualEducation;
