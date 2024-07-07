import { CardList } from '@/components/molecules/card-list';
import { InputFilter } from '@/components/molecules/input-filter';

export default function HomePage() {
  return (
    <div>
      <section className="mt-12 flex flex-col gap-8">
        <h2 className="mb-12 text-center text-3xl font-bold">Characters</h2>
        <InputFilter />
        <CardList />
      </section>
    </div>
  );
}
