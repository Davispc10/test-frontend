'use client'

import { useSearchParams } from 'next/navigation'

import {
  NativeSelect,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useSetQueryStringState } from '@/hooks/use-set-query-string-state'

import { ORDER_BY_DEFAULT_VALUE, ORDER_BY_SEARCH_PARAM } from '../constants'
import { type OrderBy } from '../schemas'

type Option = {
  value: OrderBy
  label: string
}

const options = [
  { value: 'name', label: 'Nome (A-Z)' },
  { value: '-name', label: 'Nome (Z-A)' },
  { value: 'modified', label: 'Data de modificação (Mais antigo)' },
  { value: '-modified', label: 'Data de modificação (Mais recente)' },
] satisfies Array<Option>

export const OrderBySelect = () => {
  const searchParams = useSearchParams()
  const setQueryStringState = useSetQueryStringState()

  const orderBy = (searchParams.get(ORDER_BY_SEARCH_PARAM) ??
    ORDER_BY_DEFAULT_VALUE) as OrderBy

  return (
    <>
      {/* It's better to use the native select on mobile devices because it's easier to use and it's more accessible. */}
      <NativeSelect
        wrapperClassName="flex sm:hidden"
        defaultValue={orderBy}
        onChange={(event) => {
          setQueryStringState({ [ORDER_BY_SEARCH_PARAM]: event.target.value })
        }}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </NativeSelect>

      <Select
        defaultValue={orderBy}
        onValueChange={(value) => {
          setQueryStringState({ [ORDER_BY_SEARCH_PARAM]: value })
        }}
      >
        <SelectTrigger className="hidden max-w-full sm:flex sm:max-w-max">
          <SelectValue placeholder="Ordenar por" />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  )
}
