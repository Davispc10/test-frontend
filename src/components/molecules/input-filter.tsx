'use client'

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { Input } from "../atoms/input";
import { useDebouncedCallback } from "use-debounce";

export function InputFilter() {
  const searchParams = useSearchParams()
  const pathName = usePathname()
  const { replace } = useRouter()

  const handleNameChange = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams)
    
    if (term) {
      params.set('name', term)
    } else {
      params.delete('name')
    }

    replace(`${pathName}?${params.toString()}`)
  }, 600)

  return (
    <Input className='w-full' placeholder='Search for a character' onChange={(e) => handleNameChange(e.target.value)}
      defaultValue={searchParams.get('name')?.toString()} 
    />
  )
}