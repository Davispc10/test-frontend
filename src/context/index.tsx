import CharactersProvider from "./CharactersProvider";

interface Props {
  children: React.ReactNode;
}

function ContextProvider({ children }: Props) {
  return <CharactersProvider>{children}</CharactersProvider>;
}

export default ContextProvider;
