import React, { memo, useState } from "react";
import NextImage, { ImageProps } from "next/image";

import Spinner from "@/components/atoms/Spinner";

function Image({ height, width, ...props }: ImageProps) {
  const [loading, setLoading] = useState(true);

  const handleOnLoad = () => {
    setLoading(false);
  };

  return (
    <div
      className="relative h-full"
      style={{
        height,
        width,
      }}
    >
      {loading && (
        <span className="absolute inset-0 m-auto h-4 w-4">
          <Spinner />
        </span>
      )}
      <NextImage
        {...props}
        height={height}
        onLoad={handleOnLoad}
        style={{ display: loading ? "none" : "block" }}
        width={width}
      />
    </div>
  );
}

export default memo(Image);
