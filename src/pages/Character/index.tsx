import { useComics } from '@/features/comics';
import { useHeroDetails } from '@/features/heroes/hooks/useHeroDetails';
import { Navigate, Params, useNavigate, useParams } from 'react-router-dom';

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

  return <div>Character</div>;
};

export default Character;
