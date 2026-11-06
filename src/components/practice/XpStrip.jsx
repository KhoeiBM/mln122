'use client';

import { useEffect, useState } from 'react';
import { CONCEPTS } from '../../content/concepts';
import { dayKey, dueCount, levelFor, levelProgress } from '../../lib/game';
import { useGame } from '../../lib/useGame';

// Dải tiến độ dùng chung cho trang chủ và trang luyện.
export default function XpStrip() {
  const { game, ready } = useGame();
  const [today, setToday] = useState(null);

  useEffect(() => setToday(dayKey()), []);

  if (!ready || !today) {
    return (
      <div className="xpbar is-loading" aria-live="polite">
        Đang đọc tiến độ học…
      </div>
    );
  }

  const due = dueCount(game, CONCEPTS, today);
  const level = levelFor(game.xp);

  return (
    <div className="xpbar">
      <div className="xp-item">
        <span className="xp-value">{game.xp}</span>
        <span className="xp-label">điểm kinh nghiệm</span>
      </div>
      <div className="xp-item">
        <span className="xp-value">{level}</span>
        <span className="xp-label">cấp · {levelProgress(game.xp)}/100</span>
      </div>
      <div className="xp-item">
        <span className="xp-value">{game.streak.count}</span>
        <span className="xp-label">ngày liên tiếp</span>
      </div>
      <div className="xp-item">
        <span className="xp-value">{due}</span>
        <span className="xp-label">thẻ đến hạn</span>
      </div>
    </div>
  );
}
