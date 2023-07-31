/* eslint-disable no-restricted-imports */
import { act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

const { click } = userEvent

export const clickWithAct = (element: HTMLElement) => act(() => click(element))

export const wrappedWithAct = <T>(fn: () => T) => {
  return act(() => fn())
}

export const press = {
  Enter: () => userEvent.keyboard('[Enter]'),
  Space: () => userEvent.keyboard('[Space]'),
  Tab: () => userEvent.tab(),
  Esc: () => userEvent.keyboard('[Escape]'),
}

export const type = userEvent.keyboard
export const typeOnElement = userEvent.type

export const pasteOnElement = (
  element: HTMLElement,
  text: string,
  options?: Parameters<typeof userEvent.paste>[1],
) => {
  element.focus()

  return userEvent.paste(text, options)
}

export { click, userEvent }
