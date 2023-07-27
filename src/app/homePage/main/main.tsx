"use client";

import { useEffect, useState } from 'react';
import React  from 'react';
import axios from 'axios';
import md5 from 'md5';
import Card from './cards/cards';

const publicKey = 'fbc4f64b3d3b579945901a02361c004e';
const privateKey = '56510ad02017aee2e74689a77269878198c8b40f';

export default function Main() {
  const [url, setUrl] = useState('https://gateway.marvel.com:443/v1/public/characters?limit=6&offset=0');
  const [herois, setHerois] = useState([]);
  const [loading, setLoading] = useState(true);
  const timestamp = new Date().getTime();
  const hash = md5(timestamp + privateKey + publicKey);

  const getAllPokemon = async (url: string) => {
    localStorage.removeItem('pesquisou');
    localStorage.setItem('pesquisou', 'true');
    const result = await axios.get(url, {
      params: {
        ts: timestamp,
        apikey: publicKey,
        hash: hash,
      }
    })
      .then(result => {
          setHerois(result.data.data.results);
          setLoading(false);
        }
      )
      .catch(e => setLoading(true));
    console.log(herois);
    // console.log(result.data.data);
    // setHerois(result.data.results);

    // const getPokemon = async (res) => {
    //     const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${res}`);
    //     setHerois(state => {
    //         state = [...state, result.data];
    //         return state;
    //     });
    // }

    //result.data.results.map((herois) => getPokemon(herois.name));
}

useEffect(() => {
  getAllPokemon(url);
}, [url]);

  return (
    loading ? (
      <div>
        <p>Loading</p>
      </div>
    ) : (
      <div>
        <div className="grid grid-rows-3 grid-cols-2">
          {
            herois && herois.sort((idA, idB) =>
                idA.id - idB.id
            ).map((heroi, index) =>
                <Card
                  heroi = {heroi}
                  key = {index}
                />
            )
          }
            {/* <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card /> */}
        </div>
        <div>

        </div>
      </div>
    )
  )
}
