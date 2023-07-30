import dynamic from "next/dynamic";

// to prevent ssr errors when loading localStorage
const FavHeroes = dynamic(() => import("../favheroes/favHeroes"), {
  ssr: false,
});

export default FavHeroes;