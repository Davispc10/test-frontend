"use client";

import { Undo2 } from "lucide-react";
import { Character } from "@/types/global";
import React, { useState, useEffect } from "react";
import { CardSuperHero } from "@/components";
import { BASE_URL, privateKey, publicKey } from "@/utils/utils";
import axios from "axios";
import { generateMD5Hash } from "@/services/serviceDataApi";
import { usePathname } from "next/navigation";

interface Params {
  id: string;
}

export default function Character({ params }: { params: Params }) {
  const hash = generateMD5Hash("1", privateKey, publicKey);
  const [character, setCharacter] = useState<Character | undefined>();
  const pathname = usePathname();
  const ts = "1";

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/${
          pathname.split("/")[2]
        }?ts=${ts}&apikey=${publicKey}&hash=${hash}`
      );
      const data = response.data.data.results[0];
      setCharacter(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {character?.thumbnail && (
        <CardSuperHero key={params.id} character={character} />
      )}
    </div>
  );
}
