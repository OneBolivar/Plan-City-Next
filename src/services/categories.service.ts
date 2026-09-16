import { api } from "./api";
import { AppEvent } from "@/types/event.types";
import axios from "axios";

export async function getCategories(): Promise<AppEvent[]> {
    try{
        const response = await api.get <AppEvent[]>("/categories");
        return response.data;
    }catch (error) {
        console.error("Fallo al obtener las eventos", error);
        return [];
        }
    }

export async function getCategoryById(id: string): Promise<AppEvent | undefined> {
    try {
        const response = await api.get<AppEvent>(`/categories${id}`);
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error)){
            if (error.response?.status === 404) return undefined
        }
    }
    
}