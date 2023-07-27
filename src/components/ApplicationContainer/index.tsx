"use client";
import { NextPage } from "next";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";

import store from "@/redux/store";
import ToastContainer from "../ToastContainer";
import Loading from "../Loading";
import HooksGrouper from "@/hooks";

const queryClient = new QueryClient();

interface Props {
  children: ReactNode;
}

const ApplicationContainer: NextPage<Props> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ToastContainer />
        <Loading />
        <HooksGrouper>{children}</HooksGrouper>
      </Provider>
    </QueryClientProvider>
  );
};

export default ApplicationContainer;
