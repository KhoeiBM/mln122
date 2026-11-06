// Chọn câu hỏi, chấm điểm và tính tiến độ theo chương. Toàn bộ là hàm thuần để kiểm
// thử được và để bản HTML máy chủ khớp với bản chạy trên máy người học.

import { QUESTIONS } from '../content/questions';
import { CHAPTERS } from '../content/chapters';

export const ALL_QUESTIONS = QUESTIONS;
export const TOTAL_QUESTIONS = QUESTIONS.length;

export function questionsByChapter(chapterId) {
  return QUESTIONS.filter((question) => question.chapter === Number(chapterId));
}

export function questionById(id) {
  return QUESTIONS.find((question) => question.id === id) || null;
}

export function chapterCounts() {
  return CHAPTERS.map((chapter) => ({
    chapter,
    total: questionsByChapter(chapter.id).length,
  }));
}

// Xáo trộn tất định: cùng một seed cho ra cùng thứ tự, nên máy chủ và máy khách không lệch.
function seededShuffle(items, seed) {
  let state = (seed || 1) >>> 0;
  const random = () => {
    state += 0x6d2b79f5;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const result = [...items];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function selectQuiz({ chapter = 'all', count = 10, seed = 1 } = {}) {
  const pool = chapter === 'all' ? [...QUESTIONS] : questionsByChapter(chapter);
  const picked = seededShuffle(pool, seed);
  if (!count || count >= picked.length) return picked;
  return picked.slice(0, count);
}

export function isCorrect(question, optionIndex) {
  return question.answer === optionIndex;
}

// answered: { [questionId]: 'correct' | 'wrong' }
export function answeredTotal(answered = {}) {
  return Object.keys(answered).length;
}

export function correctTotal(answered = {}) {
  return Object.values(answered).filter((state) => state === 'correct').length;
}

export function overallProgress(answered = {}) {
  const total = TOTAL_QUESTIONS;
  const done = answeredTotal(answered);
  const correct = correctTotal(answered);
  return {
    total,
    done,
    correct,
    percent: total ? Math.round((done / total) * 100) : 0,
    correctPercent: total ? Math.round((correct / total) * 100) : 0,
  };
}

export function chapterProgress(answered = {}) {
  return CHAPTERS.map((chapter) => {
    const total = questionsByChapter(chapter.id).length;
    const ids = questionsByChapter(chapter.id).map((question) => question.id);
    const done = ids.filter((id) => answered[id]).length;
    const correct = ids.filter((id) => answered[id] === 'correct').length;
    return {
      chapter,
      total,
      done,
      correct,
      percent: total ? Math.round((done / total) * 100) : 0,
      correctPercent: total ? Math.round((correct / total) * 100) : 0,
    };
  });
}

// Chương yếu nhất: chương đã làm nhưng tỷ lệ đúng thấp nhất; nếu chưa làm gì thì trả về null.
export function weakestChapter(answered = {}) {
  const rows = chapterProgress(answered).filter((row) => row.done > 0);
  if (!rows.length) return null;
  return rows.reduce((worst, row) =>
    row.correctPercent < worst.correctPercent ? row : worst,
  );
}

export function nextUnanswered(answered = {}, chapter = 'all') {
  const pool = chapter === 'all' ? QUESTIONS : questionsByChapter(chapter);
  return pool.find((question) => !answered[question.id]) || null;
}
