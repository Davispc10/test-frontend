import React from "react";
import { HeroDetail } from "@/components/HeroDetais";
import { useRouter } from "next/navigation";
import { Header } from "@/components/Header";

export interface HeroProps {
  params: {
    id: number;
  };
}

export default function Hero({ params }: HeroProps) {
  // const router = useRouter()
  // const { id } = router.;
  // const router = useRouter();
  // const id = Number(router.query.id);
  return (
    <>
      <Header />
      <section className="px-3  ">
        {/* <HeroDetail id={id} /> */}
        <HeroDetail params={params} />
      </section>
    </>
  );
}
