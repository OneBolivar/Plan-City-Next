import { EventFormData } from "@/types/event.schema";
import { api } from "./api";
import { AppEvent } from "@/types/event.types";
import axios from "axios";

export async function getEvents(): Promise<AppEvent[]> {
  try {
    const response = await api.get<AppEvent[]>("/events");
    return response.data;
  } catch (error) {
    console.error("Fallo al obtener los eventos", error);
    return [];
  }
}

export async function getEventId(id: string): Promise<AppEvent | undefined> {
  try {
    const response = await api.get<AppEvent>(`/events${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) return undefined;
    }
  }
}

export async function createEvent(eventData: EventFormData): Promise<AppEvent | null> {
  try {
    const response = await api.post<AppEvent>('/events', eventData);
    return response.data
  } catch (error){
    console.error('Error al crear evento', error);
    return null;
    
  }
}
