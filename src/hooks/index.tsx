import React from "react";
import { LoadingProvider } from "./useLoading";

type Props = {
  children: React.ReactNode;
};

const HooksGrouper = ({ children }: Props) => {
  return <LoadingProvider>{children}</LoadingProvider>;
};

export default HooksGrouper;
