/**
 * Normalizes a string prior to query comparisons, by trimming leading and trailing whitespace,
 * collapsing multiple internal whitespace characters into a single space, converting to lowercase,
 * and normalizing into Unicode NFD normalization form in order to remove accents and diacritics.
 * @param {String} string String to be normalized.
 * @returns Normalized string.
 */
function normalizeString(string) {
  if (!string) {
    return ''
  }

  return string
    .trim()
    .replace(/\s+/g, ' ')
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
}

export default {
  normalizeString
}
