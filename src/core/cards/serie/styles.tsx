"use client";

import styled from "styled-components";

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 230px;
  height: 350px;
  text-decoration: none;
  margin: 8px;
  transition: all .3s;
  position: relative;

  &:hover, &:active {
    z-index: 400;
  }

  &:hover > figcaption, 
  &:active > figcaption 
  {
    height: 350px;
    margin-top: 0px;
  }

  &:hover > figcaption p,
  &:active > figcaption p
  {
    opacity: 1;
    transition-delay: .2s;
    transition: all .6s;
  }
  
  figure {
    display: flex;
    height: 100%;
    position: relative;
    margin: 0px;
    padding: 4px;
    align-items: flex-start;
    background-color: var(--black-bg);
  }
  
  figure img {
    display: flex;
    align-self: flex-start;
    object-fit: contain;
    object-position: left top;
    height: 100%;
    width: 100%;
  }


  figcaption {
    position: absolute;
    display: flex;
    background-color: #000000bd;
    height: 0px;
    width: 230px;
    margin-top: 350px;
    color: #fff;
    z-index: 300;
    padding-left: 8px;
    align-items: center;
    transition: all .1s;
  }

  figcaption p {
    opacity: 0;
  }

  &:not(:hover) ~ figcaption p,
  &:not(:active) ~ figcaption p
  {
    transition-delay: 0s;
  }
`;


