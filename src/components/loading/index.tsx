import React from "react";
import styled from "styled-components";

export const LoadingStyled = styled.div`
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid gray;
  border-bottom: 16px solid gray;
  width: 120px;
  height: 120px;
  -webkit-animation: spin 2s linear infinite;
  animation: spin 2s linear infinite;

  @-webkit-keyframes spin {
    0% {
      -webkit-transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default function Loading() {
  return (
    <div style={{height:'440px', display: 'flex', justifyContent:'center', alignItems:'center'}}>
      <LoadingStyled />
    </div>
  );
}
