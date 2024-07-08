import { CardSkeleton } from '../atoms/card-skeleton';

export function CardListSkeleton() {
  return (
    <ul className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {Array.from({ length: 10 }).map((_, index) => (
        <CardSkeleton key={index} />
      ))}
    </ul>
  );
}
