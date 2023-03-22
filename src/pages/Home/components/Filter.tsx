import Pagination from '@/pages/Home/components/Pagination';
import Search from '@/pages/Home/components/Search';

const Filter = () => {
  return (
    <div className="flex lg:flex-row flex-col lg:justify-between gap-2 items-center justify-center p-4 mx-20">
      <Pagination />

      {/* Search */}
      <Search />
    </div>
  );
};

export default Filter;
