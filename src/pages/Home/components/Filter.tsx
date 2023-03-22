import FadeRightAnimation from '@/components/animations/FadeRight';
import HoverScaleAnimation from '@/components/animations/HoverScale';
import Pagination from '@/pages/Home/components/Pagination';

import { MagnifyingGlass as SearchIcon } from 'phosphor-react';

const Filter = () => {
  return (
    <div className="flex lg:flex-row flex-col lg:justify-between gap-2 items-center justify-center p-4 mx-20">
      <Pagination />

      {/* Search */}
      <FadeRightAnimation
        options={{
          delay: 0.2,
        }}
        className="
        flex gap-2 items-center bg-white p-2 rounded-md
        focus-within:ring-[2px] focus-within:ring-marvel-red
      "
      >
        <input
          className="bg-transparent w-64 focus:outline-none text-marvel-red"
          type="text"
          placeholder="Search by Name"
        />
        <HoverScaleAnimation>
          <button
            className="
          bg-marvel-red text-white rounded-md p-2
          active:scale-95
        "
          >
            <SearchIcon weight="bold" />
          </button>
        </HoverScaleAnimation>
      </FadeRightAnimation>
    </div>
  );
};

export default Filter;
