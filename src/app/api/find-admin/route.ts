import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ test: 'test' });
}
export async function POST(req: NextRequest) {
  const body = await req.json();
  const res = await fetch(
    'http://localhost:5000/user/user-id',

    {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  const data = await res.json();
  return NextResponse.json(data);
}
