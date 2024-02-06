import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'

import { Footer } from '.'

describe('Footer - Component', () => {
  afterEach(() => {
    cleanup()
  })

  it('should be able to render footer', () => {
    render(<Footer />)

    const wrapper = screen
    const footerIgIcon = wrapper.getByTestId('Instagram')
    const footerGHIcon = wrapper.getByTestId('GitHub')
    const footerLnkIcon = wrapper.getByTestId('Linkedin')

    expect(footerIgIcon).toBeInTheDocument()
    expect(footerGHIcon).toBeInTheDocument()
    expect(footerLnkIcon).toBeInTheDocument()
  })
})
