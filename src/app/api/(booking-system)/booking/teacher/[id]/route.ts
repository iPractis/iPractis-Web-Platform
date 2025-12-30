import { requireUser } from '@/src/lib/requireUser';
import { supabaseClient } from '@/src/lib/supabaseClient';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  try {
    const { teacherId } = params;
    const { user, role } = await requireUser();

    // 🚫 Teachers cannot see other teachers
    if (role === 'teacher' && user.user_id !== teacherId) {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      );
    }

    // 🔐 Explicit column whitelist (FULL booking data, but safe)
    const { data, error } = await supabaseClient
      .from('bookings')
      .select(`
        id,
        start_time,
        end_time,
        status,
        student_id,
        appointment_type_id,
        created_at
      `)
      .eq('teacher_id', teacherId)
      .order('start_time', { ascending: true });

    if (error) throw error;

    return NextResponse.json({ data }, { status: 200 });
  } catch (err) {
    console.error('Error fetching bookings:', err);
    return NextResponse.json(
      { error: err.message || 'Server error' },
      { status: 500 }
    );
  }
}
