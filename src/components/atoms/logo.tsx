import Link from "next/link";

interface propsAtomSpanEffect_I {
  value: string;
}
const AtomSpanEffect: React.FC<propsAtomSpanEffect_I> = ({
  value,
}: propsAtomSpanEffect_I): JSX.Element[] =>
  value.split("").map((vl) => (
    <span
      key={vl}
      style={{ padding: 0.6 }}
      className="block duration-200 hover:text-blue-600 hover:-translate-y-2"
    >
      {vl}
    </span>
  ));

export const AtomLogo: React.FC = (): JSX.Element => {
  return (
    <Link
      href={"/"}
      className="flex items-center text-lg font-semibold text-red-500 select-none gap-x-2"
    >
      <span className="text-2xl">🦸‍♂️</span>{" "}
      <h1 className="hidden  sm:flex">
        <AtomSpanEffect value="The Marvel Heroes" />
      </h1>
    </Link>
  );
};
