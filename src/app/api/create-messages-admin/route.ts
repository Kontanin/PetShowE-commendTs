import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const authorizationHeader = req.headers.get('authorization') || 'test';
  const body = await req.json();
  const res = await fetch('http://localhost:5000/chat/admin', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
        authorization: authorizationHeader,
    },
  });
  const data = await res.json();
  return NextResponse.json(data);
}
