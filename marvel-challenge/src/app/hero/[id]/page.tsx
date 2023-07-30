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
  return (
    <>
      <Header />
      <section className="px-3  ">
        <HeroDetail params={params} />
      </section>
    </>
  );
}
