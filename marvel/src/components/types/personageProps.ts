interface ItemsProps {
  name: string
  resourceURI: string
}

type ListItemsProps = ItemsProps[]

interface SeriesStoriesComicsEventsProps {
  avaliable: number
  collectionURI: string
  items: ListItemsProps
  returned: number
}

interface ThumbnailProps {
  extension: string
  path: string
}

interface UrlProps {
  type: string
  url: string
}

type ListUrlsProps = UrlProps[]

interface PersonageProps {
  readonly id: number
  description: string
  comics: SeriesStoriesComicsEventsProps
  modified: string
  name: string
  resourceURI: string
  events: SeriesStoriesComicsEventsProps
  stories: SeriesStoriesComicsEventsProps
  series: SeriesStoriesComicsEventsProps
  thumbnail: ThumbnailProps
  urls: ListUrlsProps
}

type ListPersonageProps = PersonageProps[]

export type {
  ListPersonageProps,
  SeriesStoriesComicsEventsProps,
  ThumbnailProps,
  PersonageProps,
  ListItemsProps,
  ItemsProps,
}
