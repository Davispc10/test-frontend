import { ComponentPagination } from "@/components/Pagination";
import { CharacterPreview } from "@/entities/Character";
import { APIMarvel } from "@/services/api.marvel";
import md5 from "crypto-js/md5";
import Link from "next/link";

const tokens = {
  public: process.env.NEXT_PUBLIC_APIKEY_PUBLIC_MARVEL as string,
  private: process.env.NEXT_PUBLIC_APIKEY_PRIVATE_MARVEL as string,
};

interface PropsFetchListHeroes {
  indexPage: number;
  search?: string;
}

export const FetchListHeroes: React.FC<PropsFetchListHeroes> = async ({
  indexPage,
  search,
}: PropsFetchListHeroes): Promise<JSX.Element> => {
  const timestamp = new Date().getTime();
  const hash = md5(`${timestamp}${tokens.private}${tokens.public}`);
  const totalPerPage = 30;
  const page = indexPage > 0 ? Math.abs((indexPage - 1) * totalPerPage) : 0;

  try {
    const { data } = await APIMarvel.get(
      `/characters?apikey=${
        tokens.public
      }&hash=${hash}&ts=${timestamp}&limit=30&orderBy=modified&offset=${page}${
        search ? `&name=${search}` : ""
      }`
    );
    const totalItems = data.data.total;

    const dataCharacters: CharacterPreview[] = data.data.results.map(
      (item: any): CharacterPreview => {
        const default_img =
          "https://t.ctcdn.com.br/fkw2RpWPNReEBPGyZ44dHJoPI6I=/400x400/smart/i490060.jpeg";
        const path_img = item.thumbnail?.path as string | undefined;
        const url_img =
          path_img !== "" && path_img
            ? `${path_img}.${item.thumbnail.extension}`
            : default_img;
        const validate_image = /image_not_available/g.test(url_img)
          ? default_img
          : url_img;

        return {
          id: item.id,
          name: item.name,
          thumbnail: validate_image,
        };
      }
    );

    return dataCharacters.length > 0 ? (
      <div>
        <div className="grid gap-4 sm:gap-2 grid-cols-[repeat(auto-fill,minmax(185px,1fr))]">
          {dataCharacters.map((character: CharacterPreview) => (
            <Link href={`/character/${character.id}`} key={character.id}>
              <article className="duration-200 bg-white shadow-sm cursor-pointer hover:shadow-md hover:shadow-black/40 hover:-translate-y-1 hover:bg-slate-100">
                <div
                  style={{ backgroundImage: `url(${character.thumbnail})` }}
                  className="img-character"
                />
                <div className="p-2">
                  <h3 className="text-center truncate">{character.name}</h3>
                </div>
              </article>
            </Link>
          ))}
        </div>
        <div className="my-10">
          <ComponentPagination
            count={totalItems}
            indexPage={indexPage}
            itemsPerPage={totalPerPage}
          />
        </div>
      </div>
    ) : (
      <div className="flex items-center justify-center h-48 text-gray-600">
        Não encontramos o personagem 😔
      </div>
    );
  } catch (error: any) {
    return (
      <div className="flex items-center justify-center h-48 text-gray-600">
        Error no servidor 😢 Tente novamente mais tarde!
      </div>
    );
  }
};
