import Link from "next/link";
export default function HomePage() {
  return (
    <div>
      <h1>Esta es la ruta: /home</h1>
      <Link href={"/categories"}>Ver categorías</Link>
    </div>

  )

}