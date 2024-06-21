import { render } from '@testing-library/react'
import { Button } from '.'

describe('<Button>', () => {
  it('should render button', () => {
    const { getByText, getByRole } = render(<Button>Text button</Button>)

    const buttonElement = getByRole('button')
    const buttonTextElement = getByText('Text button')

    expect(buttonElement).toBeInTheDocument()
    expect(buttonTextElement).toBeInTheDocument()
  })

  it('should contain the class bg-primary-400/50 in button not active', () => {
    const { getByRole } = render(<Button notActive>Text button</Button>)

    const buttonElement = getByRole('button')

    expect(buttonElement).toHaveClass('bg-primary-400/50')
  })

  it('should contain the class passed in the button', () => {
    const classPassed = 'bg-red-400'

    const { getByRole } = render(
      <Button className={`${classPassed}`}>Text button</Button>,
    )

    const buttonElement = getByRole('button')

    expect(buttonElement).toHaveClass(classPassed)
  })
})
