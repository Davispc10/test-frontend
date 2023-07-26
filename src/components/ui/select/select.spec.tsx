import React, { useState } from 'react'

import { describe, expect, it } from 'vitest'

import { render, screen } from '@/test/test-utils'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './select'

const people = [
  {
    id: '1',
    name: 'Wade Cooper',
    username: '@wadecooper',
    avatar:
      'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: '2',
    name: 'Arlene Mccoy',
    username: '@arlenemccoy',
    avatar:
      'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
] as const

const WrapperWithState = ({ amountToRender = 10 }) => {
  const [selectedId, setSelectedId] = useState<string>(people[0].id)

  return (
    <div className="max-w-sm">
      <Select value={selectedId} onValueChange={setSelectedId}>
        <SelectTrigger name="assignedTo">
          <SelectValue placeholder="Select a person" />
        </SelectTrigger>

        <SelectContent>
          {people.slice(0, amountToRender).map((person) => (
            <SelectItem key={person.id} value={person.id}>
              {person.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

describe('<Select />', () => {
  it('renders selected option', () => {
    render(<WrapperWithState amountToRender={2} />)

    expect(screen.getByText(people[0].name)).toBeInTheDocument()
    expect(screen.queryByText(people[1].name)).not.toBeInTheDocument()
  })
})
