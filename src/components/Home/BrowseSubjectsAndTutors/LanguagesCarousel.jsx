"use client";

import Image from "next/image";
import { subjects } from "@/src/data/dataHome";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Images && Icons
import chevronRight from "@/public/icons/chevron-right.png";
import chevronLeft from "@/public/icons/chevron-left.png";

const LanguagesCarousel = () => {
  return (
    <div className="relative rounded-xl bg-white px-9 my-[30px]">
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
          // when window width is >= 340px
          340: {
            slidesPerView: 3,
            spaceBetween: 0,
          },
          // when window width is >= 720px
          720: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
          // when window width is >= 950px
          950: {
            slidesPerView: 6,
            spaceBetween: 0,
          },
        }}
        modules={[Navigation, Pagination]}
        className="subjects-carousel px-3 py-4"
      >
        {subjects?.map((subject, index) => {
          return (
            <SwiperSlide key={index} className="flex place-content-center">
              <button
                type="button"
                className={`${
                  subject?.selected
                    ? "btn-primary"
                    : "btn-tertiary"
                } w-[118px] ST-SB-3 mx-auto px-4 py-1.5 text-center block animation-fade rounded-lg`}
              >
                {subject?.name}
              </button>
            </SwiperSlide>
          );
        })}
      </Swiper>

      <div className="absolute transform -translate-y-1/2 top-1/2 left-1 z-50 cursor-pointer w-[25px] h-[25px] object-contain animation-fade transition-all duration-300 ease-in rounded-md p-2 hover:bg-[#C0BDB9]">
        <Image
          alt="Chevron Left"
          src={chevronLeft}
          className="subjects-carousel-swiper-button-prev w-full h-full object-contain"
        />
      </div>

      <div className="absolute transform -translate-y-1/2 top-1/2 right-1 z-50 cursor-pointer w-[25px] h-[25px] object-contain animation-fade transition-all duration-300 ease-in rounded-md p-2 hover:bg-[#C0BDB9]">
        <Image
          alt="Chevron Right"
          src={chevronRight}
          className="subjects-carousel-swiper-button-next w-full h-full object-contain"
        />
      </div>
    </div>
  );
};

export default LanguagesCarousel;
