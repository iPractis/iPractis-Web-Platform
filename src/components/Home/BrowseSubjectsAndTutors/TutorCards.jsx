"use client";

// import required modules
import videoThumbnail404 from "@/public/images/video-thumbnail-404.png";
import getYoutubeVideoIdUrl from "@/src/lib/utils/getYoutubeVideoIdUrl";
import { subjectsAndTutors } from "@/src/data/dataHome";
import playVideo from "@/public/icons/play-video.png";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const TutorCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 sm:gap-4 gap-[30px]">
      {subjectsAndTutors?.map((subjectAndTutor, index) => {
        const [playingVideo, setPlayingVideo] = useState(false);
        const [thumbnailError, setThumbnailError] = useState(false);
        const videoId = getYoutubeVideoIdUrl(subjectAndTutor?.videoSrc);
        const videoThumbnail = videoId
          ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
          : videoThumbnail404;

        const handleImageError = () => {
          setThumbnailError(true);
        };

        return (
          <div
            className="bg-primary-color-P12 rounded-2xl group relative"
            key={index}
          >
            <div className="relative">
              {playingVideo ? (
                <iframe
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  className="w-full h-[190px] rounded-t-2xl"
                  src={subjectAndTutor?.videoSrc}
                  title="Tutor Video"
                  allowFullScreen
                  frameBorder="0"
                ></iframe>
              ) : (
                <div
                  onClick={() => setPlayingVideo(true)}
                  className="cursor-pointer"
                >
                  <div className="relative w-full h-[190px]">
                    <Image
                      src={thumbnailError ? videoThumbnail404 : videoThumbnail}
                      sizes="(max-width: 640px) 100vw, 100%"
                      style={{ objectFit: "cover" }}
                      onError={handleImageError}
                      className="rounded-t-2xl"
                      alt="Tutor Video Image"
                      fill
                    />
                  </div>

                  <div className="absolute cursor-pointer left-4 bottom-4 flex items-center justify-center text-white">
                    <Image
                      alt={"Play Video Icon"}
                      src={playVideo}
                      className="w-6"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Additional Tutor Information */}
            <div className="p-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Image
                    alt={"Tutor Image"}
                    className="w-[46px] rounded-[10px]"
                    src={subjectAndTutor?.tutorImagePreview}
                  />
                  <div className="absolute right-1 bottom-1 rounded-full w-2 h-2 bg-quinary-color-VS5"></div>
                </div>

                <div>
                  <h3 className="ST-SB-4 text-primary-color-P4">
                    {subjectAndTutor?.tutorName}
                  </h3>

                  <div className="flex gap-2 items-center">
                    <Image
                      alt={"Country Image"}
                      className="w-[15px] h-[13px]"
                      src={subjectAndTutor?.tutorFlag}
                    />
                    <h4 className="text-primary-color-P6 ST-2">
                      {subjectAndTutor?.tutorProfession}
                    </h4>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 items-center justify-between my-[15px]">
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

                <div className="flex items-center justify-center bg-primary-color-P11 px-[4px] py-[2px] w-6 h-6 rounded-full">
                  <h4 className="ST-SB-1 text-center text-primary-color-P4 flex h-full items-center justify-center">
                    {subjectAndTutor?.tutorExtraLanguages}
                  </h4>
                </div>
              </div>

              <div className="flex justify-between">
                {/* Lesson Rate which disappears on hover */}
                <div>
                  <h4 className="text-primary-color-P6 ST-1">Lesson rate</h4>
                  <h3 className="sm:text-primary-color-P1 text-primary-color-P4">
                    <span className="MT-SB-1">8 USD/</span>
                    <span className="ST-3">30 mins</span>
                  </h3>
                </div>

                {/* Buttons that appear on hover */}
                <div className="sm:hidden sm:group-hover:flex gap-4 transition-all duration-300 ease-in-out">
                  <button
                    className="btn btn-primary px-4 py-2 rounded-lg sm:w-auto w-[155px] ST-SB-4"
                    type="button"
                  >
                    Book a trial
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <div className="bg-primary-color-P12 h-[357px] p-5 rounded-2xl">
        <div className="flex flex-col justify-between h-full">
          <div>
            <h3 className="MT-SB-3 text-primary-color-P1">
              Discover more <span className="sm:block inline">teachers</span>
            </h3>

            <p className="ST-4 text-primary-color-P4 mt-5">
              Search through 1000+ qualified teachers and select the perfect fit
              based on your target subject, goals and budget.
            </p>
          </div>

          <div>
            <Link
              href={"#"}
              className="btn btn-secondary MT-SB-1 rounded-2xl w-full px-4 py-3"
            >
              Discover more teachers
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorCards;
