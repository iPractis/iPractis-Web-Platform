"use client";

import { subjects } from "@/src/data/dataHome";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import CarouselArrow from "../../Globals/CarouselArrow";

// Images && Icons
import chevronRight from "@/public/icons/chevron-right.png";
import chevronLeft from "@/public/icons/chevron-left.png";
import { useState } from "react";

const LanguagesCarousel = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  return (
    <div className="relative rounded-xl bg-white xs:px-4 px-3 py-1.5 my-[30px]">
      <div className="relative xs:px-11 px-6">
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
              slidesPerView: 6,
              spaceBetween: 16,
            },
          }}
          modules={[Navigation, Pagination]}
          className="subjects-carousel"
        >
          {subjects?.map((subject, index) => {
            return (
              <SwiperSlide
                className="md:w-[118px] w-[108px] animation-fade"
                key={index}
              >
                <button
                  className={`${
                    selectedLanguage === subject?.name
                      ? "btn-primary"
                      : "btn-tertiary"
                  } w-full ST-SB-3 mx-auto px-4 py-1.5 text-center block animation-fade rounded-lg`}
                  onClick={() => setSelectedLanguage(subject?.name)}
                  type="button"
                >
                  {subject?.name}
                </button>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      <CarouselArrow
        carouselSwiperButtonName={"subjects-carousel-swiper-button-prev"}
        srcArrow={chevronLeft}
        arrowPosition={"left"}
      />

      <CarouselArrow
        carouselSwiperButtonName={"subjects-carousel-swiper-button-next"}
        srcArrow={chevronRight}
        arrowPosition={"right"}
      />
    </div>
  );
};

export default LanguagesCarousel;
