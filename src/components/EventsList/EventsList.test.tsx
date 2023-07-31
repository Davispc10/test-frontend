import React from "react";
import { render, screen } from "@testing-library/react";
import EventsList from ".";
import { hero } from "@/mocks/heroes-mock";
import { Event } from "@/types/events";

describe("EventsList", () => {
  const events = [
    {
      id: 1,
      title: "Mock Event",
      description: "Mock event description",
      resourceURI: "http://random.com/event/1",
      urls: [
        { type: "detail", url: "http://random.com/event/1/detail" },
        { type: "wiki", url: "http://random.com/event/1/wiki" },
      ],
      modified: "2023-07-30T12:00:00Z",
      start: "2023-08-01T00:00:00Z",
      end: "2023-08-02T00:00:00Z",
      thumbnail: {
        path: "http://random.com/images/event/1",
        extension: "jpg",
      },
    },
  ];
  it("should render events list correctly", () => {
    render(<EventsList events={events as Event[]} />);

    const eventImages = screen.getAllByRole("img");
    expect(eventImages).toHaveLength(events.length);

    eventImages.forEach((img, index) => {
      const event = events[index];
      expect(img).toHaveAttribute("src");
      expect(img).toHaveAttribute("alt", event.title);
    });
  });
});
