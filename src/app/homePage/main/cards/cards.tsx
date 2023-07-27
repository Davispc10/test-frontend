import React from 'react';

export default function Card(props) {
    const thumbnailCharacter = `${props.heroi.thumbnail.path}.${props.heroi.thumbnail.extension}`;

    return (
        <div className="w-40 h-48 m-4 rounded-lg bg-gradient-to-b from-red-500 to-red-900 columns-1 p-2">
            <div className="h-2/3">
                <img
                    src= {thumbnailCharacter}
                    alt={props.heroi.name}
                    className='object-cover w-full h-full rounded-t-lg'
                />
            </div>
            <div className="grid container rounded-b-lg bg-gray-800 bg-opacity-80 h-1/3 mx-auto items-center justify-items-center text-center">
                <p>{props.heroi.name}</p>
            </div>
        </div>
    )
}