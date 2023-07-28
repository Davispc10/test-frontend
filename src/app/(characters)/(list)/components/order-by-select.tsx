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

import { DEFAULT_ORDER_BY, ORDER_BY_SEARCH_PARAM } from '../../constants'
import { type OrderBy } from '../../schemas'

type Option = {
  value: OrderBy
  label: string
}

const options = [
  { value: 'name', label: 'Name (A-Z)' },
  { value: '-name', label: 'Name (Z-A)' },
  { value: 'modified', label: 'Modified date (Oldest)' },
  { value: '-modified', label: 'Modified date (Newest)' },
] satisfies Array<Option>

export const OrderBySelect = () => {
  const searchParams = useSearchParams()
  const setQueryStringState = useSetQueryStringState()

  const orderBy = (searchParams.get(ORDER_BY_SEARCH_PARAM) ??
    DEFAULT_ORDER_BY) as OrderBy

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
          <SelectValue placeholder="Order by" />
        </SelectTrigger>

        <SelectContent align="end">
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
