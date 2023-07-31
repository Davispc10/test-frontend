import configureMockStore from "redux-mock-store";
import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import HeroCard from ".";
import { hero } from "@/mocks/heroes-mock";
import { setHero } from "@/redux/selectedHero/slice";

const mockStore = configureMockStore();

describe.only("<HeroCard />", () => {
  const initialState = {};
  const store = mockStore(initialState);

  const makeSut = () => {
    return render(
      <Provider store={store}>
        <HeroCard heroData={hero} />
      </Provider>
    );
  };

  it("should dispatch setHero action when clicked", () => {
    const store = mockStore({});
    const { getByTestId } = render(
      <Provider store={store}>
        <HeroCard heroData={hero} />
      </Provider>
    );
    const element = getByTestId("hero-card");
    fireEvent.click(element);

    const actions = store.getActions();
    expect(actions).toEqual([
      {
        type: "selectedHero/setHero",
        payload: hero,
      },
    ]);
  });

  it("should render hero name", () => {
    const { getByText } = makeSut();
    const heroNameElement = getByText(hero.name);
    expect(heroNameElement).toBeInTheDocument();
  });

  it("should render hero image", () => {
    const { getByAltText } = makeSut();
    const heroImageElement = getByAltText("Hero Thumbnail");
    expect(heroImageElement).toBeInTheDocument();
    expect(heroImageElement).toHaveAttribute("src");
  });
});
