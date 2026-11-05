import { describe, expect, it } from 'vitest';
import { computeSurplus, chapterStatus, chapterProgress, completedCount, migrateProgress } from './metrics';
import { course, receipt } from '../content/course';

const chapter = { id: 'chuong-1', quiz: [{}, {}] };

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

describe('lộ trình ba bước của mỗi chương', () => {
  it('chưa bắt đầu thì chưa hoàn thành', () => {
    const progress = { stages: {} };
    expect(chapterProgress(progress, chapter).count).toBe(0);
    expect(chapterStatus(progress, chapter).type).toBe('pending');
  });

  it('chỉ hoàn thành khi đủ hiểu, ví dụ và đã xem kết quả tự kiểm tra', () => {
    const half = { stages: { 'chuong-1': { hieu: true, 'vi-du': true } } };
    expect(chapterStatus(half, chapter).type).toBe('progress');
    expect(chapterProgress(half, chapter).done).toBe(false);

    const full = { stages: { 'chuong-1': { hieu: true, 'vi-du': true, 'tu-kiem-tra': 2 } } };
    expect(chapterProgress(full, chapter).done).toBe(true);
    expect(chapterStatus(full, chapter).label).toBe('2/2 câu đúng');
  });

  it('điểm 0 vẫn tính là đã qua bước tự kiểm tra', () => {
    const progress = { stages: { 'chuong-1': { hieu: true, 'vi-du': true, 'tu-kiem-tra': 0 } } };
    expect(chapterProgress(progress, chapter).done).toBe(true);
  });

  it('đếm đúng số chương đã hoàn thành', () => {
    const progress = {
      stages: {
        'chuong-1': { hieu: true, 'vi-du': true, 'tu-kiem-tra': 2 },
        'chuong-2': { hieu: true },
      },
    };
    expect(completedCount(progress, course.chapters)).toBe(1);
  });

  it('chuyển dữ liệu cũ sang dạng ba bước', () => {
    const migrated = migrateProgress({ read: { 'chuong-3': true }, quizBest: 9, quizAttempts: 2 });
    expect(migrated.stages['chuong-3']).toEqual({ hieu: true });
    expect(migrated.quizBest).toBe(9);
    expect(migrated.quizAttempts).toBe(2);
  });
});

describe('nội dung môn học', () => {
  it('có đủ sáu chương và không trùng id', () => {
    expect(course.chapters).toHaveLength(6);
    expect(new Set(course.chapters.map((item) => item.id)).size).toBe(6);
  });

  it('mỗi chương có khái niệm, thẻ ghi nhớ và câu hỏi hợp lệ', () => {
    course.chapters.forEach((item) => {
      expect(item.concepts.length).toBeGreaterThanOrEqual(4);
      expect(item.flashcards.length).toBeGreaterThanOrEqual(2);
      expect(item.quiz.length).toBeGreaterThanOrEqual(2);

      item.quiz.forEach((question) => {
        expect(question.options.length).toBeGreaterThanOrEqual(3);
        expect(Number.isInteger(question.answer)).toBe(true);
        expect(question.options[question.answer]).toBeTruthy();
        expect(question.explain.length).toBeGreaterThan(10);
      });
    });
  });

  it('các dòng trong bảng giá cộng lại đúng giá bán', () => {
    const total = receipt.lines.reduce((sum, line) => sum + line.value, 0);
    expect(total).toBe(receipt.price);
    expect(receipt.lines.map((line) => line.key).join('')).toBe('cvm');
  });
});
