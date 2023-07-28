export function getWordInParentheses(inputString: string) {
  const regex = /\((.*?)\)/;
  const match = RegExp(regex).exec(inputString);

  if (match !== null) {
    return match[1];
  } else {
    return inputString;
  }
}

export function getTextOutsideParenthesis(inputString: string) {
  const regex = /\((.*?)\)/;
  const match = RegExp(regex).exec(inputString);

  if (match !== null) {
    return inputString.replace(match[0], '').trim();
  } else {
    return inputString.trim();
  }
}

interface Thumbnail {
  path: string;
  extension: string;
}

export function getThumbnailContent(thumbnail: Thumbnail) {
  return !thumbnail?.path.includes('image_not_available')
    ? `${thumbnail?.path}.${thumbnail?.extension}`
    : 'https://res.cloudinary.com/domwy2hmn/image/upload/v1690520142/marvel-logo_sta7ve.png';
}

export function getMetadataInfo(
  name: string,
  description: string,
  image: string,
  id: string
) {
  return {
    title: `${name} | Marvel Heroes`,
    description: description || 'This character does not have a description.',
    openGraph: {
      title: `${name} | Marvel Heroes`,
      description: description || 'This character does not have a description.',
      type: 'website',
      locale: 'pt-BR',
      url: `https://marvel-heroes.vercel.app/${id}`,
      images: [
        {
          url: image,
          width: 800,
          height: 600,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${name} | Marvel Heroes`,
      description: description || 'This character does not have a description.',
    },
  };
}
