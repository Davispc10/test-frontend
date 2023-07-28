import { SectionHeroes } from "@/components/sections/listHeroes";

interface PropsNode_I {
  searchParams: {
    pg?: string;
    s?: string;
  };
}

export default function Home(props: PropsNode_I) {
  return (
    <div>
      <section className="w-full max-w-6xl m-auto">
        <div className="flex flex-col justify-center w-full h-56 max-w-5xl m-auto">
          <h2 className="text-3xl font-semibold text-red-500">
            {props.searchParams.s
              ? `Searching for: ${props.searchParams.s}`
              : "Discovery"}
          </h2>
          <p className="text-xl font-light text-gray-600">
            Discover the list of all Marvel heroes
          </p>
        </div>

        <SectionHeroes
          search={props.searchParams.s}
          indexPage={props.searchParams.pg}
        />
      </section>
    </div>
  );
}
