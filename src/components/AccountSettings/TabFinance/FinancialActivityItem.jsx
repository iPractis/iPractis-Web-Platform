"use client";

import Image from "next/image";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

// Icons
import {
  Clock5SmallIcon,
  MonitorSmallestIcon,
  PasswordDotsDashIcon,
  CreditCardSmallIcon,
  ArrowRightSolidIcon,
  WalletSmallIcon,
} from "../../Icons";

const FinancialActivityItem = ({
  type = "lesson", // "lesson" or "wallet"
  title,
  timestamp,
  device = "MacOS",
  amount,
  currency = "USD",
  fromAvatar,
  toAvatar,
}) => {
  // Calculate display date
  const now = dayjs();
  const logTime = dayjs(timestamp);

  let displayDate;
  if (now.diff(logTime, "hour") < 24) {
    displayDate = logTime.fromNow();
  } else if (now.diff(logTime, "day") === 1) {
    displayDate = "Yesterday";
  } else {
    displayDate = logTime.format("DD MMM, YYYY");
  }

  return (
    <div className="flex items-center justify-between max-w-[430px]">
      {/* Left section — Activity details */}
      <div className="flex items-center gap-[16px]">
        <div className="flex items-center justify-center p-[14px] bg-secondary-color-S11 rounded-[16px]">
          <PasswordDotsDashIcon fillcolor={"fill-primary-color-P1"} />
        </div>

        <div>
          <h3 className="ST-2 text-primary-color-P1">{title}</h3>
          <div className="flex items-center gap-1">
            <Clock5SmallIcon fillcolor={"fill-primary-color-P5"} />
            <span className="ST-1 text-primary-color-P5">{displayDate}</span>
            <MonitorSmallestIcon fillcolor={"fill-primary-color-P5"} />
            <span className="ST-1 text-primary-color-P5">{device}</span>
          </div>
        </div>
      </div>

      {/* Right section — Transaction visualization */}
      <div className="flex items-center gap-[8px] bg-secondary-color-S11 p-[6px] rounded-[16px] ml-auto">
        {type === "lesson" ? (
          // Lesson purchase: Avatar → Amount → Avatar
          <>
            <div className="w-[36px] h-[36px] rounded-[10px] overflow-hidden">
              {fromAvatar ? (
                <Image
                  src={fromAvatar}
                  alt="From user"
                  width={36}
                  height={36}
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="w-full h-full bg-secondary-color-S11 rounded-full" />
              )}
            </div>
            <div className="flex flex-row items-center mx-1 gap-2">
                <ArrowRightSolidIcon fillcolor={"fill-primary-color-P1"} />
                <span className="ST-2 text-primary-color-P1 min-w-[50px] text-right">
                {amount} {currency}
                </span>
            </div>
            <div className="w-[36px] h-[36px] rounded-[10px] overflow-hidden">
              {toAvatar ? (
                <Image
                  src={toAvatar}
                  alt="To user"
                  width={36}
                  height={36}
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="w-[36px] h-[36px] bg-secondary-color-S11 rounded-[10px]" />
              )}
            </div>
          </>
        ) : (
          // Wallet credits: Card icon → Amount → iPractis icon
          <>
            <div className="rounded-[8px] bg-primary-color-P12 p-[8px] flex items-center justify-center">
                <CreditCardSmallIcon/>
            </div>
            {/* <RightArrowMediumIcon fillcolor={"fill-primary-color-P1"} /> */}
            <div className="flex flex-row items-center mx-1 gap-2">
                <ArrowRightSolidIcon fillcolor={"fill-primary-color-P1"} />
                <span className="ST-2 text-primary-color-P1 min-w-[50px] text-right">
                {amount} {currency}
                </span>
            </div>
            <div className="rounded-[10px] bg-primary-color-P12 p-[8px] flex items-center justify-center">
                <WalletSmallIcon/>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FinancialActivityItem;
