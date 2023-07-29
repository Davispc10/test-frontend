import { Button } from "./ui/button";

interface PaginationItemProps {
  isCurrent?: boolean;
  number: number;
  onPageChange: (page: number) => void;
}

export function PaginationItem({
  isCurrent = false,
  number,
  onPageChange,
}: PaginationItemProps) {
  if (isCurrent) {
    return (
      <Button disabled className="w-4">
        {number}
      </Button>
    );
  }

  return (
    <Button onClick={() => onPageChange(number)} className="w-4">
      {number}
    </Button>
  );
}
