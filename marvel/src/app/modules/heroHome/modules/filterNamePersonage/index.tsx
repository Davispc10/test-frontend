import { iconsApp } from '@/assets/imgs/icons'
import { PersonageContext } from '@/contexts/personageContext'
import { useContext } from 'react'

export function FilterNamePersonage() {
  const { nameValue, setNameValue, handleSubmitSearchNamePersonage } =
    useContext(PersonageContext)

  return (
    <form
      className="w-full max-w-screen-sm"
      onSubmit={handleSubmitSearchNamePersonage}
    >
      <label className="rounded overflow-hidden flex items-center">
        <input
          className="p-2  w-full"
          placeholder="Search by personage name"
          value={nameValue}
          onChange={(e) => setNameValue(e.target.value)}
        />
        <button
          type="submit"
          className="bg-red-600 text-[20px] p-[10px] text-white hover:bg-red-400 cursor-pointer"
        >
          {iconsApp.search}
        </button>
      </label>
    </form>
  )
}
