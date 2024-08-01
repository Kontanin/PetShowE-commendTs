import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function GET(req:NextRequest) {
  
  const body = await req.json();
  const res = await fetch(
    'http://localhost:5000/chat',
    {
      method: 'GET',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  return NextResponse.json(res);
}
