// React imports
import Image from "next/image";

// Images
import tutorImagePreview from "@/public/images/tutor-image-preview.png";
import unitedKingdom from "@/public/flags/united-kingdom.png";

const TeacherInfoProfile = ({ draftData }) => {
  return (
    <div className="flex gap-2.5">
      <div className="relative">
        <Image
          alt={"Tutor Image"}
          className="w-[120px] rounded-[10px]"
          src={tutorImagePreview}
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
              src={unitedKingdom}
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
