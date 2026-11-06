import { describe, expect, it } from 'vitest';
import { QUESTIONS, QUESTION_COUNT } from './questions/index.js';
import { CHAPTERS } from './chapters.js';
import { HUB } from './hub.js';

describe('ngân hàng câu hỏi', () => {
  it('có 120 câu, mỗi chương 20 câu', () => {
    expect(QUESTION_COUNT).toBe(120);
    expect(QUESTIONS).toHaveLength(120);
    for (const chapter of CHAPTERS) {
      const count = QUESTIONS.filter((question) => question.chapter === chapter.id).length;
      expect(count, `chương ${chapter.id}`).toBe(20);
    }
  });

  it('id không trùng và mang đúng tiền tố chương', () => {
    const ids = QUESTIONS.map((question) => question.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const question of QUESTIONS) {
      expect(question.id.startsWith(`c${question.chapter}-`)).toBe(true);
    }
  });

  it('mỗi câu có bốn phương án khác nhau và đúng một đáp án', () => {
    for (const question of QUESTIONS) {
      expect(question.options, question.id).toHaveLength(4);
      expect(new Set(question.options).size, question.id).toBe(4);
      expect(question.answer, question.id).toBeGreaterThanOrEqual(0);
      expect(question.answer, question.id).toBeLessThan(4);
    }
  });

  it('lời giải khớp đúng thứ tự phương án: đúng ở đáp án, sai ở phần còn lại', () => {
    for (const question of QUESTIONS) {
      expect(question.why, question.id).toHaveLength(4);
      expect(question.why[question.answer].startsWith('Đúng'), `${question.id} đáp án`).toBe(true);
      question.why.forEach((text, index) => {
        if (index === question.answer) return;
        expect(text.startsWith('Sai'), `${question.id} phương án ${index}`).toBe(true);
      });
    }
  });

  it('câu nào cũng có mẹo loại trừ và lời giải đủ dài', () => {
    for (const question of QUESTIONS) {
      expect(question.tip.length, question.id).toBeGreaterThan(10);
      for (const text of question.why) {
        expect(text.length, question.id).toBeGreaterThan(10);
      }
    }
  });

  it('không dùng chữ "đáp án đúng" trong đề và không có chương ngoài danh sách', () => {
    const text = QUESTIONS.map((question) => `${question.stem} ${question.options.join(' ')}`).join(' ');
    expect(text.toLowerCase()).not.toContain('đáp án đúng');
    for (const question of QUESTIONS) {
      expect(CHAPTERS.some((chapter) => chapter.id === question.chapter), question.id).toBe(true);
    }
  });
});

describe('Knowledge Hub', () => {
  it('mỗi chương có ít nhất ba phạm trù, mọi phạm trù đủ bốn phần', () => {
    for (const chapter of CHAPTERS) {
      const entries = HUB.filter((entry) => entry.chapter === chapter.id);
      expect(entries.length, `chương ${chapter.id}`).toBeGreaterThanOrEqual(3);
    }
    for (const entry of HUB) {
      expect(entry.term.length).toBeGreaterThan(5);
      expect(entry.quote.length).toBeGreaterThan(20);
      expect(entry.plain.length).toBeGreaterThan(20);
      expect(entry.conclusion.length).toBeGreaterThan(20);
      expect(entry.example.length).toBeGreaterThan(20);
    }
  });

  it('phạm trù được chương tham chiếu đều tồn tại', () => {
    const ids = new Set(HUB.map((entry) => entry.id));
    for (const chapter of CHAPTERS) {
      for (const term of chapter.terms) {
        expect(ids.has(term), `${chapter.slug} → ${term}`).toBe(true);
      }
    }
  });
});
