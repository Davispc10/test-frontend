import { ImgHTMLAttributes } from "react";
interface ThumbnailProps extends ImgHTMLAttributes<HTMLImageElement> {}

export function Thumbnail({ ...props }: ThumbnailProps) {
  return <img {...props} />;
}
