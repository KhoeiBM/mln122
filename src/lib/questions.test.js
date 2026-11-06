import { describe, expect, it } from 'vitest';
import {
  chapterCounts,
  chapterProgress,
  correctTotal,
  isCorrect,
  nextUnanswered,
  overallProgress,
  questionsByChapter,
  selectQuiz,
  weakestChapter,
} from './questions';
import { QUESTIONS } from '../content/questions';
import { CHAPTERS } from '../content/chapters';

describe('chọn câu', () => {
  it('lấy đúng số câu yêu cầu và tất định theo seed', () => {
    const a = selectQuiz({ chapter: 'all', count: 10, seed: 42 });
    const b = selectQuiz({ chapter: 'all', count: 10, seed: 42 });
    expect(a).toHaveLength(10);
    expect(a.map((q) => q.id)).toEqual(b.map((q) => q.id));
    expect(new Set(a.map((q) => q.id)).size).toBe(10);
  });

  it('lọc theo chương và lấy hết khi count = 0', () => {
    const all = selectQuiz({ chapter: 3, count: 0, seed: 7 });
    expect(all).toHaveLength(20);
    expect(all.every((q) => q.chapter === 3)).toBe(true);
  });

  it('hai seed khác nhau cho thứ tự khác nhau', () => {
    const a = selectQuiz({ count: 10, seed: 1 }).map((q) => q.id);
    const b = selectQuiz({ count: 10, seed: 999 }).map((q) => q.id);
    expect(a).not.toEqual(b);
  });

  it('chấm điểm theo chỉ số đáp án', () => {
    const question = QUESTIONS[0];
    expect(isCorrect(question, question.answer)).toBe(true);
    expect(isCorrect(question, (question.answer + 1) % 4)).toBe(false);
  });
});

describe('tiến độ', () => {
  const answered = { 'c1-q01': 'correct', 'c1-q02': 'wrong', 'c2-q01': 'correct' };

  it('đếm số câu đã làm và số câu đúng', () => {
    expect(overallProgress(answered)).toMatchObject({ total: 120, done: 3, correct: 2, percent: 3 });
    expect(correctTotal(answered)).toBe(2);
  });

  it('tính tiến độ từng chương', () => {
    const rows = chapterProgress(answered);
    expect(rows).toHaveLength(CHAPTERS.length);
    expect(rows[0]).toMatchObject({ total: 20, done: 2, correct: 1, percent: 10 });
    expect(rows[2]).toMatchObject({ done: 0 });
  });

  it('chương yếu nhất chỉ xét chương đã làm', () => {
    expect(weakestChapter({})).toBeNull();
    const weak = weakestChapter({ 'c3-q01': 'wrong', 'c3-q02': 'wrong', 'c1-q01': 'correct' });
    expect(weak.chapter.id).toBe(3);
  });

  it('gợi ý câu chưa làm đầu tiên', () => {
    expect(nextUnanswered({}).id).toBe(QUESTIONS[0].id);
    expect(nextUnanswered({ [QUESTIONS[0].id]: 'correct' }).id).toBe(QUESTIONS[1].id);
    const chapterTwo = nextUnanswered({}, 2);
    expect(chapterTwo.chapter).toBe(2);
  });

  it('đếm đủ câu mỗi chương khớp ngân hàng', () => {
    const rows = chapterCounts();
    expect(rows.reduce((sum, row) => sum + row.total, 0)).toBe(120);
    for (const row of rows) {
      expect(row.total).toBe(questionsByChapter(row.chapter.id).length);
    }
  });
});
