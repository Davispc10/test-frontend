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
    : 'https://res.cloudinary.com/domwy2hmn/image/upload/v1690702305/marvel-logo_o4rgqz.jpg';
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

export const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

export const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str);
