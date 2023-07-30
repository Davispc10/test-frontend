const thumbnailVerifier = (thumbnail: string) => {
	if (thumbnail.includes('image_not_available')) {
		return '/images/logo.png';
	}
	return thumbnail;
};

const descriptionVerifier = (description: string, sub1 = 0, sub2 = 150) => {
	if (description) {
		return `${description.substring(sub1, sub2)}${sub2 === 150 ? '...' : ''}`;
	} else {
		return "There's no description.";
	}
};

export { thumbnailVerifier, descriptionVerifier };
