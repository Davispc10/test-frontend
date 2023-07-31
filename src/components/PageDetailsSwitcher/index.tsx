import React from "react";

type Options = {
  id: string;
  name: string;
  isSelected: boolean;
};

type Props = {
  options: Options[];
  click: (button: string) => void;
};

const SELECTED_BTN_STYLES =
  "font-semibold text-orangePrimary border-b-4 border-orangePrimary";
const BTN_STYLES = "text-grey border-weekGrey border-b-[1px]";

const PageDetailsSwitcher = ({ options, click }: Props) => {
  return (
    <section className="w-full flex justify-between mb-12">
      {options.map((option) => {
        const buttonStyles = option.isSelected
          ? SELECTED_BTN_STYLES
          : BTN_STYLES;

        return (
          <button
            key={option.id}
            onClick={() => click(option.name)}
            className={`py-8 w-full text-lg ${buttonStyles}`}
          >
            {option.name}
          </button>
        );
      })}
    </section>
  );
};

export default PageDetailsSwitcher;
