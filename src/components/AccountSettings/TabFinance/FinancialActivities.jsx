"use client";

import SectionContent from "../../Shared/SectionContent";
import FinancialActivityItem from "./FinancialActivityItem";

const FinancialActivities = () => {
  // Sample data - in real app this would come from API/props
  const activities = [
    {
      id: 1,
      type: "lesson",
      title: "Purchase french lesson",
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
      device: "MacOS",
      amount: 12,
      currency: "USD",
      fromAvatar: "/images/sample-avatar.png",
      toAvatar: "/images/sample-avatar.png",
    },
    {
      id: 2,
      type: "wallet",
      title: "Purchase wallet credits",
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
      device: "MacOS",
      amount: 12,
      currency: "USD",
    },
    {
      id: 3,
      type: "lesson",
      title: "Purchase french lesson",
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
      device: "MacOS",
      amount: 12,
      currency: "USD",
      fromAvatar: "/images/sample-avatar.png",
      toAvatar: "/images/sample-avatar.png",
    },
    {
      id: 4,
      type: "wallet",
      title: "Purchase wallet credits",
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
      device: "MacOS",
      amount: 12,
      currency: "USD",
    },
    {
      id: 5,
      type: "lesson",
      title: "Purchase french lesson",
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
      device: "MacOS",
      amount: 12,
      currency: "USD",
      fromAvatar: "/images/sample-avatar.png",
      toAvatar: "/images/sample-avatar.png",
    },
    {
      id: 6,
      type: "wallet",
      title: "Purchase wallet credits",
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
      device: "MacOS",
      amount: 12,
      currency: "USD",
    },
    {
      id: 7,
      type: "lesson",
      title: "Purchase french lesson",
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
      device: "MacOS",
      amount: 12,
      currency: "USD",
      fromAvatar: "/images/sample-avatar.png",
      toAvatar: "/images/sample-avatar.png",
    },
    {
      id: 8,
      type: "wallet",
      title: "Purchase wallet credits",
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
      device: "MacOS",
      amount: 12,
      currency: "USD",
    },
    {
      id: 9,
      type: "lesson",
      title: "Purchase french lesson",
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
      device: "MacOS",
      amount: 12,
      currency: "USD",
      fromAvatar: "/images/sample-avatar.png",
      toAvatar: "/images/sample-avatar.png",
    },
    {
      id: 10,
      type: "wallet",
      title: "Purchase wallet credits",
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
      device: "MacOS",
      amount: 12,
      currency: "USD",
    },
  ];

  return (
    <SectionContent className="space-y-[16px]">
      {activities.map((activity) => (
        <FinancialActivityItem
          key={activity.id}
          type={activity.type}
          title={activity.title}
          timestamp={activity.timestamp}
          device={activity.device}
          amount={activity.amount}
          currency={activity.currency}
          fromAvatar={activity.fromAvatar}
          toAvatar={activity.toAvatar}
        />
      ))}
    </SectionContent>
  );
};

export default FinancialActivities;
