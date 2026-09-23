import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import axios from 'axios';

export async function POST(request: Request) {
  const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
  const cookieStore = await cookies();
  const token =
    cookieStore.get('token')?.value ||
    cookieStore.get('jwt')?.value ||
    cookieStore.get('auth_token')?.value;

  try {
    const body = await request.json();

    const res = await axios.post(`${backendUrl}/events`, body, {
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        Cookie: cookieStore.toString(),
      },
    });

    return NextResponse.json(res.data, { status: res.status });
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        { message: error.response?.data?.message || 'Error al registrar el evento' },
        { status: error.response?.status || 500 }
      );
    }
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 });
  }
}