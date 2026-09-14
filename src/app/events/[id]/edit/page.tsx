export default async function EditEventPage({params}: {params: Promise<{id:string}> }) {
  const { id } = await params;
  return <h1>Esta es la ruta: /events/{id}/edit</h1>
}