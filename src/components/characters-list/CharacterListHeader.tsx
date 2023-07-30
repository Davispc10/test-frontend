import { FaSearch } from 'react-icons/fa';

import Button from '../ui/Button';
import InputSearch from '../ui/InputSearch';

interface InputSearchProps {
  value: string;
  onChange: (value: string) => void;
  setValue: (value: string) => void;
  items: string[];
  setItems?: (items: string[]) => void;
  setName: (name: string) => void;
  search: string;
}

export default function CharacterListHeader({
  value,
  onChange,
  items,
  setValue,
  setItems,
  setName,
  search,
}: InputSearchProps) {
  return (
    <div className="flex w-full items-center justify-center max-[360px]:flex-col max-[360px]:gap-y-3">
      <InputSearch
        value={value}
        onChange={onChange}
        items={items}
        setValue={setValue}
        setItems={setItems}
      />
      <Button
        testid="confirm-search-btn"
        disabled={!search}
        onClick={() => setName(search)}
      >
        <FaSearch />
      </Button>
    </div>
  );
}
