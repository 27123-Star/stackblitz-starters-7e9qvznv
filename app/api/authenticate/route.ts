import { NextResponse } from "next/server";
import { checkTeacherCredentials } from "@/lib/auth";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, password, role } = body;

  if (!name || !password || !role) {
    return NextResponse.json({ success: false, error: "Missing fields." }, { status: 400 });
  }

  const teacher = await checkTeacherCredentials(name, password);

  if (!teacher || teacher.role !== role) {
    return NextResponse.json({ success: false, error: "Invalid name or password." }, { status: 401 });
  }

  return NextResponse.json({ success: true });
}
