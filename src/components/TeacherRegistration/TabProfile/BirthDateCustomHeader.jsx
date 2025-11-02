// Icons
import { LeftArrowMediumIcon, RightArrowMediumIcon } from "../../Icons";

const BirthDateCustomHeader = ({
  decreaseMonth,
  increaseMonth,
  decreaseYear,
  increaseYear,
  date,
}) => {
  return (
    <div className="flex justify-between items-center gap-1.5 mb-1.5">
      {/* Group of arrows (Months) */}
      <div className="flex-[60%] flex justify-between items-center rounded-xl p-1.5 bg-primary-color-P12">
        <button type="button" onClick={decreaseMonth}>
          <LeftArrowMediumIcon fillcolor={"fill-primary-color-P8"} />
        </button>

        <span className="fill-primary-color-P4 mx-1.5 ST-3">
          {date.toLocaleString("en-US", { month: "long" })}
        </span>

        <button type="button" onClick={increaseMonth}>
          <RightArrowMediumIcon fillcolor={"fill-primary-color-P8"} />
        </button>
      </div>

      {/* Group of arrows (Years) */}
      <div className="flex-1 flex justify-between items-center rounded-xl p-1.5 bg-primary-color-P12">
        <button type="button" onClick={decreaseYear}>
          <LeftArrowMediumIcon fillcolor={"fill-primary-color-P8"} />
        </button>

        <span className="fill-primary-color-P4 mx-1.5 ST-3">
          {date.getFullYear()}
        </span>

        <button type="button" onClick={increaseYear}>
          <RightArrowMediumIcon fillcolor={"fill-primary-color-P8"} />
        </button>
      </div>
    </div>
  );
};

export default BirthDateCustomHeader;
