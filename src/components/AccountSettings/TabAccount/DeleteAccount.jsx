//
"use client";

import { RightArrowMediumIcon, TrashBinSmallerIcon } from "../../Icons";
import InputBGWrapperIcon from "../../Shared/InputBGWrapperIcon";
import SectionHeader from "../../Shared/SectionHeader";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { toast } from "react-toastify";

const DeleteAccount = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  // ✅ 1. Use NextUI hook for modal control
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleConfirmDelete = async () => {
    try {
      setIsDeleting(true);
      const toastId = toast.loading("Deleting account...");

      // Call the API
      const res = await fetch("/api/delete-account", {
        method: "DELETE",
      });

      const result = await res.json();

      if (res.ok) {
        toast.success("Account deleted. Redirecting...", { id: toastId });

        // Redirect to login
        setTimeout(() => {
          router.push("/login");
          router.refresh();
        }, 1500);
      } else {
        toast.error(result.error || "Failed to delete account", {
          id: toastId,
        });
        setIsDeleting(false);
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Something went wrong.");
      setIsDeleting(false);
    }
  };

  return (
    <>
      <SectionHeader
        wrapperSectionHeaderClassName={"bg-primary-color-P1"}
        titleIcon={
          <TrashBinSmallerIcon
            fillcolor={"fill-primary-color-P1"}
            strokeColor={"stroke-primary-color-P1"}
          />
        }
        titleText={"Permanently delete my account"}
        titleClassName="MT-SB-1 text-primary-color-P12"
        descriptionText={
          "If you no longer wish to use iPractis, you can permanently delete your account."
        }
        descriptionClassName="ST-3 text-primary-color-P12"
        rightElement={
          <button
            onClick={onOpen} // ✅ Opens the modal
            className={
              "bg-septenary-color-MA6 p-[6px]  rounded-[16px] flex items-center gap-2"
            }
            type="button"
          >
            <span className="ST-SB-3 text-primary-color-P12 px-[6px]">
              Delete my account
            </span>{" "}
            <InputBGWrapperIcon>
              <RightArrowMediumIcon
                fillcolor={"fill-septenary-color-MA6"}
                strokeColor={"stroke-septenary-color-MA6"}
              />
            </InputBGWrapperIcon>
          </button>
        }
      />

      {/* ✅ Custom Confirmation Modal */}
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-danger">
                Delete Account?
              </ModalHeader>
              <ModalBody>
                <p className="text-gray-600">
                  Are you sure you want to permanently delete your account? This
                  action <b>cannot be undone</b> and you will lose all your
                  data.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="danger"
                  variant="light"
                  onPress={handleConfirmDelete}
                  isLoading={isDeleting}
                >
                  Yes, Delete it
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteAccount;