export default async function CategoryDetailPage({params}: {params: Promise<{id:string}> }) {
  const { id } = await params;
  return <h1>Esta es la ruta: /categories/{id}</h1>
}