// import { MouseEventHandler } from 'react';

export interface ICharacters {
	id: string;
	name: string;
	description: string;
	thumbnail: {
		path: string;
		extension: string;
	};
	comics: {
		available: number;
	};
}

export interface ICharactersCard {
	id?: string;
	name: string;
	description: string;
	thumbnail: string;
	comics: number;
}
