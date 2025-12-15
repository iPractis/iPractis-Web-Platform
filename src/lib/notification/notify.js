// src/lib/notifications/notify.js

import { supabaseClient } from "../supabaseClient";
import { buildNotificationTemplate } from "./template";

export async function notify({
  userId,
  type,
  entityType,
  entityId = null,
  channels = ["inapp"],
  payload = {},
}) {
  const { title, message } = buildNotificationTemplate(type, payload);

  const { error } = await supabaseClient
    .from("notifications")
    .insert({
      user_id: userId,
      type,
      title,
      message,
      entity_type: entityType,
      entity_id: entityId,
      channels,
      data: payload,
    });

  if (error) {
    console.error("NOTIFICATION_INSERT_FAILED", error);
    throw error;
  }
}
