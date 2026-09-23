import axios from 'axios';
import { LoginDto, AuthUser } from '@/types/auth.types';

// Definimos el tipo de lo que responde Route Handler
export interface RouteHandlerLoginResponse {
  message: string;
  user: AuthUser;
}

/**
 * Llama al Route Handler de Next.js (/api/auth/login).
 * Next.js se encarga de pedir el token a NestJS y setear la cookie httpOnly.
 */
export async function loginService(payload: LoginDto): Promise<RouteHandlerLoginResponse> {
  const response = await axios.post<RouteHandlerLoginResponse>('/api/auth/login', payload);
  return response.data;
}

