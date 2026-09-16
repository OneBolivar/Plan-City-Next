// src/services/categories.service.ts
import { api } from '@/services/api';
import { Category, CreateCategoryDto, UpdateCategoryDto } from '@/types/category.types';
import axios from 'axios';

export async function getCategories(): Promise<Category[]> {
  try {
    const response = await api.get<Category[]>('/categories');
    return response.data;
  } catch (error) {
    console.error('Error al obtener categorías:', error);
    return [];
  }
}

export async function getCategoryById(id: string): Promise<Category | undefined> {
  try {
    const response = await api.get<Category>(`/categories/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return undefined;
    }
    console.error(`Error al obtener categoría ${id}:`, error);
    return undefined;
  }
}

export async function createCategory(payload: CreateCategoryDto): Promise<Category | null> {
  try {
    const response = await api.post<Category>('/categories', payload);
    return response.data;
  } catch (error) {
    console.error('Error al crear categoría:', error);
    throw error;
  }
}

export async function updateCategory(id: string, payload: UpdateCategoryDto): Promise<Category | null> {
  try {
    const response = await api.put<Category>(`/categories/${id}`, payload);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar categoría ${id}:`, error);
    throw error;
  }
}