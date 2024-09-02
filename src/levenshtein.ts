// Function to compute the Levenshtein distance between two strings
function levenshteinDistance(str1: string, str2: string): number {
    const len1 = str1.length;
    const len2 = str2.length;

    // Create a 2D array (matrix) to hold the distances
    // The matrix has (len1 + 1) rows and (len2 + 1) columns
    const dp: number[][] = Array.from(Array(len1 + 1), () => Array(len2 + 1).fill(0));

    // Initialize the first row and column of the matrix
    // The distance from an empty string to another string is the length of the other string
    for (let i = 0; i <= len1; i++) {
        dp[i][0] = i; // Distance from str1[0..i-1] to an empty str2
    }

    for (let j = 0; j <= len2; j++) {
        dp[0][j] = j; // Distance from an empty str1 to str2[0..j-1]
    }

    // Fill in the rest of the matrix
    for (let i = 1; i <= len1; i++) {
        for (let j = 1; j <= len2; j++) {
            // If the characters are the same, no extra cost is needed
            const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;

            // The current cell's value is the minimum of:
            // 1. The value above (deletion) + 1
            // 2. The value to the left (insertion) + 1
            // 3. The value diagonally above-left (substitution) + cost
            dp[i][j] = Math.min(
                dp[i - 1][j] + 1,       // Deletion
                dp[i][j - 1] + 1,       // Insertion
                dp[i - 1][j - 1] + cost // Substitution
            );
        }
    }

    // The bottom-right cell of the matrix contains the Levenshtein distance
    return dp[len1][len2];
}