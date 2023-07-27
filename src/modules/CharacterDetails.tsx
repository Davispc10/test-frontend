'use client';
import Layout from '@/components/Layout';
import React from 'react';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import characterService from '@/services/characterService';
import { descriptionVerifier, thumbnailVerifier } from '@/utils/handlers';
import Image from 'next/image';
function CharacterDetails() {
	const { id } = useParams();

	const { data, isLoading } = useQuery({
		retry: false,
		queryKey: ['character', id],
		queryFn: () => characterService.getById(id),
		select: (data) => data.data.data.results[0],
	});
	console.log(data);

	return (
		<Layout>
			{isLoading ? (
				'Loading...'
			) : (
				<div className="p-[16px]">
					<Image
						src={thumbnailVerifier(
							`${data?.thumbnail?.path}.${data?.thumbnail?.extension}`,
						)}
						className="w-[300px] h-[400px] mx-auto"
						width={400}
						height={400}
						alt={`${data.name} picture`}
					/>
					<h1 className="mb-[16px]">Name: {data.name}</h1>
					<div>
						<div className="mb-[16px]">
							<h1 className="text-[18px] font-semibold">Description:</h1>
							<p className="italic">
								{descriptionVerifier(
									data.description,
									0,
									data.description.length,
								)}
							</p>
						</div>
						<div className="mb-[16px]">
							<h1 className="text-[18px] font-semibold">Series:</h1>
							<ol className="list-disc border border-black ml-[16px]">
								{data.series.items.map((el: { name: string }) => (
									<li className='italic' key={el.name}>{el.name}</li>
								))}
							</ol>
						</div>
						<div className="mb-[16px]">
							Comics:{' '}
							<ol className="list-disc border border-black ml-[16px]">
								{data.comics.items.map((el: { name: string }) => (
									<li key={el.name}>{el.name}</li>
								))}
							</ol>
						</div>
					</div>
				</div>
			)}
		</Layout>
	);
}

export default CharacterDetails;
