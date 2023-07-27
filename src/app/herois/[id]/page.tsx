import Link from "next/link"

export default function Hero({ params }: { params: { id: string } }) {
  return (
    <main>
      <p>{params.id}</p>
      <Link href={'/'}>Voltar</Link>
    </main>
  )
}
