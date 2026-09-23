export interface FavoriteEvent {
  id: string | number;
  name?: string;
  title?: string;
  description: string;
  date: string;
  location: string;
  price?: number | string;
  capacity?: number;
  category?: {
    id: string | number;
    name: string;
  };
}

export interface FavoriteItem {
  id: string | number;
  eventId: string | number;
  createdAt?: string;
  event: FavoriteEvent;
}