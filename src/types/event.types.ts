export interface AppEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  price: number;
  categoryId: string;
  categoryName: string;
  imageUrl?: string;
}