import { Skeleton } from "@/presentation/components/ui/skeleton";
import { ITEMS_PER_PAGE } from "@/lib/constants";

interface LoadingSkeletonProps {
  count?: number;
}

function SkeletonCard() {
  return (
    <div className="rounded-2xl overflow-hidden shadow-md">
      <Skeleton className="h-28 w-full rounded-none" />
      <div className="bg-white px-3 pt-2 pb-3 flex flex-col items-center gap-1.5">
        <Skeleton className="h-3.5 w-20" />
        <Skeleton className="h-4 w-16 rounded-full" />
      </div>
    </div>
  );
}

export function LoadingSkeleton({ count = ITEMS_PER_PAGE }: LoadingSkeletonProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
