import { marvelApi } from "@/services/marvelApi";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    try {
      marvelApi.get("characters").then((response) => {
        console.log(response.data);
      });
    } catch (error) {
      console.error({ error });
    }
  }, []);

  return <main></main>;
}
