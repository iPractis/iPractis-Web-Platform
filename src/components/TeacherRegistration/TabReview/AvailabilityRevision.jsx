import WorkScheduleTable from "../../Shared/WorkScheduleTable";
import TeacherInfoSpecialties from "./TeacherInfoSpecialties";
import TeacherInfoExperience from "./TeacherInfoExperience";
import TeacherInfoEducation from "./TeacherInfoEducation";
import TeacherInfo from "./TeacherInfo";
import SectionHeader from "../../Shared/SectionHeader";
import { PersonIcon, StarIcon, HeartSmallIcon, UserSpeakingIcon, UserHatIcon, ChevronLeftBigIcon, ChevronRightMediumIcon } from "../../Icons";
import Image from "next/image";
import tutorImagePreview from "@/public/images/tutor-image-preview.png";
import unitedKingdom from "@/public/flags/united-kingdom.png";
import { getMonthNumberAsText } from "@/src/lib/utils/getMonthNumberAsText";
import { useEffect, useState } from "react";
import { fetchCountries } from "@/src/lib/utils/fetchCountries";

const AvailabilityRevision = ({draftData}) => {
  // Debug logging
  console.log("AvailabilityRevision - draftData:", draftData);
  console.log("AvailabilityRevision - availability:", draftData?.availability);
  
  // Debug when draftData changes
  useEffect(() => {
   
  }, [draftData]);
  
  // Date picker state (extracted from WorkScheduleTable logic)
  const [weekDates, setWeekDates] = useState([]);
  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");
  
  // Country data state
  const [countries, setCountries] = useState([]);
  const [selectedCountryFlag, setSelectedCountryFlag] = useState(unitedKingdom);

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
            country => country.name.toLowerCase() === draftData.country.toLowerCase()
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
      const newDate = new Date(date.actualYear, date.actualMonth, date.actualDate - 7);
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
      const newDate = new Date(date.actualYear, date.actualMonth, date.actualDate + 7);
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
    <section className="max-w-[1126px] mx-auto">
      {/* Teacher's information header box */}
      <div className="bg-white rounded-[32px] p-4 mb-8 h-[48px] flex items-center gap-[10px]">
        {/* Icon container */}
        <div className="w-[48px] h-[48px] rounded-[16px] bg-[#F8F7F5] flex items-center justify-center p-[14px]">
          <PersonIcon fillColor={"fill-primary-color-P1"} />
        </div>
      
        {/* Text content */}
        <div className="flex flex-col justify-center">
          <h3 className="MT-SB-1 text-primary-color-P1">Teacher&apos;s information</h3>
          <p className="ST-3 text-primary-color-P4">Text</p>
        </div>
      </div>

      {/* Teacher Profile Container */}
      <div className="bg-white rounded-[32px] p-0 mb-8 max-w-[1000px] h-[52px] flex items-center justify-between px-8 mx-auto">
        {/* Left side - Profile Image and Basic Info (same format as Teacher's info header) */}
        <div className="flex items-center gap-[10px]">
          <div className="relative w-[52px] h-[52px] rounded-[10px] overflow-hidden">
            <Image
              alt={"Teacher Profile"}
              className="w-full h-full object-contain"
              width={52}
              height={52}
              src={draftData.profile_url || tutorImagePreview}
              unoptimized={true}
            />
            <div className="absolute right-1 bottom-1 rounded-full w-2.5 h-2.5 bg-quinary-color-VS5 border border-white"></div>
          </div>
          
          <div className="flex flex-col justify-center">
            <h3 className="MT-SB-1 text-primary-color-P1">{draftData.firstName} {draftData.lastName}</h3>
            <div className="flex items-center gap-1">
              <Image
                alt={"Country Flag"}
                className="w-[16px] h-[12px]"
                src={selectedCountryFlag}
                width={16}
                height={12}
                unoptimized={true}
              />
              <p className="ST-3 text-primary-color-P6">Teaches {draftData.subject}</p>
            </div>
          </div>
        </div>

        {/* Right side - Action buttons with same attributes as profile picture */}
        <div className="flex gap-3">
          <button className="w-[52px] h-[52px] rounded-[10px] bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17 3H7C5.9 3 5 3.9 5 5V19L12 16L19 19V5C19 3.9 18.1 3 17 3ZM17 16L12 14L7 16V5H17V16Z" fill="currentColor"/>
            </svg>
          </button>
          <button className="w-[52px] h-[52px] rounded-[10px] bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center">
            <HeartSmallIcon fillColor={"fill-pink-500"} />
          </button>
        </div>
      </div>

      {/* Teacher Details Section with Image and Info */}
      <div className="w-[1000px] h-[302.625px] max-w-[1000px] flex gap-8 mb-8 mx-auto">
        {/* Left side - Teacher Image */}
        <div className="w-[538px] h-[302.625px] overflow-hidden rounded-[16px]">
          <Image
            alt={"Teacher Profile"}
            className="w-full h-full object-contain"
            width={538}
            height={303}
            src={draftData.profile_url || tutorImagePreview}
            unoptimized={true}
          />
        </div>

        {/* Right side - Details Container */}
        <div className="w-[430px] h-[302.625px] max-w-[430px] flex flex-col justify-between py-4">
          {/* Top Section - Teaching Details */}
          <div className="space-y-3">
            {/* Teaching levels */}
            <div className="w-[430px] h-[48px] bg-[#F8F7F5] rounded-[16px] flex items-center gap-[10px] px-4 py-3">
              <UserSpeakingIcon fillColor={"fill-primary-color-P1"} />
              <p className="ST-3 text-primary-color-P6">
                {draftData.studentLevel ? `Teaches ${Array.isArray(draftData.studentLevel) ? draftData.studentLevel.join(', ') : draftData.studentLevel} level${Array.isArray(draftData.studentLevel) && draftData.studentLevel.length > 1 ? 's' : ''}` : 'Teaches all levels'}
              </p>
            </div>
            
            {/* Teaching ages */}
            <div className="w-[430px] h-[48px] bg-[#F8F7F5] rounded-[16px] flex items-center gap-[10px] px-4 py-3">
              <UserHatIcon fillColor={"fill-primary-color-P1"} />
              <p className="ST-3 text-primary-color-P6">
                {draftData.teachToYoungPersons ? 'Teaches all ages' : 'Teaches adults only'}
              </p>
            </div>
          </div>

          {/* Middle Section - Stats Blocks */}
          <div className="flex gap-2 mt-[17px]">
            {/* Lessons Block */}
            <div className="w-[101px] h-[75px] bg-[#F8F7F5] rounded-[16px] p-4 flex flex-col gap-0.5">
              <h4 className="ST-2 text-primary-color-P4">1201 Lessons</h4>
              <div className="flex items-center gap-1">
                <span className="MT-SB-1 text-primary-color-P1">5.0</span>
                <StarIcon fillColor={"fill-yellow-500"} />
              </div>
            </div>

            {/* Active Students Block */}
            <div className="w-[120px] h-[75px] bg-[#F8F7F5] rounded-[16px] p-4 flex flex-col gap-0.5">
              <h4 className="ST-2 text-primary-color-P4">Active students</h4>
              <div className="flex items-center gap-1">
                <span className="MT-SB-1 text-primary-color-P1">50+</span>
                <UserHatIcon fillColor={"fill-primary-color-P1"} />
              </div>
            </div>

            {/* Lesson Rate Block */}
            <div className="w-[177px] h-[75px] bg-[#F8F7F5] rounded-[16px] p-4 flex flex-col gap-0.5">
              <h4 className="ST-2 text-primary-color-P4">Lesson rate</h4>
              <div className="flex items-center gap-2">
                <span className="MT-SB-1 text-primary-color-P1">{draftData.hourlyPrice ? `${draftData.hourlyPrice} USD` : '8 USD'}</span>
                <span className="bg-yellow-400 text-black px-2 py-1 rounded-full text-xs font-semibold">30mins</span>
              </div>
            </div>
          </div>

          {/* Bottom Section - Action Buttons */}
          <div className="w-[430px] h-[48px] flex items-center gap-4">
            {/* Message Icon */}
            <button className="w-[48px] h-[48px] rounded-[16px] bg-primary-color-P1 hover:bg-primary-color-P2 transition-colors flex items-center justify-center p-[14px]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H5.17L4 17.17V4H20V16Z" fill="white"/>
              </svg>
            </button>
            
            {/* Try Now Button */}
            <button className="w-[366px] h-[48px] bg-primary-color-P1 hover:bg-primary-color-P2 transition-colors flex items-center justify-between px-4 py-3 rounded-[16px]">
              <span className="text-white font-semibold">Try now!</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 5V19L19 12L8 5Z" fill="white"/>
              </svg>
            </button>
          </div>
        </div>
      </div>


      {/* About Section */}
      <div className="w-[1000px] max-w-[1000px] mx-auto mb-8 bg-white rounded-[32px] px-8 py-4 flex flex-col gap-4">
        <h3 className="MT-SB-1 text-primary-color-P1">About {draftData.firstName}</h3>
        <p className="ST-3 text-primary-color-P4 leading-relaxed">
          {draftData.introduction || "Hi everyone! My name is Irina and, as an English teacher, I&apos;ll be happy to help you to acquire and develop the necessary skills in speaking, listening, reading, and writing. I use different teaching techniques, taking into account the individual needs and learning styles of each student. My goal is to make learning English enjoyable and effective for everyone."}
        </p>
        
        {/* Language Tags */}
        <div className="w-[311px] h-[18px] flex gap-[10px] items-center">
          {(draftData.languages && draftData.languages.length > 0) ? (
            draftData.languages.map((language, index) => (
              <div key={index} className="flex items-center gap-1">
                <span className="text-xs text-black">{language.name}</span>
                <div className={`px-3 py-1 rounded text-xs font-medium whitespace-nowrap ${
                  language.level === 'Native' 
                    ? 'bg-black text-white' 
                    : language.level === 'Fluent C2'
                    ? 'bg-green-200 text-black'
                    : language.level === 'Basic A2'
                    ? 'bg-orange-200 text-black'
                    : 'bg-gray-200 text-black'
                }`}>
                  <span>{language.level}</span>
                </div>
              </div>
            ))
          ) : (
            <>
              <div className="flex items-center gap-1">
                <span className="text-xs text-black">English</span>
                <div className="px-3 py-1 rounded text-xs font-medium bg-black text-white whitespace-nowrap">
                  <span>Native</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xs text-black">French</span>
                <div className="px-3 py-1 rounded text-xs font-medium bg-green-200 text-black whitespace-nowrap">
                  <span>Fluent C2</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xs text-black">Korean</span>
                <div className="px-3 py-1 rounded text-xs font-medium bg-orange-200 text-black whitespace-nowrap">
                  <span>Basic A2</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Friendly and fun Native English Speaker Section */}
      <div className="w-[1000px] max-w-[1000px] mx-auto mb-0 bg-[#F8F7F5] rounded-[32px] p-8 min-h-[144px] flex flex-col gap-8">
        <h3 className="MT-SB-1 text-primary-color-P1">Friendly and fun Native English Speaker teaching conversational English</h3>
        <p className="ST-3 text-primary-color-P4 leading-relaxed">
          Hi everyone! My name is Irina and, as an English teacher, I&apos;ll be happy to help you to acquire and develop the necessary skills in speaking, listening, reading, and writing. I use different teaching techniques, taking into account the individual needs and learning styles of each student. My goal is to make learning English enjoyable and effective for everyone.
        </p>
      </div>

      {/* Profile Title Section */}
      <div className="bg-white rounded-[32px] p-8 mb-8">
        <h3 className="MT-SB-1 text-primary-color-P1 mb-4">
          {draftData.profileTitle}
        </h3>
        <p className="ST-3 text-primary-color-P4 leading-relaxed">
          {draftData.subjectIntroduction}
        </p>
      </div>

      {/* Teacher's Availability Header */}
      <div className="bg-white rounded-[32px] p-4 mb-0 h-[48px] flex items-center gap-[10px] -mt-10">
        <div className="w-[48px] h-[48px] rounded-[16px] bg-[#F8F7F5] flex items-center justify-center p-[14px]">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 3H18V1H16V3H8V1H6V3H5C3.89 3 3.01 3.9 3.01 5L3 19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V8H19V19ZM7 10H12V15H7V10Z" fill="currentColor"/>
          </svg>
        </div>
        <div className="flex flex-col justify-center">
          <h3 className="MT-SB-1 text-primary-color-P1">Teacher&apos;s availability</h3>
          <p className="ST-3 text-primary-color-P4">Text</p>
        </div>
      </div>

      {/* Duplicate Teacher's Availability Section with Custom Grid */}
      <div className="w-[1000px] max-w-[1000px] mx-auto mb-8 bg-white rounded-[32px] p-8 flex flex-col gap-8">
        {/* Section Header */}


        {/* From/To Date Picker - Using Working Components */}
        <div className="flex items-center justify-center gap-8 mb-4">
          <button onClick={handleDecrementWeek} type="button">
            <ChevronLeftBigIcon fillColor={"fill-primary-color-P1"} />
          </button>

          <h3 className="text-primary-color-P1 ST-4">From</h3>

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

          <h3 className="text-primary-color-P1 ST-4">To</h3>

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

          <button onClick={handleIncrementWeek} type="button">
            <ChevronRightMediumIcon fillColor={"fill-primary-color-P1"} />
          </button>
        </div>

        {/* Custom Availability Grid */}
        <div className="flex flex-col gap-1">
          {/* Top row: Format button + Hour headers (0-23) */}
          <div className="flex gap-1">
            <button className="bg-black text-white rounded-[8px] px-3 py-2 text-xs font-medium w-[80px] h-[32px] flex items-center justify-center">
              Format
            </button>
            {Array.from({ length: 24 }).map((_, hour) => (
              <div key={hour} className="bg-black text-white rounded-[8px] w-[32px] h-[32px] flex items-center justify-center text-xs font-medium">
                {hour}
              </div>
            ))}
          </div>

          {/* Day rows: Day labels + Availability cells */}
          {[
            { day: 'Sa', num: 1, dbDay: 'Sat' },
            { day: 'Su', num: 2, dbDay: 'Sun' },
            { day: 'Mo', num: 3, dbDay: 'Mon' },
            { day: 'Tu', num: 4, dbDay: 'Tue' },
            { day: 'We', num: 5, dbDay: 'Wed' },
            { day: 'Th', num: 6, dbDay: 'Thu' },
            { day: 'Fr', num: 7, dbDay: 'Fri' }
          ].map(({ day, num, dbDay }, dayIndex) => {
            // Find the availability data for this day using the database day format
            const dayAvailability = draftData?.availability?.find(slot => slot.day === dbDay);
            
            console.log(`Checking ${day} (${dbDay}):`, dayAvailability);
            
            return (
              <div key={day} className="flex gap-1">
                {/* Day Label */}
                <div className="bg-black text-white rounded-[8px] w-[80px] h-[32px] flex items-center justify-center text-xs font-medium">
                  {day} {num}
                </div>
                {/* Availability Cells for the day */}
                {Array.from({ length: 24 }).map((_, hour) => {
                  // Check if this hour is selected in the availability data
                  const isSelected = dayAvailability?.hour?.some(time => {
                    const [timeHour] = time.split(':').map(Number);
                    return timeHour === hour;
                  });
                  
                  if (isSelected) {
                    console.log(`Selected: ${day} ${hour}:00`);
                  }
                  
                  return (
                    <div
                      key={`${day}-${hour}`}
                      className={`w-[32px] h-[32px] rounded-[4px] ${
                        isSelected ? 'bg-yellow-300' : 'bg-gray-100'
                      }`}
                    ></div>
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
              <span className="ST-3 text-primary-color-P1">Booked lesson</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-300 rounded"></div>
              <span className="ST-3 text-primary-color-P1">Available for lesson</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-600 rounded"></div>
              <span className="ST-3 text-primary-color-P1">Unavailable</span>
            </div>
          </div>

          {/* Timezone Indicator */}
          <div className="w-[430px] h-[48px] bg-[#F8F7F5] rounded-full px-3 py-2 flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" fill="currentColor"/>
            </svg>
            <span className="ST-3 text-primary-color-P1">{draftData.timezone || "GMT+1 (Algeria, Algiers)"}</span>
          </div>
        </div>
      </div>

      {/* Specialties Section */}
      <TeacherInfoSpecialties draftData={draftData}/>

      {/* Experience Section */}
      <TeacherInfoExperience draftData={draftData}/>

      {/* Education Section */}
      <TeacherInfoEducation draftData={draftData}/>
    </section>
  );
};

export default AvailabilityRevision;
