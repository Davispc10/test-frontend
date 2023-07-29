import React, { cloneElement, memo } from "react";

import Spinner from "@/components/atoms/Spinner";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactElement;
  loading?: boolean;
}

function Button({ children, icon, loading, ...props }: Props) {
  return (
    <button
      {...props}
      className={`flex items-center justify-center gap-2 ${
        icon && !children ? "aspect-square w-8" : "w-fit px-3"
      } h-8 rounded-md bg-red-500 ring-1 ring-red-500/25 transition-colors hover:bg-red-700 hover:ring-red-500/50 focus:ring-2 focus:ring-red-500/75 disabled:opacity-50`}
    >
      {icon &&
        !loading &&
        cloneElement(icon, {
          className: `${icon.props.className} w-3 stroke-[3px] text-white`,
        })}
      {loading && (
        <span className="w-3">
          <Spinner primary="fill-white" background="text-white/25" />
        </span>
      )}
      {children && (
        <span className="whitespace-nowrap font-roboto text-xs font-bold text-white">
          {children}
        </span>
      )}
    </button>
  );
}

export default memo(Button);
