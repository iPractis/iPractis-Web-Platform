"use client";

import { TrashBinSmallerIcon } from "../../Icons";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

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
        toast.error(result.error || "Failed to delete account", { id: toastId });
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
      {/* Main Card UI */}
      <div className="bg-[#F2F4F8] rounded-[24px] p-6 flex flex-col gap-2">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-6 h-6 flex items-center justify-center">
            <TrashBinSmallerIcon
              fillcolor={"fill-primary-color-P1"}
              strokeColor={"stroke-primary-color-P1"}
            />
          </div>
          <h3 className="text-[18px] font-bold text-primary-color-P1">
            Delete Your Account Permanently
          </h3>
        </div>

        <p className="text-[#6B7280] text-[14px] leading-snug mb-6">
          If you no longer wish to use iPractis, you can permanently delete your account.
        </p>

        <button
          type="button"
          onClick={onOpen} // ✅ Opens the modal instead of window.confirm
          className="w-full bg-[#FF3B30] h-[64px] rounded-[20px] px-6 flex items-center justify-between active:scale-95 transition-transform"
        >
          <span className="text-white text-[18px] font-semibold">
            Delete account
          </span>
          <div className="bg-white w-10 h-10 rounded-[12px] flex items-center justify-center">
            <TrashBinSmallerIcon
              fillcolor={"fill-[#FF3B30]"}
              strokeColor={"stroke-[#FF3B30]"}
              width={20}
              height={20}
            />
          </div>
        </button>
      </div>

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
                  Are you sure you want to permanently delete your account? 
                  This action <b>cannot be undone</b> and you will lose all your data.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button 
                  color="danger" 
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