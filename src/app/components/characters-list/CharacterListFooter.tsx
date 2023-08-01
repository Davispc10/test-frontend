import React from 'react';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';

import Button from '../ui/Button';

interface CharacterListFooterProps {
  offset: number;
}

export default function CharacterListFooter({
  offset,
}: CharacterListFooterProps) {
  function checkIfOffsetIsActuallyANumber(offset: number) {
    const checking = Number(offset);
    if (isNaN(checking)) {
      return 0;
    }

    return checking;
  }

  return (
    <section className="mt-3 flex items-center justify-center gap-x-6">
      <Button
        testid="first-btn"
        disabled={checkIfOffsetIsActuallyANumber(offset) === 0 || !offset}
        href="/page/0"
      >
        <FaAngleDoubleLeft className="text-xl" />
      </Button>
      <Button
        testid="previous-btn"
        disabled={Number(offset) === 0 || !offset}
        href={`/page/${checkIfOffsetIsActuallyANumber(offset) - 20}`}
      >
        <AiOutlineArrowLeft className="text-xl" />
      </Button>
      <Button
        testid="next-btn"
        disabled={offset > 1550 || !offset}
        href={`/page/${checkIfOffsetIsActuallyANumber(offset) + 20}`}
      >
        <AiOutlineArrowRight className="text-xl" />
      </Button>
      <Button
        testid="first-btn"
        disabled={offset > 1550 || !offset}
        href="/page/1560"
      >
        <FaAngleDoubleRight className="text-xl" />
      </Button>
    </section>
  );
}
