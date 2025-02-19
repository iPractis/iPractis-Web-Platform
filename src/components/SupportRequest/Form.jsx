"use client";

import { supportRequestIssue } from "@/src/lib/actions/authAction";
import DualButton from "../Shared/DualButton";
import RightColumn from "./RightColumn";
import LeftColumn from "./LeftColumn";

// React imports
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState } from "react";

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors: frontEndError },
    watch,
  } = useForm({ mode: "onChange" });
  const [backEndErrors, setBackEndErrors] = useState("");
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      setIsPending(true);

      const response = await supportRequestIssue(data);

      // If there's error we display the error
      if (response?.message && response?.title) {
        return setBackEndErrors({
          message: response.message,
          title: response.title,
        });
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
    <form onSubmit={handleSubmit(onSubmit)} className="sm:px-8 mt-[50px]">
      <LeftColumn
        frontEndError={frontEndError}
        backEndErrors={backEndErrors}
        register={register}
        watch={watch}
      />

      <RightColumn
        frontEndError={frontEndError}
        backEndErrors={backEndErrors}
        register={register}
        watch={watch}
      />

      <DualButton
        leftButtonText={"Cancel"}
        leftButtonHref={"/account-assistance"}
        leftButtonDisabled={isPending}
        leftButtonClassName={"disabled:opacity-20 disabled:pointer-events-none"}
        rightButtonClassName={
          "disabled:opacity-20 disabled:pointer-events-none"
        }
        rightButtonDisabled={isPending}
        rightButtonText={isPending ? "Loading..." : "Send"}
        rightButtonType={"submit"}
      />
    </form>
  );
};

export default Form;
