// External imports
import Image from "next/image";
import { Select, SelectItem } from "@nextui-org/react";
import { useFieldArray, useController } from "react-hook-form";

// Project imports
import { getInputStatusBorder } from "@/src/lib/utils/getInputStatusBorder";
import { SplitDynamicErrorZod } from "../../../lib/utils/getZodValidations";
import {
	languages as allLanguages,
	languagesLevels,
	masteredLanguagesImages,
} from "@/src/data/dataTeacherRegistration";
import InputBGWrapperIcon from "../../Shared/InputBGWrapperIcon";
import InputLeftStickStatus from "../../Shared/InputLeftStickStatus";
import SectionHeader from "../../Shared/SectionHeader";
import SectionContent from "../../Shared/SectionContent";
import {
	ChevronDownBigIcon,
	TrashBinIcon,
	UserSpeakingRightIcon,
} from "../../Icons";
import SectionWrapper from "../../Shared/SectionWrapper";

const AboutYourselfMasteredLanguages = ({ errors, control }) => {
	// Use useFieldArray for proper form array management
	const { fields, append, remove, update } = useFieldArray({
		control,
		name: "languages",
	});

	// Get the languages field for validation and error display
	const {
		fieldState: { error: languagesError },
	} = useController({
		name: "languages",
		control: control,
	});

	// Add new language entry
	const handleAddLanguage = () => {
		append({ name: "", level: "" });
	};

	// Update language field
	const updateLanguage = (index, field, value) => {
		update(index, { ...fields[index], [field]: value });
	};

	// Delete language entry
	const handleDeleteLanguage = (index) => {
		remove(index);
	};

	// Check if all language entries are valid (both name and level selected)
	const allSelectorsValid =
		fields.length > 0 && fields.every((field) => field.name && field.level);

	return (
		<SectionWrapper>
			<SectionHeader
				titleIcon={<UserSpeakingRightIcon fillcolor="fill-primary-color-P1" />}
				titleText="Language proficiency level"
				descriptionText="Select only the languages you can use to teach."
				titleClassName="MT-SB-1"
			/>

			<SectionContent>
				<div className="space-y-4">
					{/* Add Language Button - Keep existing styling at top */}
					<InputLeftStickStatus
						inputBarStatusClassName={getInputStatusBorder(
							errors,
							allSelectorsValid ? "valid" : null,
							"languages",
						)}
					>
						<div className="relative">
							<Select
								name="languages"
								selectedKeys={[]}
								onChange={() => {}} // This won't be used
								labelPlacement="outside"
								placeholder="Add a language"
								selectorIcon={<span></span>}
								startContent={
									<InputBGWrapperIcon>
										<UserSpeakingRightIcon
											fillcolor={"fill-primary-color-P4"}
										/>
									</InputBGWrapperIcon>
								}
								classNames={{
									trigger: [
										"!bg-black rounded-2xl p-1.5 h-auto border-0 shadow-none pr-12", // Added right padding for button
										(languagesError?.message || languagesError !== undefined) &&
											"form-input-error",
									],
									innerWrapper: ["text-white placeholder:text-white", "w-full"],
									value: [
										"group-data-[has-value=true]:text-white text-white ST-3 ml-4",
									],
									listbox: ["text-primary-color-P4"],
									base: "!mt-0",
								}}
							>
								{/* Empty - this is just for styling */}
							</Select>

							{/* Add button positioned absolutely outside the Select */}
							<button
								type="button"
								aria-label="Add language"
								className="absolute right-[6px] top-1/2 -translate-y-1/2 w-[36px] h-[36px] flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity bg-transparent border-none"
								onClick={handleAddLanguage}
							>
								<InputBGWrapperIcon className="w-[36px] h-[36px] rounded-[10px] gap-[10px] p-[8px]">
									<svg
										width="16"
										height="16"
										viewBox="0 0 16 16"
										fill="none"
										role="img"
										aria-label="Add language"
										className="text-primary-color-P1"
									>
										<title>Add language</title>
										<path
											d="M8 2V14M2 8H14"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
										/>
									</svg>
								</InputBGWrapperIcon>
							</button>
						</div>
					</InputLeftStickStatus>

					{/* Show language entries */}
					{fields.map((field, index) => {
						const selectedLanguageImage = masteredLanguagesImages[field.name];

						return (
							<div key={field.id} className="flex items-center gap-[2px]">
								<InputLeftStickStatus
									inputBarStatusClassName={getInputStatusBorder(
										errors,
										field.name && field.level
											? { name: field.name, level: field.level }
											: field.name
												? { name: field.name, level: "" }
												: null,
										`languages.${index}`,
									)}
								>
									<div className="w-full h-[48px] bg-[#F8F7F5] rounded-2xl opacity-100 gap-[2px] flex items-center relative">
										{/* Language Selector Dropdown */}
										<div className="mt-[6px] mb-[6px] ml-[6px] w-[195px] h-[36px] bg-white rounded-[10px]">
											<Select
												placeholder="Language"
												selectedKeys={field.name ? [field.name] : []}
												onSelectionChange={(keys) => {
													const selected = Array.from(keys).join("");
													updateLanguage(index, "name", selected);
												}}
												selectorIcon={<span></span>}
												startContent={
													selectedLanguageImage && (
														<Image
															className="h-6 w-[39px] rounded-[4px]"
															src={selectedLanguageImage.src}
															alt={field.name}
															width={39}
															height={24}
														/>
													)
												}
												endContent={
													<ChevronDownBigIcon
														fillcolor={"fill-primary-color-P1"}
													/>
												}
												classNames={{
													trigger: [
														"select-wrapper-ipractis",
														"!bg-primary-color-P12",
														"w-full",
														"min-h-fit",
														"!rounded-xl",
													],
													innerWrapper: ["select-ipractis", "w-full", "ps--1"],
													value: [
														"group-data-[has-value=true]:text-primary-color-P4 text-primary-color-P4 ST-3",
													],
													listbox: ["text-primary-color-P4"],
													base: "!w-full",
												}}
											>
												{allLanguages
													?.filter(
														(language) =>
															!fields.some(
																(f, idx) =>
																	f.name === language && idx !== index,
															) || language === field.name,
													)
													.map((language) => (
														<SelectItem key={language}>{language}</SelectItem>
													))}
											</Select>
										</div>

										{/* Level Dropdown */}
										<div className="mt-[6px] mb-[6px] mr-[6px] w-[153px] h-[36px] bg-white rounded-[10px] ml-1">
											<Select
												placeholder="Level"
												selectedKeys={field.level ? [field.level] : []}
												onSelectionChange={(keys) => {
													const selected = Array.from(keys).join("");
													updateLanguage(index, "level", selected);
												}}
												selectorIcon={<span></span>}
												endContent={
													<ChevronDownBigIcon
														fillcolor={"fill-primary-color-P1"}
													/>
												}
												classNames={{
													trigger: [
														"select-wrapper-ipractis",
														"!bg-primary-color-P12",
														"w-full",
														"min-h-fit",
														"!rounded-xl",
													],
													innerWrapper: ["select-ipractis", "w-full", "ps-1"],
													value: [
														"group-data-[has-value=true]:text-primary-color-P4 text-primary-color-P4 ST-3",
													],
													listbox: ["text-primary-color-P4"],
													base: "!w-full",
												}}
											>
												{languagesLevels.map((level) => (
													<SelectItem key={level}>{level}</SelectItem>
												))}
											</Select>
										</div>
									</div>
								</InputLeftStickStatus>

								{/* Delete Button - separated with 2px gap */}
								<button
									className="bg-[#F8F7F5] hover:bg-secondary-color-S9 animation-fade flex justify-center items-center w-12 h-12 p-3 rounded-2xl"
									onClick={() => handleDeleteLanguage(index)}
									type="button"
								>
									<TrashBinIcon
										fillcolor={"fill-primary-color-P4"}
										strokeColor={"stroke-primary-color-P4"}
									/>
								</button>
							</div>
						);
					})}
				</div>

				<SplitDynamicErrorZod message={languagesError?.message} />
			</SectionContent>
		</SectionWrapper>
	);
};

export default AboutYourselfMasteredLanguages;
