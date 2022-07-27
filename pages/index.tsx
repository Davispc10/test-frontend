import type { NextPage } from "next";
import Head from "next/head";
import * as S from "../src/styles";
import Box from "../src/components/charactersBox/displayBox";

const Home: NextPage = () => {
  return (
    <S.Container>
      <Head>
        <title>Create Next App</title>
      </Head>
      <S.Header>
        <S.Title>Marvel</S.Title>
      </S.Header>

      <S.Main>
        <S.Grid>
          <Box />
        </S.Grid>
      </S.Main>

      <S.Footer>
        Powered by{" "}
        <a
          href="https://www.github.com/ericsporto"
          target="_blank"
          rel="noopener noreferrer"
        >
          @Eric Carvalho
        </a>
      </S.Footer>
    </S.Container>
  );
};

export default Home;
