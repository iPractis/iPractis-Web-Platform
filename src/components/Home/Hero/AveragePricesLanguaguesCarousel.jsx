"use client";

import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { averagePricesLanguagues } from "@/src/data/dataHome";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import CarouselArrow from "../../Shared/CarouselArrow";

// Images && Icons
import chevronRight from "@/public/icons/chevron-right.png";
import chevronLeft from "@/public/icons/chevron-left.png";

const AveragePricesLanguaguesCarousel = () => {
  return (
    <section className="relative rounded-2xl py-2.5 px-4 mt-10 bg-primary-color-P11">
      <div className="relative px-8">
        <Swiper
          loop={true}
          pagination={{
            clickable: true,
          }}
          navigation={{
            nextEl: ".countries-carousel-swiper-button-next",
            prevEl: ".countries-carousel-swiper-button-prev",
          }}
          breakpoints={{
            // when window width is >= 440px
            440: {
              slidesPerView: 1,
              spaceBetween: 0,
            },

            // when window width is >= 550px
            550: {
              slidesPerView: 2,
              spaceBetween: 0,
            },

            // when window width is >= 700px
            700: {
              slidesPerView: 3,
              spaceBetween: 0,
            },

            // when window width is >= 860px
            860: {
              slidesPerView: 4,
              spaceBetween: 0,
            },

            // when window width is >= 1140px
            1140: {
              slidesPerView: 5,
              spaceBetween: 0,
            },
          }}
          modules={[Navigation, Pagination]}
          className="averagePricesLanguaguesCarousel"
        >
          {averagePricesLanguagues?.map((country, index) => {
            return (
              <SwiperSlide className="w-[153px]" key={index}>
                <div className="flex mx-auto w-fit animation-fade cursor-pointer p-2 rounded-[16px] btn-quaternary group leading-[.9rem] items-center">
                  <div
                    className="me-3 w-[44px] h-[38px] rounded-[10px] flex-none order-0 grow-0"
                  >
                    <Image
                      alt={"Country Image"}
                      src={country?.image}
                      className="w-full h-full object-cover rounded-[10px]"
                    />
                  </div>

                  <div
                    className="flex flex-col justify-start items-start p-0 gap-[3px] w-[130px] h-[38px] flex-none order-1 grow-0"
                  >
                    <h3 className="ST-SB-1 text-gray-500 text-base">{country?.title}</h3>
                    <div className="flex items-center gap-1 whitespace-nowrap">
                      <span className="text-black font-bold text-sm group-active:text-primary-color-P12">
                        {country?.price?.split(' For')[0]}
                      </span>
                      <span className="text-gray-500 text-xs group-active:text-primary-color-P12">
                        For 30 mins
                      </span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      <CarouselArrow
        carouselSwiperButtonName={"countries-carousel-swiper-button-prev"}
        srcArrow={chevronLeft}
        arrowPosition={"left"}
      />

      <CarouselArrow
        carouselSwiperButtonName={"countries-carousel-swiper-button-next"}
        srcArrow={chevronRight}
        arrowPosition={"right"}
      />
    </section>
  );
};

export default AveragePricesLanguaguesCarousel;
