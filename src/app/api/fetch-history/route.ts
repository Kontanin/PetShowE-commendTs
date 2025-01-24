import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  // Extract the dynamic "id" from the context.params

  const authorizationHeader = req.headers.get('authorization') || 'test';
  // Example token (replace with your actual token logic)

  try {
    // Make the GET request to the backend with the dynamic ID
    const res = await fetch(
      `http://localhost:5000/chat/chat-box/adminHistory`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: authorizationHeader,
        },
      },
    );

    // Handle non-200 responses
    if (!res.ok) {
      return NextResponse.json(
        { error: `Failed to fetch: ${res.statusText}` },
        { status: res.status },
      );
    }

    // Ensure the response is JSON and return it
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
