
export interface AppEvent {
  id: string; 
  name: string;
  description?: string;
  date: string;
  location: string;
  price: number;
  capacity : number;
  categoryId: string;
  created_at : string;
  updated_at : string;
}