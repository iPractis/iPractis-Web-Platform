import { notificationTypes } from "@/src/data/dataAccountSettings";
import SectionHeader from "../../Shared/SectionHeader";
import SectionContent from "../../Shared/SectionContent";
import NotificationItem from "./NotificationItem";
import { BellIcon } from "../../Icons";
import { useAuth } from "@/src/hooks/useAuth";
import SectionWrapper from "../../Shared/SectionWrapper";

const Notifications = ({ control }) => {
  const { user } = useAuth();
  
  const userRole = user?.role?.toLowerCase() || "student";

  // Filter notifications based on user role
  const filteredNotifications = notificationTypes.filter((type) =>
    type.forRoles?.includes(userRole)
  );

  return (
    <SectionWrapper>
      <SectionHeader
        descriptionText="Here, you can control the notifications you receive."
        titleIcon={<BellIcon fillColor={"fill-primary-color-P1"} />}
        titleText="Notifications"
        titleClassName="MT-SB-1"
      />

      <SectionContent className="w-full mx-[32px] space-y-[32px]">
        {filteredNotifications.map((notificationType, index) => (
          <NotificationItem
            key={notificationType.key || index}
            control={control}
            description={notificationType.description}
            title={notificationType.title}
            items={notificationType.items}
            icon={notificationType.icon}
            notificationKey={notificationType.key}
          />
        ))}
      </SectionContent>
    </SectionWrapper>
  );
};

export default Notifications;
