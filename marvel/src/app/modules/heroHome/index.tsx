import { FilterNamePersonage, TitleHero } from './modules'

export function HeroHome() {
  return (
    <div className="bg-banner-personages bg-cover bg-center h-full max-h-[400px] ">
      <div className=" bg-black/30 w-full h-full flex justify-center items-center flex-col p-2">
        <TitleHero />
        <FilterNamePersonage />
      </div>
    </div>
  )
}
