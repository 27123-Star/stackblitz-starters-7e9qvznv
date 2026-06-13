import { NextResponse } from 'next/server';
// @ts-ignore - Safely imports your existing JavaScript client file into TypeScript
import { supabase } from '../../../../lib/supabase.js'; 

export async function POST(request: Request) {
  try {
    const { name, password } = await request.json();

    // 1. Query your live 'teachers' table for a matching row
    const { data: teacher, error } = await supabase
      .from('teachers')
      .select('*')
      .eq('name', name)
      .eq('password', password)
      .maybeSingle(); // Safely returns null if no user matches instead of crashing

    // 2. If an error happens or the credentials don't match anyone, deny access
    if (error || !teacher) {
      return NextResponse.json(
        { success: false, message: 'Invalid username or password' },
        { status: 401 }
      );
    }

    // 3. Match found! Send the user details back to the login page UI
    return NextResponse.json({ 
      success: true, 
      user: {
        id: teacher.id,
        name: teacher.name,
        role: 'teacher'
      }
    });

  } catch (error) {
    console.error('Authentication error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
