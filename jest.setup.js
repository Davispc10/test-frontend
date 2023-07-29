import React from "react";

import _ from "lodash";

jest.mock(
  "next/image",
  () => (props) => React.createElement("img", _.omit(props, "priority"))
);

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("yet-another-react-lightbox", () => ({
  Lightbox: jest.fn(),
}));

jest.mock("yet-another-react-lightbox/plugins", () => ({
  Fullscreen: jest.fn(),
}));

import "@testing-library/jest-dom/extend-expect";
