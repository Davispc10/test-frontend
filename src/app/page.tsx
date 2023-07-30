import CharacterList from '@/components/characters-list/CharacterList';
import { Suspense } from 'react';

export default function Home() {
  return (
    <Suspense
      fallback={
        <p style={{ textAlign: 'center' }}>loading... on initial request</p>
      }
    >
      <CharacterList />
    </Suspense>
  );
}
