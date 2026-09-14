import { Category } from "@/types/category.types";

const MOCK_CATEGORRIES: Category[] = [
    {
        id: '1',
        name: 'Musica y festivales',
        description: 'Conciertos, festivales y eventos musicales de todo tipo.',
    },
    {
        id: '2',
        name: 'Deportes',
        description: 'Eventos y competencias deportivas de todo tipo.',
    },
    {
        id: '3',
        name: 'Cultura y teatro',
        description: 'Obras de teatro, exposiciones y eventos culturales.',
    },
    {
        id: '4',
        name: 'Tecnologia e Innovacion',
        description: 'Eventos y actividades relacionadas con la tecnología e innovación.',
    }

]

export async function getCategories(): Promise<Category[]>{
    await new Promise((resolve) => setTimeout(resolve, 200));
    return MOCK_CATEGORRIES;
}