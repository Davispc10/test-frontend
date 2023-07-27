"use client";

import { useEffect, useState, useRef } from 'react';
import React  from 'react';
import axios from 'axios';
import md5 from 'md5';
import Card from './cards/cards';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const publicKey = 'fbc4f64b3d3b579945901a02361c004e';
const privateKey = '56510ad02017aee2e74689a77269878198c8b40f';

export default function Main() {
  const [url] = useState('https://gateway.marvel.com:443/v1/public/characters');
  const [herois, setHerois] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const carousel = useRef(null);
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
          setHerois(result.data.data.results);
          setLoading(false);
          console.log(result);
        }
      ).catch(() => setLoading(true));
  }

  const handleSearch = () => {
    setIsSearching(!isSearching);
  };

  const handleScrollWithAnimation = (scrollValue, duration) => {
    const element = carousel.current;
    const startTime = performance.now();
    const startScrollLeft = element.scrollLeft;

    const animateScroll = (timestamp) => {
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const newScrollLeft = startScrollLeft + (scrollValue - startScrollLeft) * progress;
      element.scrollLeft = newScrollLeft;

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  };

  const buttonRight = (e) => {
    e.preventDefault();
    const scrollValue = carousel.current.scrollLeft - carousel.current.offsetWidth;
    handleScrollWithAnimation(scrollValue, 300);
  }

  const buttonLeft = (e) => {
    e.preventDefault();
    const scrollValue = carousel.current.scrollLeft + carousel.current.offsetWidth;
    handleScrollWithAnimation(scrollValue, 300);
  }

  useEffect(() => {
    getAllCharacter(url);
  }, [url]);

  return (
    loading ? (
      <div>
        <p>Loading</p>
      </div>
    ) : (
      <div className="w-screen overflow-y-hidden">
        <div className="grid grid-rows-3 grid-flow-col overflow-x-auto mx-1 overflow-hidden delay-150" ref={carousel}>
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
        </div>
        <div className="flex grid-cols-3 w-full items-center justify-center">
          <button className="h-9 w-9 bg-red-600 rounded-full cursor-none"
            onClick={buttonRight}>
            <FontAwesomeIcon icon={faArrowLeft}  className="text-white text-xl"/>
          </button>
          {/* {isSearching ? (
            <input
              type="text"
              className={`px-4 py-2 rounded-md border border-gray-300`}
              placeholder="Search..."
              onBlur={handleSearch}
            />
          ) : (
            <button
              onClick={handleSearch}
              className={`h-9 w-9 bg-red-600 rounded-full cursor-none transform ${
                isSearching ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100 pointer-events-auto'
              } transition-all duration-300 ease-in-out`}
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} className="text-white text-xl"/>
            </button>
          )} */}
          <div className="search-box">
            <button className="btn-search">
              <FontAwesomeIcon icon={faMagnifyingGlass} className="text-white text-xl"/>
            </button>
            <input
              className="input-search"
            />
          </div>
          <button className="h-9 w-9 bg-red-600 rounded-full cursor-none" onClick={buttonLeft}>
            <FontAwesomeIcon icon={faArrowRight} className="text-white text-xl"/>
          </button>
        </div>
      </div>
    )
  )
}
