import React from "react";
import { ComicCover } from "../atoms/ComicCover";

interface ComicListProps {
  thumbnail: string,
  id: number,
}

export const ComicList = ({...props}: ComicListProps) => {
  return (
    <a href={`${props.thumbnail}.jpg`} key={props.id} target='blank'>
      <ComicCover cover={props.thumbnail} />
    </a>
  )
}