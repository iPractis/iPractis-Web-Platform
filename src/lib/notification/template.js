// src/lib/notifications/templates.js

export function buildNotificationTemplate(type, payload = {}) {
  switch (type) {
    case "APPOINTMENT_CONFIRMED":
      return {
        title: "Appointment confirmed",
        message: `Your session is booked for ${payload.startTime}`,
      };

    case "APPOINTMENT_CANCELLED":
      return {
        title: "Appointment cancelled",
        message: "Your appointment has been cancelled.",
      };

    case "PAYMENT_SUCCESS":
      return {
        title: "Payment successful",
        message: "Your payment was received successfully.",
      };

    case "EARNING_PENDING":
      return {
        title: "New paid booking",
        message: "You have received a new paid booking.",
      };

    case "MESSAGE_RECEIVED":
      return {
        title: "New message",
        message: "You have received a new message.",
      };

    case "REFUND_PROCESSED":
      return {
        title: "Refund processed",
        message: "Your refund has been processed successfully.",
      };

    case "PAYOUT_COMPLETED":
      return {
        title: "Payout completed",
        message: "Your payout has been completed successfully.",
      };

    default:
      return {
        title: "Notification",
        message: "You have a new notification.",
      };
  }
}
