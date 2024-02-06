import '@testing-library/jest-dom'
import { render } from '@/lib/custom-render'
import { cleanup, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'

import { Skeleton } from './skeleton'

describe('Skeleton - Component', () => {
  afterEach(() => {
    cleanup()
  })
  it('should be able to render pagination', () => {
    render(<Skeleton className="h-3 w-3" />)
    const wrapper = screen
    const scroll = wrapper.getByTestId('skeleton')
    expect(scroll).toBeInTheDocument()
  })
})
