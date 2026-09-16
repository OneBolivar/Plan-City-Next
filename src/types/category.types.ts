
export interface Category{
    id: string;
    name: string;
    description?: string;
    icon?: string;
    created_at: string;
    updated_at: string;
}

export interface CreateCategoryDto {
  name: string;
  description?: string;
}

export type UpdateCategoryDto = Partial<CreateCategoryDto>;