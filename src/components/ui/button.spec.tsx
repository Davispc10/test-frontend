import '@testing-library/jest-dom'

import { cleanup, fireEvent, render, screen } from '@/lib/custom-render'
import { it, describe, expect, afterEach, vi } from 'vitest'

import { Button } from './button'

describe('Button - Component', () => {
  afterEach(() => {
    cleanup()
  })

  it('should be able render the button', () => {
    render(<Button>hey, click on me</Button>)
    const wrapper = screen.getByTestId('button')
    expect(wrapper).toBeInTheDocument()
  })

  it("should be able render the button with slot's tag children", () => {
    render(
      <Button asChild>
        <a href="">hey, click on me</a>
      </Button>,
    )
    const wrapper = screen.getByRole('link', { name: /hey, click on me/i })
    expect(wrapper).toBeInTheDocument()
  })

  it('should be able render based on the children prop', () => {
    render(<Button>hey, click on me</Button>)
    const wrapper = screen.getByRole('button', { name: /hey, click on me/i })
    expect(wrapper).toBeInTheDocument()
  })

  it('Should be able to fire the onClick event', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>hey, click on me</Button>)
    fireEvent.click(screen.getByRole('button', { name: /hey, click on me/i }))
    expect(handleClick).toHaveBeenCalled()
  })
})
