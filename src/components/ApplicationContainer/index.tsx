"use client";
import { NextPage } from "next";
import { ReactNode, useEffect, useState } from "react";
import { Provider } from "react-redux";
import store from "@/redux/store";

// import styles from "./styles.module.css";
// import HooksGrouper from "@/src/hooks/HooksGrouper";
// import ToastContainer from "../ToastContainer";
// import Loading from "../Loading";
// import { PrivateRoute } from "../PrivateRoute";
// import { usePathname } from "next/navigation";
// import { checkIsPublicRoute } from "@/src/functions/check-is-public-route";

interface Props {
  children: ReactNode;
}

const ApplicationContainer: NextPage<Props> = ({ children }) => {
  // const pathname = usePathname();

  // const [isPublicPage, setIsPublicPage] = useState<boolean>(false);

  // useEffect(() => {
  //   setIsPublicPage(checkIsPublicRoute(pathname));
  // }, [pathname]);

  return (
    <Provider store={store}>
      {/* <HooksGrouper>
      <ToastContainer />
      <Loading />
      {isPublicPage && children}
      {!isPublicPage && (
        <PrivateRoute>
      <div className={`w-screen h-screen ${styles.container}`}>
        <LateralMenu /> */}
      {children}
      {/* </div>
        </PrivateRoute>
      )}
    </HooksGrouper> */}
    </Provider>
  );
};

export default ApplicationContainer;
