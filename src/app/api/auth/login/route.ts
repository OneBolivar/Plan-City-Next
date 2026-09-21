import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import axios from 'axios';
import { LoginDto, AuthResponse } from '@/types/auth.types';

export async function POST(request: Request) {
  try {
    const body: LoginDto = await request.json();

    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
    const { data } = await axios.post<AuthResponse>(`${backendUrl}/auth/login`, body);

    const cookieStore = await cookies();
    cookieStore.set('auth_token', data.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24,
    });

    return NextResponse.json(
      {
        message: 'Inicio de sesión exitoso',
        user: data.user,
      },
      { status: 200 }
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status || 500;
      const message = error.response?.data?.message || 'Error en el servidor de autenticación';

      return NextResponse.json({ message }, { status });
    }

    return NextResponse.json(
      { message: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}