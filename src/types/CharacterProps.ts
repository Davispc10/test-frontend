
interface Thumbnail {
path: string
extension: string
}

interface Comics {
available: number
collectionURI: string
items: Item[]
returned: number
}

interface Item {
resourceURI: string
name: string
}

interface Series {
available: number
collectionURI: string
items: Item2[]
returned: number
}

interface Item2 {
resourceURI: string
name: string
}

interface Stories {
available: number
collectionURI: string
items: Item3[]
returned: number
}

interface Item3 {
resourceURI: string
name: string
type: string
}

interface Events {
available: number
collectionURI: string
items: Item4[]
returned: number
}

interface Item4 {
resourceURI: string
name: string
}

interface Url {
type: string
url: string
}

interface CharacterProps {
    id: number
    name: string
    description: string
    modified: string
    thumbnail: Thumbnail
    resourceURI: string
    comics: Comics
    series: Series
    stories: Stories
    events: Events
    urls: Url[]
}

export type {
    CharacterProps,
    Comics,
    Item
}