import api from './api';
const apK = '68571fa3318d693c23babe17a0f395d2';
const hash = 'df45171d7289fb5a9be86ac338f57d83';
class CharacterService {
	list(name?: string) {
		return api.get(
			`v1/public/characters?apikey=${apK}&ts=1&hash=${hash}${
				name ? `&name=${name}` : ''
			}`,
		);
	}
}
const char = new CharacterService();
export default char;
