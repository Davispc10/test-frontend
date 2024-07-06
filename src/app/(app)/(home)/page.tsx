
import { Input } from '@/components/atoms/input'
import { CardList } from '@/components/molecules/card-list'

export default function HomePage() {
  return (
    <div>
      <Input className='w-full' placeholder='Search for a character' />

      <section className='mt-12'>
        <h2 className='text-3xl font-bold text-center mb-12'>Characters</h2>

        <CardList />
      </section>
    </div>
  )
}
