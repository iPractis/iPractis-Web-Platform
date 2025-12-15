import NotificationItem from "./NotificationItem";

export default function NotificationDropdown({
  notifications,
  setNotifications,
}) {
  function handleRead(id) {
    setNotifications(prev =>
      prev.map(n =>
        n.id === id ? { ...n, read_at: new Date().toISOString() } : n
      )
    );
  }

  return (
    <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg border rounded-md z-50 max-h-96 overflow-y-auto">
      {notifications.length === 0 ? (
        <div className="p-4 text-sm text-gray-500">
          No notifications
        </div>
      ) : (
        notifications.map(n => (
          <NotificationItem
            key={n.id}
            notification={n}
            onRead={handleRead}
          />
        ))
      )}
    </div>
  );
}
