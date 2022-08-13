export class Parser {
    static pagination(offset: any) {
        return Object.freeze({
            offset: parseInt(offset)
        })
    }
}