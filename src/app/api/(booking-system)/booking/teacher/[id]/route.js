import { supabaseClient } from '@/src/lib/supabaseClient';
import { NextResponse } from 'next/server';

/*
    GET /api/(booking-system)/teacher/booking/[id]
    - Replace getMeetingById with your real DB call (Prisma, Sequelize, etc.)
    - Returns 200 with meeting JSON, 404 if not found, 400 on bad request, 500 on error.
*/

export async function GET(request, { params }) {
    const { id } = params || {};
    console.log("Fetching booking with ID:", id);
    const { data, error} = await supabaseClient.from('bookings').select('*').eq('teacher_id', id);
    if (error) {
        console.error("Supabase error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: `Booking ID requested: ${id}` , data : data }, { status: 200 });
}
