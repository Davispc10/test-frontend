'use client';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import characterService from '@/services/characterService';
import Layout from '@/components/Layout';
import CharacterCard from '@/components/CharacterCard';
import { thumbnailVerifier, descriptionVerifier } from '../utils/handlers';
import { ICharacters } from '@/interfaces';
import { useRouter } from 'next/navigation';
function Home() {
	const route = useRouter();
	// const [filter, setFilter] = React.useState<string>(
	// 	localStorage?.getItem('search') || '',
	// );
	const [filter, setFilter] = React.useState<string>('');

	const {
		data,
		isLoading,
		refetch,
		fetchStatus,
	} = useQuery({
		queryKey: ['characters'],
		queryFn: () => characterService.list(filter),
		refetchOnMount: false,
		select: (data) => data.data.data,
	});

	React.useEffect(() => {
		if (fetchStatus === 'fetching') {
			const ls = localStorage.getItem('search') as string;
			setFilter(ls);
			console.log('oi');
		}
		refetch();
	}, [data]);

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		event.preventDefault();
		refetch();
		localStorage.setItem('search', filter);
	};

	const handleRedirect = (id: any) => {
		route.push(`/character/${id}`);
	};
	return (
		<Layout>
			<div className="h-full p-[8px]">
				<form className="flex justify-center mx-auto items-center">
					<label className="mr-[8px] cursor-pointer" htmlFor="filter">
						Search
					</label>
					<input
						className="border w-[300px] border-black rounded-[3px] mr-[8px] h-[40px] p-[4px]"
						onChange={({ target }) => setFilter(target.value)}
						value={filter}
						name="filter"
						id="filter"
					/>

					<button
						onClick={handleClick}
						className="bg-blue-700 hover:bg-blue-400 text-white font-bold p-[8px] rounded"
					>
						Filtrar
					</button>
				</form>
				<div className="mt-[20px] border border-blue-700">
					{isLoading ? (
						'Loading...'
					) : (
						<>
							{data?.results.length === 0 ? (
								"There's no characters with this name"
							) : (
								<div className="mx-auto w-[80%]">
									<div className="flex flex-wrap place-content-center mx-auto	text-center w-[80%]">
										{data?.results.map((el: ICharacters) => (
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
													comics={el.comics.available}
												/>
											</div>
										))}
									</div>
								</div>
							)}
						</>
					)}
				</div>
			</div>
		</Layout>
	);
}
export default Home;
