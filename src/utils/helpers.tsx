const descriptionVerifier = (description: string) => {
	if (description) {
		return `${description.substring(9, 150)}...`;
	} else {
		return "There's no description";
	}
};

const thumbnailVerifier = (thumbnail: string) => {
	if (thumbnail.includes('image_not_available')) {
		return '/images/logo.svg';
	}
	return thumbnail;
};

export { thumbnailVerifier, descriptionVerifier };
