import React from 'react';
import { render } from "@testing-library/react";
import HeroesList from '../src/components/Heroes/HeroesList';
import { HeroProps } from '../src/utils/interfaces';

// Mock data for testing
const hero: HeroProps = {
  id: 12342,
  name: 'Iron Man',
  thumbnail: {
    path: 'https://example.com/ironMan.jpg',
  },
};

describe('get HeroesList component', () => {
  it('renders correctly', () => {
    const component = render(<HeroesList {...hero} />);
    expect(component).toMatchSnapshot();
  });
});