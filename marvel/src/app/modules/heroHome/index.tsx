import { Button } from '@/components/ui'
import { FilterNamePersonage, TitleHero } from './modules'
import { useContext } from 'react'
import { PersonageContext } from '@/contexts/personageContext'

export function HeroHome() {
  const { clearFilters, isActiveFilterName } = useContext(PersonageContext)

  return (
    <div className="bg-banner-personages bg-cover bg-center h-[300px] sm:h-[400px]">
      <div className=" bg-black/30 w-full h-full flex justify-center items-center flex-col p-2">
        <TitleHero />
        <FilterNamePersonage />
        {isActiveFilterName && (
          <Button className="mt-4" onClick={clearFilters}>
            Clear Filter
          </Button>
        )}
      </div>
    </div>
  )
}
