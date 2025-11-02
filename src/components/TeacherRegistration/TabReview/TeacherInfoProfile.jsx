// React imports
import Image from "next/image";
import { useEffect, useState } from "react";

// Images
import tutorImagePreview from "@/public/images/tutor-image-preview.png";
import unitedKingdom from "@/public/flags/united-kingdom.png";
import { fetchCountries } from "@/src/lib/utils/fetchCountries";

const TeacherInfoProfile = ({ draftData }) => {
  const [selectedCountryFlag, setSelectedCountryFlag] = useState(unitedKingdom);

  // Fetch countries and set correct flag
  useEffect(() => {
    const loadCountries = async () => {
      try {
        const countriesData = await fetchCountries();
        
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

  return (
    <div className="flex gap-2.5">
      <div className="relative">
        <Image
          alt={"Tutor Image"}
          className="w-[120px] rounded-[10px]"
          width={120}
          height={120}
          src={draftData.profile_url ? draftData.profile_url : tutorImagePreview || null}
        />

        <div className="absolute right-1 bottom-1 rounded-full w-3.5 h-3.5 bg-quinary-color-VS5"></div>
      </div>

      <div className="flex flex-col justify-between p-2.5">
        <div>
          <h3 className="MT-SB-2 text-primary-color-P4">{draftData.firstName} {draftData.lastName}</h3>

          <div className="flex gap-2 items-center">
            <Image
              alt={"Country Image"}
              className="w-[15px] h-[13px]"
              src={selectedCountryFlag}
            />
            <h4 className="text-primary-color-P6 ST-3">Teaches {draftData.subject}</h4>
          </div>
        </div>

        {/* FROM SM TO TOP IS VISIBLE */}
        <ul className="sm:flex hidden items-center gap-2.5">
          {draftData.languages.map((language, index) => (
            <li key={index} className="flex items-center gap-[5px]">
              <p className="ST-SB-2 text-primary-color-P1">{language.name}</p>

              <p className="ST-SB-1 py-[2px] px-1.5 rounded-md bg-primary-color-P1 text-primary-color-P12">
                {language.level}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TeacherInfoProfile;
