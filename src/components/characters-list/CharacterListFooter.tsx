import React from 'react';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';

import Button from '../ui/Button';

interface CharacterListFooterProps {
  nextPage: () => void;
  previousPage: () => void;
  prevDisabled?: boolean;
  nextDisabled?: boolean;
}

export default function CharacterListFooter({
  nextPage,
  previousPage,
  prevDisabled,
  nextDisabled,
}: CharacterListFooterProps) {
  return (
    <section className="flex items-center justify-center gap-x-6">
      <Button
        testid="previous-btn"
        disabled={prevDisabled}
        onClick={previousPage}
      >
        <AiOutlineArrowLeft className="text-xl" />
      </Button>
      <Button testid="next-btn" disabled={nextDisabled} onClick={nextPage}>
        <AiOutlineArrowRight className="text-xl" />
      </Button>
    </section>
  );
}