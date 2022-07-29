import React, { useEffect, useState } from "react";
import { ICharacters } from "../../interfaces/characters";
import Pagination from "../pagination/pagination";
import styled from "styled-components";
import { api } from "../../services/api";
import md5 from "md5";
import Link from "next/link";
import Loading from "../loading";

export const Container = styled.div`
  background-color: gray;
  width: 100%;
`;
export const BoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  li {
    text-decoration: none;
    margin: 3px;
    padding: 6px;
    list-style: none;
    height: 30px;
    font-weight: 800;
    cursor: pointer;
    border-radius: 10px;
    :hover {
      background-color: #ffff;
    }
  }
`;

const publickey = "c738025db655aeb390acf14c3ca1eb12";
const privatekey = "457ed969c09a42f01c9fbb1720874afc744a4129";
const ts = new Date().getTime();
const stringToHash = ts + privatekey + publickey;
const hash = md5(stringToHash);
const limit = 10;

export default function Box() {
  const [data, setData] = useState<ICharacters | null>(null);
  const [offset, setOffset] = useState(0);
  console.log(offset);

  async function getCharacteres() {
    try {
      const resp = await api.get(
        `characters?ts=${ts}&apikey=${publickey}&hash=${hash}&limit=${limit}`,
        {
          params: {
            offset: offset,
          },
        }
      );
      setData(resp.data.data);
      console.log("Resp:", resp.data.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getCharacteres();
    //eslint-disable-next-line
  }, [offset]);

  return (
    <>
      {data ? (
        <Container>
          <BoxContainer>
            <ul>
              {data?.results?.map((item) => (
                <li key={item.id}>
                  <Link href={`/charactersPage/${item.id}`}>{item.name}</Link>
                </li>
              ))}
            </ul>

            {data?.results && (
              <Pagination
                limit={limit}
                total={data?.total}
                offset={offset}
                setOffset={setOffset}
              />
            )}
          </BoxContainer>
        </Container>
      ) : (
        <Container>
          <Loading />
        </Container>
      )}
    </>
  );
}
