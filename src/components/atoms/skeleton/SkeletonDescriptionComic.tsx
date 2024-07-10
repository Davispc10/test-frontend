const SkeletonDescriptionComic = () => {
  return Array.from({ length: 5 }).map((_, i) => (
    <p
      key={i}
      className="bg-slate-400 w-8/12 h-4 my-4 rounded-full animate-pulse"
    ></p>
  ));
};

export default SkeletonDescriptionComic;
