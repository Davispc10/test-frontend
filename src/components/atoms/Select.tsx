import { memo, useEffect, useRef, useState } from "react";

import useOnClickOutside from "@/hooks/useOnClickOutside";

import { CheckIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

interface Props {
  select: any;
  label?: string;
  options: {
    label: string;
    value: any;
  }[];
  setSelect: (value: any) => void;
}

function Select({ select, label, options, setSelect }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef<HTMLButtonElement>(null);

  const handleSelect = (item: string) => {
    if (label && select.includes(item)) {
      setSelect(select.replace(item, ""));
      return;
    }
    setSelect(item);
  };

  useOnClickOutside(dropdownRef, () => setIsOpen(false));

  return (
    <button
      ref={dropdownRef}
      onClick={() => setIsOpen(!isOpen)}
      className="group relative z-10 flex w-fit cursor-pointer items-center gap-2 whitespace-nowrap rounded-md bg-white px-3 ring-1 ring-red-500 transition-all hover:ring-red-500/75"
    >
      <span className="py-1 font-roboto text-xs font-bold uppercase text-red-500 transition-colors group-hover:text-red-500/75">
        {options.find((option) => option.value === select)?.label ?? label}
      </span>
      <ChevronDownIcon
        className={`w-3 stroke-[4px] text-red-500 transition-colors group-hover:text-red-500/75 ${
          isOpen ? "rotate-180" : ""
        }`}
      />
      {isOpen && (
        <ul className="absolute inset-0 top-[calc(100%+8px)] h-fit w-fit rounded-md bg-white p-1 shadow-md ring-1 ring-red-500 group-hover:ring-red-500/75">
          {options.map((option) => (
            <li
              key={option.value}
              className="whitespace-nowrap rounded bg-transparent hover:bg-[#cccccc]/10"
            >
              <button
                onClick={() => handleSelect(option.value)}
                className="group/item flex w-full items-center gap-2 px-2 py-1"
              >
                <span
                  className={`font-roboto text-xs font-bold uppercase ${
                    select === option.value ? "text-red-500/75" : "text-red-500"
                  } transition-colors group-hover/item:text-red-500/75`}
                >
                  {option.label}
                </span>
                {select === option.value && (
                  <CheckIcon
                    className={`w-3 stroke-[4px] ${
                      select === option.value
                        ? "text-red-500/75"
                        : "text-red-500"
                    } transition-colors group-hover/item:text-red-500/75`}
                  />
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </button>
  );
}

export default memo(Select);
