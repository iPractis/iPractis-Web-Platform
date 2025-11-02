"use client";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

import InputBGWrapperIcon from "../../Shared/InputBGWrapperIcon";

// Icons
import {
  PadLockClosedSmallerIcon,
  CalendarSmallerIcon,
  LocationSmallerIcon,
} from "../../Icons";

const ActivityItem = ({ date, time, title, location, device, changedAt }) => {
  // 🔹 Use either provided timestamp (changedAt) or date string
  const now = dayjs();
  const logTime = dayjs(changedAt || date);
  let displayDate;

  // 🔹 Display relative or formatted date
  if (now.diff(logTime, "hour") < 24) {
    displayDate = logTime.fromNow(); // e.g. "3 hours ago"
  } else if (now.diff(logTime, "day") === 1) {
    displayDate = "Yesterday";
  } else {
    displayDate = logTime.format("DD MMM, YYYY");
  }

  return (
    <div className="flex items-center gap-2.5">
      {/* Left section — Date + Time */}
      <div className="flex-none flex gap-4 items-center rounded-2xl p-1.5 pe-4 bg-primary-color-P11">
        <InputBGWrapperIcon>
          <CalendarSmallerIcon fillcolor={"fill-primary-color-P1"} />
        </InputBGWrapperIcon>

        <div>
          <h3 className="ST-SB-1 text-primary-color-P1">{displayDate}</h3>
          <h4 className="ST-1 text-primary-color-P4">
            {logTime.format("hh:mm A")}
          </h4>
        </div>
      </div>

      {/* Right section — Activity details */}
      <div className="flex-1 flex gap-4 items-center rounded-2xl p-1.5 bg-primary-color-P11">
        <InputBGWrapperIcon>
          <PadLockClosedSmallerIcon fillcolor={"fill-primary-color-P1"} />
        </InputBGWrapperIcon>

        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 flex-wrap">
          <h4 className="ST-2 text-primary-color-P1">{title}</h4>
          {device && <h4 className="ST-2 text-primary-color-P4">• {device}</h4>}
          {location && (
            <div className="flex items-center gap-1 text-primary-color-P4 ST-3">
              <LocationSmallerIcon fillcolor={"fill-primary-color-P4"} />
              <span>{location}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivityItem;
