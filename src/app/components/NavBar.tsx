import Link from "next/link";
import Marvel from '../../../public/Marvel.png'

export const NavBar = () => {
  return (
    <nav className="flex items-center justify-center mb-4 border-y border-red-500 text-3xl px-4 py-2">
      <Link href="/" className="flex flex-col items-center justify-center mb-4">
        <img
          className="w-[230px] h-[96px] mb-1" 
          src={Marvel} 
          alt="" />
        <p className="text-red-500 border-b border-white">
          THE MARVEL BOOK
        </p>
        <p className="text-xs">
          procure seus heróis favoritos
        </p>
      </Link>
    </nav>
  )
}