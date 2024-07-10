import React from "react";

const ComicTitle = ({ title }: { title: string }) => {
  return <h3 className="text-wrap font-semibold text-center">{title}</h3>;
};

export default ComicTitle;
