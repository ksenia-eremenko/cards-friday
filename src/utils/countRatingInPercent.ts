export function countRatingInPercent (currentRating: number, maxRating: number) {
    return Math.round(currentRating * 100 / maxRating);
}
