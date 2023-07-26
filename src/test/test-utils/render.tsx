import React from 'react'

// eslint-disable-next-line no-restricted-imports
import { render } from '@testing-library/react'

import { createQueryProviderWrapper } from './create-query-provider-wrapper'

export const customRender = (
  ui: React.ReactElement,
  options: Parameters<typeof render>[1] = {},
) => {
  const { QueryProviderWrapper } = createQueryProviderWrapper()

  return render(ui, {
    wrapper: ({ children }) => (
      <QueryProviderWrapper>{children}</QueryProviderWrapper>
    ),
    ...options,
  })
}

export const mockComponentWithChildren = ({
  children,
}: {
  children: React.ReactNode
}) => <div>{children}</div>
