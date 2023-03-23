import FadeInAnimation from '@/components/animations/FadeIn';
import FadeRightAnimation from '@/components/animations/FadeRight';
import HoverScaleAnimation from '@/components/animations/HoverScale';
import FullscrenLoader from '@/components/FullscrenLoader';
import { useComics } from '@/features/comics';
import { useHeroDetails } from '@/features/heroes/hooks/useHeroDetails';
import clsx from 'clsx';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

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
    return <FullscrenLoader />;
  }

  if (heroDetails.isError || comicDetails.isError) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <div className="flex gap-4 items-center min-h-screen h-screen">
        {/* Hero image */}
        <FadeInAnimation
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
        </FadeInAnimation>

        {/* Hero Information */}
        <FadeRightAnimation className="flex flex-col gap-8 w-2/3 h-full p-16 justify-center">
          <div className="flex flex-col gap-2">
            <h1 className="text-6xl font-bold break-words w-full leading-tight">
              {heroDetails.data?.name}
            </h1>
            <p className="text-xl">{heroDetails.data?.description}</p>
          </div>

          <div className="flex flex-col gap-1">
            <h2 className="text-3xl font-bold">Appearence in Comics</h2>
            {/* Horizontally scrollable area */}
            <div className="flex flex-col w-full overflow-x-auto touch-pan-x overflow-y-hidden justify-center items-start">
              <div className="inline-flex flex-nowrap flex-row justify-center items-center w-auto h-full py-6 space-x-4 px-2">
                {/* FIXME: Marvel logo for comics without thumbnail (clsx)  */}
                {comicDetails.data?.map((comic) => (
                  <HoverScaleAnimation
                    key={comic.id}
                    options={{
                      scale: 1.002,
                    }}
                    className="w-32 h-full flex items-center bg-marvel-red"
                  >
                    <img
                      src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                      alt={comic.title}
                      className={clsx(
                        'hover:scale-[1.05] transition ease-in-out',
                        {
                          'object-contain':
                            comic.thumbnail.path.includes('marvel-logo'),
                          'object-cover w-full h-full':
                            !comic.thumbnail.path.includes('marvel-logo'),
                        }
                      )}
                    />
                  </HoverScaleAnimation>
                ))}
              </div>
            </div>
          </div>
        </FadeRightAnimation>
      </div>
    </>
  );
};

export default Character;
