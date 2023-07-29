import api from './api';
import md5 from 'md5';

const hash = md5(process.env.timeStamp + process.env.apiKeyPrivate + process.env.apiKeyPublic);
class HeroService {
  list(offset?: number, name?: string) {
    return api.get(
      `v1/public/characters?apikey=${process.env.apiKeyPublic}&ts=${process.env.timeStamp}&hash=${hash}&limit=20${
        offset ? `&offset=${offset}` : ''
      }${
        name ? `&nameStartsWith=${name}` : ''
      }`,
    );
  }
  
  async hero(id: number | string) {	
    return api.get(
      `v1/public/characters/${id}?apikey=${process.env.apiKeyPublic}&ts=${process.env.timeStamp}&hash=${hash}`,
    );
  }
}

const heroService = new HeroService();
export default heroService; // Corrigimos o nome da exportação aqui
