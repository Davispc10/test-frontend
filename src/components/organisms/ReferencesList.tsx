import { Fragment, useState } from "react";

import ReferenceCard from "../molecules/ReferenceCard";

import { Reference as ReferenceProps } from "@/types/payload";

import ScrollContainer from "react-indiana-drag-scroll";

import { Lightbox } from "yet-another-react-lightbox";
import { Fullscreen } from "yet-another-react-lightbox/plugins";
import "yet-another-react-lightbox/styles.css";

export interface Props {
  references: ReferenceProps[];
}

function ReferencesList({ references }: Props) {
  const [lightbox, setLightbox] = useState(false);

  return (
    <ScrollContainer
      hideScrollbars
      horizontal
      onClick={() => setLightbox(true)}
      className="flex min-h-[128px] w-full cursor-grab gap-4 overflow-auto p-px"
    >
      {references.map((reference) => (
        <Fragment key={reference.id}>
          <ReferenceCard {...{ reference }} />
        </Fragment>
      ))}
      <Lightbox
        carousel={{
          finite: true,
        }}
        close={() => setLightbox(false)}
        open={lightbox}
        plugins={[Fullscreen]}
        slides={references.map((reference) => ({
          src: `${reference.thumbnail.path}.${reference.thumbnail.extension}`,
          alt: reference.title,
        }))}
      />
    </ScrollContainer>
  );
}

export default ReferencesList;
