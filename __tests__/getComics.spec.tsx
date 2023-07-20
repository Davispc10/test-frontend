import React from 'react';
import { render } from "@testing-library/react";
import { Comics } from '../src/components/Comics';
import { Comic } from '../src/utils/interfaces';
import { QueryClient, QueryClientProvider } from 'react-query';

// Mock data for testing
const comic: Comic = {
  id: 114,
  thumbnail: {
    path: "https://i.annihil.us/u/prod/marvel/i/mg/f/00/5ba3c7cd5f1e2.jpg",
  },
};

const queryClient = new QueryClient();

// Mock do roteador do Next.js
jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    query: {},
    push: jest.fn(),
    replace: jest.fn(),
  }),
}));

describe('get Comics component', () => {
  it('renders correctly', async () => {
    const component = render(
      <QueryClientProvider client={queryClient}>
        <Comics />
      </QueryClientProvider>
    );

    expect(component).toMatchSnapshot();
  });
});