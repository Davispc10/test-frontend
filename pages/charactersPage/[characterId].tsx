import { GetServerSideProps, NextPage } from "next";
import { ICharactersPage } from "../../src/interfaces/charactersPage";
import { getServerApi } from "../../src/services/getServerApi";
import md5 from "md5";
import * as S from "../../src/styles";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import Marvel from "../../public/marvel.png"

const publickey = "c738025db655aeb390acf14c3ca1eb12";
const privatekey = "457ed969c09a42f01c9fbb1720874afc744a4129";
const ts = new Date().getTime();
const stringToHash = ts + privatekey + publickey;
const hash = md5(stringToHash);

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: gray;
  width: 100%;
  justify-content: center;
  align-items: center;
  font-weight: 700;
`;
export const Button = styled.button`
  background-color: white;
  border: solid 1px black;
  border-radius: 20px,
  height: 15px;
  padding: 10px;
  margin-bottom: 5px;
  :hover {background-color : black;
    color: white};
`;

const imageSize = '/standard_amazing.jpg'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const serverApi = getServerApi(context);

  console.log("Params:", context.params);
  try {
    const response = await serverApi.get(
      `characters/${context.params?.characterId}?ts=${ts}&apikey=${publickey}&hash=${hash}`
    );
    console.log("response:", response);
    return {
      props: response.data,
    };
  } catch (error) {
    console.log("Catch:", error);
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
};

const CharactersPage: NextPage<ICharactersPage> = (props) => {
  console.log("Props:", props);
  return (
    <S.Container>
      <S.Header>
        <S.Title>Marvel</S.Title>
      </S.Header>

      <S.Main>
        <S.Grid>
          <Container>
            <label
              style={{
                color: "white",
                marginTop: 10,
                
              }}
            >
              Name:
            </label>

            <p style={{
                fontSize: 30,
                margin: 0
                
              }}>{props.data.results[0].name}</p>
            <div
              style={{
                marginTop: 5,
                display: "flex",
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-around",
                
              }}
            >
              <div
                style={{
                  marginTop: "5px",
                  display: "flex",
                  flexDirection: "column",
                  width: "50%",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    marginTop: "5px",
                    display: " flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    padding: 10,
                    
                  }}
                >
                  <label
                    style={{
                      color: "white",
                    }}
                  >
                    Description:
                  </label>
                  <p>
                    {props.data.results[0].description
                      ? props.data.results[0].description
                      : "Description not informed!"}
                  </p>
                  <label
                    style={{
                      color: "white",
                    }}
                  >
                    Comics:
                  </label>
                  <ul>
                    {props.data.results[0].comics.items.map((item) => 
                      <li style={{fontSize:'10px', }} key={item.name}>{item.name}</li>
                    )}
                  </ul>
                </div>
              </div>
              <div style={{width: '50%', display:'flex', justifyContent:'center'}}>
                <Image
                  src={props.data.results[0].thumbnail.path.includes('image_not_available') ? Marvel  :  props.data.results[0].thumbnail.path + imageSize}
                  width={300}
                  height={300}
                  alt="characters images"
                />
              </div>
            </div>
            <div>
              <Link href="/">
                <Button>Back Home</Button>
              </Link>
            </div>
          </Container>
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

export default CharactersPage;
