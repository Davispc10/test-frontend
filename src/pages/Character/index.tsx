import FadeInAnimation from '@/components/animations/FadeIn';
import FadeRightAnimation from '@/components/animations/FadeRight';
import HoverScaleAnimation from '@/components/animations/HoverScale';
import FullscrenLoader from '@/components/FullscrenLoader';
import { useComics } from '@/features/comics';
import { useHeroDetails } from '@/features/heroes/hooks/useHeroDetails';
import clsx from 'clsx';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import CharacterInformation from './components/CharacterInformation';
import MainImage from './components/MainImage';

// @TODO: Responsivity, go back button

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
    <main className="flex gap-4 items-center min-h-screen h-screen">
      {/* Hero image */}
      <MainImage thumbnail={heroDetails.data?.thumbnail} />

      {/* Hero Information */}
      <CharacterInformation
        hero={heroDetails.data}
        comics={comicDetails.data}
      />
    </main>
  );
};

export default Character;
