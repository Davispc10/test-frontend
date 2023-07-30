import React from "react";
import { tv } from "tailwind-variants";

interface GalleryProps<T> {
  className?: string;
  items: T[];
  render: (item: T, i: number) => React.ReactNode;
}

const container = tv({
  base: "grid gap-4 grid-cols-4 max-md:grid-cols-2 max-sm:grid-cols-1 justify-items-center",
});

<div className=""></div>

export default function Gallery<ItemT>({
  className,
  items,
  render,
}: GalleryProps<ItemT>) {

  items.find

  return (
    <div className={container({ className })}>
      {items.map((item, i) => render(item, i))}
    </div>
  );
}


