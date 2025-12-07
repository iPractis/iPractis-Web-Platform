import { getInputStatusBorder } from "@/src/lib/utils/getInputStatusBorder";
import { SplitDynamicErrorZod } from "../../../lib/utils/getZodValidations";
import InputLeftStickStatus from "../../Shared/InputLeftStickStatus";
import {
	subjectImages,
	countryAveragePrices,
} from "@/src/data/dataTeacherRegistration";
import InputBGWrapperIcon from "../../Shared/InputBGWrapperIcon";
import CustomNextUiInput from "../../Shared/CustomNextUiInput";
import SectionWrapper from "../../Shared/SectionWrapper";
import SectionContent from "../../Shared/SectionContent";
import SectionHeader from "../../Shared/SectionHeader";

// React imports
import { useController } from "react-hook-form";
import Image from "next/image";

// Icons
import { DollarSignIcon, QuestionMark } from "../../Icons";

const AveragePrice = ({ control, errors, watch, userCountry }) => {
	const subjectToTeachImage = subjectImages[watch("subject")];

	// Get country-specific average price data
	const getCountryAveragePrice = (country) => {
		if (!country) return countryAveragePrices.default;
		return countryAveragePrices[country] || countryAveragePrices.default;
	};

	const countryPriceData = getCountryAveragePrice(userCountry);

	const {
		field: hourlyPrice,
		fieldState: { error: hourlyPriceError },
	} = useController({
		name: "hourlyPrice",
		control,
	});

	// Handle input change to strip non-numeric characters except numbers
	const handlePriceChange = (e) => {
		let value = e.target.value;
		// Remove "USD" if it exists in the input
		value = value.replace(/\s*USD\s*/gi, "");
		// Remove all non-numeric characters and keep only numbers
		const numericValue = value.replace(/[^0-9]/g, "");
		hourlyPrice.onChange(numericValue);
	};

	return (
		<SectionWrapper>
			<SectionHeader
				titleIcon={<DollarSignIcon fillcolor="fill-primary-color-P1" />}
				titleText="Class Rate"
				descriptionText="Lessons rate matter, guiding students to affordability and value."
				titleClassName="MT-SB-1"
			/>

			<SectionContent>
				<div>
					<div className="flex flex-col mb-2 ps-1.5">
						<span className="flex gap-1.5 items-center text-primary-color-P4 MT-SB-1">
							Private lesson rate
							<QuestionMark fillcolor={"fill-primary-color-P4"} />
						</span>
						<span className="text-primary-color-P4 ST-3">
							Define your rate for 1:1 private lesson.
						</span>
					</div>
					<InputLeftStickStatus
						inputBarStatusClassName={`${getInputStatusBorder(
							errors,
							hourlyPrice.value,
							"hourlyPrice",
						)}`}
					>
						<div className="relative">
								<CustomNextUiInput
									type="text"
									name="hourlyPrice"
									placeholder="Set your hourly base rate"
									startContent={
										<InputBGWrapperIcon>
											<DollarSignIcon fillcolor={"fill-primary-color-P4"} />
										</InputBGWrapperIcon>
									}
									endContent={
										<div
											style={{
												display: "inline-flex",
												flexDirection: "row",
												alignItems: "center",
												padding: "6px 12px",
												gap: "10px",
												height: "36px",
												background: "#FFD600",
												borderRadius: "10px",
												flex: "none",
												order: 0,
												alignSelf: "stretch",
												flexGrow: 0,
											}}
										>
											<span
												style={{
													fontFamily: "Poppins, sans-serif",
													fontStyle: "normal",
													fontWeight: 500,
													fontSize: "11.2px",
													lineHeight: "17px",
													color: "#48484A",
													whiteSpace: "nowrap",
													display: "inline-block",
												}}
											>
												30 minutes sessions
											</span>
										</div>
									}
									value={hourlyPrice.value || ""}
									onChange={handlePriceChange}
									onBlur={hourlyPrice.onBlur}
								/>
								{hourlyPrice.value && (
									<span
										className="absolute top-1/2 -translate-y-1/2 text-primary-color-P4 ST-3 pointer-events-none whitespace-nowrap"
										style={{
											left: `${String(hourlyPrice.value).length * 8 + 65}px`,
										}}
									>
										{" USD"}
									</span>
								)}
							</div>
					</InputLeftStickStatus>

					<SplitDynamicErrorZod message={hourlyPriceError?.message} />

					{(subjectToTeachImage || countryPriceData.flag) && (
						<div className="flex w-fit animation-fade cursor-pointer p-2 rounded-[16px] btn-quaternary group leading-[.9rem] items-center mt-4">
							<div
								className="me-3"
								style={{
									width: "44px",
									height: "38px",
									borderRadius: "10px",
									flex: "none",
									order: 0,
									flexGrow: 0,
								}}
							>
								<Image
									src={countryPriceData.flag || subjectToTeachImage}
									alt={"Country Image"}
									className="w-full h-full object-cover"
									style={{
										borderRadius: "10px",
									}}
								/>
							</div>

							<div
								style={{
									display: "flex",
									flexDirection: "column",
									justifyContent: "center",
									alignItems: "flex-start",
									padding: "0px",
									gap: "3px",
									width: "130px",
									height: "38px",
									flex: "none",
									order: 1,
									flexGrow: 0,
								}}
							>
								<h3 className="text-gray-500 text-[12px]">Average Price</h3>
								<div className="flex items-center gap-1 whitespace-nowrap">
									<span className="text-black font-bold text-[12px] group-active:text-primary-color-P12">
										{countryPriceData.price}
									</span>
									<span className="text-gray-500 text-[10px] group-active:text-primary-color-P12">
										For 30 mins
									</span>
								</div>
							</div>
						</div>
					)}
				</div>
			</SectionContent>
		</SectionWrapper>
	);
};

export default AveragePrice;
