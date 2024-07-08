export default function CharacterSkeleton() {
  return (
    <div className="w-full">
      <div className="flex h-80 w-full items-center justify-center gap-32">
        <div className="h-[200px] w-[200px] animate-pulse rounded-full bg-neutral-800" />

        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-2">
            <p className="h-4 w-full animate-pulse bg-neutral-800"></p>
            <p className="h-4 w-full animate-pulse bg-neutral-800"></p>
          </div>

          <div className="h-20 w-40 animate-pulse gap-2 rounded-md bg-neutral-800 p-2"></div>
        </div>
      </div>
    </div>
  );
}
