"use client";

import {
  PaginationContext,
  PaginationPage,
} from "@contexts/pagination.provider";
import { useRouter, usePathname } from "next/navigation";
import { useContext, useEffect, useMemo } from "react";

export type PaginationRouteChangeProps = {
  /** Example: /posts/:id/authors or /posts/:id */
  replace: {
    path: string;
    /** Replace :id in pathname */
    fn?: (page: PaginationPage) => number;
  };
};

const pathRegex = new RegExp("(/)(:id)([/]{0,1})");

export const PaginationRouteChange: React.FC<PaginationRouteChangeProps> = ({
  replace,
}) => {
  const router = useRouter();
  const path = usePathname();

  if (!pathRegex.test(replace.path))
    throw new Error(
      "Invalid path. Use :id variable in path these formats: /:id or /:id/ or */:id/*"
    );

  const { currentPage } = useContext(PaginationContext);

  const newPath = useMemo(() => {
    const id = replace.fn
      ? replace.fn(currentPage)
      : (currentPage?.id || 0) + 1;

    // Replace :id in pathname.
    // $1 = Tudo antes de :id
    // $3 = Tudo depois de :id
    return replace.path.replace(pathRegex, `$1${id}$3`);
  }, [replace, currentPage]);

  useEffect(() => {
    if (newPath !== path) {
      // router.replace(newPath, { forceOptimisticNavigation: true });
      // router.push(newPath, )
    }
  }, [newPath, router, path]);

  return null;
};
