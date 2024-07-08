import { CardList } from '@/components/molecules/card-list';
import { InputFilter } from '@/components/molecules/input-filter';

export default function HomePage() {
  return (
    <section className="mt-6 flex flex-col gap-8">
      <InputFilter />
      <CardList />
    </section>
  );
}
