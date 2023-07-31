'use client'

import { useTransition } from 'react'

import { useRouter } from 'next/navigation'

import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'

import { Spinner } from './ui/spinner'

type GoBackProps = {
  className?: string
}

export const GoBack = ({ className }: GoBackProps) => {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const hasPreviousPage =
    typeof window !== 'undefined' && window.history.length > 1

  const handleOnClick = () => {
    startTransition(() => {
      hasPreviousPage ? router.back() : router.push('/')
    })
  }

  return (
    <Button
      variant="ghost"
      onClick={handleOnClick}
      className={className}
      disabled={isPending}
    >
      {isPending ? (
        <Spinner className="mr-2 h-4 w-4" />
      ) : (
        <Icons.ArrowLeft className="mr-2 h-4 w-4" />
      )}
      Go Back
    </Button>
  )
}
