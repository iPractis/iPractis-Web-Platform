"use client";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

// Icons
import {
  EarthMediumPlusIcon,
  PasswordDotsDashIcon,
  Clock5SmallIcon,
  MonitorSmallestIcon,
  MonitorSmallIcon,
  ChevronRightDoorCustomIcon,
} from "../../Icons";

const DeviceItem = ({ device, date, location, current=false }) => {
  // 🔹 Use either provided timestamp (changedAt) or date string
  const now = dayjs();
  const logTime = dayjs(date);

  // 🔹 Display relative or formatted date
  let displayDate;
  if (now.diff(logTime, "hour") < 24) {
    displayDate = logTime.fromNow(); // e.g. "3 hours ago"
  } else if (now.diff(logTime, "day") === 1) {
    displayDate = "Yesterday";
  } else {
    displayDate = logTime.format("DD MMM, YYYY");
  }

  return (
    <div className="flex items-center gap-2.5 max-w-[430px] mx-auto">
    {/* Left section — Date + Time (fixed column so location aligns) */}
    <div className="flex-none w-[170px] flex gap-4 items-center rounded-2xl p-1.5 pe-4">
        <div className={`flex items-center justify-center p-[14px] ${current ? "bg-quaternary-color-A5" : "bg-secondary-color-S11"} rounded-[16px]`}>
          <MonitorSmallIcon fillcolor={"fill-primary-color-P1"} />
        </div>

        {/* Device Section */}
        <div className="min-w-0">
          <h3 className="ST-2 text-primary-color-P1 truncate">{device}</h3>
          <div className="flex">
            <span className="ST-1 text-primary-color-P5 flex gap-1">
              <Clock5SmallIcon fillcolor={"fill-primary-color-P5"}/>
              <span className="text-nowrap">{current ? "Current" : displayDate}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Location section — Activity details */}
      <div className={`flex gap-2 items-center p-[6px] rounded-[16px] ${current ? "bg-quaternary-color-A5" : "bg-secondary-color-S11"} w-[211px]`}>
        <div className="flex items-center justify-center p-[8px] bg-primary-color-P12 rounded-[10px]">
          <EarthMediumPlusIcon fillcolor={"fill-primary-color-P1"} size={20} />
        </div>
        <span className="ST-2 text-primary-color-P1">{location}</span>
      </div>

      <div className="bg-septenary-color-MA5 p-[14px] rounded-[16px]">
        <ChevronRightDoorCustomIcon fillColor="fill-primary-color-P12"/>
      </div>
    </div>
  );
};

export default DeviceItem;
