// Cách chia giá bán thành bảy khoản, và các phép tính rút ra từ cách chia đó.
// Toàn bộ là hàm thuần để kiểm thử được mà không cần trình duyệt.

export const STORAGE_KEY = 'boc-gia:v1';
export const NOTE_MIN = 80;

export function emptyProgress() {
  return { items: {} };
}

export function emptySplit() {
  return {};
}

export function itemState(progress, id) {
  const raw = progress && progress.items ? progress.items[id] : null;
  if (!raw) {
    return { split: {}, revealed: false, chainSeen: false, cut: null, note: '', cutConsequenceSeen: false };
  }
  const split = {};
  if (raw.split && typeof raw.split === 'object') {
    for (const [key, value] of Object.entries(raw.split)) {
      if (Number.isFinite(value) && value > 0) split[key] = Math.round(value);
    }
  }
  return {
    split,
    revealed: raw.revealed === true,
    chainSeen: raw.chainSeen === true,
    cut: typeof raw.cut === 'string' ? raw.cut : null,
    note: typeof raw.note === 'string' ? raw.note : '',
    cutConsequenceSeen: raw.cutConsequenceSeen === true,
  };
}

function withState(progress, id, state) {
  return { ...progress, items: { ...(progress.items || {}), [id]: state } };
}

export function filledPercent(split) {
  return Object.values(split || {}).reduce((sum, value) => sum + (Number.isFinite(value) ? value : 0), 0);
}

export function remainingPercent(split) {
  return Math.max(0, 100 - filledPercent(split));
}

// Đặt một khoản về giá trị mong muốn, nhưng không đẩy tổng vượt 100.
export function setBucket(progress, item, bucketId, value) {
  const state = itemState(progress, item.id);
  if (!item.buckets.some((bucket) => bucket.id === bucketId)) return progress;
  const others = filledPercent(state.split) - (state.split[bucketId] || 0);
  const allowed = Math.max(0, Math.min(100, Math.round(value), 100 - others));
  const split = { ...state.split, [bucketId]: allowed };
  if (allowed === 0) delete split[bucketId];
  return withState(progress, item.id, { ...state, split });
}

export function adjustBucket(progress, item, bucketId, delta) {
  const state = itemState(progress, item.id);
  const current = state.split[bucketId] || 0;
  return setBucket(progress, item, bucketId, current + delta);
}

export function resetSplit(progress, item) {
  const state = itemState(progress, item.id);
  return withState(progress, item.id, { ...state, split: {}, revealed: false });
}

export function markRevealed(progress, item) {
  const state = itemState(progress, item.id);
  if (filledPercent(state.split) < 100) return progress;
  return withState(progress, item.id, { ...state, revealed: true });
}

export function markChainSeen(progress, item) {
  const state = itemState(progress, item.id);
  return withState(progress, item.id, { ...state, chainSeen: true });
}

export function chooseCut(progress, item, bucketId) {
  const state = itemState(progress, item.id);
  return withState(progress, item.id, {
    ...state,
    cut: bucketId,
    cutConsequenceSeen: item.cut.some((option) => option.bucketId === bucketId),
  });
}

export function saveNote(progress, item, text) {
  const state = itemState(progress, item.id);
  return withState(progress, item.id, { ...state, note: typeof text === 'string' ? text : '' });
}

export function resetItem(progress, item) {
  const items = { ...(progress.items || {}) };
  delete items[item.id];
  return { ...progress, items };
}

// --- các phép tính của phần "mở kết quả" ---------------------------------

export function midpoints(item) {
  const result = {};
  item.buckets.forEach((bucket) => {
    result[bucket.id] = (bucket.reference[0] + bucket.reference[1]) / 2;
  });
  return result;
}

export function groupTotals(item, split) {
  const totals = { c: 0, v: 0, m: 0, ngoai: 0 };
  item.buckets.forEach((bucket) => {
    const value = split[bucket.id] || 0;
    totals[bucket.group] += value;
  });
  return totals;
}

// m′ = m/v × 100%. Trả về null khi chưa có v, vì phép chia không xác định.
export function surplusRate(totals) {
  if (!totals || !totals.v) return null;
  return (totals.m / totals.v) * 100;
}

export function laborShare(totals) {
  const base = totals.c + totals.v + totals.m;
  if (!base) return null;
  return (totals.v / base) * 100;
}

export function deviations(item, split) {
  const reference = midpoints(item);
  return item.buckets.map((bucket) => ({
    id: bucket.id,
    label: bucket.label,
    group: bucket.group,
    value: split[bucket.id] || 0,
    reference: reference[bucket.id],
    delta: (split[bucket.id] || 0) - reference[bucket.id],
    insideRange:
      (split[bucket.id] || 0) >= bucket.reference[0] && (split[bucket.id] || 0) <= bucket.reference[1],
  }));
}

export function amountOf(price, percent) {
  return Math.round((price * percent) / 100);
}

export function isComplete(state) {
  return (
    filledPercent(state.split) === 100 &&
    state.revealed &&
    state.chainSeen &&
    Boolean(state.cut) &&
    state.note.trim().length >= NOTE_MIN
  );
}

export function itemStatus(progress, item) {
  const state = itemState(progress, item.id);
  const filled = filledPercent(state.split);
  if (isComplete(state)) {
    return { key: 'xong', label: 'Đã bóc xong', filled };
  }
  if (filled === 0 && !state.revealed) {
    return { key: 'chua-mo', label: 'Chưa bóc', filled };
  }
  if (filled < 100) {
    return { key: 'dang-boc', label: `Đang bóc ${filled}%`, filled };
  }
  return { key: 'dang-boc', label: 'Đã chia đủ, chưa xong', filled };
}

export function completedCount(progress, items) {
  return items.filter((item) => isComplete(itemState(progress, item.id))).length;
}

// Định dạng tiền cố định, không phụ thuộc ICU của môi trường.
export function formatVnd(value) {
  const rounded = Math.round(Number(value) || 0);
  const grouped = String(Math.abs(rounded)).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `${rounded < 0 ? '-' : ''}${grouped}đ`;
}

export function formatPercent(value) {
  if (value === null || value === undefined || Number.isNaN(value)) return '—';
  return `${Math.round(value)}%`;
}

export function migrate(raw) {
  if (!raw || typeof raw !== 'object' || !raw.items || typeof raw.items !== 'object') {
    return emptyProgress();
  }
  const progress = emptyProgress();
  for (const id of Object.keys(raw.items)) {
    progress.items[id] = itemState({ items: { [id]: raw.items[id] } }, id);
  }
  return progress;
}
