"use client";

import { useEffect, useState } from 'react';
import React from 'react';
import axios from 'axios';
import md5 from 'md5';
import Card from './cards/cards';
import Loading from '@/app/loading/loading';
import Footer from '../footer/footer';

const publicKey = 'fbc4f64b3d3b579945901a02361c004e';
const privateKey = '56510ad02017aee2e74689a77269878198c8b40f';

export default function Main() {
  const [url, setUrl] = useState('https://gateway.marvel.com:443/v1/public/characters?limit=6&offset=0');
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);
  const [characters, setCharacter] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const timestamp = new Date().getTime();
  const hash = md5(timestamp + privateKey + publicKey);

  const getAllCharacter = async (url: string) => {
    await axios.get(url, {
      params: {
        ts: timestamp,
        apikey: publicKey,
        hash: hash,
      }
    }).then(result => {
      setCharacter(result.data.data.results);
      setTotal(result.data.data.total);
      setLoading(false);
      console.log(result);
    }
    ).catch(() => setLoading(true));
  }

  const buttonRight = (e) => {
    e.preventDefault();
    if (offset + 1 < total / 6) {
      setLoading(true);
      while (characters.length) characters.pop();
      setUrl('https://gateway.marvel.com:443/v1/public/characters?limit=6&offset=' + (offset + 1) * 6);
      setOffset(offset + 1);
    }
  }

  const buttonLeft = (e) => {
    e.preventDefault();
    if (offset - 1 >= 0) {
      setLoading(true);
      while (characters.length) characters.pop();
      setUrl('https://gateway.marvel.com:443/v1/public/characters?limit=6&offset=' + (offset - 1) * 6);
      setOffset(offset - 1);
    }
  }

  useEffect(() => {
    getAllCharacter(url);
  }, [url]);

  useEffect(() => {
    if (search != '') {
      setUrl('https://gateway.marvel.com:443/v1/public/characters?limit=6&name=' + search);
    } else {
      setUrl('https://gateway.marvel.com:443/v1/public/characters?limit=6&offset=' + (offset) * 6);
    }
  }, [search]);

  return (
    <div className="w-screen overflow-y-hidden">
      {loading ? (
        <Loading />
      ) : (
        <div className="grid grid-rows-3 grid-flow-col w-full h-4/5 items-center justify-center">
          {
            characters && characters.sort((idA, idB) =>
              idA.id - idB.id
            ).map((character, index) =>
              <Card
                character={character}
                key={index}
                timestamp={timestamp}
                publicKey={publicKey}
                hash={hash}
              />
            )
          }
        </div>
      )
      }
      <Footer
        buttonLeft={buttonLeft}
        buttonRight={buttonRight}
        search={search}
        setSearch={setSearch}
      />
    </div>

  )
}
