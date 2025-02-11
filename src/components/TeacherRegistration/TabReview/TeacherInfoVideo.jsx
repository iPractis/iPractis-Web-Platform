import getYoutubeVideoIdUrl from "@/src/lib/utils/getYoutubeVideoIdUrl";

// React imports
import { useState } from "react";
import Image from "next/image";

// Icons && images
import videoThumbnail404 from "@/public/images/video-thumbnail-404.png";
import { MessageIcon, StarIcon, UserHatMediumIcon } from "../../Icons";
import playVideo from "@/public/icons/play-video.png";

const TutorCard = () => {
  const [playingVideo, setPlayingVideo] = useState(false);
  const [thumbnailError, setThumbnailError] = useState(false);
  const videoId = getYoutubeVideoIdUrl(
    "https://www.youtube.com/embed/dFlDRhvM4L0?si=FxcQD7096G6uMA4k"
  );
  const videoThumbnail = videoId
    ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    : videoThumbnail404;

  const handleImageError = () => {
    setThumbnailError(true);
  };

  return (
    <>
      <div className="bg-primary-color-P11 max-w-[420px] p-4 rounded-lg my-5">
        <div className="relative">
          {playingVideo ? (
            <iframe
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              className="w-full h-[218px] rounded-lg"
              src={
                "https://www.youtube.com/embed/dFlDRhvM4L0?si=FxcQD7096G6uMA4k"
              }
              title="Tutor Video"
              allowFullScreen
              frameBorder="0"
            ></iframe>
          ) : (
            <div
              onClick={() => setPlayingVideo(true)}
              className="cursor-pointer"
            >
              <div className="relative w-full h-[218px]">
                <Image
                  src={thumbnailError ? videoThumbnail404 : videoThumbnail}
                  sizes="(max-width: 640px) 100vw, 100%"
                  style={{ objectFit: "inherit" }}
                  onError={handleImageError}
                  className="rounded-lg"
                  alt="Tutor Video Image"
                  fill
                />
              </div>

              <div className="absolute cursor-pointer left-4 bottom-4 flex items-center justify-center text-primary-color-P12">
                <Image
                  alt={"Play Video Icon"}
                  src={playVideo}
                  className="w-6"
                />
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-5 mt-4">
          <div>
            <h4 className="ST-2 text-primary-color-P4">1201 Lessons</h4>
            <h2 className="MT-SB-1 text-primary-color-P1 flex items-center justify-end gap-2.5">
              5.0 <StarIcon fillColor={"fill-quaternary-color-A5"} />
            </h2>
          </div>

          <div className="border-x border-primary-color-P4 px-4">
            <h4 className="ST-2 text-primary-color-P4">Active students</h4>
            <h2 className="MT-SB-1 text-primary-color-P1 flex items-start justify-center gap-2.5">
              50+ <UserHatMediumIcon fillColor={"fill-primary-color-P1"} />
            </h2>
          </div>

          <div>
            <h4 className="ST-2 text-primary-color-P4">Lesson rate</h4>
            <h2 className="text-primary-color-P1">
              <span className="MT-SB-1">8 USD</span>
              <span className="ST-3">/30 mins</span>
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2.5 mt-5">
          <div>
            <button
              type="button"
              className="btn btn-secondary rounded-2xl p-1.5 w-11 h-10 flex justify-center items-center"
            >
              <MessageIcon fillColor={"fill-primary-color-P12"} />
            </button>
          </div>

          <div className="flex-1">
            <button
              type="button"
              className="btn btn-secondary rounded-2xl p-1 w-full h-10 ST-SB-3"
            >
              Try now!
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TutorCard;
