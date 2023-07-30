'use client'

import { type MouseEvent, useCallback } from 'react'

import { useMotionValue, useMotionTemplate, motion } from 'framer-motion'
import Image from 'next/image'
import { usePalette } from 'react-palette'

import { cn } from '@/utils'

const ROTATION_FACTOR = 30

type CharacterThumbnailProps = {
  thumbnail: string
  name?: string
}

export const CharacterThumbnail = ({
  thumbnail,
  name,
}: CharacterThumbnailProps) => {
  const palette = usePalette(thumbnail)

  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)

  const onMouseMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      const card = e.currentTarget
      const box = card.getBoundingClientRect()
      const x = e.clientX - box.left
      const y = e.clientY - box.top
      const centerX = box.width / 2
      const centerY = box.height / 2

      rotateX.set((y - centerY) / ROTATION_FACTOR)
      rotateY.set((centerX - x) / ROTATION_FACTOR)
    },
    [rotateX, rotateY],
  )

  const onMouseLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <motion.figure
      className="relative h-[540px] w-full transition-[all_400ms_cubic-bezier(0.03,0.98,0.52,0.99)_0s] will-change-transform sm:w-[400px] md:w-[440px]"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        transform: useMotionTemplate`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1, 1, 1)`,
        transition: 'all 400ms cubic-bezier(0.03, 0.98, 0.52, 0.99) 0s',
      }}
    >
      <div
        className={cn(
          'pulse absolute -inset-2 rounded-lg bg-gradient-to-r from-[var(--gradient-from)] to-[var(--gradient-to)] opacity-50 blur-xl',
        )}
        style={
          {
            '--gradient-from': palette.data.vibrant ?? 'hsl(var(--secondary))',
            '--gradient-to': palette.data.darkMuted ?? 'hsl(var(--secondary))',
          } as Record<string, string>
        }
      />

      <Image
        src={thumbnail}
        className="block h-full w-full rounded-sm object-cover object-center"
        alt={name ?? 'Character'}
        fill
      />
    </motion.figure>
  )
}
