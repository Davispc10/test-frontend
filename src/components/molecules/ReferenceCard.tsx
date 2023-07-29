import Image from "../atoms/Image";

import { Reference } from "@/types/payload";

export interface Props {
  reference: Reference;
}

function ReferenceCard({ reference }: Props) {
  return (
    <li className="flex aspect-square h-32 w-32 flex-col gap-2 rounded-md ring-1 ring-red-500 hover:ring-red-500/75">
      <Image
        alt={reference.title}
        height={128}
        priority
        src={`${reference.thumbnail.path}.${reference.thumbnail.extension}`}
        title={reference.title}
        width={128}
        className="relative h-full w-full rounded-md object-cover object-left"
      />
    </li>
  );
}

export default ReferenceCard;
