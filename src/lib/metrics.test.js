import { describe, expect, it } from 'vitest';
import { computeSurplus, chapterStatus, readCount } from './metrics';
import { course, receipt } from '../content/course';

describe('computeSurplus', () => {
  it('tách đúng c, v và m theo công thức m = giá bán - c - v', () => {
    const { c, v, m, rate } = computeSurplus({
      price: 45000,
      materials: 12000,
      depreciation: 6000,
      wage: 9000,
    });

    expect(c).toBe(18000);
    expect(v).toBe(9000);
    expect(m).toBe(18000);
    expect(rate).toBeCloseTo(200, 5);
  });

  it('trả về m âm khi bán dưới chi phí và không chia cho 0', () => {
    const negative = computeSurplus({ price: 20000, materials: 18000, depreciation: 0, wage: 9000 });
    expect(negative.m).toBe(-7000);
    expect(negative.shares.m).toBe(0);

    const noWage = computeSurplus({ price: 45000, materials: 18000, depreciation: 0, wage: 0 });
    expect(noWage.rate).toBe(0);
    expect(Number.isFinite(noWage.shares.c)).toBe(true);
  });
});

describe('chapterStatus và tiến độ', () => {
  const chapter = { id: 'chuong-1' };

  it('đánh dấu đã học khi có trong sổ tiến độ', () => {
    expect(chapterStatus({ read: { 'chuong-1': true } }, chapter).type).toBe('success');
    expect(chapterStatus({ read: {} }, chapter).type).toBe('pending');
  });

  it('đếm đúng số chương đã đọc', () => {
    expect(readCount({ read: { 'chuong-1': true, 'chuong-2': true } }, course.chapters)).toBe(2);
  });
});

describe('nội dung môn học', () => {
  it('có đủ sáu chương và không trùng id', () => {
    expect(course.chapters).toHaveLength(6);
    expect(new Set(course.chapters.map((chapter) => chapter.id)).size).toBe(6);
  });

  it('mỗi chương có khái niệm, flashcard và câu hỏi hợp lệ', () => {
    course.chapters.forEach((chapter) => {
      expect(chapter.concepts.length).toBeGreaterThanOrEqual(4);
      expect(chapter.flashcards.length).toBeGreaterThanOrEqual(2);
      expect(chapter.quiz.length).toBeGreaterThanOrEqual(2);

      chapter.quiz.forEach((question) => {
        expect(question.options.length).toBeGreaterThanOrEqual(3);
        expect(Number.isInteger(question.answer)).toBe(true);
        expect(question.options[question.answer]).toBeTruthy();
        expect(question.explain.length).toBeGreaterThan(10);
      });
    });
  });

  it('các dòng trong hoá đơn minh hoạ cộng lại đúng giá bán', () => {
    const total = receipt.lines.reduce((sum, line) => sum + line.value, 0);
    expect(total).toBe(receipt.price);
    expect(receipt.lines.map((line) => line.key).join('')).toBe('cvm');
  });
});
