import React from 'react';
import { useState } from 'react';
import Perfil from '@/app/character/perfil';

export default function Card(props) {
    const thumbnailCharacter = props.character.thumbnail.path !== "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" ?
        `${props.character.thumbnail.path}.${props.character.thumbnail.extension}` :
        `/Marvel-Logo.png`;

    const [modalCard, setModalCard] = useState(false);

    const viewModal = () =>{
        setModalCard(!modalCard);
    }

    return (
        <div>
            <div onClick={viewModal} className="h-48 w-40 m-4 rounded-lg bg-gradient-to-b from-red-500 to-red-900 columns-1 p-2">
                <div className="relative h-full">
                    <img
                        src= {thumbnailCharacter}
                        alt={props.character.name}
                        className="absolute object-fit w-full h-full rounded-lg z-index-0"
                    />
                    <div className="absolute flex container rounded-b-lg bg-gray-800 bg-opacity-80 h-1/3 mx-auto text-center justify-center items-center z-index-1 bottom-0">
                        <p>{props.character.name}</p>
                    </div>
                </div>
            </div>
            <Perfil
                showModal={modalCard}
                eventoFecharModal={viewModal}
                character={props.character}
                timestamp = {props.timestamp}
                publicKey = {props.publicKey}
                hash = {props.hash}
            />
        </div>
    )
}