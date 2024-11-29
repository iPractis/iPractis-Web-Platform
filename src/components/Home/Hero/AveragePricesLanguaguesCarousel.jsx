"use client";

import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { averagePricesLanguagues } from "@/src/data/dataHome";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import CarouselArrow from "../../Globals/CarouselArrow";

// Images && Icons
import chevronRight from "@/public/icons/chevron-right.png";
import chevronLeft from "@/public/icons/chevron-left.png";

const AveragePricesLanguaguesCarousel = () => {
  return (
    <section className="relative rounded-2xl py-2.5 md:px-4 px-5 mt-10 bg-primary-color-P11">
      <div className="relative md:px-16 px-12">
        <Swiper
          loop={true}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          navigation={{
            nextEl: ".countries-carousel-swiper-button-next",
            prevEl: ".countries-carousel-swiper-button-prev",
          }}
          breakpoints={{
            // when window width is >= 340px
            340: {
              slidesPerView: 1,
              spaceBetween: 20,
            },

            // when window width is >= 550px
            550: {
              slidesPerView: 2,
              spaceBetween: 0,
            },

            // when window width is >= 860px
            860: {
              slidesPerView: 3,
              spaceBetween: 0,
            },

            // when window width is >= 1140px
            1140: {
              slidesPerView: 4,
              spaceBetween: 16,
            },
          }}
          modules={[Navigation, Pagination]}
          className="averagePricesLanguaguesCarousel"
        >
          {averagePricesLanguagues?.map((country, index) => {
            return (
              <SwiperSlide className="w-[149px]" key={index}>
                <div className="flex animation-fade mx-auto w-fit cursor-pointer p-2 rounded-[16px] btn-quaternary group leading-4 items-center">
                  <div className="me-3">
                    <Image
                      alt={"Country Image"}
                      src={country?.image}
                      className="w-[51px]"
                    />
                  </div>

                  <div>
                    <h3 className="ST-SB-2">{country?.title}</h3>
                    <p className="text-primary-color-P6 group-active:text-primary-color-P12">
                      <span className="ST-SB-2">{country?.price}</span>{" "}
                      <span className="ST-1">{country?.time}</span>
                    </p>
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
