import { encode } from "base-64";

export const shimmer = (
  w: number,
  h: number,
  pColor = "#F4F4F4",
  sColor = "#ECECEC"
) =>
  `data:image/svg+xml;base64,${encode(`
  <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
      <linearGradient id="g">
        <stop stop-color="${pColor}" offset="20%" />
        <stop stop-color="${sColor}" offset="50%" />
        <stop stop-color="${pColor}" offset="70%" />
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="${pColor}" />
    <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
    <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
  </svg>`)}`;
