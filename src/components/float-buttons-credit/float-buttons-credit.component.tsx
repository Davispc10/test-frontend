import { memo } from "react";

export type FloatButtonsCreditProps = {} & React.HTMLAttributes<HTMLDivElement>;

const FloatButtonsCreditElement: React.FC<FloatButtonsCreditProps> = ({
  children,
}) => {
  return (
    <div className="absolute flex flex-row flex-grow justify-center items-center space-x-2 bottom-2 sm:bottom-6 right-2 sm:right-6 w-auto h-auto shadow rounded-lg">
      {children}
    </div>
  );
};

export const FloatButtonsCredit = memo<FloatButtonsCreditProps>(
  FloatButtonsCreditElement
);
