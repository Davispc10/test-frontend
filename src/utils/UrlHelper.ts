export class UrlHelper {
    static readonly urlBase = `${process.env.baseUrl}`
    static readonly authApi = `ts=${process.env.timeStamp}&apikey=${process.env.apiKeyPublic}&hash=${process.env.hash}`
}