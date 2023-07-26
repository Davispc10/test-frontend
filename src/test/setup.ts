import '@testing-library/jest-dom'

import { queryClient } from '@/lib/react-query'

afterEach(() => {
  queryClient.clear()
})

window.HTMLElement.prototype.scrollIntoView = vi.fn()
