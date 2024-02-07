import '@testing-library/jest-dom'
import { render } from '@/lib/custom-render'
import { cleanup, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'

import { ScrollArea } from './scroll-area'

describe('ScrollArea - Component', () => {
  afterEach(() => {
    cleanup()
  })
  it('should be able to render pagination', () => {
    render(<ScrollArea>Teste</ScrollArea>)
    const wrapper = screen
    const scroll = wrapper.getByText(/teste/i)
    expect(scroll).toBeInTheDocument()
  })
})
