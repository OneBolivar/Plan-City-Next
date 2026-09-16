import { Timestamp } from "next/dist/server/lib/cache-handlers/types";

export interface Category{
    id: string;
    name: string;
    description?: string;
    icon?: string;
    created_at: Timestamp;
    updated_at: Timestamp
}