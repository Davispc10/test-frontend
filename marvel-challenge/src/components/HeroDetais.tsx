"use client";

import React from "react";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useQuery } from "react-query";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getDetailHero } from "@/services/hooks/getDetailHero/useDetailHero";
import { HeroProps } from "@/app/hero/[id]/page";

export function HeroDetail({ params }: HeroProps) {
  const { data, isLoading } = useQuery({
    retry: false,
    queryKey: ["hero-details", params.id],
    queryFn: () => getDetailHero(params.id),
    refetchOnMount: "always",
    staleTime: 0,
  });

  console.log(params.id);
  return (
    <div className="p-8">
      <div className="grid grid-row-1 place-items-start">
        <h1>{params.id}</h1>
        <Link
          className="flex justify-center border-y border-black items-center w-14 my-2 rounded-full bg-red-900 p-2 hover:bg-red-700 duration-100"
          href="/"
        >
          <ArrowLeft className="text-3xl" />
        </Link>
      </div>
      <section className="flex items-center flex-col  min-h-screen">
        <header className="w-full pt-4 flex sm:justify-between items-center gap-16 pb-16">
          <Image src="/man.jpg" width={400} height={400} alt="Super heroi" />
          <div className="sm:w-3/4 h-auto">
            <span className="text-lg font-semibold">
              Charles Chandler & Hal Chandler
            </span>
            <h1 className="text-7xl font-bold">3-D Man</h1>
          </div>
        </header>
        <main className="flex justify sm:justify-between items-center ">
          <div className="grid grid-rows-1 sm:grid-cols-3 items-start gap-8 mt-4">
            <div className=" w-full sm:w-52">
              <Separator className="w-full mb-4" />
              <h2>BIOGRAPHY</h2>
            </div>
            <div className="">
              <p>
                The 3-D Man was a 1950 s hero who came about through the unique
                merger of two brothers, Hal and Chuck Chandler. Chuck was a test
                pilot who was abducted by alien Skrulls during an important test
                flight. Earth was seen as a strategic location in the ongoing
                conflict between the alien Kree and Skrull Empires, so the
                Skrulls were seeking information on Earths space program and had
                captured Chuck to interrogate him. Chuck resisted and escaped,
                accidentally causing the explosion of the Skrull spacecraft in
                the process. While his brother Hal watched, the radiation from
                the explosion seemingly disintegrated Chuck, who disappeared in
                a burst of light. Hal later discovered, however, that the light
                burst had imprinted an image of Chuck on each lens of Hals
                eyeglasses. Through concentration, Hal could merge the images
                and cause Chuck to reappear as a three-dimensional man. Chuck
                become the costumed adventurer known as the 3-D Man and
                single-handedly subverted the Skrulls early attempts to
                undermine Earthly civilization. Hal would remain comatose
                whenever the 3-D Man was active but remained aware of the 3-D
                Mans activities through a mental link. Later, a Skrulls ray
                weapon altered the transformation so that Hal was the 3-D Mans
                dominant consciousness for some time.
              </p>
            </div>
            <Card className="w-80 bg-zinc-900">
              <CardHeader className="mb-6">
                <CardTitle className="font-bold text-sm text-zinc-100">
                  HEIGHT
                </CardTitle>
                <CardDescription className="text-base font-semibold text-zinc-300">
                  6,2
                </CardDescription>
                <CardTitle className="font-bold text-sm text-zinc-100">
                  WEIGHT
                </CardTitle>
                <CardDescription className="text-base font-semibold text-zinc-300">
                  200 Ibs
                </CardDescription>
              </CardHeader>
              <Separator />
              <CardHeader>
                <CardTitle className="font-bold text-sm text-zinc-100">
                  EYES
                </CardTitle>
                <CardDescription className="text-base font-semibold text-zinc-300">
                  (Hal) Brown, (Chuck) Blue
                </CardDescription>
                <CardTitle className="font-bold text-sm text-zinc-100">
                  HAIR
                </CardTitle>
                <CardDescription className="text-base font-semibold text-zinc-300">
                  (Hal) Gray, (Chuck) Reddish-blonde
                </CardDescription>
              </CardHeader>
              <Separator />
              <CardHeader>
                <CardTitle className="font-bold text-sm text-zinc-100">
                  UNIVERSE
                </CardTitle>
                <CardDescription className="text-base font-semibold text-zinc-300">
                  Marvel Universe
                </CardDescription>
                <CardTitle className="font-bold text-sm text-zinc-100">
                  OTHER ALIASES
                </CardTitle>
                <CardDescription className="text-base font-semibold text-zinc-300">
                  None
                </CardDescription>
                <CardTitle className="font-bold text-sm text-zinc-100">
                  EDUCATION
                </CardTitle>
                <CardDescription className="text-base font-semibold text-zinc-300">
                  High school graduate
                </CardDescription>
                <CardTitle className="font-bold text-sm text-zinc-100">
                  PLACE OF ORIGIN
                </CardTitle>
                <CardDescription className="text-base font-semibold text-zinc-300">
                  Los Angeles, California
                </CardDescription>
                <CardTitle className="font-bold text-sm text-zinc-100">
                  IDENTITY
                </CardTitle>
                <CardDescription className="text-base font-semibold text-zinc-300">
                  Secret
                </CardDescription>
                <CardTitle className="font-bold text-sm text-zinc-100">
                  KNOWN RELATIVES
                </CardTitle>
                <CardDescription className="text-base font-semibold text-zinc-300">
                  Peggy Chandler (Hals wife)
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </main>
      </section>
    </div>
  );
}
