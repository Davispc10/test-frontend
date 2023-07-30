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
  &:active > figcaption p,
  &:hover > figcaption hr,
  &:active > figcaption hr
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
    background-color: #000;
  }
  
  figure img{
    object-fit: cover;
    width: 100%;
    height: 100%;
  }

  figcaption {
    position: absolute;
    display: flex;
    flex-direction: column;
    background-color: #000000bd;
    height: 0px;
    width: 230px;
    margin-top: 350px;
    color: #fff;
    z-index: 300;
    align-items: center;
    transition: all .1s;
  }

  figcaption p,
  figcaption hr {
    opacity: 0;
    margin-top: 8px;
    margin-bottom: 8px;
  }

  figcaption p {
    padding: 8px;
    font-size: 14px;
    text-align: center;
  }

  figcaption hr {
    width: 50%;
    background-color: #4d4d4d;
    border-color: #949494;
    margin: 0;
    border-style: dashed;
  }

  figcaption p.description{
    display: -webkit-box;
    -webkit-line-clamp: 13; 
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: justify;
    -webkit-box-pack: justify;
    height: 227px;
  }

  &:not(:hover) ~ figcaption p,
  &:not(:active) ~ figcaption p,
  &:not(:hover) ~ figcaption hr,
  &:not(:active) ~ figcaption hr
  {
    transition-delay: 0s;
  }
`;


