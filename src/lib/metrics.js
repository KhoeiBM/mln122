export const STORAGE_KEY = 'sap122:progress:v1';

export const EMPTY_PROGRESS = { read: {}, quizBest: null, quizAttempts: 0 };

/**
 * Tính c, v, m và tỷ suất thặng dư từ tham số một sản phẩm.
 * m = giá bán - (nguyên liệu + khấu hao) - tiền công
 */
export function computeSurplus({ price, materials, depreciation, wage }) {
  const c = Math.max(0, Number(materials) || 0) + Math.max(0, Number(depreciation) || 0);
  const v = Math.max(0, Number(wage) || 0);
  const m = (Number(price) || 0) - c - v;
  const rate = v > 0 ? (m / v) * 100 : 0;
  const total = Math.max(c + v + Math.max(m, 0), 1);

  return {
    c,
    v,
    m,
    rate,
    shares: {
      c: (c / total) * 100,
      v: (v / total) * 100,
      m: (Math.max(m, 0) / total) * 100,
    },
  };
}

export function chapterStatus(progress, chapter) {
  if (progress?.read?.[chapter.id]) {
    return { type: 'success', label: 'Đã đánh dấu' };
  }
  return { type: 'pending', label: 'Chưa học' };
}

export function readCount(progress, chapters) {
  return chapters.filter((chapter) => progress?.read?.[chapter.id]).length;
}
