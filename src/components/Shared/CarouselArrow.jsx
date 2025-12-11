import { ChevronLeftIcon } from "../Icons";

const CarouselArrow = ({
  carouselSwiperButtonName,
  arrowPosition = null,
}) => {
  return (
    <div
      className={
        arrowPosition === "left" || arrowPosition === "prev"
          ? `${carouselSwiperButtonName} flex items-center absolute transform -translate-y-1/2 top-1/2 left-4 z-50 cursor-pointer w-[25px] h-[25px] animation-fade rounded-md p-2 bg-primary-color-P1 hover:bg-secondary-color-S6`
          : `${carouselSwiperButtonName} flex items-center absolute transform -translate-y-1/2 top-1/2 right-4 z-50 cursor-pointer w-[25px] h-[25px] animation-fade rounded-md p-2 bg-primary-color-P1 hover:bg-secondary-color-S6`
      }
    >
      <ChevronLeftIcon fillcolor={"fill-primary-color-P12"}/>
    </div>
  );
};

export default CarouselArrow;
