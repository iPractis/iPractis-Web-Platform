// src/app/api/internal/cron/send-notifications/route.js

import { sendPendingEmailNotifications } from "@/src/jobs/sendEmailNotifications";
import { NextResponse } from "next/server";

export async function GET() {
  await sendPendingEmailNotifications();
  return NextResponse.json({ success: true });
}
    