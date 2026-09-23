import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import axios from 'axios';

export async function GET() {
  const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
  const cookieStore = await cookies();
  
  // Extraemos todos los posibles nombres comunes de token
  const token = 
    cookieStore.get('token')?.value || 
    cookieStore.get('jwt')?.value || 
    cookieStore.get('auth_token')?.value;

  try {
    const res = await axios.get(`${backendUrl}/favorites`, {
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        Cookie: cookieStore.toString(),
      },
    });

    return NextResponse.json(res.data);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Error al pedir favoritos a NestJS:', error.response?.status, error.response?.data);
      return NextResponse.json(
        { message: error.response?.data?.message || 'Error al obtener favoritos' },
        { status: error.response?.status || 500 }
      );
    }
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 });
  }
}