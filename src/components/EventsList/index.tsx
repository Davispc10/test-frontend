import { Event } from "@/types/events";
import Image from "next/image";
import React from "react";

type Props = {
  events: Event[];
};

const EventsList = ({ events }: Props) => {
  if (!events) {
    return null;
  }

  const renderEventImage = (event: Event) => {
    return (
      <div
        className="w-[250px] h-[300px] bg-contain bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${event.thumbnail.path}.${event.thumbnail.extension})`,
        }}
      />
    );
  };

  return (
    <section className="flex gap-6 flex-wrap items-center justify-between">
      {events.map((event) => renderEventImage(event))}
    </section>
  );
};

export default EventsList;
