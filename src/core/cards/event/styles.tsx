"use client";

import styled from "styled-components";

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 350px;
  text-decoration: none;
  margin: 8px;
  transition: all 0.3s;
  position: relative;

  &:hover,
  &:active {
    z-index: 400;
  }

  &:hover > figcaption,
  &:active > figcaption {
    height: 350px;
    margin-top: 0px;
    transition: height 0.3s; /* Adicionando transição específica para a altura */
  }

  &:hover > figcaption p,
  &:active > figcaption p {
    opacity: 1;
    transition-delay: 0.2s;
    transition: all 0.6s;
  }

  figure {
    display: flex;
    height: 100%;
    position: relative;
    margin: 0px;
    padding: 4px;
    background-color: transparent;
  }

  figure img {
    object-fit: contain;
    object-position: left top;
    width: 100%;
    height: 100%;
  }

  figcaption {
    position: absolute;
    display: flex;
    flex-direction: column;
    background-color: #000000bd;
    height: 0px;
    width: 300px;
    margin-top: 0;
    color: #fff;
    z-index: 300;
    padding-left: 8px;
    align-items: center;
    transition: all 0.1s;
  }

  figcaption p:first-child {
    margin-top: 16px;
    margin-bottom: 16px;
  }

  figcaption p {
    opacity: 0;
    margin-top: 4px;
    margin-bottom: 4px;
  }

  &:not(:hover) ~ figcaption p,
  &:not(:active) ~ figcaption p {
    transition-delay: 0s;
  }
`;



