const colors: [number, number, number][] = [
  [156, 169, 175], // RGB(156, 169, 175)
  [205, 197, 174], // RGB(205, 197, 174)
  // [241, 190, 100], // RGB(241, 190, 100)
  [182, 187, 185], // RGB(182, 187, 185)
  [145, 163, 170], // RGB(145, 163, 170)
];

// Функция для случайного выбора цвета
// function getRandomColor(colors: [number, number, number][]): [number, number, number] {
export function getRandomColor(): string {
  const randomIndex = Math.floor(Math.random() * colors.length);
  const randomColor = colors[randomIndex];
  return `RGB(${randomColor[0]},${randomColor[1]}, ${randomColor[2]})`;
}
