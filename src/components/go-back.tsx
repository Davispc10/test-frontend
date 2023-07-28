'use client'

import { useRouter } from 'next/navigation'

import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'

type GoBackProps = {
  className?: string
}

export const GoBack = ({ className }: GoBackProps) => {
  const router = useRouter()

  const hasPreviousPage =
    typeof window !== 'undefined' && window.history.length > 1

  return (
    <Button
      variant="ghost"
      onClick={hasPreviousPage ? router.back : () => router.push('/')}
      className={className}
    >
      <Icons.ArrowLeft className="mr-2 h-4 w-4" />
      Go Back
    </Button>
  )
}
