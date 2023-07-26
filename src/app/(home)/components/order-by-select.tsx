'use client'

import { useSearchParams, useRouter, usePathname } from 'next/navigation'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useCreateQueryString } from '@/hooks/use-create-query-string'

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
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const createQueryString = useCreateQueryString()

  const orderBy = (searchParams.get(ORDER_BY_SEARCH_PARAM) ??
    ORDER_BY_DEFAULT_VALUE) as OrderBy

  return (
    <Select
      defaultValue={orderBy}
      onValueChange={(value) => {
        router.push(
          `${pathname}?${createQueryString(ORDER_BY_SEARCH_PARAM, value)}`,
        )
      }}
    >
      <SelectTrigger className="max-w-max">
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
  )
}
