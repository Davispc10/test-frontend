'use client';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import characterService from '@/services/characterService';
import Layout from '@/components/Layout';
import CharacterCard from '@/components/CharacterCard';
import { thumbnailVerifier, descriptionVerifier } from '../utils/handlers';

function Home() {
	const [characters, setCharacters] = React.useState([]);
	const [filter, setFilter] = React.useState<string>('');

	const result = useQuery(['characters'], () => characterService.list(filter), {
		onSuccess: ({ data }: any) => {
			const information = data.data.results;
			// setCharacters([]);
			// information.forEach((el: any) => {
			// 	if (el.thumbnail.path.includes('image_not_available')) {
			// 		const arroz = { ...el };
			// 		arroz.thumbnail.path = '/images/logo';
			// 		arroz.thumbnail.extension = 'png';
			// 		// arroz.thumbnail.extension = '';
			// 		setCharacters((prev) => {
			// 			return [...prev, arroz];
			// 		});
			// 	} else {
			// 		setCharacters((prev) => {
			// 			return [...prev, el];
			// 		});
			// 	}
			// });

			setCharacters(information);
		},
		retry: false,
		refetchOnWindowFocus: false,
	});
	console.log(characters);

	const handleClick = (event: any) => {
		event.preventDefault();
		result.refetch();
	};

	const handleRedirect = (event: any) => {
		console.log(event);
	};

	return (
		<Layout>
			<div className="h-full p-[8px]">
				<form action="">
					<input
						className="border border-black rounded-[3px]"
						onChange={({ target }) => setFilter(target.value)}
						value={filter}
						name="filter"
					/>

					<button
						onClick={handleClick}
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-[8px] rounded"
					>
						Filtrar
					</button>
				</form>
				<div className="mt-[20px]">
					{characters.length === 0 ? (
						"There's no characters with this name"
					) : (
						<>
							<div className="flex flex-wrap place-content-center mx-auto w-[80%] text-center border-blue-700 border">
								{characters.map((el: any) => (
									<div
										className="w-300 cursor-pointer p-1 inline-block"
										key={el.id}
										onClick={() => handleRedirect(el.id)}
									>
										<CharacterCard
											name={el.name}
											description={descriptionVerifier(el.description)}
											thumbnail={`${thumbnailVerifier(
												`${el.thumbnail.path}.${el.thumbnail.extension}`,
											)}`}
											// thumbnail={`${el.thumbnail.path}.${el.thumbnail.extension}`}
											comics={el.comics.available}
										/>
									</div>
								))}
							</div>
						</>
					)}
				</div>
			</div>
		</Layout>
	);
}
export default Home;
