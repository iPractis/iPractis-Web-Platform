import Image from "next/image";

const CarouselArrow = ({
  carouselSwiperButtonName,
  srcClassname = "w-6",
  arrowPosition = null,
  srcArrow,
}) => {
  return (
    <div
      className={
        arrowPosition === "left" || arrowPosition === "prev"
          ? `${carouselSwiperButtonName} flex items-center absolute transform -translate-y-1/2 top-1/2 left-4 z-50 cursor-pointer w-[25px] h-[25px] animation-fade rounded-md p-2 hover:bg-secondary-color-S6`
          : `${carouselSwiperButtonName} flex items-center absolute transform -translate-y-1/2 top-1/2 right-4 z-50 cursor-pointer w-[25px] h-[25px] animation-fade rounded-md p-2 hover:bg-secondary-color-S6`
      }
    >
      <Image
        className={srcClassname}
        alt={`Chevron ${
          carouselSwiperButtonName.includes("next") ? "Right" : "Left"
        }`}
        src={srcArrow}
      />
    </div>
  );
};

export default CarouselArrow;
