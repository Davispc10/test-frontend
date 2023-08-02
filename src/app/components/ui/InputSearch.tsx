import { Transition } from '@headlessui/react';
import debounce from 'lodash.debounce';
import { useEffect, useState } from 'react';

interface InputSearchProps {
  value: string;
  onChange: (value: string) => void;
  setValue: (value: string) => void;
  items: string[];
  setItems?: (items: string[]) => void;
}

export default function InputSearch({
  value,
  onChange,
  items,
  setValue,
  setItems,
}: InputSearchProps) {
  const [inputValue, setInputValue] = useState(value);

  const debouncedOnChange = debounce(onChange, 500);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
  };

  useEffect(() => {
    debouncedOnChange(inputValue);
    return () => debouncedOnChange.cancel();
  }, [inputValue, debouncedOnChange]);

  return (
    <div className="relative z-50 w-full max-w-[360px]">
      <input
        data-testid="input-search"
        type="text"
        placeholder="Find a character"
        className="w-full p-2 text-black focus:outline-none"
        onChange={handleInputChange}
        value={inputValue}
      />
      <Transition
        show={value !== ''}
        enter="transition-transform duration-75"
        enterFrom="scale-0"
        enterTo="scale-100"
        leave="transition-transform duration-150"
        leaveFrom="scale-100"
        leaveTo="scale-0"
      >
        <div className="absolute z-50 mt-2 h-auto max-h-[300px] w-full overflow-y-scroll bg-white p-3 text-black shadow-2xl">
          {items?.length > 0 ? (
            items?.map((item) => (
              <div
                data-testid="input-search-suggestion-box"
                key={item}
                className="cursor-pointer py-2 transition-all ease-in-out hover:bg-gray-600 hover:text-white"
                onClick={() => {
                  setValue(item);
                  setItems?.([]);
                  setInputValue(item);
                }}
              >
                {item}
              </div>
            ))
          ) : (
            <div className="text-center">No results</div>
          )}
        </div>
      </Transition>
    </div>
  );
}
