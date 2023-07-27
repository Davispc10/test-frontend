'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { descriptionVerifier, thumbnailVerifier } from '../utils/helpers';
import Layout from '@/components/Layout';
import HeroCard from '@/components/HeroCard';
import heroService from '@/services/heroService';

function Home() {
	const [heroes, setHeroes] = React.useState([]);
	const [filter, setFilter] = React.useState<string>('');

	const result = useQuery(['heroes'], () => heroService.list(filter), {
		onSuccess: ({ data }: any) => {
			const information = data.data.results;
			setHeroes(information);
		},
		retry: false,
		refetchOnWindowFocus: false,
	});
	console.log(heroes);

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
				<form action="" className="flex items-center justify-center w-full mb-8">
					<input
						className="px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
						onChange={({ target }) => setFilter(target.value)}
						value={filter}
						name="filter"
						placeholder="Search hero by name"
					/>

					<button
						onClick={handleClick}
						className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
					>
						Search
					</button>
				</form>
				<div className="mt-[20px] px-2">
					{heroes.length === 0 ? (
						"There's no heroes with this name"
					) : (
						<>
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
								{heroes.map((el: any) => (
									<div
										className="w-300 cursor-pointer p-1 inline-block"
										key={el.id}
										onClick={() => handleRedirect(el.id)}
									>
										<HeroCard
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
