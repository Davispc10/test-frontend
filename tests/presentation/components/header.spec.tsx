import React from "react";
import { render } from "@testing-library/react";
import { Header } from "@/presentation/components";


const makeSut = () => {
  const sut = render(<Header />);
  return { sut };
};

describe("Header Component", () => {
  test("Should render", () => {
    const { sut } = makeSut();
    expect(sut).toBeDefined();
  });
});
