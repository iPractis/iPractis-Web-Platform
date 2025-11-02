import { notificationTypes } from "@/src/data/dataAccountSettings";
import SectionHeader from "../../Shared/SectionHeader";
import NotificationItem from "./NotificationItem";
import { NotificationBiggestIcon } from "../../Icons";
import { useAuth } from "@/src/hooks/useAuth";

const Notifications = ({ control }) => {
  const { user } = useAuth();
  if (!user) return null;

  const isTeacher = user.role?.toLowerCase() === "teacher";

  // ✅ Filter by user role
  const filteredNotifications = notificationTypes.filter((type) =>
    isTeacher
      ? type.title.toLowerCase().includes("teacher")
      : type.title.toLowerCase().includes("student")
  );

  return (
    <div>
      <SectionHeader
        wrapperSectionHeaderClassName="bg-primary-color-P11 px-4 rounded-[32px] !p-[32px] mb-8"
        descriptionText="Here, you can control the notifications you receive."
        titleIcon={<NotificationBiggestIcon fillcolor={"fill-primary-color-P1"} />}
        descriptionClassName="mt-[4px]"
        titleText="Notifications"
        titleClassName="MT-SB-1"
      />

      <main className="space-y-8">
        {filteredNotifications.map((notificationType, index) => (
          <NotificationItem
            key={index}
            control={control}
            description={notificationType.description}
            title={notificationType.title}
            items={notificationType.items}
            icon={notificationType.icon}
          />
        ))}
      </main>
    </div>
  );
};

export default Notifications;
