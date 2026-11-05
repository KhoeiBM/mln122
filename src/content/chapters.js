// Sáu chương của MLN122 (Kinh tế chính trị Mác – Lênin), Đại học FPT.
// Dùng để gắn nhãn chương cho từng mốc lịch sử và từng phạm trù trong kịch bản.

export const CHAPTERS = [
  {
    n: 1,
    title: 'Đối tượng, phương pháp nghiên cứu và chức năng của kinh tế chính trị Mác – Lênin',
  },
  { n: 2, title: 'Hàng hoá, tiền tệ và thị trường' },
  { n: 3, title: 'Giá trị thặng dư trong nền kinh tế thị trường' },
  { n: 4, title: 'Cạnh tranh và độc quyền trong nền kinh tế thị trường' },
  {
    n: 5,
    title:
      'Kinh tế thị trường định hướng xã hội chủ nghĩa và các quan hệ lợi ích kinh tế ở Việt Nam',
  },
  {
    n: 6,
    title: 'Công nghiệp hoá, hiện đại hoá và hội nhập kinh tế quốc tế của Việt Nam',
  },
];

export function chapterTitle(n) {
  const found = CHAPTERS.find((chapter) => chapter.n === n);
  return found ? found.title : '';
}

export function chapterLabel(n) {
  return `Chương ${n}`;
}
