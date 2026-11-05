import { describe, expect, it } from 'vitest';
import { CONCEPTS, TEXTBOOK, conceptById } from './concepts';
import { GROUPS, ITEMS, itemById, nextItem } from './items';

const ITEM_IDS = ['tra-sua', 'ao-thun', 'suat-an'];

describe('ba món', () => {
  it('có đủ ba món, mã và giá riêng', () => {
    expect(ITEMS.map((item) => item.id)).toEqual(ITEM_IDS);
    expect(new Set(ITEMS.map((item) => item.code)).size).toBe(3);
    ITEMS.forEach((item) => {
      expect(item.price).toBeGreaterThan(1000);
      expect(item.buckets).toHaveLength(7);
      expect(item.brief.length).toBeGreaterThan(60);
      expect(item.referenceNote.length).toBeGreaterThan(40);
      expect(item.takeaways.length).toBeGreaterThanOrEqual(2);
    });
  });

  it('mỗi món có đủ bốn nhóm và bảy khoản duy nhất', () => {
    ITEMS.forEach((item) => {
      const ids = item.buckets.map((bucket) => bucket.id);
      expect(new Set(ids).size).toBe(7);
      const groups = new Set(item.buckets.map((bucket) => bucket.group));
      ['c', 'v', 'm', 'ngoai'].forEach((group) => expect(groups.has(group)).toBe(true));
      item.buckets.forEach((bucket) => {
        expect(GROUPS[bucket.group]).toBeTruthy();
        expect(bucket.label.length).toBeGreaterThan(3);
        expect(bucket.hint.length).toBeGreaterThan(5);
      });
    });
  });

  it('khoảng tham chiếu hợp lệ và trung điểm cộng lại đúng 100', () => {
    ITEMS.forEach((item) => {
      let sum = 0;
      item.buckets.forEach((bucket) => {
        const [low, high] = bucket.reference;
        expect(low).toBeGreaterThan(0);
        expect(high).toBeGreaterThan(low);
        expect(high).toBeLessThanOrEqual(60);
        sum += (low + high) / 2;
      });
      expect(Math.round(sum)).toBe(100);
    });
  });

  it('chuỗi giá trị có bốn mắt, mỗi mắt nói rõ nhận phần nào', () => {
    ITEMS.forEach((item) => {
      expect(item.chain).toHaveLength(4);
      const actors = item.chain.map((link) => link.actor);
      expect(new Set(actors).size).toBe(4);
      item.chain.forEach((link) => {
        expect(link.takes.length).toBeGreaterThan(3);
        expect(link.note.length).toBeGreaterThan(30);
      });
    });
  });

  it('ba lựa chọn cắt 5% đều trỏ vào khoản có thật và nói rõ ai chịu', () => {
    ITEMS.forEach((item) => {
      expect(item.cut).toHaveLength(3);
      const bucketIds = new Set(item.buckets.map((bucket) => bucket.id));
      item.cut.forEach((option) => {
        expect(bucketIds.has(option.bucketId)).toBe(true);
        expect(option.title.length).toBeGreaterThan(3);
        expect(option.consequence.length).toBeGreaterThan(60);
      });
      expect(new Set(item.cut.map((option) => option.bucketId)).size).toBe(3);
    });
  });
});

describe('phần kiến thức', () => {
  it('có tám phạm trù, mỗi phạm trù có trích dẫn và nguồn', () => {
    expect(CONCEPTS).toHaveLength(8);
    CONCEPTS.forEach((concept) => {
      expect(concept.quote.length).toBeGreaterThan(40);
      expect(concept.plain.length).toBeGreaterThan(60);
      expect(concept.conclusion.length).toBeGreaterThan(40);
      expect(TEXTBOOK.title).toContain('Kinh tế chính trị');
    });
  });

  it('mỗi phạm trù được ứng dụng vào cả ba món', () => {
    CONCEPTS.forEach((concept) => {
      ITEM_IDS.forEach((id) => {
        expect(concept.applications[id], `${concept.id} thiếu ứng dụng cho ${id}`).toBeTruthy();
        expect(concept.applications[id].length).toBeGreaterThan(50);
      });
    });
  });

  it('mỗi món dẫn tới bốn phạm trù có thật', () => {
    ITEMS.forEach((item) => {
      expect(item.concepts).toHaveLength(4);
      item.concepts.forEach((id) => expect(conceptById(id)).toBeTruthy());
    });
  });

  it('không đánh số chương ở bất kỳ đâu', () => {
    const everything = JSON.stringify({ ITEMS, CONCEPTS });
    expect(everything).not.toMatch(/chương\s*\d/i);
    expect(everything).not.toMatch(/\bch\.\s*\d/i);
  });

  it('không có chỗ nào ghi đáp án đúng', () => {
    const everything = JSON.stringify({ ITEMS, CONCEPTS });
    expect(everything).not.toMatch(/isCorrect|đáp án đúng/i);
  });
});

describe('tra cứu', () => {
  it('tìm món theo id và món kế tiếp', () => {
    expect(itemById('ao-thun').name).toBe('Áo thun có thương hiệu');
    expect(itemById('khong-co')).toBeNull();
    expect(nextItem('tra-sua').id).toBe('ao-thun');
    expect(nextItem('suat-an')).toBeNull();
  });
});
