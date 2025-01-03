"use client";

import { supportRequestIssue } from "@/src/lib/actions/authAction";
import DualButton from "../Globals/DualButton";
import RightColumn from "./RightColumn";
import LeftColumn from "./LeftColumn";

// React imports
import { useRouter } from "next/navigation";
import { useState } from "react";

const Form = () => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const supportRequestUserInfo = {
      email: e?.target?.email?.value,
      email_related: e?.target?.emailRelated?.value,
      reason: e?.target?.reason?.value,
      uploaded_image: e?.target?.upload_image?.files[0],
      situation: e?.target?.situation?.value,
    };

    try {
      setIsPending(true);

      const formData = new FormData(e.currentTarget);
      formData.append("uploaded_image", supportRequestUserInfo?.uploaded_image);

      const response = await supportRequestIssue(formData);

      // If there's error we display the error
      if (response?.message && response?.title) {
        return setError({ message: response.message, title: response.title });
      } else {
        router.push(`/`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-primary-color-P12 p-8 mt-8 rounded-2xl"
    >
      <div className="flex flex-col md:flex-row sm:gap-[50px]">
        <LeftColumn />

        <RightColumn />
      </div>

      <DualButton
        leftButtonText={"Cancel"}
        rightButtonDisabled={isPending}
        rightButtonText={isPending ? "Loading..." : "Send"}
        rightButtonType={"submit"}
      />
    </form>
  );
};

export default Form;
