import React from 'react';

const HeroListSkeleton = () => {
  return (
    <main className="grid grid-cols-1 lg:grid-cols-5 gap-4 p-8 pt-2">
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
