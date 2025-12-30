"use client";

import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

// Components
import InputLeftStickStatus from "../Shared/InputLeftStickStatus";
import InputBGWrapperIcon from "../Shared/InputBGWrapperIcon";
import CustomNextUiInput from "@/src/components/Shared/CustomNextUiInput";
import { DynamicInputErrorMessageWithZod } from "../../lib/utils/getZodValidations";
import PasswordLevels from "./PasswordLevels";
import SocialMediaButtons from "./SocialMediaButtons";
import IconHeader from "../Shared/IconHeader";

// Utils
import { getLeftStickInputColorStatus } from "@/src/lib/utils/getLeftStickInputColorStatus";
import { getSecurityLevelMessage } from "@/src/lib/utils/getSecurityLevelMessage";

// Icons
import {
	UserAddCircleMediumIcon,
	PadLockClosedBigIcon,
	EyeWithoutDashIcon,
	EyeWithDashIcon,
	ThreeUsersIcon,
	CloseIcon,
	MailIcon,
	UserProfileIcon,
  UserWithAddIcon,
} from "../Icons";

// Validation Schema
import { z } from "zod";

const schema = z.object({
	firstName: z
		.string()
		.nonempty("Invalid First Name --- First name can't be empty.")
		.min(2, "Invalid First Name --- You need at least 2 characters.")
		.max(254)
		.regex(/^[A-Za-z\s-]+$/u, {
			message:
				"Invalid First Name --- First name shouldn't contain accents, special characters, or numbers.",
		}),
	lastName: z
		.string()
		.nonempty("Invalid Last Name --- Last name can't be empty.")
		.min(2, "Invalid Last Name --- You need at least 2 characters.")
		.max(254)
		.regex(/^[A-Za-z\s-]+$/u, {
			message:
				"Invalid Last Name --- Last name shouldn't contain accents, special characters, or numbers.",
		}),
	email: z.string().email("Invalid Email --- Enter a valid email address."),
	password: z
		.string()
		.min(8, "Invalid Password --- Password can't less than 8 characters.")
		.max(30),
});

const Form = () => {
	const router = useRouter();
	const [showPassword, setShowPassword] = useState(false);
	const [backEndErrors, setBackEndErrors] = useState({});
	const [isPending, setIsPending] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
		setError,
	} = useForm({
		mode: "onSubmit",
		resolver: zodResolver(schema),
	});

	const password = watch("password");

	const securityLevel = useMemo(() => {
		if (!password?.trim()) return "";
		if (password.length < 6) return 1;
		if (password.length < 8) return 2;
		if (password.length < 10) return 3;
		return 4;
	}, [password]);

	const onSubmit = async (data) => {
		setIsPending(true);
		setBackEndErrors({});
		try {
			const res = await fetch("/api/auth/register", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			});

			const result = await res.json();

			if (!res.ok) {
				// Set backend errors
				setBackEndErrors({ email: result.error });
				setError("email", { type: "server", message: result.error });
				return;
			}

			// Store JWT in localStorage
			// localStorage.setItem("token", result.token);

			// Redirect to dashboard
			router.push(`/authenticator?email=${encodeURIComponent(data.email)}`);
		} catch (err) {
			console.error("Registration failed:", err);
		} finally {
			setIsPending(false);
		}
	};

	const renderInput = ({
		name,
		placeholder,
		startIcon,
		type = "text",
		toggleable = false,
	}) => (
		<InputLeftStickStatus
			inputBarStatusClassName={getLeftStickInputColorStatus(
				errors,
				backEndErrors,
				watch(name),
				name,
			)}
		>
			<CustomNextUiInput
				type={toggleable && showPassword ? "text" : type}
				placeholder={placeholder}
				name={name}
				startContent={
					<InputBGWrapperIcon className="ml-[1px]">
						{startIcon}
					</InputBGWrapperIcon>
				}
				endContent={
					<>
						{toggleable && (
							<InputBGWrapperIcon
								className="absolute right-10 cursor-pointer mr-[6px]"
								onClick={() => setShowPassword(!showPassword)}
							>
								{showPassword ? (
									<EyeWithDashIcon fillcolor="fill-primary-color-P4" />
								) : (
									<EyeWithoutDashIcon fillcolor="fill-primary-color-P4" />
								)}
							</InputBGWrapperIcon>
						)}
						<InputBGWrapperIcon className="cursor-pointer mr-[3px]">
							<CloseIcon strokeColor="stroke-primary-color-P4" />
						</InputBGWrapperIcon>
					</>
				}
				isClearable
				classNames={{
					inputWrapper: `!bg-[#F8F7F5] ${
						(errors?.[name]?.type || backEndErrors?.[name]) &&
						"form-input-error"
					}`,
					...(toggleable && { input: "!pe-20" }),
				}}
				{...register(name)}
			/>
		</InputLeftStickStatus>
	);

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-[32px]">
       <IconHeader
          icon={<UserWithAddIcon fillcolor="fill-primary-color-P1" />}
          title={"Create an account"}
          description={"Enter you account details to create an account."}
        />
			<div className="space-y-[10px]">
 
				{/* First & Last Name */}
				<div className="flex gap-3 items-center">
					{renderInput({
						name: "firstName",
						placeholder: "First name",
						startIcon: <UserProfileIcon fillColor="fill-primary-color-P4" />,
					})}
					{renderInput({
						name: "lastName",
						placeholder: "Last name",
						startIcon: <ThreeUsersIcon fillcolor="fill-primary-color-P4" />,
					})}
				</div>
				<DynamicInputErrorMessageWithZod
					frontEndErrors={errors}
					backEndErrors={backEndErrors}
					fieldName="firstName"
				/>
				<DynamicInputErrorMessageWithZod
					frontEndErrors={errors}
					backEndErrors={backEndErrors}
					fieldName="lastName"
				/>

				{/* Email */}
				{renderInput({
					name: "email",
					placeholder: "Enter your email address",
					startIcon: <MailIcon fillcolor="fill-primary-color-P4" />,
				})}
				<DynamicInputErrorMessageWithZod
					frontEndErrors={errors}
					backEndErrors={backEndErrors}
					fieldName="email"
				/>

				{/* Password */}
				{renderInput({
					name: "password",
					placeholder: "Enter your password",
					startIcon: <PadLockClosedBigIcon fillcolor="fill-primary-color-P4" />,
					type: "password",
					toggleable: true,
				})}
				<DynamicInputErrorMessageWithZod
					frontEndErrors={errors}
					backEndErrors={backEndErrors}
					fieldName="password"
				/>
				<PasswordLevels securityLevel={securityLevel} />
				<h3 className="px-2.5 mt-1 ST-4 text-primary-color-P1">
					Password Security Level
					{securityLevel && `: ${getSecurityLevelMessage(securityLevel)}`}
				</h3>
			</div>
			{/* Submit Button */}
			<button
				className="flex ST-SB-3 w-full bg-tertiary-color-SC6 hover:bg-tertiary-color-SC5 transition-colors items-center p-[6px] rounded-[16px]"
				disabled={isPending}
				type="submit"
			>
				<span className="flex-1 text-primary-color-P12">
					{isPending ? "Loading..." : "Create an account"}
				</span>
				<InputBGWrapperIcon>
					<UserAddCircleMediumIcon fillcolor="fill-tertiary-color-SC5" />
				</InputBGWrapperIcon>
			</button>

			{/* Social Media Buttons */}
				<SocialMediaButtons />
		</form>
	);
};

export default Form;
