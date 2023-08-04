interface CharacterRepositoryProps {
    page: number;
}

interface CharacterControllerProps { 
    all:  (page: number) => Promise<any>;
    find: (name: string) => Promise<any>;
    findByOne: (name: string) => Promise<any>;
    findComicById: (name: string) => Promise<any>;
}

export type { 
    CharacterRepositoryProps,
    CharacterControllerProps
}