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
    : 'https://static.vecteezy.com/ti/vetor-gratis/p3/19550621-download-dees-gratis-do-logotipo-da-marvel-gratis-vetor.jpg';
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

export function clipboardCopy(text: string) {
  navigator.clipboard.writeText(text);
}

export function shareOnTwitter(url: string, name: string) {
  window.open(
    `https://twitter.com/intent/tweet?url=Check the details of ${name} on ${url}`,
    'twitter-share-dialog',
    'width=800,height=600'
  );
}
