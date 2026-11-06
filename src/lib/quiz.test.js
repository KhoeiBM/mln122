import { describe, expect, it } from 'vitest';
import { buildMatchRound, buildQuiz, seededShuffle } from './quiz';
import { CONCEPTS } from '../content/concepts';
import { ITEMS, itemById } from '../content/items';
import { midpoints, groupTotals, surplusRate } from './split';

describe('câu hỏi trắc nghiệm', () => {
  const questions = buildQuiz(ITEMS);

  it('sinh bốn câu cho mỗi món và không trùng id', () => {
    expect(questions).toHaveLength(ITEMS.length * 4);
    expect(new Set(questions.map((q) => q.id)).size).toBe(questions.length);
  });

  it('mỗi câu có bốn phương án, đúng một đáp án, đều có giải thích', () => {
    for (const question of questions) {
      expect(question.options).toHaveLength(4);
      expect(question.options.filter((option) => option.correct)).toHaveLength(1);
      expect(new Set(question.options.map((option) => option.text)).size).toBe(4);
      expect(question.explain.length).toBeGreaterThan(20);
      for (const option of question.options) {
        expect(option.why.length).toBeGreaterThan(10);
      }
    }
  });

  it('câu về tư bản khả biến nhận đúng khoản lao động', () => {
    const question = questions.find((q) => q.id === 'tra-sua-v');
    const correct = question.options.find((option) => option.correct);
    const item = itemById('tra-sua');
    const labour = item.buckets.find((bucket) => bucket.group === 'v');
    expect(correct.text).toBe(labour.label);
  });

  it('câu về khoản lớn nhất khớp với khoảng tham chiếu', () => {
    const item = itemById('ao-thun');
    const reference = midpoints(item);
    const largest = item.buckets.reduce((best, bucket) =>
      reference[bucket.id] > reference[best.id] ? bucket : best,
    );
    const question = questions.find((q) => q.id === 'ao-thun-largest');
    expect(question.options.find((option) => option.correct).text).toBe(largest.label);
  });

  it('câu về m′ dùng đúng tỷ suất của khoảng tham chiếu', () => {
    const item = itemById('suat-an');
    const totals = groupTotals(item, midpoints(item));
    const expected = Math.max(5, Math.round(surplusRate(totals) / 5) * 5);
    const question = questions.find((q) => q.id === 'suat-an-rate');
    expect(question.options.find((option) => option.correct).text).toBe(`${expected}%`);
  });

  it('sinh câu hỏi tất định: hai lần gọi cho kết quả giống nhau', () => {
    expect(buildQuiz(ITEMS)).toEqual(questions);
  });
});

describe('lượt ghép cặp', () => {
  it('sáu cặp mỗi lượt, mỗi cặp một phạm trù với một món', () => {
    const round = buildMatchRound(CONCEPTS, ITEMS, 0);
    expect(round.pairs).toHaveLength(6);
    expect(new Set(round.pairs.map((p) => p.id)).size).toBe(6);
    for (const pair of round.pairs) {
      expect(pair.left.length).toBeGreaterThan(0);
      expect(pair.right.length).toBeGreaterThan(20);
      expect(pair.right).toBe(
        CONCEPTS.find((c) => c.id === pair.conceptId).applications[pair.itemId],
      );
    }
  });

  it('thứ tự cột phải là hoán vị của các cặp', () => {
    const round = buildMatchRound(CONCEPTS, ITEMS, 2);
    expect([...round.rightOrder].sort()).toEqual(round.pairs.map((p) => p.id).sort());
  });

  it('bốn lượt phủ hết 24 cặp phạm trù × món', () => {
    const seen = new Set();
    for (let round = 0; round < 4; round += 1) {
      buildMatchRound(CONCEPTS, ITEMS, round).pairs.forEach((pair) => seen.add(pair.id));
    }
    expect(seen.size).toBe(CONCEPTS.length * ITEMS.length);
  });

  it('xáo trộn tất định theo hạt giống', () => {
    const input = [1, 2, 3, 4, 5, 6, 7, 8];
    expect(seededShuffle(input, 7)).toEqual(seededShuffle(input, 7));
    expect(seededShuffle(input, 7)).not.toEqual(input);
    expect([...seededShuffle(input, 9)].sort()).toEqual(input);
  });
});
