import { Skeleton } from "@/app/components/ui/skeleton";

const CharacterDetailSkeleton = () => {
  return (
    <main className="w-full">
      <section className="mx-auto my-4 w-full max-w-7xl mt-24">
        <div className='flex flex-row gap-4 align-middle max-lg:flex-col max-lg:p-6'>
          <Skeleton className="w-[400px] h-[400px]" />
          <div className='flex flex-col gap-y-4 w-full'>
            <div className='flex justify-between'>
              <Skeleton className="w-full h-[100px]" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-8 gap-4 max-lg:grid-cols-4 mt-12">
          {Array.from({ length: 10 }).map((_, index) => (
            <Skeleton key={index} className="flex flex-col space-x-2 overflow-hidden rounded-md shadow w-36 h-64"></Skeleton>
          ))}
        </div>

      </section>
    </main>
  );
}
export default CharacterDetailSkeleton;
