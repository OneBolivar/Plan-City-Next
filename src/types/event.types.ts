import { Timestamp } from "next/dist/server/lib/cache-handlers/types";

export interface AppEvent {
  id: string; 
  name: string;
  description?: string;
  date: string;
  location: string;
  price: number;
  capacity : number;
  categoryId: string;
  created_at : Timestamp;
  updated_at : Timestamp;
}