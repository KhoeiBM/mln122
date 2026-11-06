'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { HUB, sourceLine } from '../../content/hub';
import { RATINGS, XP, addXp, dayKey, dueConceptIds, reviewCard } from '../../lib/game';
import { useGame } from '../../lib/useGame';

const ALL_IDS = HUB.map((entry) => entry.id);

export default function ReviewRunner() {
  const { game, ready, update } = useGame();
  const [today, setToday] = useState(null);
  const [mode, setMode] = useState('due');
  // Hàng đợi khởi tạo đủ để bản HTML máy chủ có nội dung; sau khi đọc được tiến độ
  // trên máy thì thu lại còn thẻ đến hạn.
  const [queue, setQueue] = useState(ALL_IDS);
  const [pos, setPos] = useState(0);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => setToday(dayKey()), []);

  useEffect(() => {
    if (!ready || !today) return;
    const ids = mode === 'due' ? dueConceptIds(game, HUB, today) : ALL_IDS;
    setQueue(ids.filter((id) => ALL_IDS.includes(id)));
    setPos(0);
    setFlipped(false);
    // Chỉ dựng lại hàng đợi khi đổi chế độ.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, today, mode]);

  const entry = HUB.find((item) => item.id === queue[pos]) || null;

  function rate(level) {
    if (!entry) return;
    update((current) => addXp(reviewCard(current, entry.id, level, dayKey()), XP.flashcard, dayKey()));
    setFlipped(false);
    setPos((current) => current + 1);
  }

  if (!entry) {
    return (
      <div className="panel">
        <p className="panel-title">
          {queue.length === 0 ? 'Hôm nay không còn thẻ nào đến hạn.' : 'Đã hết lượt thẻ.'}
        </p>
        <p className="panel-copy">
          {queue.length === 0
            ? 'Lịch ôn giãn theo mức bạn tự đánh giá. Có thể ôn lại toàn bộ ngay, hoặc quay lại ngày mai.'
            : `Bạn vừa tự đánh giá ${queue.length} thẻ. Thẻ "Quên" sẽ quay lại ngay trong hôm nay.`}
        </p>
        <div className="panel-actions">
          <button type="button" className="btn btn-primary btn-sm" onClick={() => setMode('all')}>
            Ôn lại toàn bộ {ALL_IDS.length} thẻ
          </button>
          <button type="button" className="btn btn-ghost btn-sm" onClick={() => setMode('due')}>
            Về danh sách đến hạn
          </button>
          <Link className="btn btn-ghost btn-sm" href="/quiz">
            Sang phần quiz
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="review">
      <div className="review-top">
        <span className="meta">
          Thẻ {pos + 1}/{queue.length} · Ch.{entry.chapter}
        </span>
        <button
          type="button"
          className="link-btn"
          onClick={() => setMode(mode === 'due' ? 'all' : 'due')}
        >
          {mode === 'due' ? 'Ôn toàn bộ' : 'Chỉ thẻ đến hạn'}
        </button>
      </div>

      <article className={`flash${flipped ? ' is-flipped' : ''}`} aria-live="polite">
        <p className="meta">{flipped ? 'Mặt sau' : 'Mặt trước'}</p>
        <h2 className="flash-term">{entry.term}</h2>

        {flipped ? (
          <>
            <blockquote className="quote">
              <p>{entry.quote}</p>
              <footer>{sourceLine(entry)}</footer>
            </blockquote>
            <p className="flash-plain">{entry.plain}</p>
            <p className="flash-conclusion">
              <span className="label">Đúc kết</span>
              {entry.conclusion}
            </p>
            <p className="flash-example">
              <span className="label">Ví dụ</span>
              {entry.example}
            </p>
          </>
        ) : (
          <p className="flash-prompt">
            Nhớ lại định nghĩa và một ví dụ trước khi lật thẻ. Không cần viết ra.
          </p>
        )}
      </article>

      {flipped ? (
        <div className="review-rate">
          <p className="meta">Bạn thấy mình nhớ mức nào?</p>
          <div className="rate-options">
            {RATINGS.map((rating) => (
              <button key={rating.level} type="button" className="rate" onClick={() => rate(rating.level)}>
                <span className="rate-label">{rating.label}</span>
                <span className="rate-hint">{rating.hint}</span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="panel-actions">
          <button type="button" className="btn btn-primary" onClick={() => setFlipped(true)}>
            Lật thẻ
          </button>
          <span className="fineprint">Tự đánh giá sau khi lật, không có điểm đúng sai.</span>
        </div>
      )}
    </div>
  );
}
