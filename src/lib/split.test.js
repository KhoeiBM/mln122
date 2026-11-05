import { describe, expect, it } from 'vitest';
import { itemById } from '../content/items';
import {
  NOTE_MIN,
  adjustBucket,
  amountOf,
  chooseCut,
  deviations,
  emptyProgress,
  filledPercent,
  formatPercent,
  formatVnd,
  groupTotals,
  isComplete,
  itemState,
  itemStatus,
  laborShare,
  markChainSeen,
  markRevealed,
  midpoints,
  migrate,
  remainingPercent,
  resetItem,
  saveNote,
  setBucket,
  surplusRate,
} from './split';

const TEA = itemById('tra-sua');

function splitTo(progress, mapping) {
  let next = progress;
  Object.entries(mapping).forEach(([bucketId, value]) => {
    next = setBucket(next, TEA, bucketId, value);
  });
  return next;
}

const FULL_SPLIT = {
  'nguyen-lieu': 30,
  'may-moc': 5,
  'mat-bang': 15,
  'lao-dong': 20,
  'thuong-hieu': 5,
  'loi-nhuan': 25,
};

describe('cách chia', () => {
  it('cộng dồn phần trăm và phần còn lại', () => {
    const progress = splitTo(emptyProgress(), { 'nguyen-lieu': 30, 'lao-dong': 20 });
    const state = itemState(progress, TEA.id);
    expect(filledPercent(state.split)).toBe(50);
    expect(remainingPercent(state.split)).toBe(50);
  });

  it('không cho tổng vượt 100%', () => {
    let progress = splitTo(emptyProgress(), { 'nguyen-lieu': 70, 'lao-dong': 20 });
    progress = setBucket(progress, TEA, 'lao-dong', 60);
    const state = itemState(progress, TEA.id);
    expect(filledPercent(state.split)).toBe(100);
    expect(state.split['lao-dong']).toBe(30);
  });

  it('tăng và giảm từng khoản, không xuống dưới 0', () => {
    let progress = splitTo(emptyProgress(), { 'may-moc': 5 });
    progress = adjustBucket(progress, TEA, 'may-moc', 5);
    expect(itemState(progress, TEA.id).split['may-moc']).toBe(10);
    progress = adjustBucket(progress, TEA, 'may-moc', -50);
    expect(itemState(progress, TEA.id).split['may-moc']).toBeUndefined();
  });

  it('bỏ qua khoản không thuộc món', () => {
    const progress = setBucket(emptyProgress(), TEA, 'khong-co', 10);
    expect(filledPercent(itemState(progress, TEA.id).split)).toBe(0);
  });
});

describe('gộp thành c, v, m', () => {
  it('cộng đúng theo nhóm của từng khoản', () => {
    const state = itemState(splitTo(emptyProgress(), FULL_SPLIT), TEA.id);
    const totals = groupTotals(TEA, state.split);
    expect(totals.c).toBe(50);
    expect(totals.v).toBe(20);
    expect(totals.m).toBe(30);
    expect(totals.ngoai).toBe(0);
  });

  it('tính m′ và phần giá bán trả cho lao động', () => {
    const state = itemState(splitTo(emptyProgress(), FULL_SPLIT), TEA.id);
    const totals = groupTotals(TEA, state.split);
    expect(surplusRate(totals)).toBe(150);
    expect(laborShare(totals)).toBeCloseTo(20, 5);
  });

  it('chưa có v thì m′ không xác định', () => {
    const state = itemState(splitTo(emptyProgress(), { 'nguyen-lieu': 100 }), TEA.id);
    expect(surplusRate(groupTotals(TEA, state.split))).toBeNull();
  });

  it('trung điểm tham chiếu của mỗi món cộng lại đúng 100', () => {
    const reference = midpoints(TEA);
    expect(Math.round(filledPercent(reference))).toBe(100);
  });

  it('so sánh từng khoản với khoảng tham chiếu', () => {
    const state = itemState(splitTo(emptyProgress(), FULL_SPLIT), TEA.id);
    const rows = deviations(TEA, state.split);
    expect(rows).toHaveLength(7);
    const materials = rows.find((row) => row.id === 'nguyen-lieu');
    expect(materials.reference).toBe(32.5);
    expect(materials.delta).toBeCloseTo(-2.5, 5);
    expect(materials.insideRange).toBe(true);
  });
});

