import { CardList } from '@/components/molecules/card-list'
import { InputFilter } from '@/components/molecules/input-filter'

export default function HomePage() {
  return (
    <div>
      <section className='mt-12 flex flex-col gap-8'>
        <h2 className='text-3xl font-bold text-center mb-12'>Characters</h2>
        <InputFilter />
        <CardList />
      </section>
    </div>
  )
}
