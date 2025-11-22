import TeacherInfoSpecialties from "./TeacherInfoSpecialties";
import TeacherInfoExperience from "./TeacherInfoExperience";
import TeacherInfoEducation from "./TeacherInfoEducation";
import SaveAndContinueBox from "../TabSubject/SaveAndContinueBox";
import {
	StarIcon,
	HeartSmallIcon,
	ChevronLeftBigIcon,
	ChevronRightMediumIcon,
	FlagIcon,
	TeacherInfoIcon,
	IncreasingLevels,
	GraduationCapIcon,
	DollarSignIcon,
	ManIcon,
	MessageIcon,
	RightArrowMediumIcon,
	CalendarIcon,
	GraphImportantIcon,
	ChevronDownBigIcon,
} from "../../Icons";
import Image from "next/image";
import InputLeftStickStatus from "../../Shared/InputLeftStickStatus";
import tutorImagePreview from "@/public/images/tutor-image-preview.png";
import unitedKingdom from "@/public/flags/united-kingdom.png";
import { getMonthNumberAsText } from "@/src/lib/utils/getMonthNumberAsText";
import { useEffect, useState, useRef } from "react";
import { fetchCountries } from "@/src/lib/utils/fetchCountries";
import { timeZones } from "@/src/data/dataTeacherRegistration";
import { useAuth } from "@/src/hooks/useAuth";
import { getYoutubeVideoIdUrl } from "@/src/lib/utils/getYoutubeVideoIdUrl";
import InputBGWrapperIcon from "../../Shared/InputBGWrapperIcon";

