import { notificationTypes } from "@/src/data/dataAccountSettings";
import SectionHeader from "../../Shared/SectionHeader";
import NotificationItem from "./NotificationItem";

// Icons
import { NotificationBiggestIcon } from "../../Icons";

const Notifications = () => {
  return (
    <div>
      <SectionHeader
        wrapperSectionHeaderClassName="bg-primary-color-P11 px-4 rounded-[32px] !p-[32px] mb-8"
        descriptionText={"Here, you can control the notifications you receive."}
        titleIcon={
          <NotificationBiggestIcon fillColor={"fill-primary-color-P1"} />
        }
        descriptionClassName={"mt-[4px]"}
        titleText={"Notifications"}
        titleClassName="MT-SB-1"
      />

      <main className="space-y-8">
        {notificationTypes.map((notificationType, index) => (
          <NotificationItem
            description={notificationType.description}
            title={notificationType.title}
            items={notificationType.items}
            icon={notificationType.icon}
            key={index}
          />
        ))}
      </main>
    </div>
  );
};

export default Notifications;
