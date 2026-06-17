import { NextResponse } from 'next/server';
// @ts-ignore - Safely imports your existing JavaScript client file into TypeScript
import { supabase } from '../../../lib/supabase.js';

export async function POST(request: Request) {
  try {
    const { name, password, role } = await request.json();

    console.log('Authentication attempt:', { name, role, passwordLength: password?.length });

    if (!name || !password || !role) {
      console.error('Missing required fields');
      return NextResponse.json({ success: false, error: 'Request is missing required fields.' }, { status: 400 });
    }

    const tableName = role === 'teacher' ? 'teachers' : role === 'student' ? 'students' : null;
    if (!tableName) {
      console.error('Invalid role:', role);
      return NextResponse.json({ success: false, error: 'Invalid role specified.' }, { status: 400 });
    }

    console.log('Querying table:', tableName);

    // First, let's check if the table has any data and what columns it has
    const { data: allRecords, error: listError } = await supabase
      .from(tableName)
      .select('*')
      .limit(1);

    if (listError) {
      console.error(`Error accessing table ${tableName}:`, listError);
      return NextResponse.json({ 
        success: false, 
        error: `Database error: ${listError.message}`,
        details: `Cannot access ${tableName} table. Make sure it exists in Supabase.`
      }, { status: 500 });
    }

    // Now search for the user
    const { data: user, error } = await supabase
      .from(tableName)
      .select('*')
      .eq('name', name)
      .eq('password', password)
      .maybeSingle();

    console.log('Query result:', { 
      userFound: !!user, 
      error: error?.message,
      tableName,
      nameQueried: name
    });

    if (error) {
      console.error('Query error:', error);
      return NextResponse.json({ 
        success: false, 
        error: `Query error: ${error.message}` 
      }, { status: 500 });
    }

    if (!user) {
      console.warn('User not found for:', { name, role });
      return NextResponse.json({ 
        success: false, 
        error: 'Invalid username or password.' 
      }, { status: 401 });
    }

    console.log('Authentication successful for:', user.name);

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
    return NextResponse.json({ 
      success: false, 
      error: `Internal server error: ${error instanceof Error ? error.message : String(error)}` 
    }, { status: 500 });
  }
}
                                                                                                                                                                      