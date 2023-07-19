import React from 'react';
import { render, screen } from '@testing-library/react';
import { HeroDetails } from '../src/components/Heroes/HeroDetails';
import { HeroProps } from '../src/utils/interfaces';
import { QueryClient, QueryClientProvider } from 'react-query';

// Mock data for testing
const hero: HeroProps = {
  id: 1,
  name: 'Spider-Man (Marvel Zombies)',
  thumbnail: {
    path: 'https://example.com/spiderMan.jpg',
  },
  description: 'Zombie Spider-Man ate his own wife and aunt, the only two people left in the world who truly loved him'
};

// Mock do roteador do Next.js
jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    query: {},
    push: jest.fn(),
    replace: jest.fn(),
  }),
}));

const queryClient = new QueryClient();

describe('get HeroDetails component', () => {
  it('renders correctly', async () => {
    const component = render(
      <QueryClientProvider client={queryClient}>
        <HeroDetails {...hero} />
      </QueryClientProvider>
    );

    expect(component).toMatchSnapshot();
  });
});
