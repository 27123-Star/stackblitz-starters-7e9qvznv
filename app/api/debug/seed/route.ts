import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST() {
  try {
    // Insert test teacher
    const { data: teacherData, error: teacherError } = await supabase
      .from('teachers')
      .insert([
        { name: 'Ahmed Ali', password: 'teacher123', role: 'teacher' },
        { name: 'Fatima Hassan', password: 'teacher456', role: 'teacher' },
      ])
      .select();

    // Insert test student
    const { data: studentData, error: studentError } = await supabase
      .from('students')
      .insert([
        { name: 'Mohammed Ahmed', password: 'student123', role: 'student' },
        { name: 'Layla Omar', password: 'student456', role: 'student' },
      ])
      .select();

    return NextResponse.json({
      success: true,
      message: 'Test data seeded successfully',
      teachers: {
        error: teacherError?.message,
        data: teacherData,
      },
      students: {
        error: studentError?.message,
        data: studentData,
      },
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : String(error),
    }, { status: 500 });
  }
}
