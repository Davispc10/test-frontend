export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1 flex-col p-8">{children}</div>
    </div>
  )
}
