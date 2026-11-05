import { GROUPS } from '../../content/items';
import { amountOf, formatVnd } from '../../lib/split';

// Một khoản trong giá. Bốn nút thay cho ô nhập số: chạm được, bàn phím dùng được,
// và không cho cộng vượt 100%.
export default function BucketRow({ item, bucket, value, deviation, revealed, onChange }) {
  const group = GROUPS[bucket.group];
  return (
    <div className={`row${value > 0 ? ' has-value' : ''}`}>
      <div className="row-head">
        <div className="row-label">
          <span className="row-name">{bucket.label}</span>
          <span className="row-hint">{bucket.hint}</span>
        </div>
        <div className="row-controls">
          <button
            type="button"
            className="step"
            aria-label={`Giảm 5 phần trăm cho ${bucket.label}`}
            onClick={() => onChange(value - 5)}
            disabled={value === 0}
          >
            −5
          </button>
          <button
            type="button"
            className="step"
            aria-label={`Giảm 1 phần trăm cho ${bucket.label}`}
            onClick={() => onChange(value - 1)}
            disabled={value === 0}
          >
            −1
          </button>
          <span className="row-value">
            <span className="row-pct">{value}%</span>
            <span className="row-amount">{formatVnd(amountOf(item.price, value))}</span>
          </span>
          <button
            type="button"
            className="step"
            aria-label={`Tăng 1 phần trăm cho ${bucket.label}`}
            onClick={() => onChange(value + 1)}
          >
            +1
          </button>
          <button
            type="button"
            className="step"
            aria-label={`Tăng 5 phần trăm cho ${bucket.label}`}
            onClick={() => onChange(value + 5)}
          >
            +5
          </button>
        </div>
      </div>

      {revealed && deviation ? (
        <div className="row-reveal">
          <span className={`tag tag-${bucket.group}`}>{group.label}</span>
          <span className="row-ref">
            Tham chiếu {bucket.reference[0]}–{bucket.reference[1]}%
          </span>
          <span className={`row-delta${Math.abs(deviation.delta) < 1 ? ' is-even' : ''}`}>
            {deviation.delta > 0 ? '+' : ''}
            {Math.round(deviation.delta)} điểm so với trung điểm
          </span>
        </div>
      ) : null}
    </div>
  );
}
