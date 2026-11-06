import chapter1 from './chapter-1';
import chapter2 from './chapter-2';
import chapter3 from './chapter-3';
import chapter4 from './chapter-4';
import chapter5 from './chapter-5';
import chapter6 from './chapter-6';

// Số chương được gắn ở đây thay vì lặp lại trong từng câu: id đã mang tiền tố c1..c6.
const BY_CHAPTER = [
  [1, chapter1],
  [2, chapter2],
  [3, chapter3],
  [4, chapter4],
  [5, chapter5],
  [6, chapter6],
];

export const QUESTIONS = BY_CHAPTER.flatMap(([chapter, list]) =>
  list.map((question) => ({ ...question, chapter })),
);

export const QUESTION_COUNT = QUESTIONS.length;
