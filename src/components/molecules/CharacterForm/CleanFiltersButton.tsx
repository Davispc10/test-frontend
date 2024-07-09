import CleanFiltersText from "@/components/atoms/characterForm/CleanFiltersText";
import { FilterX } from "lucide-react";

import React from "react";

const CleanFiltersButton = () => {
  return (
    <a href={"/"} className="flex items-center gap-3 text-blue-600">
      <CleanFiltersText /> <FilterX />
    </a>
  );
};

export default CleanFiltersButton;
