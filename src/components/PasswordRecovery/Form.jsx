"use client";

import { requestPasswordInput } from "@/src/lib/actions/authAction";
import ErrorMessageiPractis from "../Globals/ErrorMessageiPractis";
import CustomNextUiInput from "../Globals/CustomNextUiInput";

// React imports
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

// Icons && images
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
        router.push(`/authenticator?email=${formData.get("email")}`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsPending(false);
    }
  };

  const validEmailErrors = ["Invalid Email"];

  const isValidEmailError =
    error?.message && validEmailErrors.includes(error?.title);

  return (
    <form onSubmit={handleSubmit}>
      <div className="my-[50px]">
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
      </div>

      <button
        className="btn btn-secondary w-full py-3 px-4 rounded-2xl MT-SB-1"
        disabled={isPending}
        type="submit"
      >
        {isPending ? "Loading..." : " Send me an email"}
      </button>
    </form>
  );
};

export default Form;
