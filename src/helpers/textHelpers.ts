export function capitalizeFirstLetterOfEachWord(sentence: string): string {
    if (!sentence) return "";

    const words = sentence.split(" ").map(word =>
        word.charAt(0).toUpperCase() + word.slice(1)
    );

    return words.join(" ");
}
