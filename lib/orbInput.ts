const PUNCTUATION_RE =
  /[，。！？、；：""''（）【】《》…—·,.!?;:'"()[\]{}<>/\\|@#$%^&*~`+=_\-]/;

/** 标点、空白等不参与抽字；其余字符（含中文）均可 */
export function isOrbNameChar(char: string): boolean {
  if (!char || /\s/.test(char)) return false;
  return !PUNCTUATION_RE.test(char);
}

export function canSubmitOrb(text: string): boolean {
  const trimmed = text.trim();
  if (!trimmed) return false;
  return pickOrbNameFromText(trimmed) !== null;
}

/**
 * 从正文中随机抽取相邻两字作为光球名；跳过标点。
 * 若有效字只有一字，则返回该字。
 */
export function pickOrbNameFromText(text: string): string | null {
  const trimmed = text.trim();
  if (!trimmed) return null;

  const chars = [...trimmed];
  const pairs: string[] = [];

  for (let i = 0; i < chars.length - 1; i++) {
    if (isOrbNameChar(chars[i]) && isOrbNameChar(chars[i + 1])) {
      pairs.push(chars[i] + chars[i + 1]);
    }
  }

  if (pairs.length > 0) {
    return pairs[Math.floor(Math.random() * pairs.length)];
  }

  const singles = chars.filter(isOrbNameChar);
  if (singles.length === 1) return singles[0];
  if (singles.length > 1) {
    return singles[Math.floor(Math.random() * singles.length)];
  }

  return null;
}
