'use client'

import Image from "next/image"
import { useRouter } from "next/navigation"

interface CharacterProps {
  searchParams: {
    name: string
    description: string
    imageSource: string
  }
}

export default function Character({ searchParams: { name, description, imageSource } }: CharacterProps) {
  const router = useRouter();

  return (
    <main className="min-h-screen px-48 pt-16 pb-32 bg-neutral-950 flex flex-col gap-12">
      <Image onClick={router.back} className="self-start cursor-pointer" src="/arrow2-left.svg" width={35} height={25} alt="Seta para esquerda" />
      <section className="flex flex-col items-center">
        <h1 className="text-8xl font-medium font-mono mb-12">{name}</h1>
        <Image src={imageSource} height={500} width={500} alt={`Foto do ${name}`} />
        <h2 className="text-2xl font-medium font-mono mt-12 text-center">{description}</h2>
      </section>
    </main>
  );
}
