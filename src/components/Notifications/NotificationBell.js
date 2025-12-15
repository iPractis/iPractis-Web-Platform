export default function NotificationBell({ unreadCount, onClick }) {
  return (
    <button
      onClick={onClick}
      className="relative p-2 rounded-full hover:bg-gray-100"
    >
      🔔
      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">
          {unreadCount}
        </span>
      )}
    </button>
  );
}
