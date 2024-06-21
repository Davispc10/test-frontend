import { useState, useEffect } from 'react'

export function usePaginationButtons({ currentPage }: { currentPage: number }) {
  const [buttonsToShow, setButtonsToShow] = useState(10)

  const updateButtonsToShow = () => {
    const width = window.innerWidth
    if (width <= 600) {
      setButtonsToShow(6)
    } else if (width <= 1024) {
      setButtonsToShow(11)
    } else {
      setButtonsToShow(16)
    }
  }

  useEffect(() => {
    window.addEventListener('resize', updateButtonsToShow)
    updateButtonsToShow()

    return () => window.removeEventListener('resize', updateButtonsToShow)
  }, [])

  const endButton =
    currentPage <= Math.floor(buttonsToShow / 2)
      ? buttonsToShow
      : currentPage + Math.floor(buttonsToShow / 2)

  const startButton =
    currentPage <= Math.floor(buttonsToShow / 2)
      ? 1
      : currentPage - Math.floor(buttonsToShow / 2)

  return { endButton, startButton }
}
