export default async function EditCategoryPage({params}: {params: Promise<{id:string}> }) {
  const { id } = await params;
  return <h1>Esta es la ruta: /categories/{id}/edit</h1>
}