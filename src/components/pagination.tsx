import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  page: number;
  arrayPages: Array<any>;
}

export function Pagination({ page, arrayPages }: PaginationProps) {
  return (
    <div className="absolute flex gap-2 items-center bottom-8">
      <a
        href={page !== 1 ? `./${page - 1}` : "./1"}
        className="border border-zinc-300 rounded-lg p-1"
      >
        <ChevronLeft size={24} />
      </a>
      {arrayPages?.map((item, index) => (
        <a
          href={`./${index+1}`}
          className="border border-zinc-300 rounded-lg px-3 py-1 text-center"
        >
          {index+1}
        </a>
      ))}
      
      <a
        href={page !== arrayPages?.length ? `./${page + 1}` : "./4"}
        className="border border-zinc-300 rounded-lg p-1"
      >
        <ChevronRight size={24} />
      </a>
    </div>
  );
}
