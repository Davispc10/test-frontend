import '@testing-library/jest-dom'
import { render } from '@/lib/custom-render'
import { cleanup, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'

import { Input } from './input'

describe('Input - Component', () => {
  afterEach(() => {
    cleanup()
  })
  it('should be able to render input', () => {
    render(<Input placeholder="input-test" />)
    const wrapper = screen
    const input = wrapper.getByPlaceholderText('input-test')
    expect(input).toBeInTheDocument()
  })
})
