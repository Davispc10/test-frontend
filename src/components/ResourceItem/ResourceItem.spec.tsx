import { render, screen } from "@testing-library/react";

import { ResourceItem } from ".";

describe("[Component]: ResourceItem", () => {
  it("should render correctly", () => {
    const item = {
      id: 1,
      title: "Test Title",
      description: "Test",
      thumbnail: {
        path: "http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784",
        extension: "jpg",
      },
      urls: [
        {
          type: "detail",
          url: "http://marvel.com/comics/issue/22506/avengers_the_initiative_2007_19?utm_campaign=apiRef&utm_source=0db1e239793a247dfcde5a1910332e7c",
        },
      ],
    };

    render(<ResourceItem item={item} />);

    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "http://marvel.com/comics/issue/22506/avengers_the_initiative_2007_19?utm_campaign=apiRef&utm_source=0db1e239793a247dfcde5a1910332e7c"
    );
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByAltText("Test Title")).toBeInTheDocument();
  });
});
