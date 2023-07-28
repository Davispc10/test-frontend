"use client";

import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";

export const AtomsGoBack: React.FC = (): JSX.Element => {
  const navigate = useRouter();
  return (
    <button
      onClick={() => navigate.back()}
      className="p-2 text-white duration-200 bg-red-600 rounded-full hover:bg-red-500"
      title="Go back"
    >
      <IoIosArrowBack size={28} />
    </button>
  );
};
