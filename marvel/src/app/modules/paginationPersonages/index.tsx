import { Button } from '@/components/ui'

export function PaginationPersonages() {
  const pagination = [
    {
      id: 1,
    },
    {
      id: 2,
    },
    {
      id: 3,
    },
    {
      id: 4,
    },
    {
      id: 5,
    },
  ]

  return (
    <div className="flex gap-2 items-center justify-center mt-4">
      <Button>back</Button>
      {pagination.map((page) => (
        <Button className="w-10" key={page.id}>
          {page.id}
        </Button>
      ))}
      <Button>next</Button>
    </div>
  )
}
