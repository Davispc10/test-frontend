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
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <HooksGrouper>
          <ToastContainer />
          <Loading />
          {children}
        </HooksGrouper>
      </QueryClientProvider>
    </Provider>
  );
};

export default ApplicationContainer;
