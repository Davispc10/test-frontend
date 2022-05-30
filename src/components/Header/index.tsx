import Image from "next/image";
import Link from "next/link";
import { Container } from "reactstrap";

import { shimmer } from "@/utils/shimmer";

export function Header() {
  return (
    <header className="py-3 shadow-sm">
      <Container className="d-flex justify-content-center">
        <Link href="/">
          <a>
            <Image
              src="/logo.svg"
              alt="Marvel Logo"
              width={247}
              height={50}
              loading="lazy"
              placeholder="blur"
              blurDataURL={shimmer(247, 50)}
            />
          </a>
        </Link>
      </Container>
    </header>
  );
}
