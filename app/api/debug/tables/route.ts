import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    // Check teachers table
    const { data: teachers, error: teachersError } = await supabase
      .from('teachers')
      .select('*');

    // Check students table
    const { data: students, error: studentsError } = await supabase
      .from('students')
      .select('*');

    return NextResponse.json({
      success: true,
      tables: {
        teachers: {
          exists: !teachersError,
          error: teachersError?.message,
          count: teachers?.length || 0,
          records: teachers || [],
        },
        students: {
          exists: !studentsError,
          error: studentsError?.message,
          count: students?.length || 0,
          records: students || [],
        },
      },
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : String(error),
    }, { status: 500 });
  }
}
