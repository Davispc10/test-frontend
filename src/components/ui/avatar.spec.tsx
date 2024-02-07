import '@testing-library/jest-dom'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import { cleanup, render, screen } from '@/lib/custom-render'
import { it, describe, expect, afterEach } from 'vitest'

describe('Avatar - Component', () => {
  afterEach(() => {
    cleanup()
  })

  it('should be able render the avatar', () => {
    render(
      <Avatar>
        {/* <AvatarImage src="/default-image.jpeg" width={200} height={200} alt="avatar-img" /> */}
        <AvatarFallback>Avatar Fallback</AvatarFallback>
      </Avatar>,
    )

    const wrapper = screen
    const avatarRoot = wrapper.getByTestId('avatar-root')
    // const avatarImg = wrapper.getByTestId('avatar-img')
    const avatarFallback = wrapper.getByText(/avatar fallback/i)
    expect(avatarRoot).toBeInTheDocument()
    // expect(avatarImg).toBeInTheDocument()
    expect(avatarFallback).toBeInTheDocument()
  })
})
