import { api } from "./api";
import { AuthResponse, LoginDto } from "../types/auth.types";

export async function loginService(payload: LoginDto): Promise<AuthResponse>{
    const response = await api.post<AuthResponse>('/auth/login', payload)
    return response.data
}