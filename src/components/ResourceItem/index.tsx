import Image from "next/image";
import Link from "next/link";
import { Col } from "reactstrap";

import { shimmer } from "@/utils/shimmer";

export type ResourceItemExternalItemResponse = {
  id: number;
  title: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  urls: {
    type: string;
    url: string;
  }[];
};

type ResourceItemProps = {
  item: ResourceItemExternalItemResponse;
};

export function ResourceItem({ item: resource }: ResourceItemProps) {
  const url = resource?.urls.find((r) => r.type === "detail")?.url;

  return (
    <Col>
      <Link href={url || "/"}>
        <a className="w-100 d-block rounded text-decoration-none text-black overflow-hidden shadow-sm">
          <Image
            src={`${resource.thumbnail.path}.${resource.thumbnail.extension}`}
            alt={resource.title}
            height={450}
            width={450}
            loading="lazy"
            placeholder="blur"
            blurDataURL={shimmer(450, 450)}
            objectFit="cover"
            objectPosition="center"
          />
          <p className="p-3 fw-bold mb-0">{resource.title}</p>
        </a>
      </Link>
    </Col>
  );
}
