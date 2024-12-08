import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const body = await req.json();

  const data = { test: 123 };
  return NextResponse.json(data);
}
