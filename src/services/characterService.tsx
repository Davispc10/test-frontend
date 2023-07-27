import api from './api';
const apK = '68571fa3318d693c23babe17a0f395d2';
const hash = 'df45171d7289fb5a9be86ac338f57d83';
class CharacterService {
	list(name?: string, offset?: number) {
		return api.get(
			`v1/public/characters?apikey=${apK}&ts=1&hash=${hash}&offset=${offset}&limit=20${
				name ? `&name=${name}` : ''
			}`,
		);
	}
	getById(id: any) {
		return api.get(
			`v1/public/characters/${id}?apikey=${apK}&ts=1&hash=${hash}`,
		);
	}
}
const characterService = new CharacterService();

export default characterService;
