import { formatPercent } from '../../lib/split';

const GROUP_CLASS = {
  c: 'seg-c',
  v: 'seg-v',
  m: 'seg-m',
  ngoai: 'seg-khac',
};

// Thanh tiền: mỗi khoản một đoạn, phần chưa chia để dạng gạch chéo.
// Trước khi mở kết quả, mọi đoạn cùng một màu — màu theo nhóm chỉ hiện ở bước sau.
export default function MoneyBar({ item, split, filled, revealed }) {
  return (
    <div
      className="bar"
      role="img"
      aria-label={`Đã chia ${formatPercent(filled)}, còn ${formatPercent(100 - filled)} chưa chia`}
    >
      {item.buckets.map((bucket) => {
        const value = split[bucket.id] || 0;
        if (!value) return null;
        const cls = revealed ? GROUP_CLASS[bucket.group] : 'seg-plain';
        return (
          <span
            key={bucket.id}
            className={`seg ${cls}`}
            style={{ width: `${value}%` }}
            title={`${bucket.label}: ${value}%`}
          />
        );
      })}
      {filled < 100 ? <span className="seg seg-empty" style={{ width: `${100 - filled}%` }} /> : null}
    </div>
  );
}
