/** 随机生成适合发光球展示的 HSL 颜色 */
export function randomOrbColor(): string {
  const hue = Math.floor(Math.random() * 360);
  const saturation = 58 + Math.floor(Math.random() * 32);
  const lightness = 58 + Math.floor(Math.random() * 18);
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}
