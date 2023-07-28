import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

export default function Footer(props) {
  return (
    <div className="fixed bg-gray-700 h-12 bottom-0 w-full">
      <div className="absolute flex grid-cols-3 w-full h-1/5 items-center justify-center top-[-1]">
        <button className="h-9 w-9 bg-red-600 rounded-full cursor-none"
          onClick={props.buttonLeft}>
          <FontAwesomeIcon icon={faArrowLeft} className="text-white text-xl" />
        </button>
        <div className="search-box mx-1">
          <button className="btn-search">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="text-white text-xl" />
          </button>
          <input
            className="input-search"
            value={props.search}
            onChange={e => props.setSearch(e.target.value)}
          />
        </div>
        <button className="h-9 w-9 bg-red-600 rounded-full cursor-none" onClick={props.buttonRight}>
          <FontAwesomeIcon icon={faArrowRight} className="text-white text-xl" />
        </button>
      </div>
    </div>
  )
}
