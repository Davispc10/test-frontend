import api from './api';
import md5 from 'md5';

const hash = md5(process.env.timeStamp + process.env.apiKeyPrivate + process.env.apiKeyPublic);
console.log(hash);
class HeroService {
	list(name?: string) {
		return api.get(
			`v1/public/characters?apikey=${process.env.apiKeyPublic}&ts=${process.env.timeStamp}&hash=${hash}${
				name ? `&name=${name}` : ''
			}`,
		);
	}
}
const char = new HeroService();
export default char;
