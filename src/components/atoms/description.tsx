type DescriptionProps = {
  text?: string;
};

export function Description({ text }: DescriptionProps) {
  return <p className="text-sm italic text-neutral-400 md:text-base">{text}</p>;
}
