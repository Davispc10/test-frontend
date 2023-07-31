import React from "react";
import { Oval } from "react-loader-spinner";

import { useLoading } from "@/hooks/useLoading";

const Loading = () => {
  const { loading } = useLoading();

  return (
    <Oval
      height={80}
      width={80}
      color={"#F07502"}
      wrapperStyle={{
        width: "100vw",
        height: "100vh",
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
      wrapperClass="spinner"
      visible={loading}
      ariaLabel="oval-loading"
      secondaryColor={"#F07502"}
      strokeWidth={2}
      strokeWidthSecondary={2}
    />
  );
};

export default Loading;
