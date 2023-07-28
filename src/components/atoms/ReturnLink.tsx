import Link from "next/link";

interface ReturnLinkProps {
  path: string
}

export default function ReturnLink({ path }: ReturnLinkProps) {
  return (
    <Link href={path}>&larr; Voltar</Link>
  )
}
