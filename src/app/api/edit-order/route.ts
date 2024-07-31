import { NextRequest, NextResponse } from 'next/server';
interface Params {
  id: string;
}
export async function PATCH(req: NextRequest,context: { params: Params }) {
  const { id } = context.params;
  const body = await req.json();
  if (!id) {
    return NextResponse.json({ message: 'ID is required' }, { status: 400 });
  }

  try {
    const res = await fetch(`http://localhost:5000/orders/update/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json({ message: 'Failed to update the blog', error: data }, { status: res.status });
    }

    return NextResponse.json(data);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ message: 'Internal server error', error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ message: 'An unknown error occurred' }, { status: 500 });
    }
  }
}
