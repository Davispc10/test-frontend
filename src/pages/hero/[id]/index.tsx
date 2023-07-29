'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import heroService from '@/services/heroService';
import Layout from '@/components/Layout';
import Link from 'next/link'
import Image from 'next/image';

function hero() {
	// Use the useRouter hook to get access to the current route information
	const router = useRouter();
	// Extract the id from the query parameters
	const { id } = router.query;

	const [hero, setHero] = React.useState(null);	

	// Realize a chamada ao serviço apenas se o id for válido
	const result = useQuery(['heroes'], () => heroService.hero(id), {
		onSuccess: ({ data }: any) => {
		  setHero(data.data.results[0]);
		},
		retry: false,
		refetchOnWindowFocus: false,
		enabled: false,
	});

	useEffect(() => {
		// Verifique se o id é válido antes de fazer a chamada ao serviço
		if (id !== undefined) {
		  result.refetch();
		}
	  }, [id, hero]); 

	if (result.isLoading || !result.isFetched) {
		return (
			<Layout>
				<div>Loading...</div>
			</Layout>
			);
	}
	
	return (
		<Layout>
			{result.isLoading && <div>Loading...</div>}
			{result.isFetched && (
				<>
				<div className='container px-1 mx-auto mb-5'>
					{/* Back button */}
					<div className="mb-4">
					<Link href="/" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">
						Back
					</Link>
					</div>

					<div className="flex flex-row md:items-center gap-8 justify-center">
					{/* Hero image */}
					<div className="w-300 h-400">
						<Image
						src={hero.thumbnail?.path ? `${hero.thumbnail.path}.${hero.thumbnail.extension}` : '/images/logo.svg'}
						alt={hero.name}
						width={300}
						height={400}
						className="rounded-lg"
						/>
					</div>

					{/* Hero information */}
					<div className="flex flex-col gap-4">
						{/* Hero name */}
						<h1 className="text-3xl font-bold text-white">{hero.name}</h1>

						{/* Hero description */}
						<p className="text-gray-300">{hero.description || 'Descrição não informada'}</p>
					</div>
					</div>

					{/* Comics */}
					<div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
					{hero.comics?.items?.map((comic) => (
						<div key={comic.resourceURI} className="p-4 border rounded-lg flex flex-col gap-4 items-center">
						<Image
							src="/images/logo.svg" // Replace with the comic's image
							alt={comic.name}
							width={150}
							height={225}
							className="rounded-lg"
						/>
						<p className="text-white text-center">{comic.name}</p>
						</div>
					))}
					</div>
				</div>
				</>
			)}
		</Layout>
	);
	
}

export default hero;