// src/jobs/sendEmailNotifications.js

import { sendEmail } from "../lib/email/sendEmail";
import { supabaseClient } from "../lib/supabaseClient";
import { supabaseServer } from "../lib/supabaseServer";

export async function sendPendingEmailNotifications() {
  const { data: notifications, error } = await supabaseClient
    .from("notifications")
    .select("*")
    .contains("channels", ["email"])
    .is("email_sent_at", null)
    .limit(25);

    console.log("Pending email notifications:", notifications);

  if (error) {
    console.error("EMAIL_FETCH_FAILED", error);
    throw error;
  }

  for (const notification of notifications || []) {
    try {
      await sendEmail({
        toUserId: notification.user_id,
        subject: notification.title,
        html: `
          <p>${notification.message}</p>
          ${
            notification.data?.link
              ? `<a href="${notification.data.link}">Open</a>`
              : ""
          }
        `,
      });

      await supabaseClient
        .from("notifications")
        .update({
          email_sent_at: new Date().toISOString(),
        })
        .eq("id", notification.id);
    } catch (err) {
      console.error("EMAIL_SEND_FAILED", notification.id, err);
    }
  }
}
