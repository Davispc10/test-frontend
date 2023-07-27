import { ChangeEvent, ReactNode } from "react"

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

export interface InputSearchProps {
  isRequired?: boolean
  isDisabled?: boolean
  onChangeFunction?: (e: ChangeEvent<HTMLInputElement>) => void
  name?: string
  value?: string
  id?: string
  label?: string
  className?: string
  placeholder?: string
  size?: 'sm' | 'md' | 'lg'
}

export type CustomImageProps = ClassNameProps & {
  width: number
  height: number
  src: string
  alt?: string
  title?: string
}

export interface PaginationItemProps {
  value: number
  isActive: boolean
}

export interface QueryProps {
  page: number
  pageTotal: number
  limit: number
  searchName: string
  heros: HeroProps[]
}

export interface QueryStateProps {
  queryItems: QueryProps[];
}

export type ButtonProps = ClassNameProps & {
  title: string
  onClickFunction?: () => void
}