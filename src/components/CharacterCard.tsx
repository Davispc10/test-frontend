import Image from 'next/image';
function CharacterCard({ name, description, comics, thumbnail }: any) {
	return (
		<>
			<div className="border rounded-md border-black w-[300px] h-[350px] object-contain p-[8px]">
				<Image
					className="mx-auto rounded-[5px] h-[150px] w-[280px] object-fit"
					src={thumbnail}
					alt={`${name}`}
					width={150}
					height={100}
				/>
				<p>Name: {name}</p>
				<p>Description: {description}</p>
				<p>How many comics: {comics}</p>
			</div>
		</>
	);
}

export default CharacterCard;
