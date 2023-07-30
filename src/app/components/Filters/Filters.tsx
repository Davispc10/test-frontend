'use client'

import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { FormEvent } from 'react'

export const Filters = () => {
  const router = useRouter()

  const handleOnSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const filterText = formData.get('filterText')

    const routePath = filterText !== '' ? `/?search=${filterText}` : '/'

    router.push(routePath)
  }

  return (
    <div className="flex items-center justify-between">
      <div className="">
        <h1 className="text-3xl font-bold text-red-500">Personagens</h1>
        <p className="text-white">
          Veja todos os personagens de quadrinhos que a marvel ja criou!
        </p>
      </div>

      <form className="flex gap-3 text-white" onSubmit={handleOnSubmit}>
        <input
          name="filterText"
          type="text"
          placeholder="Filtrar por"
          className="rounded-lg border-2 border-solid border-gray-700 bg-gray-800 px-3 py-1  placeholder:text-gray-600"
        />
        <button
          type="submit"
          className="h-full cursor-pointer rounded-lg bg-red-600 p-2    transition-colors hover:bg-red-500"
        >
          <Search />
        </button>
      </form>
    </div>
  )
}
