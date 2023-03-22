const HeroListSkeleton = () => {
  return (
    <main className="flex gap-4 flex-wrap items-center p-4 justify-center cursor-wait">
      {Array.from({ length: 10 }).map((_, index) => (
        <div
          key={index}
          className="bg-neutral-200 rounded-lg shadow-lg animate-pulse w-64 h-64"
        />
      ))}
    </main>
  );
};

export default HeroListSkeleton;