const AvailabilityRevision = ({ draftData }) => {
	// Function to get color based on language level
	console.log("Draft Data:", draftData);
  

	const { user } = useAuth();
	const buttonRef = useRef(null);

	const handleSendApplication = async (e) => {
		e.preventDefault();

		if (buttonRef.current) {
			buttonRef.current.loading();
		}

		try {
			const draftWithUserId = { ...draftData, userId: user?.userId };

			const response = await fetch("/api/teachers", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(draftWithUserId),
			});

			if (!response.ok) {
				const errorData = await response.json();
				console.error("Insert failed:", errorData);

				if (errorData?.code === "23505") {
					alert("Form already in review, cannot submit new application.");
				} else {
					alert(errorData?.message || "Failed to submit application.");
				}
				if (buttonRef.current) {
					buttonRef.current.notIsLoading();
				}
				return;
			}

			const result = await response.json();
			// Redirect to status tab
			window.location.href = "/teacher-registration?tab=status";
		} catch (error) {
			console.error("Error submitting draft:", error);
			alert(error.message || "Unexpected error occurred.");
			if (buttonRef.current) {
				buttonRef.current.notIsLoading();
			}
		}
	};

	const getFluencyText = (level) =>
		({
			A: `Basic ${level}`,
			B: `Conversational ${level}`,
			C: `Fluent ${level}`,
		})[level?.[0]] || level;

	const getLevelColor = (level) => {
		const levelColors = {
			C2: "bg-green-200", // Green
			C1: "bg-blue-200", // Blue
			B2: "bg-purple-200", // Purple
			B1: "bg-orange-200", // Orange
			A2: "bg-pink-200", // Pink
			A1: "bg-yellow-200", // Yellow
			Native: "bg-black", // Black
			Fluent: "bg-green-200", // Green
			Basic: "bg-orange-200", // Orange
		};

		// Check for exact match first
		if (levelColors[level]) {
			return levelColors[level];
		}

		// Check if level contains any of the keys
		for (const [key, color] of Object.entries(levelColors)) {
			if (level && level.includes(key)) {
				return color;
			}
		}

		// Default color
		return "bg-gray-200";
	};

	// Debug logging
	console.log("AvailabilityRevision - draftData:", draftData);
	console.log("AvailabilityRevision - availability:", draftData?.availability);

	// Debug when draftData changes
	useEffect(() => {}, [draftData]);

	// Date picker state (extracted from WorkScheduleTable logic)
	const [weekDates, setWeekDates] = useState([]);
	const [minDate, setMinDate] = useState("");
	const [maxDate, setMaxDate] = useState("");

	// Country data state
	const [countries, setCountries] = useState([]);
	const [selectedCountryFlag, setSelectedCountryFlag] = useState(unitedKingdom);

	// Get timezone label from timezone value
	const getTimezoneLabel = (timezoneValue) => {
		const tz = timeZones.find((tz) => tz.value === timezoneValue);
		return tz?.label || timezoneValue || "GMT+1";
	};

	const getLevelText = (levels) =>
		({
			0: "Doesn't teach any levels",
			1: `Teaches ${levels[0]} level`,
			2: `Teaches ${levels.join(" and ")} levels`,
		})[levels?.length || 0] || "Teaches all levels";

	// Get age display text
	const getAgeText = () => {
		const teachesYoung = draftData.teachToYoungPersons;
		const teachesAmateur = draftData.teachToAmateurPersons;

		// If both selected, show "all ages"
		if (teachesYoung && teachesAmateur) {
			return "Teaches all ages";
		}

		// If only young persons, show "Teaches children & teenagers"
		if (teachesYoung && !teachesAmateur) {
			return "Teaches children & teenagers";
		}

		// If only amateur persons, show "Teaches adults only"
		if (!teachesYoung && teachesAmateur) {
			return "Teaches adults only";
		}

		// Default fallback
		return "Teaches all ages";
	};

	// Initialize week dates (same logic as WorkScheduleTable)
	useEffect(() => {
		const today = new Date();
		const currentDay = today.getDay();
		const daysToMonday = currentDay === 0 ? -6 : 1 - currentDay;
		const mondayDate = new Date(today);
		mondayDate.setDate(today.getDate() + daysToMonday);

		const weekDatesArray = Array.from({ length: 7 }, (_, index) => {
			const date = new Date(mondayDate);
			date.setDate(mondayDate.getDate() + index);
			return {
				actualDate: date.getDate(),
				actualMonth: date.getMonth(),
				actualYear: date.getFullYear(),
			};
		});

		setWeekDates(weekDatesArray);
		setMinDate(weekDatesArray[0]);
		setMaxDate(weekDatesArray[6]);
	}, []);

	// Fetch countries and set correct flag
	useEffect(() => {
		const loadCountries = async () => {
			try {
				const countriesData = await fetchCountries();
				setCountries(countriesData);

				// Find the correct country flag based on draftData.country
				if (draftData?.country && countriesData.length > 0) {
					const matchingCountry = countriesData.find(
						(country) =>
							country.name.toLowerCase() === draftData.country.toLowerCase(),
					);
					if (matchingCountry) {
						setSelectedCountryFlag(matchingCountry.flag);
					}
				}
			} catch (error) {
				console.error("Error fetching countries:", error);
				// Keep default UK flag if error
			}
		};

		loadCountries();
	}, [draftData?.country]);

	// Week navigation functions (same logic as WorkScheduleTable)
	const handleDecrementWeek = () => {
		const newWeekDates = weekDates.map((date) => {
			const newDate = new Date(
				date.actualYear,
				date.actualMonth,
				date.actualDate - 7,
			);
			return {
				actualDate: newDate.getDate(),
				actualMonth: newDate.getMonth(),
				actualYear: newDate.getFullYear(),
			};
		});
		setWeekDates(newWeekDates);
		setMinDate(newWeekDates[0]);
		setMaxDate(newWeekDates[6]);
	};

	const handleIncrementWeek = () => {
		const newWeekDates = weekDates.map((date) => {
			const newDate = new Date(
				date.actualYear,
				date.actualMonth,
				date.actualDate + 7,
			);
			return {
				actualDate: newDate.getDate(),
				actualMonth: newDate.getMonth(),
				actualYear: newDate.getFullYear(),
			};
		});
		setWeekDates(newWeekDates);
		setMinDate(newWeekDates[0]);
		setMaxDate(newWeekDates[6]);
	};

	return (
		<form onSubmit={handleSendApplication}>
			<section className="max-w-[1400px] mx-auto gap-[50px]">
				{/* Teacher's information header box */}
				<div className="bg-primary-color-P12 rounded-[32px] p-4 mb-8 h-[48px] flex items-center gap-[10px] max-w-none w-[calc(100%+160px)] md:w-[calc(100%+120px)] sm:w-[calc(100%+48px)] ml-[-80px] md:ml-[-50px] sm:ml-[-20px]">
					{/* Icon container */}
					<div className="ml-[-36px] md:ml-[-24px] sm:ml-[-12px] w-[48px] h-[48px] rounded-[16px] bg-secondary-color-S11 flex items-center justify-center p-[14px]">
						<TeacherInfoIcon fillcolor={"fill-primary-color-P1"} />
					</div>

					{/* Text content */}
					<div className="flex flex-col justify-center mr-[-36px] md:mr-[-24px] sm:mr-[-12px]">
						<h3 className="MT-SB-1 text-primary-color-P1">
							Teacher&apos;s information
						</h3>
						<p className="ST-3 text-primary-color-P4">
							Comprehensive overview of the teacher’s background, expertise, and
							instructional approach.
						</p>
					</div>
				</div>

				{/* Teacher Profile Container */}
				<div className="bg-primary-color-P12 rounded-[32px] p-0 mb-8 max-w-[1000px] h-[48px] flex items-center justify-between px-8 mx-auto">
					{/* Left side - Profile Image and Basic Info (same format as Teacher's info header) */}
					<div className="flex items-center gap-[10px]">
						<div className="ml-[4px]">
							<InputLeftStickStatus inputBarStatusClassName="bg-quinary-color-VS5 !h-[28px] !rounded-[10px]">
								<div className="relative w-[52px] h-[52px] rounded-[10px] overflow-hidden">
									<Image
										alt={"Teacher Profile"}
										className="w-full h-full object-contain"
										width={48}
										height={48}
										src={draftData.profile_url || tutorImagePreview}
										unoptimized={true}
									/>
								</div>
							</InputLeftStickStatus>
						</div>

						<div className="flex flex-col justify-center">
							<h3 className="MT-SB-1 text-primary-color-P4">
								{draftData.firstName}{" "}
								{draftData.lastName
									? `${draftData.lastName.charAt(0).toUpperCase()}.`
									: ""}
							</h3>
							<div className="flex items-center gap-2">
								<Image
									alt={"Country Flag"}
									className="h-[13px] w-[15px] object-cover object-center rounded-[3px]"
									src={selectedCountryFlag}
									width={15}
									height={13}
									unoptimized={true}
								/>
								<p className="ST-2 text-primary-color-P4">
									Teaches {draftData.subject}
								</p>
							</div>
						</div>
					</div>

					{/* Right side - Action buttons with same attributes as profile picture */}
					<div className="flex gap-[10px]">
						<button
							className="w-[48px] h-[48px] rounded-[16px] bg-[#F8F7F5] hover:bg-[#f0efed] transition-colors flex items-center justify-center p-[14px]"
							type="button"
						>
							<FlagIcon fillcolor={"fill-black"} />
						</button>
						<button
							className="w-[48px] h-[48px] rounded-[16px] bg-[#FFB8BC] hover:bg-[#ffc0e1] transition-colors flex items-center justify-center p-[14px]"
							type="button"
						>
							<HeartSmallIcon fillcolor={"fill-white"} />
						</button>
					</div>
				</div>

				{/* Teacher Details Section with Image and Info */}
				<div className="w-[1000px] h-[302.625px] max-w-[1000px] flex gap-8 mb-8 mx-auto">
					{/* Left side - Teacher Video or Image */}
					<div className="w-[538px] h-[302.625px] overflow-hidden rounded-[32px]">
						{draftData.videoLink ? (
							<iframe
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								className="w-full h-full"
								src={(() => {
									const videoId = getYoutubeVideoIdUrl(draftData.videoLink);
									return videoId
										? `https://www.youtube.com/embed/${videoId}`
										: draftData.videoLink;
								})()}
								title="Teacher Introduction Video"
								allowFullScreen
								frameBorder="0"
							></iframe>
						) : (
							<Image
								alt={"Teacher Profile"}
								className="w-full h-full object-cover"
								width={538}
								height={303}
								src={draftData.profile_url || tutorImagePreview}
								unoptimized={true}
							/>
						)}
					</div>

					{/* Right side - Details Container */}
					<div className="w-[430px] h-[302.625px] max-w-[430px] flex flex-col py-[16px]">
						{/* Top Section - Stats Blocks (moved above teaching details) */}
						<div className="flex gap-2 mb-[16px]">
							{/* Lessons count - simplified (no if/else) */}
							<div className="w-[170px] h-[50px] bg-[#F8F7F5] rounded-[16px] flex gap-3 items-center px-2">
								<div>
									<InputBGWrapperIcon>
										<StarIcon fillcolor={"fill-primary-color-P1"} />
									</InputBGWrapperIcon>
								</div>
								<div>
									<h4 className="ST-1 text-primary-color-P4">
										{draftData.totalLessons || ""} Lessons
									</h4>
									<div className="flex items-center gap-1">
										<span
											className={
												draftData.totalLessons
													? "MT-SB-1 text-primary-color-P1"
													: "ST-3 text-primary-color-P1"
											}
										>
											{draftData.totalLessons || "N/A"}
										</span>
										<StarIcon fillcolor={"fill-quaternary-color-A5"} />
									</div>
								</div>
							</div>
							<div className="w-[170px] h-[50px] bg-[#F8F7F5] rounded-[16px] flex gap-3 items-center px-2">
								<div>
									<InputBGWrapperIcon>
										<GraduationCapIcon fillcolor={"fill-primary-color-P1"} />
									</InputBGWrapperIcon>
								</div>
								<div>
									<h4 className="ST-1 text-primary-color-P4">Students</h4>
									<div className="flex items-center gap-1">
										<span
											className={
												draftData.activeStudents
													? "MT-SB-1 text-primary-color-P1"
													: "ST-3 text-primary-color-P1"
											}
										>
											{draftData.activeStudents || "N/A"}
										</span>
									</div>
								</div>
							</div>

							{/* Lesson Rate */}
							{draftData.hourlyPrice && (
								<div className="w-[250px] h-[50px] bg-[#F8F7F5] rounded-[16px] flex gap-3 items-center px-2">
									<div>
										<InputBGWrapperIcon>
											<DollarSignIcon fillcolor={"fill-primary-color-P1"} />
										</InputBGWrapperIcon>
									</div>
									<div>
										<h4 className="ST-1 text-primary-color-P4">Lesson rate</h4>
										<div className="flex items-center gap-1">
											<span className="ST-SB-3 text-primary-color-P1">
												{draftData.hourlyPrice} USD
											</span>
											<span className="bg-quaternary-color-A6 text-primary-color-P1 px-[8px] py-[2px] rounded-[6px] ST-1 flex items-center justify-center">
												30 mins
											</span>
										</div>
									</div>
								</div>
							)}
						</div>

						{/* Middle Section - Teaching Details (moved down) */}
						{/* Teaching levels */}
						<div className="w-[430px] h-[48px] bg-[#F8F7F5] rounded-[16px] flex items-center gap-[10px] px-4 mb-[16px]">
							<span className="w-[36px] h-[36px] bg-white rounded-[10px] p-2 -ml-2.5 flex items-center justify-center">
								<IncreasingLevels fillcolor={"fill-primary-color-P1"} />
							</span>
							<p className="ST-3 text-primary-color-P1">
								{getLevelText(draftData.studentLevel)}
							</p>
						</div>
						{/* Teaching ages */}
						<div className="w-[430px] h-[48px] bg-[#F8F7F5] rounded-[16px] flex items-center gap-[10px] px-4 py-3 mb-[16px]">
							<span className="w-[36px] h-[36px] bg-white rounded-[10px] p-2 -ml-2.5 flex items-center justify-center">
								<ManIcon fillcolor={"fill-primary-color-P1"} />
							</span>
							<p className="ST-3 text-primary-color-P1">{getAgeText()}</p>
						</div>

						{/* Bottom Section - Action Buttons */}
						<div className="w-[430px] h-[48px] flex items-center gap-4">
							{/* Message Icon */}
							<button
								className="w-[48px] h-[48px] rounded-[16px] bg-tertiary-color-SC5 hover:bg-[#3b5be6] transition-colors flex items-center justify-center p-[14px]"
								type="button"
							>
								<MessageIcon fillcolor="fill-primary-color-P12" />
							</button>

							{/* Try Now Button */}
							<button
								className="w-[366px] h-[48px] bg-tertiary-color-SC6 hover:bg-tertiary-color-SC5 transition-colors flex items-center justify-between pl-4 pr-[6px] py-3 rounded-[16px]"
								type="button"
							>
								<span className="text-primary-color-P12 font-semibold">
									Try now!
								</span>
								<span className="w-[36px] h-[36px] bg-primary-color-P12 rounded-[10px] p-2 flex items-center justify-center">
									<RightArrowMediumIcon fillcolor={"fill-tertiary-color-SC5"} />
								</span>
							</button>
						</div>
					</div>
				</div>

				{/* About Section - Only show if introduction exists */}
				{(draftData.introduction ||
					(draftData.languages && draftData.languages.length > 0)) && (
					<div className="w-[1000px] max-w-[1000px] mx-auto mb-8 bg-primary-color-P12 rounded-[32px] px-8 py-4 flex flex-col gap-4">
						{draftData.introduction && (
							<>
								<h3 className="MT-SB-1 text-primary-color-P1">
									About {draftData.firstName}
								</h3>
								<p className="ST-3 text-primary-color-P4 leading-relaxed">
									{draftData.introduction}
								</p>
							</>
						)}

						{draftData.languages && draftData.languages.length > 0 && (
							<div className="flex gap-[10px] items-center justify-start">
								{draftData.languages.map((language, index) => (
									<div key={index} className="flex items-center gap-1">
										<span className="ST-2 text-primary-color-P1">
											{language.name}
										</span>
										<div
											className={`rounded-[6px] px-[6px] py-[2px] ST-1 flex items-center justify-center ${getLevelColor(language.level)} ${language.level === "Native" ? "text-primary-color-P12" : "text-primary-color-P1"}`}
										>
											<span>{getFluencyText(language.level)}</span>
										</div>
									</div>
								))}
							</div>
						)}
					</div>
				)}

				{/* Profile Title Section - Only show if data exists */}
				{(draftData.profileTitle || draftData.subjectIntroduction) && (
					<div className="w-[1000px] max-w-[1000px] h-[144px] bg-[#F8F7F5] rounded-[32px] p-8 mb-[100px] mx-auto flex flex-col gap-4">
						{draftData.profileTitle && (
							<h3 className="MT-SB-1 text-primary-color-P1">
								{draftData.profileTitle}
							</h3>
						)}
						{draftData.subjectIntroduction && (
							<p className="ST-3 text-primary-color-P4 leading-relaxed">
								{draftData.subjectIntroduction}
							</p>
						)}
					</div>
				)}

				{/* Teacher's Availability Header */}
				<div className="bg-primary-color-P12 rounded-[32px] p-4 mb-8 h-[48px] flex items-center gap-[10px] max-w-none w-[calc(100%+160px)] md:w-[calc(100%+120px)] sm:w-[calc(100%+48px)] ml-[-80px] md:ml-[-50px] sm:ml-[-20px]">
					{/* Icon container */}
					<div className="ml-[-36px] md:ml-[-24px] sm:ml-[-12px] w-[48px] h-[48px] rounded-[16px] bg-secondary-color-S11 flex items-center justify-center p-[14px]">
						<CalendarIcon fillcolor={"fill-primary-color-P1"} />
					</div>
					<div className="flex flex-col justify-center">
						<h3 className="MT-SB-1 text-primary-color-P1">
							Teacher&apos;s availability
						</h3>
						<p className="ST-3 text-primary-color-P4">
							Real-time visibility into the teacher’s scheduling patterns and
							open time slots.
						</p>
					</div>
				</div>

				{/* Duplicate Teacher's Availability Section with Custom Grid */}
				<div className="w-[1000px] max-w-[1000px] mx-auto mb-8 bg-white rounded-[32px] p-8 flex flex-col gap-8">
					{/* Section Header */}

					{/* From/To Date Picker - Using Working Components */}
					<div className="flex items-center justify-center gap-8 mb-4">
						<button onClick={handleDecrementWeek} type="button">
							<ChevronLeftBigIcon fillcolor={"fill-primary-color-P1"} />
						</button>

						<h3 className="text-primary-color-P1 ST-4">From</h3>

						<InputLeftStickStatus inputBarStatusClassName="bg-quinary-color-VS5 !h-[15px] !rounded-[10px]">
							<div className="flex items-center gap-1.5 rounded-2xl p-1.5 ST-3 bg-[#f8f7f5] group-hover:bg-secondary-color-S9 w-[284px]">
								<input
									type="text"
									className="input-ipractis !text-primary-color-P1 MT-1 text-center outline-none rounded-[10px] !px-2 !py-1.5 w-[48px] h-9"
									defaultValue={minDate?.actualDate}
									name="birthDateNumber"
									readOnly
								/>

								<input
									type="text"
									className="input-ipractis !text-primary-color-P1 MT-1 text-center outline-none rounded-[10px] !px-4 !py-1.5 w-[141px] h-9"
									defaultValue={getMonthNumberAsText(minDate?.actualMonth + 1)}
									name="birthDateMonth"
									readOnly
								/>

								<input
									type="text"
									className="input-ipractis !text-primary-color-P1 MT-1 text-center outline-none rounded-[10px] !px-4 !py-1.5 w-[71px] h-9"
									defaultValue={minDate?.actualYear}
									name="birthDateYear"
									readOnly
								/>
							</div>
						</InputLeftStickStatus>

						<h3 className="text-primary-color-P1 ST-4">To</h3>

						<InputLeftStickStatus inputBarStatusClassName="bg-quinary-color-VS5 !h-[15px] !rounded-[10px]">
							<div className="flex items-center gap-1.5 rounded-2xl p-1.5 ST-3 bg-[#f8f7f5] group-hover:bg-secondary-color-S9 w-[284px]">
								<input
									type="text"
									className="input-ipractis !text-primary-color-P1 MT-1 text-center outline-none rounded-[10px] !px-4 !py-1.5 w-[52px] h-9"
									name="birthDateNumber"
									defaultValue={maxDate?.actualDate}
									readOnly
								/>

								<input
									type="text"
									className="input-ipractis !text-primary-color-P1 MT-1 text-center outline-none rounded-[10px] !px-4 !py-1.5 w-[137px] h-9"
									defaultValue={getMonthNumberAsText(maxDate?.actualMonth + 1)}
									name="birthDateMonth"
									readOnly
								/>

								<input
									type="text"
									className="input-ipractis !text-primary-color-P1 MT-1 text-center outline-none rounded-[10px] !px-4 !py-1.5 w-[71px] h-9"
									name="birthDateYear"
									defaultValue={maxDate?.actualYear}
									readOnly
								/>
							</div>
						</InputLeftStickStatus>
						<button onClick={handleIncrementWeek} type="button">
							<ChevronRightMediumIcon fillcolor={"fill-primary-color-P1"} />
						</button>
					</div>

					{/* Custom Availability Grid */}
					<div className="flex flex-col gap-1">
						{/* Top row: Format button + Hour headers (0-23) */}
						<div className="flex gap-1">
							<button className="bg-black text-white rounded-[8px] px-3 py-2 text-xs font-medium w-[80px] h-[32px] flex items-center justify-center mr-2">
								Format
							</button>
							{Array.from({ length: 24 }).map((_, hour) => (
								<div
									key={hour}
									className="bg-black text-white rounded-[8px] w-[32px] h-[32px] flex items-center justify-center text-xs font-medium"
								>
									{hour}
								</div>
							))}
						</div>

						{/* Day rows: Day labels + Availability cells */}
						{[
							{ day: "Sa", num: 1, dbDay: "Sat" },
							{ day: "Su", num: 2, dbDay: "Sun" },
							{ day: "Mo", num: 3, dbDay: "Mon" },
							{ day: "Tu", num: 4, dbDay: "Tue" },
							{ day: "We", num: 5, dbDay: "Wed" },
							{ day: "Th", num: 6, dbDay: "Thu" },
							{ day: "Fr", num: 7, dbDay: "Fri" },
						].map(({ day, num, dbDay }, dayIndex) => {
							// Find the availability data for this day using the database day format
							const dayAvailability = draftData?.availability?.find(
								(slot) => slot.day === dbDay,
							);

							return (
								<div key={day} className="flex gap-1">
									{/* Day Label: white day name + black number pill */}
									<div className="w-[80px] h-[32px] flex items-center gap-1 mr-2">
										<div className="bg-white text-black rounded-[8px] h-full flex-1 flex items-center justify-center text-xs font-medium">
											{day}
										</div>
										<div className="bg-black text-white rounded-[8px] h-full w-[32px] flex items-center justify-center text-xs font-bold">
											{num}
										</div>
									</div>
									{/* Availability Cells for the day - split into vertical halves */}
									{Array.from({ length: 24 }).map((_, hour) => {
										// Check for specific time markers: hour:00 for left half, hour:30 for right half
										const isLeftHalfSelected = dayAvailability?.hour?.includes(
											`${hour}:00`,
										);
										const isRightHalfSelected = dayAvailability?.hour?.includes(
											`${hour}:30`,
										);
										const bothHalvesSelected =
											isLeftHalfSelected && isRightHalfSelected;

										return (
											<div
												key={`${day}-${hour}`}
												className={`w-[32px] h-[32px] relative rounded-[4px] overflow-hidden`}
											>
												{/* Left half (first 30 min) */}
												<div
													className={`absolute top-0 left-0 w-1/2 h-full ${
														isLeftHalfSelected
															? "bg-yellow-300"
															: "bg-[#f8f7f5]"
													}`}
												/>

												{/* Right half (second 30 min) */}
												<div
													className={`absolute top-0 right-0 w-1/2 h-full ${
														isRightHalfSelected
															? "bg-yellow-300"
															: "bg-[#f8f7f5]"
													}`}
												/>
											</div>
										);
									})}
								</div>
							);
						})}
					</div>

					{/* Legend and Timezone */}
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-6">
							<div className="flex items-center gap-2">
								<div className="w-4 h-4 bg-gray-200 rounded"></div>
								<span className="ST-3 text-primary-color-P1">
									Booked lesson
								</span>
							</div>
							<div className="flex items-center gap-2">
								<div className="w-4 h-4 bg-yellow-300 rounded"></div>
								<span className="ST-3 text-primary-color-P1">
									Available for lesson
								</span>
							</div>
							<div className="flex items-center gap-2">
								<div className="w-4 h-4 bg-gray-600 rounded"></div>
								<span className="ST-3 text-primary-color-P1">Unavailable</span>
							</div>
						</div>

						{/* Timezone Indicator */}
						<div className="w-[430px] h-[48px] bg-[#F8F7F5] rounded-full px-3 py-2 flex items-center gap-2">
							<svg
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w.org/2000/svg"
							>
								<path
									d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"
									fill="currentColor"
								/>
							</svg>
							<span className="ST-3 text-primary-color-P1">
								{getTimezoneLabel(draftData.timeZone)}
							</span>
						</div>
					</div>
				</div>

				{/* Specialties Section */}
				<TeacherInfoSpecialties draftData={draftData} />

				{/* Experience Section */}
				<TeacherInfoExperience draftData={draftData} />

				{/* Education Section */}
				<TeacherInfoEducation draftData={draftData} />

				{/* Application Submission Box */}
				<SaveAndContinueBox
					buttonRef={buttonRef}
					titleText="Last step, review your profile before applying"
					descriptionText="Double-check your information, then click Send application to finalize. Good luck!"
					buttonText="Send application"
					ChevronIcon={ChevronDownBigIcon}
					wrapperSectionHeaderClassName="bg-quaternary-color-A5"
					titleIcon={<GraphImportantIcon />}
				/>
			</section>
		</form>
	);
};

export default AvailabilityRevision;
