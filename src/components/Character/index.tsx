import { motion } from "framer-motion";
import Link from "next/link";
import { Col } from "reactstrap";

import { Character as CharacterItemProps } from "@/@types/character";

type CharacterProps = {
  character: CharacterItemProps;
};

export function Character({ character }: CharacterProps) {
  return (
    <Col>
      <Link href={`/character/${character.id}`}>
        <a className="w-100 d-block rounded text-decoration-none text-black overflow-hidden shadow-sm">
          <motion.img
            src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
            alt={character.name}
            height={450}
            width="100%"
            loading="lazy"
            placeholder="blur"
            layoutId={String(character.id)}
            className="object-center object-cover"
          />
          <p className="p-3 fw-bold mb-0">{character.name}</p>
        </a>
      </Link>
    </Col>
  );
}
