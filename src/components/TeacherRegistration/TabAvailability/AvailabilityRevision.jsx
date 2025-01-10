// Images
import videoThumbnail404 from "@/public/images/video-thumbnail-404.png";
import tutorVideoPreview from "@/public/images/tutor-video-preview.png";
import tutorImagePreview from "@/public/images/tutor-image-preview.png";
import unitedKingdom from "@/public/flags/united-kingdom.png";
import playVideo from "@/public/icons/play-video.png";

// React imports
import Image from "next/image";

const AvailabilityRevision = () => {
  return (
    <section>
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
            <h3 className="MT-SB-2 text-primary-color-P4">Alexandra</h3>

            <div className="flex gap-2 items-center">
              <Image
                alt={"Country Image"}
                className="w-[15px] h-[13px]"
                src={unitedKingdom}
              />
              <h4 className="text-primary-color-P6 ST-3">Teaches English</h4>
            </div>
          </div>

          <ul className="flex items-center gap-[10px]">
            <li className="ST-SB-2 text-primary-color-P1">English</li>

            <li className="ST-SB-1 py-[2px] px-1.5 rounded-md bg-primary-color-P1 text-primary-color-P12">
              Native
            </li>

            <li className="ST-SB-2 text-primary-color-P1">French</li>

            <li className="ST-1 py-[2px] px-1.5 rounded-md bg-quinary-color-VS10 text-primary-color-P1">
              Fluent C2
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AvailabilityRevision;
