import { Category } from './category.types';

export interface CategoryEventSummary {
  id: string | number;
  name?: string;
  title?: string;
  description: string;
  location: string;
  price?: number | string;
}

export interface CategoryDetailPageProps {
  params: Promise<{ id: string }>;
}

export interface CategoryDetailData {
  category: Category;
  events: CategoryEventSummary[];
}