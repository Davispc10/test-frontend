import { render } from '@testing-library/react'
import { ListSkeleton } from '.'

describe('<ListSkeleton>', () => {
  it('should render skeleton list childrens', () => {
    const { getAllByText } = render(<ListSkeleton />)

    const loadingTextElements = getAllByText('loading...')
    expect(loadingTextElements.length).toBe(8)
  })
})
