import { ReactNode, ElementType, HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLHeadingElement> {
  as: ElementType;
  children: ReactNode;
}

export const Heading = ({ as: HeadingTag, children, ...rest }: Props) => {
  return <HeadingTag {...rest}>{children}</HeadingTag>;
};