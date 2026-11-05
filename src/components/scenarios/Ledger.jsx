import { AXES } from '../../content/scenarios';

const SIGNALS = {
  len: { mark: '▲', text: 'tăng' },
  xuong: { mark: '▼', text: 'giảm' },
  'hon-hop': { mark: '◆', text: 'hai chiều' },
};

// Bảng hệ quả: ba trục, ghi bằng lời. Không có điểm số, không có tổng kết "đúng/sai".
export default function Ledger({ option }) {
  return (
    <div className="ledger-wrap">
      <div className="ledger">
        {AXES.map((axis) => {
          const cell = option.ledger[axis.key];
          const signal = SIGNALS[cell.signal] || SIGNALS['hon-hop'];
          return (
            <div className="ledger-row" key={axis.key}>
              <div className="axis">
                <span className="axis-name">{axis.label}</span>
                <span className="axis-hint">{axis.hint}</span>
              </div>
              <div className="cell">
                <span className={`signal signal-${cell.signal}`}>
                  <span aria-hidden="true">{signal.mark}</span> {signal.text}
                </span>
                <p>{cell.text}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="timeline">
        {option.timeline.map((row) => (
          <div className="tl-row" key={row.when}>
            <span className="tl-when">{row.when}</span>
            <span className="tl-what">{row.what}</span>
          </div>
        ))}
      </div>

      <p className="cost">
        <span className="cost-label">Ai trả chi phí</span>
        {option.costPaidBy}
      </p>
    </div>
  );
}
