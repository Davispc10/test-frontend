import { render } from '@testing-library/react'
import { Grid } from '.'

describe('<Grid>', () => {
  it('should render list childrens', () => {
    const { getAllByRole } = render(
      <Grid>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
      </Grid>,
    )

    const listItems = getAllByRole('listitem')
    expect(listItems.length).toBe(3)
    expect(listItems[0]).toHaveTextContent('Item 1')
    expect(listItems[1]).toHaveTextContent('Item 2')
    expect(listItems[2]).toHaveTextContent('Item 3')
  })
})
