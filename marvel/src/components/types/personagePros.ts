interface ItemsProps {
  name: string
  resourceURI: string
}

type ListItemsProps = ItemsProps[]

interface ComicsEventsProps {
  avaliable: number
  collectionURI: string
  items: ListItemsProps
  returned: number
}

type ListSeriesStoriesComicsEventsProps = ComicsEventsProps[]

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
  comics: ListSeriesStoriesComicsEventsProps
  modified: string
  name: string
  resourceURI: string
  events: ListSeriesStoriesComicsEventsProps
  stories: ListSeriesStoriesComicsEventsProps
  series: ListSeriesStoriesComicsEventsProps
  thumbnail: ThumbnailProps
  urls: ListUrlsProps
}

type ListPersonageProps = PersonageProps[]

export type {
  ListPersonageProps,
  ListSeriesStoriesComicsEventsProps,
  ThumbnailProps,
  PersonageProps,
  ComicsEventsProps,
  ListItemsProps,
  ItemsProps,
}
