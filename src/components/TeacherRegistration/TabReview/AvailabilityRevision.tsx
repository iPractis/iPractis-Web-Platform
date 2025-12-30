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
	EarthIcon,
} from "../../Icons";
import { Select, SelectItem } from "@nextui-org/react";
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
	const [minDate, setMinDate] = useState({ actualDate: "", actualMonth: "", actualYear: "" });
	const [maxDate, setMaxDate] = useState({ actualDate: "", actualMonth: "", actualYear: "" });
	const [isCurrentWeek, setIsCurrentWeek] = useState(true);
	const [todayDayOfWeek, setTodayDayOfWeek] = useState("");
	const [isTimezoneOpen, setIsTimezoneOpen] = useState(false);
	const [selectedTimeZone, setSelectedTimeZone] = useState(
		draftData?.timeZone || "America/Chicago",
	);

	// Country data state
	const [selectedCountryFlag, setSelectedCountryFlag] = useState(unitedKingdom);

	// Timezone display labels with city names
	const timezoneDisplayLabels = {
		"Etc/GMT+12": "GMT-12 (Baker Island)",
		"Pacific/Midway": "GMT-11 (Midway)",
		"Pacific/Honolulu": "GMT-10 (Honolulu)",
		"America/Anchorage": "GMT-9 (Anchorage)",
		"America/Los_Angeles": "GMT-8 (Los Angeles)",
		"America/Denver": "GMT-7 (Denver)",
		"America/Chicago": "GMT-6 (Chicago)",
		"America/New_York": "GMT-5 (New York)",
		"America/Santiago": "GMT-4 (Santiago)",
		"America/Argentina/Buenos_Aires": "GMT-3 (Buenos Aires)",
		"Atlantic/South_Georgia": "GMT-2 (South Georgia)",
		"Atlantic/Azores": "GMT-1 (Azores)",
		"Etc/UTC": "GMT (UTC)",
		"Europe/Madrid": "GMT+1 (Madrid)",
		"Africa/Algiers": "GMT+1 (Algeria, Algiers)",
		"Europe/Athens": "GMT+2 (Athens)",
		"Europe/Moscow": "GMT+3 (Moscow)",
		"Asia/Dubai": "GMT+4 (Dubai)",
		"Asia/Karachi": "GMT+5 (Karachi)",
		"Asia/Dhaka": "GMT+6 (Dhaka)",
		"Asia/Bangkok": "GMT+7 (Bangkok)",
		"Asia/Singapore": "GMT+8 (Singapore)",
		"Asia/Tokyo": "GMT+9 (Tokyo)",
		"Australia/Sydney": "GMT+10 (Sydney)",
		"Pacific/Noumea": "GMT+11 (Noumea)",
		"Pacific/Auckland": "GMT+12 (Auckland)",
		"Pacific/Tongatapu": "GMT+13 (Tongatapu)",
		"Pacific/Kiritimati": "GMT+14 (Kiritimati)",
	};

	// Get display label for timezone
	const getTimezoneDisplayLabel = (timezoneValue) => {
		return (
			timezoneDisplayLabels[timezoneValue] ||
			timezoneValue ||
			"GMT+1 (Algeria, Algiers)"
		);
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

	// Map day of week number to day abbreviation (0 = Sunday)
	const dayOfWeekMap = {
		0: "Su",
		1: "Mo",
		2: "Tu",
		3: "We",
		4: "Th",
		5: "Fr",
		6: "Sa",
	};

	// Initialize week dates - start from Saturday of current week
	useEffect(() => {
		const today = new Date();
		const currentDayOfWeek = today.getDay(); // 0 = Sunday, 6 = Saturday

		// Set today's day abbreviation for highlighting
		setTodayDayOfWeek(dayOfWeekMap[currentDayOfWeek]);

		// Calculate days to Saturday (start of our week view)
		// If today is Saturday (6), daysToSaturday = 0
		// If today is Sunday (0), daysToSaturday = -1 (go back 1 day)
		// If today is Monday (1), daysToSaturday = -2 (go back 2 days)
		const daysToSaturday = currentDayOfWeek === 6 ? 0 : -(currentDayOfWeek + 1);
		const saturdayDate = new Date(today);
		saturdayDate.setDate(today.getDate() + daysToSaturday);

		const weekDatesArray = Array.from({ length: 7 }, (_, index) => {
			const date = new Date(saturdayDate);
			date.setDate(saturdayDate.getDate() + index);
			return {
				actualDate: date.getDate(),
				actualMonth: date.getMonth(),
				actualYear: date.getFullYear(),
			};
		});

		setWeekDates(weekDatesArray);
		setMinDate(weekDatesArray[0]);
		setMaxDate(weekDatesArray[6]);
		setIsCurrentWeek(true);
	}, []);

	// Fetch countries and set correct flag
	useEffect(() => {
		const loadCountries = async () => {
			try {
				const countriesData = await fetchCountries();

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

	// Check if a week contains today
	const checkIfCurrentWeek = (weekDatesArray) => {
		const today = new Date();
		today.setHours(0, 0, 0, 0);

		return weekDatesArray.some((date) => {
			const weekDate = new Date(
				date.actualYear,
				date.actualMonth,
				date.actualDate,
			);
			weekDate.setHours(0, 0, 0, 0);
			return weekDate.getTime() === today.getTime();
		});
	};

	// Week navigation functions
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
		setIsCurrentWeek(checkIfCurrentWeek(newWeekDates));
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
		setIsCurrentWeek(checkIfCurrentWeek(newWeekDates));
	};

	// Handle timezone change
	const handleTimeZoneChange = (e) => {
		setSelectedTimeZone(e.target.value);
	};

	// Get timezone offset in hours for a given timezone
	const getTimezoneOffset = (timezone) => {
		const date = new Date();
		const utcDate = new Date(date.toLocaleString("en-US", { timeZone: "UTC" }));
		const tzDate = new Date(date.toLocaleString("en-US", { timeZone: timezone }));
		return (tzDate - utcDate) / (1000 * 60 * 60); // offset in hours
	};

	// Convert availability from source timezone to target timezone
	const convertAvailabilityToTimezone = (availability, sourceTimezone, targetTimezone) => {
		if (!availability || !sourceTimezone || !targetTimezone) return availability;
		if (sourceTimezone === targetTimezone) return availability;

		const sourceOffset = getTimezoneOffset(sourceTimezone);
		const targetOffset = getTimezoneOffset(targetTimezone);
		const hourDifference = targetOffset - sourceOffset;

		// Day mapping for shifting
		const days = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
		
		// Create a new availability structure
		const convertedAvailability = days.map(day => ({ day, hour: [] }));

		availability.forEach((slot) => {
			const dayIndex = days.indexOf(slot.day);
			if (dayIndex === -1 || !slot.hour) return;

			slot.hour.forEach((timeStr) => {
				// Parse the time string (e.g., "14:00" or "14:30")
				const [hourStr, minuteStr] = timeStr.split(":");
				const hour = parseInt(hourStr, 10);
				const minute = minuteStr;

				// Apply timezone offset
				let newHour = hour + hourDifference;
				let newDayIndex = dayIndex;

				// Handle day overflow/underflow
				if (newHour >= 24) {
					newHour -= 24;
					newDayIndex = (dayIndex + 1) % 7;
				} else if (newHour < 0) {
					newHour += 24;
					newDayIndex = (dayIndex - 1 + 7) % 7;
				}

				// Add to converted availability
				const newTimeStr = `${newHour}:${minute}`;
				const targetDay = convertedAvailability.find(d => d.day === days[newDayIndex]);
				if (targetDay && !targetDay.hour.includes(newTimeStr)) {
					targetDay.hour.push(newTimeStr);
				}
			});
		});

		return convertedAvailability;
	};

	// Get converted availability based on selected timezone
	const displayAvailability = convertAvailabilityToTimezone(
		draftData?.availability,
		draftData?.timeZone || "America/Chicago",
		selectedTimeZone
	);

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
				<div className="mx-auto flex flex-col gap-[16px] p-0 mb-[32px]">
					{/* From/To Date Picker Row */}
					<div className="flex items-center justify-between h-[48px] mx-[25px]">
						{/* Left arrow */}
						<button
							onClick={handleDecrementWeek}
							type="button"
							className="flex items-center justify-center"
						>
							<ChevronLeftBigIcon fillcolor={"fill-primary-color-P1"} />
						</button>

						<span className="text-primary-color-P1 ST-3">From</span>
						{/* From section */}
						<div className="flex items-center gap-[8px]">
							<InputLeftStickStatus inputBarStatusClassName="bg-senary-color-W5 !h-[16px] !rounded-[8px]">
								<div className="flex items-center gap-[6px] rounded-[16px] p-[6px] bg-secondary-color-S11 h-[48px]">
									<input
										type="text"
										className="bg-primary-color-P12 text-primary-color-P1 ST-3 text-center outline-none rounded-[10px] w-[48px] h-[36px]"
										value={minDate?.actualDate || ""}
										name="birthDateNumber"
										readOnly
									/>
									<input
										type="text"
										className="bg-primary-color-P12 text-primary-color-P1 ST-3 text-center outline-none rounded-[10px] w-[141px] h-[36px]"
										value={getMonthNumberAsText(
											minDate?.actualMonth + 1,
										) || ""}
										name="birthDateMonth"
										readOnly
									/>
									<input
										type="text"
										className="bg-primary-color-P12 text-primary-color-P1 ST-3 text-center outline-none rounded-[10px] w-[71px] h-[36px]"
										value={minDate?.actualYear || ""}
										name="birthDateYear"
										readOnly
									/>
								</div>
							</InputLeftStickStatus>
						</div>

						<span className="text-primary-color-P1 ST-3">To</span>
						{/* To section */}
						<div className="flex items-center gap-[8px]">
							<InputLeftStickStatus inputBarStatusClassName="bg-senary-color-W5 !h-[16px] !rounded-[8px]">
								<div className="flex items-center gap-[6px] rounded-[16px] p-[6px] bg-secondary-color-S11 h-[48px]">
									<input
										type="text"
										className="bg-primary-color-P12 text-primary-color-P1 ST-3 text-center outline-none rounded-[10px] w-[48px] h-[36px]"
										name="birthDateNumber"
										value={maxDate?.actualDate || ""}
										readOnly
									/>
									<input
										type="text"
										className="bg-primary-color-P12 text-primary-color-P1 ST-3 text-center outline-none rounded-[10px] w-[141px] h-[36px]"
										value={getMonthNumberAsText(
											maxDate?.actualMonth + 1,
										) || ""}
										name="birthDateMonth"
										readOnly
									/>
									<input
										type="text"
										className="bg-primary-color-P12 text-primary-color-P1 ST-3 text-center outline-none rounded-[10px] w-[71px] h-[36px]"
										name="birthDateYear"
										value={maxDate?.actualYear || ""}
										readOnly
									/>
								</div>
							</InputLeftStickStatus>
						</div>

						{/* Right arrow */}
						<button
							onClick={handleIncrementWeek}
							type="button"
							className="flex items-center justify-center"
						>
							<ChevronRightMediumIcon fillcolor={"fill-primary-color-P1"} />
						</button>
					</div>

					{/* Custom Availability Grid */}
					<div className="flex flex-col max-w-[1000px] w-full mx-auto">
						{/* Top row: Format button + Hour headers (0-23) */}
						<div className="flex items-center mb-[16px] w-full">
							<div className="flex items-center w-[72px] h-[32px] mr-[16px] shrink-0">
								<button
									type="button"
									className="bg-primary-color-P1 text-primary-color-P12 rounded-[8px] w-[72px] h-[48px] flex items-center justify-center ST-SB-3"
								>
									Format
								</button>
							</div>
							<div className="flex items-center flex-1" style={{ gap: 'calc((100% - 24 * 30px) / 23)' }}>
								{Array.from({ length: 24 }).map((_, hour) => (
									<div
										key={hour}
										className="bg-primary-color-P1 text-primary-color-P12 rounded-[8px] w-[30px] h-[48px] flex items-center justify-center ST-SB-3 shrink-0"
									>
										{hour}
									</div>
								))}
							</div>
						</div>

						{/* Day rows: Day labels + Availability cells */}
						<div className="flex flex-col gap-[6px] w-full">
							{[
								{ day: "Sa", num: 1, dbDay: "Sat" },
								{ day: "Su", num: 2, dbDay: "Sun" },
								{ day: "Mo", num: 3, dbDay: "Mon" },
								{ day: "Tu", num: 4, dbDay: "Tue" },
								{ day: "We", num: 5, dbDay: "Wed" },
								{ day: "Th", num: 6, dbDay: "Thu" },
								{ day: "Fr", num: 7, dbDay: "Fri" },
							].map(({ day, num, dbDay }) => {
								// Find the availability data for this day using the database day format
								// Use displayAvailability which is converted to the selected timezone
								const dayAvailability = displayAvailability?.find(
									(slot) => slot.day === dbDay,
								);

								// Check if this day is today (only highlight if on current week)
								const isToday = isCurrentWeek && day === todayDayOfWeek;

								return (
									<div key={day} className="flex items-center w-full">
										{/* Day Label Box: day name + number pill - SEPARATE yellow wrapper */}
										<div className="relative mr-[16px] shrink-0">
											{/* Yellow background overlay for today - doesn't affect layout */}
											{isToday && (
												<div className="absolute -left-[2px] -right-[2px] -top-[4px] -bottom-[4px] bg-quaternary-color-A5 rounded-[6px] -z-0" />
											)}
											<div className="flex items-center gap-[2px] w-[72px] h-[22px] relative z-10">
												<div
													className={`rounded-[6px] w-[36px] h-[22px] flex items-center justify-center ST-SB-3 ${
														isToday
															? "bg-quaternary-color-A5 text-primary-color-P1"
															: "bg-primary-color-P12 text-primary-color-P1"
													}`}
												>
													{day}
												</div>
												<div
													className={`rounded-[6px] w-[32px] h-[22px] flex items-center justify-center ST-SB-3 ${
														isToday
															? "bg-primary-color-P12 text-primary-color-P1"
															: "bg-primary-color-P1 text-primary-color-P12"
													}`}
												>
													{num}
												</div>
											</div>
										</div>

										{/* Hours Box: Availability Cells - SEPARATE yellow wrapper */}
										<div className="relative flex-1">
											{/* Yellow background overlay for today - doesn't affect layout */}
											{isToday && (
												<div className="absolute -inset-[4px] bg-quaternary-color-A5 rounded-[6px] -z-0" />
											)}
											<div className="flex items-center relative z-10" style={{ gap: 'calc((100% - 24 * 30px) / 23)' }}>
												{Array.from({ length: 24 }).map((_, hour) => {
													// Check for specific time markers: hour:00 for left half, hour:30 for right half
													const isLeftHalfSelected =
														dayAvailability?.hour?.includes(`${hour}:00`);
													const isRightHalfSelected =
														dayAvailability?.hour?.includes(`${hour}:30`);

													return (
														<div
															key={`${day}-${hour}`}
															className="w-[30px] h-[22px] relative rounded-[6px] overflow-hidden shrink-0"
														>
															{/* Left half (first 30 min) */}
															<div
																className={`absolute top-0 left-0 w-1/2 h-full ${
																	isLeftHalfSelected
																		? "bg-quaternary-color-A12"
																		: "bg-secondary-color-S11"
																}`}
															/>
															{/* Right half (second 30 min) */}
															<div
																className={`absolute top-0 right-0 w-1/2 h-full ${
																	isRightHalfSelected
																		? "bg-quaternary-color-A12"
																		: "bg-secondary-color-S11"
																}`}
															/>
														</div>
													);
												})}
											</div>
										</div>
									</div>
								);
							})}
						</div>
					</div>

					{/* Legend and Timezone Row */}
					<div className="flex items-center justify-between h-[48px]">
						{/* Legend items */}
						<div className="flex items-center gap-[24px]">
							<div className="flex items-center gap-[8px]">
								<div className="w-[16px] h-[16px] bg-quaternary-color-A10 rounded-[4px]"></div>
								<span className="ST-3 text-primary-color-P1">
									Booked lesson
								</span>
							</div>
							<div className="flex items-center gap-[8px]">
								<div className="w-[16px] h-[16px] bg-quinary-color-VS10 rounded-[4px]"></div>
								<span className="ST-3 text-primary-color-P1">
									Available for lesson
								</span>
							</div>
							<div className="flex items-center gap-[8px]">
								<div className="w-[16px] h-[16px] bg-secondary-color-S11 rounded-[4px]"></div>
								<span className="ST-3 text-primary-color-P1">Unavailable</span>
							</div>
						</div>

						{/* Timezone Dropdown */}
						<Select
							value={selectedTimeZone}
							onChange={handleTimeZoneChange}
							defaultSelectedKeys={[selectedTimeZone]}
							name="timeZoneCalendar"
							onOpenChange={(open) =>
								open !== isTimezoneOpen && setIsTimezoneOpen(open)
							}
							placeholder="Select a time zone"
							selectorIcon={<span></span>}
							isOpen={isTimezoneOpen}
							renderValue={(items) => {
								return items.map((item) => (
									<span key={item.key} className="ST-3 text-primary-color-P4">
										{getTimezoneDisplayLabel(item.key)}
									</span>
								));
							}}
							startContent={
								<InputBGWrapperIcon>
									<EarthIcon fillcolor={"fill-primary-color-P4"} />
								</InputBGWrapperIcon>
							}
							endContent={
								<InputBGWrapperIcon>
									<ChevronDownBigIcon fillcolor={"fill-primary-color-P1"} />
								</InputBGWrapperIcon>
							}
							classNames={{
								base: ["w-auto min-w-[320px]"],
								trigger: ["select-wrapper-ipractis"],
								innerWrapper: ["select-ipractis", "w-full"],
								value: [
									"group-data-[has-value=true]:text-primary-color-P4 text-primary-color-P4 ST-3",
								],
								listbox: ["text-primary-color-P4"],
							}}
						>
							{timeZones?.map((tz) => (
								<SelectItem key={tz.value} value={tz.value}>
									{getTimezoneDisplayLabel(tz.value)}
								</SelectItem>
							))}
						</Select>
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
