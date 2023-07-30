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
      <button className="rounded-sm bg-red-900 px-3 py-1 font-bold" disabled>
        {pageNumber}
      </button>
    )

  return (
    <button
      className="rounded-sm bg-gray-800 px-3 py-1 hover:bg-red-950"
      onClick={() => selectPage(pageNumber)}
    >
      {pageNumber}
    </button>
  )
}
