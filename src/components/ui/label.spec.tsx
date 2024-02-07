import '@testing-library/jest-dom'
import { render } from '@/lib/custom-render'
import { cleanup, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'

import { Label } from './label'

describe('Label - Component', () => {
  afterEach(() => {
    cleanup()
  })
  it('should be able to render label', () => {
    render(<Label>Test</Label>)
    const wrapper = screen
    const label = wrapper.getByText(/test/i)
    expect(label).toBeInTheDocument()
  })
})
