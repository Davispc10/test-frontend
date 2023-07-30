interface PaginationItemPropsSchema {
  pageNumber: number
  isSelected?: boolean
  selectPage: (page: number) => void
}

export function PaginationItem({
  isSelected = false,
  pageNumber,
  selectPage
}: PaginationItemPropsSchema) {
  if (isSelected)
    return (
      <button
        className="rounded-md border-[1px] border-solid border-primary-400 px-2 font-bold text-primary-400"
        disabled
      >
        {pageNumber}
      </button>
    )

  return (
    <button className="px-2" onClick={() => selectPage(pageNumber)}>
      {pageNumber}
    </button>
  )
}
