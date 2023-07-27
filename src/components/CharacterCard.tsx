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
			<div className="border bg-white hover:border-red-500 hover:border-2 hover:shadow-lg hover:scale-110 rounded-[3px] border-black w-[300px] h-[350px] object-contain p-[8px]">
				<Image
					className="mx-auto rounded-[5px] h-[150px] w-[250px] object-contain"
					src={thumbnail}
					alt={`${name}`}
					width={250}
					height={150}
				/>

				<p>Name: {name}</p>
				<p>Description: {description}</p>
				<p>How many comics: {comics}</p>
			</div>
		</>
	);
}

export default CharacterCard;
