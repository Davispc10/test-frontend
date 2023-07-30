import type { Metadata } from 'next'

interface IMeatadate {
  common?: {
    siteName?: string
    title?: string
    description?: string
    imagemUrl?: string
    url?: string
  },
  meta?: Metadata
}

export function customMetadata({ common, meta }: IMeatadate): Metadata {

  let siteName = 'Marvel Heroes'
  let title = 'Marvel Heroes - Collection of Mervel Heroes'
  let description =
    'Marvel Heroes - Collection of Mervel Heroes, search, characters, series'
  let imagemUrl = '/imgs/social.png'
  let url = "https://google.com"

  const defaultMeta: Metadata = {
    manifest: "/manifest.json?v=1",
    title: common?.title ? common.title : title,
    icons: {
      icon: "/favicon.ico?v=1",
      apple: "/icons/icon192.png?v2"
    },
    bookmarks: common?.url ? common.url : url,
    themeColor: "#202020",
    viewport: {
      width: "device-width",
      initialScale: 1,
      minimumScale: 1,
      maximumScale: 5
    },
    description: common?.description ? common.description : description,
    other: {
      "apple-mobile-web-app-capable": "yes",
      "apple-mobile-web-app-status-bar-style": "black",
      "msvalidate.01": "81683EFDA66EF8B29045BBAF04D02DBD"
    },
    openGraph: {
      type: "website",
      title: common?.title ? common.title : title,
      description: common?.description ? common.description : description,
      siteName: common?.siteName ? common.siteName : siteName,
      url: common?.url ? common.url : url,
      images: common?.imagemUrl ? common.imagemUrl : imagemUrl,
      locale: 'en_US',
    },
    verification: {
      google: "imEmJjnY8LRB_gCyQpOHG1E6dLgt7_SySHboWMsERho",
      yandex: "4f9b0c39a84d2204"
    },
    robots: {
      index: true,
      follow: true,
      nocache: true,
      googleBot: {
        index: true,
        follow: false,
        noimageindex: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }

  return { ...defaultMeta, ...meta }
}