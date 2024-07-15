export function Loading() {
  return (
    <div className="flex h-96 items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-200 border-t-transparent"></div>
      <p className="ml-2">cargando...</p>
    </div>
  )
}
