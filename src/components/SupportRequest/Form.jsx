"use client";

import { supportRequestIssue } from "@/src/lib/actions/authAction";
import ButtonSubmitForm from "../Shared/ButtonSubmitForm";
import DescribeYourIssue from "./DescribeYourIssue";
import DualButton from "../Shared/DualButton";
import ContactID from "./ContactID";

// React imports
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useRef, useState } from "react";

const Form = () => {
  const [backEndErrors, setBackEndErrors] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors: frontEndErrors },
    watch,
  } = useForm({ mode: "onBlur" });
  const buttonRef = useRef(null);
  const router = useRouter();

  const onSubmit = async (data) => {
    buttonRef.current.loading();

    console.log("Entro al submit sin problemas", data);

    try {
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
      buttonRef.current.notIsLoading();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="sm:px-8 mt-[50px]">
      <ContactID
        frontEndErrors={frontEndErrors}
        backEndErrors={backEndErrors}
        register={register}
        watch={watch}
      />

      <DescribeYourIssue
        frontEndErrors={frontEndErrors}
        backEndErrors={backEndErrors}
        register={register}
        watch={watch}
      />

      <DualButton
        leftButtonText={"Cancel"}
        leftButtonHref={"/account-assistance"}
        customSubmitButton={
          <ButtonSubmitForm
            buttonClassName={
              "btn btn-secondary w-full MT-SB-1 rounded-2xl py-3 px-4"
            }
            ref={buttonRef}
          >
            Send
          </ButtonSubmitForm>
        }
      />
    </form>
  );
};

export default Form;
