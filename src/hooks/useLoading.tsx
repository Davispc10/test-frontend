import React, { useState, useContext, createContext } from "react";

type Props = {
  children: React.ReactNode;
};

interface ILoadingContextData {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoadingContext = createContext({} as ILoadingContextData);

export const LoadingProvider = ({ children }: Props) => {
  const [loading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);

  if (!context) {
    throw new Error("useLoading precisa ser usado com um LoadingProvider");
  }

  return context;
};
