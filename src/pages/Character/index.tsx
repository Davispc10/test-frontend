import { useComics } from '@/features/comics';
import { useHeroDetails } from '@/features/heroes/hooks/useHeroDetails';
import { Navigate, Params, useNavigate, useParams } from 'react-router-dom';

// @TODO: Responsivity, componentization, animations, skeletons, go back button

const Character = () => {
  // Parametros de entrada
  const id = Number(useParams().id);

  if (isNaN(id)) {
    return <Navigate to="/" />;
  }

  const heroDetails = useHeroDetails({
    id,
  });

  const comicDetails = useComics({
    id,
  });

  if (heroDetails.isLoading || comicDetails.isLoading) {
    return <h1>Loading...</h1>;
  }

  if (heroDetails.isError || comicDetails.isError) {
    return <h1>Error</h1>;
  }

  return (
    <>
      <div className="flex gap-4 items-center min-h-screen h-screen">
        {/* Hero image */}
        <div
          className="
            flex bg-marvel-red shadow-lg w-1/3 h-full overflow-hidden
          "
        >
          <img
            src={`${heroDetails.data?.thumbnail.path}.${heroDetails.data?.thumbnail.extension}`}
            alt={heroDetails.data?.name}
            className={
              heroDetails.data?.thumbnail.path.includes('marvel-logo')
                ? 'object-contain'
                : 'object-cover w-full h-full'
            }
          />
        </div>

        {/* Hero Information */}
        <div className="flex flex-col gap-16 w-2/3 h-full p-16 justify-center">
          <div className="flex flex-col gap-2">
            <h1 className="text-6xl font-bold break-words w-full leading-tight">
              {heroDetails.data?.name}
            </h1>
            <p className="text-xl">{heroDetails.data?.description}</p>
          </div>

          <div className="flex flex-col gap-1">
            <h2 className="text-3xl font-bold">Appearence in Comics</h2>
            {/* Horizontally scrollable area */}
            <div className="flex flex-col w-full overflow-x-auto touch-pan-x justify-center items-start">
              <div className="inline-flex flex-nowrap flex-row justify-center items-center w-auto h-auto py-6 space-x-4">
                {/* FIXME: Marvel logo for comics without thumbnail (clsx)  */}
                {comicDetails.data?.map((comic) => (
                  <div className="group w-32 sm:w-40 lg:w-44 bg-white shadow-sm rounded-lg aspect-[3/4] cursor-pointer">
                    <img
                      src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                      alt={comic.title}
                      className="select-none transition ease-in-out duration-200 transform group-hover:scale-[1.025]"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Character;
