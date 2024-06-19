import { iconsApp } from '@/assets/imgs/icons'

export function FilterNamePersonage() {
  return (
    <label className="w-full max-w-screen-sm rounded overflow-hidden flex items-center">
      <input className="p-2  w-full" placeholder="Search by personage name" />
      <span className="bg-red-600 text-[20px] p-[10px] text-white hover:bg-red-400 cursor-pointer">
        {iconsApp.search}
      </span>
    </label>
  )
}
