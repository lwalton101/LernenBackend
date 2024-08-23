export function checkIfDuplicateExists(arr: any[]) {
    return new Set(arr).size !== arr.length
}