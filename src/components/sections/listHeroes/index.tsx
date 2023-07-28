import "./styles.css";
import "react-loading-skeleton/dist/skeleton.css";

import Skeleton from "react-loading-skeleton";
import { Suspense } from "react";
import { FetchListHeroes } from "./Fetch";

interface PropsSectionHeroes_I {
  indexPage?: string;
  search?: string;
}

export const SectionHeroes: React.FC<PropsSectionHeroes_I> = (
  props: PropsSectionHeroes_I
): JSX.Element => {
  const indexPage = isNaN(Number(props.indexPage))
    ? 0
    : Number(props.indexPage);

  return (
    <div>
      <Suspense
        fallback={
          <Skeleton
            height={228}
            width={"100%"}
            borderRadius={0}
            baseColor="#bcc1c6"
            highlightColor="#dbddde"
            count={12}
            inline
            containerClassName="grid gap-2 grid-cols-[repeat(auto-fill,minmax(185px,1fr))]"
          />
        }
      >
        <FetchListHeroes search={props.search} indexPage={indexPage} />
      </Suspense>
    </div>
  );
};
