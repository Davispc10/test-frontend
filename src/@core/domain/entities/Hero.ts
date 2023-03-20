export type Thumbnail = {
    path: string;
    extension: string;
};

export type Comics = {
    available: number;
    returned: number;
    items: [
        {
            resourceURI: string;
            name: string;
        }
    ];
}

export type HeroProps = {
    id: number;
    name: string;
    description: string;
    modified: Date;
    resourceURI: string;
    thumbnail: Thumbnail;
    comics: Comics;
}
  
  export class Hero {
    constructor(public props: HeroProps) { }
  
    get id() {
      return this.props.id;
    }
  
    get name() {
      return this.props.name;
    }
  
    get description() {
      return this.props.description;
    }
  
    get modified() {
      return this.props.modified;
    }
  
    get thumbnail() {
      return this.props.thumbnail;
    }
  }