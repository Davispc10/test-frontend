import { Story } from "@/types/stories";
import Image from "next/image";
import React from "react";

type Props = {
  stories: Story[];
};

const StoriesList = ({ stories }: Props) => {
  if (!stories) {
    return null;
  }

  const renderStoryItem = (story: Story) => {
    return (
      <div
        className="w-[250px] h-[300px] bg-contain bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${story.thumbnail.path}.${story.thumbnail.extension})`,
        }}
      />
    );
  };

  return (
    <section className="flex gap-6 flex-wrap items-center justify-between">
      {stories.map((story) => renderStoryItem(story))}
    </section>
  );
};

export default StoriesList;
