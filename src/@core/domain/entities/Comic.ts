export type ComicThumbnail = {
    path: string;
    extension: string;
  };

export type ComicItems = {
    resourceURI: string;
    name: string;
}
  
  export type ComicProps = {
    id: number;
    title: string;
    comic: {
        items: ComicItems[];
    }
    modified: Date;
    thumbnail: ComicThumbnail;
  };
  
  export class Comic {
    constructor(public props: ComicProps) {}
  
    get id() {
      return this.props.id;
    }
    
    get comic(): ComicItems[] {
        return this.comic;
    }

    get title() {
      return this.props.title;
    }
  
    get thumbnail() {
      return this.props.thumbnail;
    }
  
  }
  