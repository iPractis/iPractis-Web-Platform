// src/components/AccountSettings/TabSecurity/LogInID.jsx
import { getInputStatusBorder } from "@/src/lib/utils/getInputStatusBorder";
import SectionContent from "../../Shared/SectionContent";
import { useState, useEffect } from "react";
import ConfirmationModal from "../../Shared/ConfirmationModal";
import CustomNextUiInput from "../../Shared/CustomNextUiInput";
import InputBGWrapperIcon from "../../Shared/InputBGWrapperIcon";
import InputLeftStickStatus from "../../Shared/InputLeftStickStatus";

// --- Local Icon Definitions ---
import { MailSmallIcon, CheckIcon, PencilIcon, XMarkIcon } from "../../Icons";

// ------------------------------------

const LogInID = ({ errors, userEmail, onEmailUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (!isEditing) {
      setNewEmail("");
    }
  }, [isEditing]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setNewEmail("");
  };

  const handleSaveClick = () => {
    if (newEmail && newEmail !== userEmail) {
      setIsModalOpen(true);
    }
  };

  const handleConfirmEmailChange = async () => {
    try {
      const response = await fetch("/api/account-settings/email", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: newEmail }),
      });

      if (response.ok) {
        setSuccessMessage("Email updated successfully!");
        if (onEmailUpdate) {
          onEmailUpdate(newEmail);
        }
        setIsEditing(false);
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Failed to update email:", error);
      alert("An unexpected error occurred.");
    } finally {
      setIsModalOpen(false);
    }
  };

  return (
    <SectionContent>
      {successMessage && (
        <div className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg">
          {successMessage}
        </div>
      )}

      <div className="flex items-center gap-4">
        {/* Input Field Section */}
        <div className="flex-grow">
          <InputLeftStickStatus
            inputBarStatusClassName={
              isEditing
                ? getInputStatusBorder(errors, newEmail, "email")
                : "bg-primary-color-P1"
            }
          >
            <div className="flex items-center gap-2 p-1.5 bg-secondary-color-S11 rounded-2xl w-full">
              <InputBGWrapperIcon>
                <MailSmallIcon
                  fillcolor={
                    isEditing
                      ? "fill-primary-color-P1"
                      : "fill-primary-color-P4"
                  }
                />
              </InputBGWrapperIcon>
              <CustomNextUiInput
                isReadOnly={!isEditing}
                value={isEditing ? newEmail : userEmail || ""}
                onChange={isEditing ? (e) => setNewEmail(e.target.value) : undefined}
                placeholder={
                  isEditing ? "Enter new email address" : "Current email"
                }
                type="email"
                classNames={{
                  input: isEditing
                    ? "!text-primary-color-P1"
                    : "!text-primary-color-P1 opacity-60",
                  inputWrapper: "!bg-transparent shadow-none",
                }}
              />
            </div>
          </InputLeftStickStatus>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 shrink-0">
          {isEditing ? (
            <>
              {/* Save Button */}
              <button
                type="button"
                onClick={handleSaveClick}
                className="flex items-center justify-center w-[48px] h-[48px] bg-primary-color-P1 rounded-xl hover:bg-primary-color-P2 transition-colors"
                title="Save"
              >
                <CheckIcon fillcolor="fill-white" width={20} height={20} />
              </button>
              
              {/* Cancel Button */}
              <button
                type="button"
                onClick={handleCancelClick}
                className="flex items-center justify-center w-[48px] h-[48px] bg-red-100 rounded-xl hover:bg-red-200 transition-colors"
                title="Cancel"
              >
                <XMarkIcon fillcolor="fill-red-500" width={20} height={20} />
              </button>
            </>
          ) : (
            /* Edit Button (Replaces ActionButton) */
            <button
              type="button"
              onClick={handleEditClick}
              className="flex items-center justify-center w-[48px] h-[48px] bg-primary-color-P1 rounded-xl hover:bg-primary-color-P2 transition-colors"
              title="Edit Email"
            >
              <PencilIcon fillcolor="fill-white" width={20} height={20} />
            </button>
          )}
        </div>
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmEmailChange}
        title="Confirm Email Change"
        message={`Are you sure you want to change your email to ${newEmail}?`}
      />
    </SectionContent>
  );
};

export default LogInID;