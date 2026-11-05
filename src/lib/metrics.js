export const STORAGE_KEY = 'sap122:progress:v1';

/**
 * Mô hình tiến độ: mỗi chương có ba bước (hiểu, ví dụ, tự kiểm tra).
 * Chỉ ghi "hoàn thành" khi đã qua đủ ba bước và đã xem kết quả bài tự kiểm tra —
 * không tính việc mở trang là đã học xong.
 */
export const EMPTY_PROGRESS = { stages: {}, quizBest: null, quizAttempts: 0 };

export const CHAPTER_STEPS = [
  { id: 'hieu', label: 'Hiểu ý chính' },
  { id: 'vi-du', label: 'Xem ví dụ' },
  { id: 'tu-kiem-tra', label: 'Tự kiểm tra' },
];

export function chapterProgress(progress, chapter) {
  const raw = progress?.stages?.[chapter.id] ?? {};
  const hieu = raw.hieu === true;
  const viDu = raw['vi-du'] === true;
  const kiemTra = typeof raw['tu-kiem-tra'] === 'number' ? raw['tu-kiem-tra'] : null;
  const count = [hieu, viDu, kiemTra !== null].filter(Boolean).length;

  return { hieu, viDu, kiemTra, count, done: count === 3 };
}

export function chapterStatus(progress, chapter) {
  const state = chapterProgress(progress, chapter);

  if (state.done) {
    return { type: 'success', label: `${state.kiemTra}/${chapter.quiz.length} câu đúng` };
  }
  if (state.count === 0) {
    return { type: 'pending', label: 'Chưa bắt đầu' };
  }
  return { type: 'progress', label: `Đang ở bước ${state.count + 1}` };
}

export function completedCount(progress, chapters) {
  return chapters.filter((chapter) => chapterProgress(progress, chapter).done).length;
}

/** Đọc dữ liệu cũ (chỉ có `read`) rồi chuyển sang dạng ba bước. */
export function migrateProgress(parsed) {
  if (!parsed || typeof parsed !== 'object') return EMPTY_PROGRESS;

  const stages = { ...(parsed.stages ?? {}) };
  Object.entries(parsed.read ?? {}).forEach(([id, value]) => {
    if (value && !stages[id]) stages[id] = { hieu: true };
  });

  return {
    stages,
    quizBest: typeof parsed.quizBest === 'number' ? parsed.quizBest : null,
    quizAttempts: Number(parsed.quizAttempts) || 0,
  };
}

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
