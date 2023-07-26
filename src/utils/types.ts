import { ReactNode } from "react"

interface ChildrenProps {
  children?: ReactNode
}

interface ClassNameProps {
  className?: string
}

interface ThumbnailProps {
  path: string
  extension: string
}

export interface HeroProps {
  id: number
  name: string
  description: string
  thumbnail: ThumbnailProps
}

type ChildrenWithClassName = ChildrenProps & {
  className?: string
};

export type TableItemProps = ChildrenWithClassName & {
  type: 'title' | 'data'
  title?: string
  value?: string
};

export type TableItemHeaderProps = TableItemProps;

export type TableItemDataProps = TableItemProps & ChildrenProps;

export type TableRowProps = ChildrenWithClassName;

export type TableHeaderProps = ClassNameProps & {
  items: TableItemProps[]
};

export type TableBodyProps = ClassNameProps & {
  items: HeroProps[]
};

export interface CustomImageProps {
  width: number
  height: number
  src: string
  alt?: string
  title?: string
}

export interface PaginationProps {
  page: number
  totalPages: number
}