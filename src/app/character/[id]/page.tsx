import { AtomsGoBack } from "@/components/atoms/GoBack";
import { Character, Comic } from "@/entities/Character";
import { APIMarvel } from "@/services/api.marvel";
import { AxiosError } from "axios";
import md5 from "crypto-js/md5";
import "./styles.css";
import Image from "next/image";

interface PropsNode_I {
  params: {
    id: string;
  };
}

const tokens = {
  public: process.env.NEXT_PUBLIC_APIKEY_PUBLIC_MARVEL as string,
  private: process.env.NEXT_PUBLIC_APIKEY_PRIVATE_MARVEL as string,
};

export default async function CharacterPage(props: PropsNode_I) {
  const timestamp = new Date().getTime();
  const hash = md5(`${timestamp}${tokens.private}${tokens.public}`);

  try {
    const { data } = await APIMarvel.get(
      `/characters/${props.params.id}?apikey=${tokens.public}&hash=${hash}&ts=${timestamp}`
    );

    const response = data.data.results[0];

    const default_img =
      "https://t.ctcdn.com.br/fkw2RpWPNReEBPGyZ44dHJoPI6I=/400x400/smart/i490060.jpeg";

    const path_img = response.thumbnail?.path as string | undefined;

    const url_img =
      path_img !== "" && path_img
        ? `${path_img}.${response.thumbnail.extension}`
        : default_img;

    const validate_image = /image_not_available/g.test(url_img)
      ? default_img
      : url_img;

    const { data: comicsCharacter } = await APIMarvel.get(
      `/characters/${response.id}/comics?apikey=${tokens.public}&hash=${hash}&ts=${timestamp}`
    );

    const response_comics = comicsCharacter.data.results;

    const dataCharacters: Character = {
      id: response.id,
      name: response.name,
      thumbnail: validate_image,
      description:
        !response.description || response.description === ""
          ? "Description not informed"
          : response.description,
      comics: response_comics.map((e: any) => {
        return {
          id: e.id,
          thumbnail: `${e.thumbnail.path}.${e.thumbnail.extension}`,
          title: e.title,
        } as Comic;
      }),
    };

    return (
      <div className="pt-8">
        <section className="w-full max-w-5xl m-auto">
          <div className="flex items-center mb-8 gap-x-3">
            <AtomsGoBack />
            <span className="text-lg tracking-wide text-gray-600">
              / character / <strong>{dataCharacters.name}</strong>
            </span>
          </div>

          <div className="flex flex-col items-center md:items-start gap-x-10 md:flex-row">
            <div
              style={{ backgroundImage: `url(${dataCharacters.thumbnail})` }}
              className="image-character"
            />
            <div>
              <h1 className="text-3xl">{dataCharacters.name}</h1>
              <p className="text-lg text-gray-700">
                {dataCharacters.description}
              </p>
            </div>
          </div>
          {dataCharacters.comics.length ? (
            <div className="flex flex-col items-center w-full mt-8 gap-y-5">
              <span className="text-xl font-semibold">Comics</span>
              <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-2">
                {dataCharacters.comics.slice(0, 5).map((comic) => (
                  <Image
                    src={comic.thumbnail}
                    alt="Image comic"
                    loading="lazy"
                    layout="responsive"
                    quality={100}
                    title={comic.title}
                    width={173}
                    height={272}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-48 text-gray-600">
              <span className="text-lg">Character comics not found 😢</span>
            </div>
          )}
        </section>
      </div>
    );
  } catch (error: any) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 404) {
        return (
          <div className="flex items-center justify-center h-48 text-gray-600">
            <span className="text-lg">Character not found 😢</span>
          </div>
        );
      }
    }
    return (
      <div className="flex items-center justify-center h-48 text-gray-600">
        <span className="text-lg">Server error 😢 Please try again later!</span>
      </div>
    );
  }
}
