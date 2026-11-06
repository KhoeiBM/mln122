// Sinh câu hỏi luyện tập và lượt ghép cặp từ chính dữ liệu ba món + tám phạm trù.
// Không có ngân hàng câu hỏi riêng: mọi câu đều suy ra từ số liệu đã có, nên không thể
// lệch với nội dung đang hiển thị. Mọi hàm đều tất định để HTML server và client khớp nhau.

import { GROUPS } from '../content/items';
import { formatVnd, groupTotals, midpoints, surplusRate } from './split';

const GROUP_TEXT = {
  c: 'tư liệu sản xuất (c)',
  v: 'sức lao động (v)',
  m: 'phần thặng dư (m)',
  ngoai: 'khoản nằm ngoài c, v, m của người bán',
};

function mulberry32(seed) {
  let a = seed >>> 0;
  return function random() {
    a += 0x6d2b79f5;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function seededShuffle(items, seed) {
  const random = mulberry32(seed);
  const result = [...items];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function whyFor(bucket) {
  return `${bucket.label} thuộc ${GROUP_TEXT[bucket.group]}.`;
}

function bucketOptions(item, correctId, seed) {
  const correct = item.buckets.find((bucket) => bucket.id === correctId);
  const others = item.buckets.filter((bucket) => bucket.id !== correctId).slice(0, 3);
  const options = [correct, ...others].map((bucket) => ({
    text: bucket.label,
    correct: bucket.id === correctId,
    why: whyFor(bucket),
  }));
  return seededShuffle(options, seed);
}

function rateOptions(rate) {
  const values = [];
  const push = (value) => {
    const rounded = Math.max(5, Math.round(value / 5) * 5);
    if (!values.includes(rounded)) values.push(rounded);
  };
  push(rate);
  push(rate / 2);
  push(rate * 2);
  push(rate + 60);
  return values.slice(0, 4).map((value) => ({
    text: `${value}%`,
    correct: value === Math.max(5, Math.round(rate / 5) * 5),
    why:
      value === Math.max(5, Math.round(rate / 5) * 5)
        ? `Đúng: m′ = m / v ≈ ${value}% theo cách chia tham chiếu.`
        : `Sai: ${value}% không khớp với m / v của khoảng tham chiếu.`,
  }));
}

// Bốn câu cho mỗi món: hai câu phân loại khoản, một câu về khoản lớn nhất,
// một câu về m′ của khoảng tham chiếu.
export function buildQuiz(items) {
  const questions = [];

  items.forEach((item, index) => {
    const reference = midpoints(item);
    const totals = groupTotals(item, reference);
    const rate = surplusRate(totals);

    const labourBucket = item.buckets.find((bucket) => bucket.group === 'v');
    const capitalBuckets = item.buckets.filter((bucket) => bucket.group === 'c');
    const capitalBucket = capitalBuckets[index % capitalBuckets.length];

    questions.push({
      id: `${item.id}-v`,
      itemId: item.id,
      itemName: item.name,
      prompt: `Trong ${formatVnd(item.price)} của ${item.name.toLowerCase()}, khoản nào là tư bản khả biến (v)?`,
      options: bucketOptions(item, labourBucket.id, index + 1),
      explain:
        'Tư bản khả biến là phần trả cho sức lao động — bộ phận duy nhất tạo ra giá trị mới trong quá trình sản xuất.',
    });

    questions.push({
      id: `${item.id}-c`,
      itemId: item.id,
      itemName: item.name,
      prompt: `Khoản nào dưới đây là tư liệu sản xuất (c) của ${item.name.toLowerCase()}?`,
      options: bucketOptions(item, capitalBucket.id, index + 11),
      explain:
        'Tư bản bất biến chỉ chuyển giá trị cũ sang sản phẩm; nó không tự sinh ra phần dôi ra.',
    });

    const largest = item.buckets.reduce((best, bucket) =>
      reference[bucket.id] > reference[best.id] ? bucket : best,
    );
    questions.push({
      id: `${item.id}-largest`,
      itemId: item.id,
      itemName: item.name,
      prompt: `Theo khoảng tham chiếu, khoản nào chiếm phần lớn nhất trong ${formatVnd(item.price)} của ${item.name.toLowerCase()}?`,
      options: bucketOptions(item, largest.id, index + 23),
      explain: `${largest.label} chiếm khoảng ${reference[largest.id]}% giá bán — phần lớn nhất trong bảy khoản.`,
    });

    if (rate) {
      questions.push({
        id: `${item.id}-rate`,
        itemId: item.id,
        itemName: item.name,
        prompt: `Với cách chia tham chiếu của ${item.name.toLowerCase()}, tỷ suất giá trị thặng dư m′ xấp xỉ bao nhiêu?`,
        options: seededShuffle(rateOptions(rate), index + 37),
        explain: `m′ = m / v × 100% ≈ ${Math.round(rate)}% (với c = ${totals.c}%, v = ${totals.v}%, m = ${totals.m}%).`,
      });
    }
  });

  return questions;
}

// Ghép tên phạm trù với một dòng ứng dụng cụ thể của nó trong một món.
export function buildMatchRound(concepts, items, round = 0, size = 6) {
  const all = [];
  concepts.forEach((concept) => {
    items.forEach((item) => {
      all.push({
        id: `${concept.id}|${item.id}`,
        conceptId: concept.id,
        itemId: item.id,
        left: concept.name,
        itemName: item.name,
        right: concept.applications[item.id],
      });
    });
  });

  const picked = [];
  for (let i = 0; i < Math.min(size, all.length); i += 1) {
    picked.push(all[(round * size + i) % all.length]);
  }

  return {
    pairs: picked,
    rightOrder: seededShuffle(
      picked.map((pair) => pair.id),
      round * 97 + 13,
    ),
  };
}

export function totalXpForQuiz(questions) {
  return questions.length * 10;
}

export { GROUP_TEXT };
export { GROUPS };
