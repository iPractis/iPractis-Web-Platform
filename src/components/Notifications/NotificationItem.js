import { markNotificationRead } from "@/src/lib/notification/markAsRead";
import { useRouter } from "next/navigation";

export default function NotificationItem({ notification, onRead }) {
  const router = useRouter();

  async function handleClick() {
    if (!notification.read_at) {
      await markNotificationRead(notification.id);
      onRead(notification.id);
    }

    if (notification.data?.link) {
      router.push(notification.data.link);
    }
  }

  return (
    <div
      onClick={handleClick}
      className={`p-3 cursor-pointer border-b text-sm ${
        notification.read_at ? "bg-white" : "bg-gray-100"
      }`}
    >
      <div className="font-medium">{notification.title}</div>
      <div className="text-gray-600">{notification.message}</div>
    </div>
  );
}
