import type React from "react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="flex flex-1 flex-col py-16 px-8 max-w-7xl w-full">{children}</div>
    </div>
  )
}
