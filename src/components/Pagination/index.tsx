import React from "react";
import { tv } from "tailwind-variants";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";

type PaginationProps = {
  className?: string;
  size: number;
  index: number;
  onChangePage: (value: number) => void;
};

const container = tv({
  base: "flex items-center gap-4",
});

<div className="border-"></div>

const pageButton = tv({
  base: `flex items-center justify-center min-w-[2rem] px-2 h-8 rounded
    pointer select-none border text-lg font-bold transition-all
    bg-red-500 text-white hover:opacity-80 border-2
    active:shadow-[0px_0px_0px_1px_white,0px_0px_0px_6px_red]`,
  variants: {
    active: {
      true: "text-red-500 bg-white",
    },
    disabled: {
      true: "opacity-50 pointer-events-none",
    },
    white: {
      true: "text-red-500 bg-white cursor-default active:shadow-none",
    },
  },
});

// i know this component is not that good, i made it long time ago, like 1 year ago
// but it works pretty well, trust me :D
function _Pagination({
  className,
  size,
  index,
  onChangePage,
}: PaginationProps) {
  function handleNextButton() {
    if (index < size) {
      onChangePage(index + 1);
    }
  }

  function handleBackButton() {
    if (index > 0) {
      onChangePage(index - 1);
    }
  }

  if (size <= 1) {
    return null;
  }

  if (size < 6) {
    return (
      <div className={container({ className })}>
        <button
          className={pageButton({ disabled: index == 0, active: true })}
          onClick={index == 0 ? undefined : handleBackButton}
        >
          <CaretLeft />
        </button>
        {new Array(size).fill(null).map((_, i) => (
          <button
            className={pageButton({ white: index == i })}
            onClick={() => onChangePage(i)}
            key={i}
          >
            {i + 1}
          </button>
        ))}
        <button
          className={pageButton({ disabled: index == size - 1, active: true })}
          onClick={index == size - 1 ? undefined : handleNextButton}
        >
          <CaretRight />
        </button>
      </div>
    );
  }

  if (index === 0) {
    return (
      <div className={container({ className })}>
        <button className={pageButton({ disabled: true, active: true })}>
          <CaretLeft />
        </button>
        <button className={pageButton({ white: true })}>1</button>
        <button className={pageButton()} onClick={() => onChangePage(1)}>
          2
        </button>
        <button className={pageButton()} onClick={() => onChangePage(2)}>
          3
        </button>
        <button className={pageButton()}>...</button>
        <button className={pageButton()} onClick={() => onChangePage(size)}>
          {size + 1}
        </button>
        <button
          className={pageButton({ active: true })}
          onClick={handleNextButton}
        >
          <CaretRight />
        </button>
      </div>
    );
  }

  if (index < size / 2) {
    return (
      <div className={container({ className })}>
        <button
          className={pageButton({ active: true })}
          onClick={handleBackButton}
        >
          <CaretLeft />
        </button>
        <button
          className={pageButton()}
          onClick={() => onChangePage(index - 1)}
        >
          {index}
        </button>
        <button className={pageButton({ white: true })}>{index + 1}</button>
        <button
          className={pageButton()}
          onClick={() => onChangePage(index + 1)}
        >
          {index + 2}
        </button>
        <button className={pageButton()}>...</button>
        <button className={pageButton()} onClick={() => onChangePage(size)}>
          {size + 1}
        </button>
        <button
          className={pageButton({ active: true })}
          onClick={handleNextButton}
        >
          <CaretRight />
        </button>
      </div>
    );
  }

  if (index === size) {
    return (
      <div className={container({ className })}>
        <button
          className={pageButton({ active: true })}
          onClick={handleBackButton}
        >
          <CaretLeft />
        </button>
        <button className={pageButton()} onClick={() => onChangePage(0)}>
          1
        </button>
        <button className={pageButton()}>...</button>
        <button className={pageButton()} onClick={() => onChangePage(size - 2)}>
          {size - 1}
        </button>
        <button className={pageButton()} onClick={() => onChangePage(size - 1)}>
          {size}
        </button>
        <button className={pageButton({ white: true })}>{size + 1}</button>
        <button className={pageButton({ disabled: true, active: true })}>
          <CaretRight />
        </button>
      </div>
    );
  }

  if (index >= size / 2) {
    return (
      <div className={container({ className })}>
        <button
          className={pageButton({ active: true })}
          onClick={handleBackButton}
        >
          <CaretLeft />
        </button>
        <button className={pageButton()} onClick={() => onChangePage(0)}>
          1
        </button>
        <button className={pageButton()}>...</button>
        <button
          className={pageButton()}
          onClick={() => onChangePage(index - 1)}
        >
          {index}
        </button>
        <button className={pageButton({ white: true })}>{index + 1}</button>
        <button
          className={pageButton()}
          onClick={() => onChangePage(index + 1)}
        >
          {index + 2}
        </button>
        <button
          className={pageButton({ active: true })}
          onClick={handleNextButton}
        >
          <CaretRight />
        </button>
      </div>
    );
  }

  return null;
}

const Pagination = React.memo(_Pagination);
export default Pagination;
