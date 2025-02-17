"use client";

import { requestPasswordInput } from "@/src/lib/actions/authAction";
import ErrorMessageiPractis from "../Shared/ErrorMessageiPractis";
import InputBGWrapperIcon from "../Shared/InputBGWrapperIcon";
import CustomNextUiInput from "../Shared/CustomNextUiInput";
import { validEmailErrors } from "@/src/data/dataRegister";

// React imports
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

// Icons && images
import { ChevronRightBiggerIcon } from "../Icons";
import email from "@/public/icons/email.png";

const Form = () => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e?.preventDefault();

    const email = e?.target?.email?.value.trim();

    // Validation of empty field (email)
    if (!email) {
      const invalidEmailError = {
        title: "Invalid Email",
        message: "Email can't be empty.",
      };

      return setError(invalidEmailError);
    }

    // Validation of gmail format
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    if (!gmailRegex.test(email)) {
      const invalidEmailError = {
        title: "Invalid Email",
        message: "Check your spelling email",
      };

      return setError(invalidEmailError);
    }

    try {
      setIsPending(true);

      const formData = new FormData(e.currentTarget);
      const response = await requestPasswordInput(formData);

      // If there's error we display the error
      if (response?.message && response?.title) {
        return setError({ message: response.message, title: response.title });
      } else {
        router.push(`/new-password-request-sent-sucessfully`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsPending(false);
    }
  };

  const isValidEmailError =
    error?.message && validEmailErrors.includes(error?.title);

  return (
    <form onSubmit={handleSubmit}>
      <CustomNextUiInput
        type="text"
        name="email"
        placeholder="Enter your email address"
        startContent={<Image className="w-9" src={email} alt="Email Icon" />}
        classNames={{
          inputWrapper: isValidEmailError && "form-input-error",
        }}
      />

      {isValidEmailError && (
        <ErrorMessageiPractis
          typeError={error?.title}
          descError={error?.message}
        />
      )}

      <button
        className="btn btn-secondary w-full p-1.5 ps-4 rounded-2xl MT-SB-1 mt-8 flex items-center justify-center disabled:opacity-20 disabled:pointer-events-none"
        disabled={isPending}
        type="submit"
      >
        {isPending ? (
          "Loading..."
        ) : (
          <>
            <span className="flex-1">Send a request</span>

            <InputBGWrapperIcon>
              <ChevronRightBiggerIcon fillColor={"fill-tertiary-color-SC5"} />
            </InputBGWrapperIcon>
          </>
        )}
      </button>
    </form>
  );
};

export default Form;
