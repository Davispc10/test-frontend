import { ComicsSchema } from './Comics.schema'
import { EventsSchema } from './Events.schema'
import { SeriesSchema } from './Series.schema'
import { StoriesSchema } from './Stories.schema'

export interface CharacterSchema {
  id: number
  name: string
  description: string
  modified: string
  thumbnail: {
    path: string
    extension: string
  }
  resourceURI: string
  comics: ComicsSchema
  series: SeriesSchema
  stories: StoriesSchema
  events: EventsSchema
  urls: {
    type: string
    url: string
  }[]
}
