'use client'

import { CharacterController } from "@/api/services/controller";
import { Button, Heading, HeadingSkeleton } from "@/components/atoms";
import { CardItem, CardItemSkeleton } from "@/components/molecules";
import { CharacterContext } from "@/contexts/CharacterProvider";
import { InitialStateProps } from "@/contexts/types";
import { CharacterProps, Comics, Item } from "@/types/CharacterProps";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation"
import { useCallback, useContext, useEffect, useState } from "react";

export default function Character() {
    const { back } = useRouter();
    const router = useParams();

    const { state, setState } = useContext(CharacterContext);

    const characterController = new CharacterController();

    const getResults = useCallback(async () => {
        setState((prevState: InitialStateProps) => ({
            ...prevState,
            isSearching: false,
        }));
        try {
            const characterData = await characterController.findById({ id: String(router.id) });
            setState((prevState: InitialStateProps) => ({
                ...prevState,
                character: characterData?.data?.results[0],
                isSearching: false,
                loading: false
            }));

            if (state.character.comics.items) {
                const comicsPromises = state.character.comics.items.map(async ({ resourceURI }: Item) => {
                    const id = +resourceURI.replace('http://gateway.marvel.com/v1/public/comics/', '');
                    const comicData = await characterController.findComic({ id });
                    return comicData.data.results[0];
                });

                const comicsData = await Promise.all(comicsPromises);
                setState((prevState: InitialStateProps) => ({
                    ...prevState,
                    comics:comicsData
                }));
            }
        } catch (error) {
            console.error('Erro ao buscar personagem:', error);
            setState((prevState: InitialStateProps) => ({
                ...prevState,
                isSearching: false,
                loading: false,
            }));
        }
    }, [setState, router.id, state?.character?.comics?.items]);

    useEffect(() => {
        getResults();
    }, [getResults]);

    const renderDescription = (description: string | undefined) => {
        return description ? description : "Descrição não informada."
    }

    const renderImage = (data: any) => {
        if (data) {
            const path = data.path;
            const extension = data.extension;
            const imageNotAvailable = path.includes('image_not_available');
            if (imageNotAvailable) {
                return <Image src="/marvel-logotipo.jpg" alt="Logotipo Marvel" width={170} height={100} className="rounded-lg rounded-bl-none rounded-br-none w-full md:min-h-[272.25px] md:max-h-[272.25px] lg:min-h-[255px] lg:max-h-[255px] lg:min-w-full" />
            } else {
                return <Image className="rounded-lg rounded-bl-none rounded-br-none w-full md:min-h-[272.25px] md:max-h-[272.25px] lg:min-h-[255px] lg:max-h-[170.67px] lg:min-w-full" src={path + '/portrait_fantastic.' + extension} alt={""} width={170} height={255} />
            }
        }
    }

    const getComicsThumbnail = (comic: { id: string, thumbnail: { path: string, extension: string}, title: string}): any => {
        if (comic) {
            return (
                <div key={comic.id} className="bg-white rounded-lg">
                    <div>
                        {renderImage(comic.thumbnail)}
                    </div>
                    <div className="flex justify-center items-center bg-black h-10 rounded-lg rounded-tl-none rounded-tr-none">
                        <Heading as="h3" className="font-mono text-white text-xs text-center">{comic.title}</Heading>
                    </div>
                </div>
            )
        }
    }

    return (
        <div className="h-screen">
            {state.loading ? (
                <>
                    <HeadingSkeleton  />
                    <CardItemSkeleton quantity={state.comics.length} />
                </>
            ) : (
                <>
                <Button onClick={back} text="Voltar" />
                <Heading as="h1" className="text-4xl font-mono font-bold mt-2">{state?.character?.name}</Heading>
                <p className="text-md font-light mt-2 ">{renderDescription(state?.character?.description)}</p>
                <div id="content" className="grid md:grid-cols-3 lg:grid-cols-6 gap-8 mt-5">
                    {state?.comics.map((comic: any)=> getComicsThumbnail(comic))}
                </div>
                </>
            )}
        </div>
    )
}