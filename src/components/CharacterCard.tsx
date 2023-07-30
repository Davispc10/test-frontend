import Image from 'next/image';
import { ICharactersCard } from '@/interfaces';
function CharacterCard({
	name,
	description,
	comics,
	thumbnail,
}: ICharactersCard) {
	return (
		<>
			<div className="border bg-white transition-transform hover:border-red-500 hover:border-2 hover:shadow-lg hover:scale-110 rounded-[3px] border-black w-[300px] h-[370px] object-contain p-[8px]">
				<Image
					className="mx-auto rounded-[5px] h-[150px] w-[250px] object-contain"
					src={thumbnail}
					alt={`${name}`}
					width={350}
					height={150}
				/>

				<div className="flex justify-center">
					<h1 className="mr-[8px] font-semibold">Name:</h1>
					<p className="italic">{name}</p>
				</div>
				<div className="box justify-center">
					<h1 className="font-semibold">Description:</h1>
					<p className="italic">{description}</p>
				</div>
				<div className="flex justify-center">
					<h1 className="mr-[8px] font-semibold">How many comics:</h1>
					<p className="italic">{comics}</p>
				</div>
				{/* <p>Description: {description}</p>
				<p>How many comics: {comics}</p> */}
			</div>
		</>
	);
}

export default CharacterCard;
