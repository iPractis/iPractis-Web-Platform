"use client";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import { subjects } from "@/src/data/sharedData";

// import required modules
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Images && Icons
import { useState } from "react";
import { ChevronLeftSmallIcon, PlayIcon } from "../../Icons";

const LanguagesCarousel = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  return (
    <div className="relative flex w-[1000px] items-center">
      <div className="bg-primary-color-P1 rounded-[10px] p-[6px] mr-[16px]">
        <ChevronLeftSmallIcon fillColor="fill-primary-color-P12"/>
      </div>
        <Swiper
          loop={true}
          pagination={{
            clickable: true,
          }}
          navigation={{
            nextEl: ".subjects-carousel-swiper-button-next",
            prevEl: ".subjects-carousel-swiper-button-prev",
          }}
          breakpoints={{
            340: {
              slidesPerView: 2,
              spaceBetween: 8,
            },
            720: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
            950: {
              slidesPerView: 7,
              spaceBetween: 16,
            },
          }}
          modules={[Navigation, Pagination]}
          className="subjects-carousel"
        >
          {subjects?.map((subject, index) => {
            return (
              <SwiperSlide
                className="w-[113px] animation-fade"
                key={index}
              >
                <button
                  className={`${
                    selectedLanguage === subject
                      ? "btn-primary"
                      : "btn-tertiary"
                  } w-full h-8 ST-SB-3 mx-auto px-4 py-1 text-center animation-fade rounded-xl`}
                  onClick={() => setSelectedLanguage(subject)}
                  type="button"
                >
                  {subject}
                </button>
              </SwiperSlide>
            );
          })}
        </Swiper>
      <div className="bg-primary-color-P1 rounded-[10px] p-[6px] ml-[16px]">
        <PlayIcon fillColor="fill-primary-color-P12"/>
      </div>
    </div>
  );
};

export default LanguagesCarousel;
