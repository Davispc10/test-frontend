import { Skeleton } from "@/app/components/ui/skeleton";

const CharacterListSkeleton = () => {
  return (
    <main className="w-full">
      <section className="mx-auto my-4 w-full max-w-7xl mt-24">
        <Skeleton className="w-full h-[50px]"></Skeleton>
        <div className="grid w-full grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-5 max-lg:grid-cols-2 mt-4">
          {Array.from({ length: 10 }).map((_, index) => (
            <Skeleton key={index} className="flex flex-col space-x-4 overflow-hidden rounded-md shadow w-56 h-72"></Skeleton>
          ))}
        </div>
      </section>
    </main>
  );
}
export default CharacterListSkeleton;
