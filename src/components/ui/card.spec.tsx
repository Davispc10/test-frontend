import '@testing-library/jest-dom'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

import { cleanup, render, screen } from '@/lib/custom-render'
import { it, describe, expect, afterEach } from 'vitest'

describe('Card - Component', () => {
  afterEach(() => {
    cleanup()
  })

  it('should be able render the card', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>Card Content</CardContent>
        <CardFooter>Card Footer</CardFooter>
      </Card>,
    )
    const wrapper = screen
    const cardTitle = wrapper.getByText(/card title/i)
    const cardDescription = wrapper.getByText(/card description/i)
    const cardContent = wrapper.getByText(/card content/i)
    const cardFooter = wrapper.getByText(/card footer/i)

    expect(cardTitle).toBeInTheDocument()
    expect(cardDescription).toBeInTheDocument()
    expect(cardContent).toBeInTheDocument()
    expect(cardFooter).toBeInTheDocument()
  })
})
