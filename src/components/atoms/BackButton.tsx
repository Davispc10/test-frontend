import { useRouter } from "next/router";
import React, { ReactNode } from "react";

interface BackButtonWrapperProps {
  children: ReactNode,
}

export const BackButtonWrapper = ({children} : BackButtonWrapperProps) => {
  const router = useRouter();

  return (
    <button
      className="flex justify-center border-y 
      border-black items-center w-14 my-2 rounded-full
      bg-red-900 p-2 hover:bg-red-700 duration-200"
      onClick={() => router.back()}
    >
      {children}
    </button>
  )
}