import Link from 'next/link'

export function Error() {
  return (
    <div className="flex items-center justify-center flex-col mt-8 flex-1 ">
      <p>Not Found Personage</p>
      <Link
        href={'/'}
        className="py-2 px-8 bg-red-400 rounded text-white mt-4 hover:bg-red-600"
      >
        Back page home
      </Link>
    </div>
  )
}
