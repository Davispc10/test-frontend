import React from "react";

import ReferenceCard, { Props as ReferenceCardProps } from "./ReferenceCard";

import { render } from "@testing-library/react";

describe("ReferenceCard", () => {
  it("should render", () => {
    const props: ReferenceCardProps = {
      reference: {
        thumbnail: {
          extension: "reference-thumbnail-extension",
          path: "reference-thumbnail-path",
        },
        title: "reference-title",
      } as any
    };

    const rendered = render(<ReferenceCard {...props} />);

    expect(rendered.getByTitle(props.reference.title)).toBeTruthy();
  });
});
