import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faXmark } from '@fortawesome/free-solid-svg-icons';
import Comic from './comic';
import Loading from '../loading/loading';

export default function Perfil(props) {
    const thumbnailCharacter = props.character.thumbnail.path !== "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" ?
        `${props.character.thumbnail.path}.${props.character.thumbnail.extension}` :
        `/Marvel-Logo.png`;
    const [url, setUrl] = useState(props.character.comics.collectionURI + '?limit=4&offset=0');
    const [offset, setOffset] = useState(0);
    const [total, setTotal] = useState(0);
    const [comics, setComics] = useState([]);
    const [loading, setLoading] = useState(true);

    const getAllComics = async (url: string) => {
        await axios.get(url, {
            params: {
                ts: props.timestamp,
                apikey: props.publicKey,
                hash: props.hash,
            }
        }).then(result => {
            setComics(result.data.data.results);
            setTotal(result.data.data.total);
            setLoading(false);
            console.log(result);
        }
        ).catch(() => setLoading(true));
    }

    const buttonRight = (e) => {
        e.preventDefault();
        if (offset + 1 < total / 4) {
            setLoading(true);
            while (comics.length) comics.pop();
            setUrl(props.character.comics.collectionURI + '?limit=4&offset=' + (offset + 1) * 4);
            setOffset(offset + 1);
        }
    }

    const buttonLeft = (e) => {
        e.preventDefault();
        if (offset - 1 >= 0) {
            setLoading(true);
            while (comics.length) comics.pop();
            setUrl(props.character.comics.collectionURI + '?limit=4&offset=' + (offset - 1) * 4);
            setOffset(offset - 1);
        }
    }

    useEffect(() => {
        getAllComics(url);
    }, [url]);

    return (
        props.showModal &&
        <div className="absolute flex justify-center items-center top-0 left-0 h-full w-full bg-gray-800 bg-opacity-80 z-10">
            <div className="h-4/5 w-4/5 m-4 rounded-lg bg-gradient-to-b from-red-500 to-red-900 columns-1 p-2">
                <div className="relative h-full">
                    <img
                        src={thumbnailCharacter}
                        alt={props.character.name}
                        className="absolute object-fit w-full h-1/2 rounded-lg z-10"
                    />
                    <button className="absolute h-9 w-9 bg-red-600 rounded-full cursor-none z-20" onClick={props.eventoFecharModal}>
                        <FontAwesomeIcon icon={faXmark} className="text-white text-xl" />
                    </button>
                    <div className="absolute flex container rounded-b-lg bg-gray-800 bg-opacity-80 h-1/6 mx-auto text-center justify-center items-center z-20 top-1/3">
                        <p>{props.character.name}</p>
                    </div>
                    <div className="absolute grid container columns-1 p-2 rounded-lg bg-gray-800 bg-opacity-80 h-2/5 mx-auto text-center justify-center items-center z-20 bottom-7 overflow-y-auto">
                        {props.character.description !== '' ? <p>{props.character.description}</p> : <p>Descrição não informada</p>}
                        <div className="grid grid-rows-2 grid-flow-col w-full h-4/5 items-center justify-center">
                            {
                                loading ?
                                    <Loading /> :
                                    comics && comics.sort((idA, idB) =>
                                        idA.id - idB.id
                                    ).map((comic, index) =>
                                        <Comic
                                            key={index}
                                            comic={comic}
                                        />
                                    )
                            }
                        </div>
                        <div className="flex grid-cols-3 w-full h-1/5 items-center justify-center">
                            <button className="h-9 w-9 mx-5 bg-red-600 rounded-full cursor-none"
                                onClick={buttonLeft}>
                                <FontAwesomeIcon icon={faArrowLeft} className="text-white text-xl" />
                            </button>
                            <button className="h-9 w-9 mx-5 bg-red-600 rounded-full cursor-none" onClick={buttonRight}>
                                <FontAwesomeIcon icon={faArrowRight} className="text-white text-xl" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}