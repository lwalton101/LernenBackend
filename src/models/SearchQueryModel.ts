export interface SearchQueryModel {
    SearchQuery: string,
    Users: boolean,
    Questions: boolean,
    maxDifficulty: number,
    minDifficulty: number,
    maxReadability: number,
    minReadability: number,
    tags: string[]
}