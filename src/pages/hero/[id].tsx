import React from "react";
import { useRouter } from "next/router";
import { getOneHero } from "../../services/apiServices";
import { useQuery } from "react-query";

import { CircleNotch } from "@phosphor-icons/react";
import { HeroDetails } from "../../components/Heroes/HeroDetails";

const Hero = () => {
  const router = useRouter();
  const id = Number(router.query.id);

  const { data, isLoading } = useQuery({
    queryKey: ["heroDetails", id],
    queryFn: () => getOneHero(id),
    refetchOnMount: "always",
    staleTime: 0,
  });

  return (
    <div className="w-11/12 h-[700px] md:w-3/5 xl:w-2/6 self-center bg-red-400 p-1 rounded-md font-bangers"> 
      {isLoading && (
        <div className="flex justify-center items-center w-full h-full">
          <CircleNotch className="text-8xl animate-spin text-red-500" /> 
        </div>
      )}     
      {data && (
        <HeroDetails {...data} />
      )}
    </div>
  );
};

export default Hero;