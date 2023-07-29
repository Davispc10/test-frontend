import React, { memo } from "react";

import { XMarkIcon } from "@heroicons/react/24/outline";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  onClear?: () => void;
}

function Input({ onClear, onChange, value, ...props }: Props) {
  return (
    <div className="flex w-64 items-center gap-3 rounded-md bg-white px-3 ring-1 ring-red-500 focus-within:ring-red-500/50 hover:ring-red-500/50 ">
      <input
        {...props}
        onChange={onChange}
        value={value}
        className="w-full truncate bg-transparent py-2 font-roboto text-xs font-bold uppercase text-red-500 outline-none transition-all placeholder:text-red-500/25"
      />
      {onClear && value && (
        <button onClick={onClear} type="button">
          <XMarkIcon className="w-3 stroke-[4px] text-red-500" />
        </button>
      )}
    </div>
  );
}

export default memo(Input);
