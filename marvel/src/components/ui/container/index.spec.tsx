import { render } from '@testing-library/react'
import { Container } from '.'

describe('<Container>', () => {
  it('should render children', () => {
    const { getByText } = render(
      <Container>
        <p>text children</p>
      </Container>,
    )
    expect(getByText('text children')).toBeInTheDocument()
  })

  it('should contain the class max-w-screen-xl', () => {
    const { container } = render(
      <Container>
        <p>text children</p>
      </Container>,
    )

    expect(container.firstChild).toHaveClass('max-w-screen-xl')
  })
})
