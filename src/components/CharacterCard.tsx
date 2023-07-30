import Image from "next/image";
import Link from "next/link";

interface CharacterCardProps {
    name: string
    imageSource: string
    description: string
}

export default function CharacterCard({ name, description, imageSource }: CharacterCardProps) {

    return (
        <Link href={{ pathname: `/${name}`, query: { name, description, imageSource } }}>
            <div className="rounded-md h-80 bg-neutral-900 border-neutral-700 border-2 hover:border-neutral-300 transition-colors cursor-pointer overflow-hidden">
                <div className="relative w-full h-5/6">
                    <Image src={imageSource} alt={`Foto do ${name}`} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                </div>
                <div className="h-1/6 flex justify-center items-center">
                    <h1 className="text-2xl text-slate-100 font-medium font-mono">{name}</h1>
                </div>
            </div>
        </Link >
    );
}