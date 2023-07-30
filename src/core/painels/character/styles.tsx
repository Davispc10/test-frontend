import styled from "styled-components";

export const Main = styled.main`
    display: flex;
    height: auto;
    width: 100%;
    flex-direction: column;
    justify-items: center;

    section.bio{
      display: grid;
      justify-content: center;
      margin: 8px;
      margin-top: 84px;
      height: auto;
      width: 100%;
      grid-template-areas:
      "name"
      "modified"
      "image";
      grid-template-rows: auto auto 290px;
      grid-template-columns: 1fr;
      column-gap: 16px;
      color:white;
    }

    @media (max-width: 460px) {
      section.bio{
        grid-template-rows: auto auto 200px;
      }
    }

    section {
      width: 100%;
    } 

    section.bio .image {
      grid-area: image;
      display: flex;
      height: 100%;
      position: relative;
    }

    section.bio .image img{
      position: absolute;
      height: 100%;
      width: 100%;
      object-fit: contain;
      object-position: left top;
    }
    
    section.bio .name {
      grid-area: name;
      display: flex;
      align-items: flex-start;
      margin: 0;
    }
    
    section.bio .name h1{
      margin: 0;
    }

    section.bio .description {
      grid-area: description;
      margin: 0;
    }
    
    section.bio .modified {
      grid-area: modified;
      display: flex;
      align-items: center;
      margin: 0;
    }

    section .head {
      display: flex;
      flex-direction: row;
      justify-content: left ;
    }

    section .head h2 {
      display: flex;
      margin-top: 16px;
      height: 50px;
      align-items: self-end;
    }

    section .head div{
      height: 0px;
    }

    section h2 {
      color:white;
    }

    section.series .head div,
    section.series .head h2 {
      width: 230px;
      margin: 8px;
    }

    section.comics .head div,
    section.comics .head h2 {
      width: 230px;
      margin: 8px;
    }

    section.events .head div,
    section.events .head h2 {
      width: 230px;
      margin: 8px;
    }

    section.stories .head div,
    section.stories .head h2 {
      width: 230px;
      margin: 8px;
    }

    .bio {
      grid-area: bio;
    }
    .comics {
      grid-area: comics;
    }
    .series {
      grid-area: series;
    }
    .stories {
      grid-area: stories;
    }
    .events {
      grid-area: events;
    }

`;