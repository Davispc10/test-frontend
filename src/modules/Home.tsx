'use client';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import characterService from '@/services/characterService';
import Layout from '@/components/Layout';
import CharacterCard from '@/components/CharacterCard';
import { thumbnailVerifier, descriptionVerifier } from '../utils/handlers';
import { ICharacters } from '@/interfaces';
import { useRouter } from 'next/navigation';
import ReactPaginate from 'react-paginate';
function Home() {
	const route = useRouter();
	const [filter, setFilter] = React.useState<string>('');
	const [offset, setOffset] = React.useState(0);
	const [select, setSelected] = React.useState(1);

	const { data, isLoading, refetch, fetchStatus } = useQuery({
		queryKey: ['characters', offset],
		queryFn: () => characterService.list(filter, offset),
		refetchOnMount: false,
		select: (data) => data.data.data,
	});

	React.useEffect(() => {
		if (fetchStatus === 'fetching') {
			const ls = localStorage.getItem('search') as string;
			setFilter(ls);
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

	const handlePageChange = (e: any) => {
		const { isNext, isPrevious, nextSelectedPage, selected } = e;
		console.log('console geral', {
			isNext,
			isPrevious,
			nextSelectedPage,
			selected,
		});
		console.log(select);

		if (isNext && offset <= data.total - data.limit) {
			return setOffset((prev) => prev + data.limit);
		}
		if (isPrevious && offset > 0) {
			return setOffset((prev) => prev - data.limit);
		}

		if (typeof nextSelectedPage === 'number') {
			return setOffset(nextSelectedPage * data.limit || 0);
		}
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
				<div className="mt-[20px] ">
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
					<ReactPaginate
						className="flex m-auto text-lg justify-around items-center w-2/4 mt-[20px]"
						onClick={(e) => handlePageChange(e)}
						pageCount={Math.ceil(data?.total / data?.limit)}
						renderOnZeroPageCount={null}
						pageRangeDisplayed={3}
						previousLinkClassName="border-2 rounded border-blue-700 p-[8px] hover:border-rose-700"
						nextLinkClassName="border-2 rounded border-blue-700 p-[8px] hover:border-rose-700"
						pageClassName="border border-black rounded w-fit px-[8px]"
					/>
				</div>
			</div>
		</Layout>
	);
}
export default Home;