describe('điều kiện hoàn thành', () => {
  it('chưa đủ 100% thì không mở được phần thật', () => {
    let progress = splitTo(emptyProgress(), { 'nguyen-lieu': 60 });
    progress = markRevealed(progress, TEA);
    expect(itemState(progress, TEA.id).revealed).toBe(false);
  });

  it('đủ năm điều kiện mới tính hoàn thành', () => {
    let progress = splitTo(emptyProgress(), FULL_SPLIT);
    progress = markRevealed(progress, TEA);
    expect(isComplete(itemState(progress, TEA.id))).toBe(false);

    progress = markChainSeen(progress, TEA);
    expect(isComplete(itemState(progress, TEA.id))).toBe(false);

    progress = chooseCut(progress, TEA, 'lao-dong');
    expect(isComplete(itemState(progress, TEA.id))).toBe(false);

    progress = saveNote(progress, TEA, 'a'.repeat(NOTE_MIN - 5));
    expect(isComplete(itemState(progress, TEA.id))).toBe(false);

    progress = saveNote(progress, TEA, 'a'.repeat(NOTE_MIN));
    expect(isComplete(itemState(progress, TEA.id))).toBe(true);
    expect(itemStatus(progress, TEA).key).toBe('xong');
  });

  it('trạng thái đi từ chưa bóc đến đang bóc', () => {
    expect(itemStatus(emptyProgress(), TEA).key).toBe('chua-mo');
    const progress = splitTo(emptyProgress(), { 'nguyen-lieu': 30 });
    const status = itemStatus(progress, TEA);
    expect(status.key).toBe('dang-boc');
    expect(status.label).toBe('Đang bóc 30%');
  });

  it('xoá một món không ảnh hưởng món khác', () => {
    let progress = splitTo(emptyProgress(), FULL_SPLIT);
    const other = itemById('ao-thun');
    progress = setBucket(progress, other, 'nguyen-lieu', 12);
    progress = resetItem(progress, TEA);
    expect(filledPercent(itemState(progress, TEA.id).split)).toBe(0);
    expect(filledPercent(itemState(progress, other.id).split)).toBe(12);
  });
});

describe('định dạng và dữ liệu cũ', () => {
  it('định dạng tiền và phần trăm', () => {
    expect(formatVnd(45000)).toBe('45.000đ');
    expect(formatVnd(1250000)).toBe('1.250.000đ');
    expect(amountOf(45000, 32)).toBe(14400);
    expect(formatPercent(150)).toBe('150%');
    expect(formatPercent(null)).toBe('—');
  });

  it('dữ liệu hỏng hoặc lạ trả về tiến độ trắng', () => {
    expect(migrate(null)).toEqual(emptyProgress());
    expect(migrate('hỏng')).toEqual(emptyProgress());
    expect(migrate({ items: 'không phải object' })).toEqual(emptyProgress());
  });

  it('giữ lại cách chia hợp lệ khi đọc lại', () => {
    const stored = {
      items: {
        [TEA.id]: {
          split: { 'nguyen-lieu': 30, 'lao-dong': 'x', 'loi-nhuan': -5 },
          revealed: true,
          chainSeen: true,
          cut: 'lao-dong',
          note: 'ghi chú',
        },
      },
    };
    const progress = migrate(stored);
    const state = itemState(progress, TEA.id);
    expect(state.split).toEqual({ 'nguyen-lieu': 30 });
    expect(state.revealed).toBe(true);
    expect(state.cut).toBe('lao-dong');
    expect(state.note).toBe('ghi chú');
  });
});
