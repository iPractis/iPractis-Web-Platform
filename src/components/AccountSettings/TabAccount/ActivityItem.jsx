import InputBGWrapperIcon from "../../Shared/InputBGWrapperIcon";

// Icons
import {
  PadLockClosedSmallerIcon,
  CalendarSmallerIcon,
  LocationSmallerIcon,
  ChevronDownMediumIcon,
} from "../../Icons";

const ActivityItem = ({ date, time, title, location, device }) => {
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex-none flex gap-4 items-center rounded-2xl p-1.5 pe-4 bg-primary-color-P11">
        <InputBGWrapperIcon>
          <CalendarSmallerIcon fillColor={"fill-primary-color-P1"} />
        </InputBGWrapperIcon>

        <div>
          <h3 className="ST-SB-1 text-primary-color-P1">{date}</h3>
          <h4 className="ST-1 text-primary-color-P4">{time}</h4>
        </div>
      </div>

      <div className="flex-1 flex gap-4 items-center rounded-2xl p-1.5 bg-primary-color-P11">
        {/* Password status */}
        <InputBGWrapperIcon>
          <PadLockClosedSmallerIcon fillColor={"fill-primary-color-P1"} />
        </InputBGWrapperIcon>

        <h4 className="ST-2 text-primary-color-P1">{title}</h4>

        {/* Direction (e.g: Chile || USA) */}
        <InputBGWrapperIcon>
          <LocationSmallerIcon fillColor={"fill-primary-color-P1"} />
        </InputBGWrapperIcon>

        <h4 className="ST-2 text-primary-color-P1">{location}</h4>

        {/* Device */}
        <InputBGWrapperIcon>
          <LocationSmallerIcon fillColor={"fill-primary-color-P1"} />
        </InputBGWrapperIcon>

        <h4 className="ST-2 text-primary-color-P1">{device}</h4>

        {/* Arrow Options */}
        <button type="button" className="ms-auto">
          <InputBGWrapperIcon>
            <ChevronDownMediumIcon fillColor={"fill-primary-color-P1"} />
          </InputBGWrapperIcon>
        </button>
      </div>
    </div>
  );
};

export default ActivityItem;
