export function CardTitle({ name }: { name: string }) {
  return (
    <div className="absolute z-10 bg-red-500">
      <h3 className="px-4 text-sm font-bold">{name}</h3>
    </div>
  );
}
