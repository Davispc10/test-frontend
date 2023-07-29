import React from "react";

import ReferencesList, { Props as ReferencesListProps } from "./ReferencesList";

import { render } from "@testing-library/react";

describe("ReferencesList", () => {
  it("should render", () => {
    const props: ReferencesListProps = {
      references: [
        {
          thumbnail: {
            extension: "reference-thumbnail-extension",
            path: "reference-thumbnail-path",
          },
          title: "reference-title",
        } as any,
      ],
    };

    const rendered = render(<ReferencesList {...props} />);

    props.references.forEach((reference) => {
      expect(rendered.getByTitle(reference.title)).toBeTruthy();
    });
  });
});
