'use client';

import { useEffect, useState } from 'react';
import { CONCEPTS, conceptById } from '../../content/concepts';
import { ITEMS } from '../../content/items';
import { RATINGS, XP, addXp, dayKey, dueConceptIds, reviewCard } from '../../lib/game';
import { useGame } from '../../lib/useGame';

export default function Flashcards() {
  const { game, ready, update } = useGame();
  const [today, setToday] = useState(null);
  const [mode, setMode] = useState('due');
  // Hàng đợi khởi tạo bằng toàn bộ thẻ để bản HTML máy chủ có nội dung thật; sau khi
  // đọc được tiến độ trên máy thì thu lại còn những thẻ đến hạn.
  const [queue, setQueue] = useState(() => CONCEPTS.map((concept) => concept.id).map(conceptById));
  const [pos, setPos] = useState(0);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => setToday(dayKey()), []);

  useEffect(() => {
    if (!ready || !today) return;
    const ids = mode === 'due' ? dueConceptIds(game, CONCEPTS, today) : CONCEPTS.map((c) => c.id);
    setQueue(ids.map(conceptById).filter(Boolean));
    setPos(0);
    setFlipped(false);
    // Chỉ dựng lại hàng đợi khi đổi chế độ, không dựng lại sau mỗi lần tự đánh giá.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, today, mode]);

  const card = queue[pos] || null;
  const item = card ? ITEMS[pos % ITEMS.length] : null;

  function rate(level) {
    update((current) => addXp(reviewCard(current, card.id, level, today), XP.flashcard, today));
    setFlipped(false);
    setPos((current) => current + 1);
  }

  if (!card) {
    return (
      <div className="prac-done">
        <p className="prac-done-title">
          {queue.length === 0 ? 'Hôm nay không còn thẻ nào đến hạn.' : 'Đã hết lượt thẻ.'}
        </p>
        <p className="prac-done-copy">
          {queue.length === 0
            ? 'Lịch ôn được giãn theo mức bạn tự đánh giá. Mai quay lại, hoặc ôn lại toàn bộ ngay bây giờ.'
            : `Bạn vừa tự đánh giá ${queue.length} thẻ. Thẻ "quên" sẽ quay lại ngay trong hôm nay.`}
        </p>
        <div className="prac-actions">
          <button type="button" className="btn btn-primary btn-sm" onClick={() => setMode('all')}>
            Ôn lại toàn bộ {CONCEPTS.length} thẻ
          </button>
          <button type="button" className="btn btn-ghost btn-sm" onClick={() => setMode('due')}>
            Về danh sách đến hạn
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flash">
      <div className="flash-top">
        <span className="flash-count">
          Thẻ {pos + 1}/{queue.length}
        </span>
        <button
          type="button"
          className="link-btn"
          onClick={() => setMode(mode === 'due' ? 'all' : 'due')}
        >
          {mode === 'due' ? 'Ôn toàn bộ' : 'Chỉ thẻ đến hạn'}
        </button>
      </div>

      <article className={`flash-card${flipped ? ' is-flipped' : ''}`} aria-live="polite">
        <p className="flash-face-label">{flipped ? 'Mặt sau' : 'Mặt trước'}</p>
        <h3 className="flash-name">{card.name}</h3>

        {flipped ? (
          <>
            <blockquote className="flash-quote">{card.quote}</blockquote>
            <p className="flash-plain">{card.plain}</p>
            <p className="flash-conclusion">
              <span className="concept-label">Đúc kết</span>
              {card.conclusion}
            </p>
            <p className="flash-apply">
              <span className="concept-label">Với {item.name.toLowerCase()}</span>
              {card.applications[item.id]}
            </p>
          </>
        ) : (
          <p className="flash-prompt">
            Nhớ lại định nghĩa và một ví dụ trong ba món trước khi lật thẻ. Không cần viết ra.
          </p>
        )}
      </article>

      {flipped ? (
        <div className="flash-rate">
          <p className="flash-rate-label">Bạn thấy mình nhớ mức nào?</p>
          <div className="flash-rate-options">
            {RATINGS.map((rating) => (
              <button
                key={rating.level}
                type="button"
                className="rate-btn"
                onClick={() => rate(rating.level)}
              >
                <span className="rate-btn-label">{rating.label}</span>
                <span className="rate-btn-hint">{rating.hint}</span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="prac-actions">
          <button type="button" className="btn btn-primary" onClick={() => setFlipped(true)}>
            Lật thẻ
          </button>
          <span className="fineprint">Tự đánh giá sau khi lật, không có điểm đúng sai.</span>
        </div>
      )}
    </div>
  );
}
