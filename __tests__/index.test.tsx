import { render, renderHook, screen, waitFor } from "@testing-library/react";
import Home, { getStaticProps } from "../src/pages";
import "@testing-library/jest-dom";
import { CharactersApiResult } from "@/types/Character";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useAllCharactersQuery from "@/hooks/querys/useAllCharactersQuery";
import { ReactNode } from "react";

type HomePropsType =
  | {
      props: {
        apiResult: CharactersApiResult;
      };
      notFound?: undefined;
    }
  | {
      notFound: boolean;
      props?: undefined;
    };

jest.mock("next/router", () => ({
  useRouter: jest.fn().mockReturnValue({
    query: {},
    push: jest.fn(),
    replace: jest.fn(),
  }),
}));
describe("Home", () => {
  let props: HomePropsType;

  it("Should get static props", async () => {
    props = await getStaticProps();

    expect(props).toHaveProperty("props");
  });

  it("Should renders homepage", async () => {
    const queryClient = new QueryClient();
    const component = render(
      <QueryClientProvider client={queryClient}>
        <Home apiResult={props.props?.apiResult!} />
      </QueryClientProvider>
    );

    const element = component.getByTestId("homepage");

    expect(element).toBeInTheDocument();
  });

  it("Should retrieve characters from react-query-hook", async () => {
    const queryClient = new QueryClient();
    const wrapper = ({ children }: { children: ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const { result } = renderHook(() => useAllCharactersQuery({}), {
      wrapper,
    });

    while (!(await waitFor(() => result.current?.isSuccess))) {}

    const characters = result.current?.data?.data?.results;

    expect(characters).not.toBeUndefined();
    expect(characters).not.toBeNull();

    expect(characters).toHaveLength(8);
  });
});
