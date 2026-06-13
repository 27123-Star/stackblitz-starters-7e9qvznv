import { NextResponse } from 'next/server';
// @ts-ignore - Safely imports your existing JavaScript client file into TypeScript
import { supabase } from '../../../lib/supabase.js';

export async function POST(request: Request) {
  try {
    const { name, password, role } = await request.json();

    if (!name || !password || !role) {
      return NextResponse.json({ success: false, error: 'Request is missing required fields.' }, { status: 400 });
    }

    const tableName = role === 'teacher' ? 'teachers' : role === 'student' ? 'students' : null;
    if (!tableName) {
      return NextResponse.json({ success: false, error: 'Invalid role specified.' }, { status: 400 });
    }

    const { data: user, error } = await supabase
      .from(tableName)
      .select('*')
      .eq('name', name)
      .eq('password', password)
      .maybeSingle();

    if (error || !user) {
      return NextResponse.json({ success: false, error: 'Invalid username or password.' }, { status: 401 });
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        role,
      },
    });
  } catch (error) {
    console.error('Authentication error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error.' }, { status: 500 });
  }
}
                                                                                                                                                                      