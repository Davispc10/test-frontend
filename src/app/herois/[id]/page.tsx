import Hero from "@/components/organisms/Hero";

export default function HeroPage({ params }: { params: { id: string } }) {
  return (
    <main className="px-3 md:px-10 py-3 bg-slate-50">
      <Hero params={params} />
    </main >
  )
}
