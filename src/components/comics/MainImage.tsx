import FadeInAnimation from "@/components/animations/FadeIn";
import { HeroThumbnail } from "@/features/heroes";

import clsx from "clsx";
import Image from "next/image";

const MainImage = ({ thumbnail }: { thumbnail: HeroThumbnail }) => {
  return (
    <FadeInAnimation
      className="
      flex bg-marvel-red shadow-lg md:w-1/3 h-[10%] md:h-full overflow-hidden
    "
    >
      <Image
        unoptimized
        width={500}
        height={500}
        src={`${thumbnail.path}.${thumbnail.extension}`}
        alt={thumbnail.path}
        className={clsx({
          "object-contain": thumbnail.path.includes("marvel-logo"),
          "object-cover w-full h-full": !thumbnail.path.includes("marvel-logo"),
        })}
      />
    </FadeInAnimation>
  );
};

export default MainImage;
