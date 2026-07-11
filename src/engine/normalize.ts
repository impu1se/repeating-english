export function normalize(s: string): string {
  return s
    .toLowerCase()
    .replace(/[’‘ʼ`´]/g, "'") // smart punctuation (macOS/iOS) must not break apostrophe words
    .replace(/[^\p{L}\p{N}\s']/gu, ' ') // drop punctuation except apostrophes
    .replace(/\s+/g, ' ')
    .trim();
}

export function tokenize(s: string): string[] {
  const n = normalize(s);
  return n.length === 0 ? [] : n.split(' ');
}
