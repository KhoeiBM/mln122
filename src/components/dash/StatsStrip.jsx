'use client';

import { useEffect, useState } from 'react';
import { dayKey, levelFor, levelProgress } from '../../lib/game';
import { overallProgress } from '../../lib/questions';
import { useGame } from '../../lib/useGame';

// Dải tiến độ: đọc từ localStorage sau khi gắn vào DOM nên bản HTML máy chủ chỉ có khung.
export default function StatsStrip() {
  const { game, ready } = useGame();
  const [today, setToday] = useState(null);

  useEffect(() => setToday(dayKey()), []);

  if (!ready || !today) {
    return (
      <div className="stats is-loading" aria-live="polite">
        Đang đọc tiến độ trên máy bạn…
      </div>
    );
  }

  const progress = overallProgress(game.answered);

  return (
    <div className="stats">
      <div className="stat">
        <span className="stat-value">
          {progress.done}
          <span className="stat-of">/{progress.total}</span>
        </span>
        <span className="stat-label">câu đã làm</span>
      </div>
      <div className="stat">
        <span className="stat-value">{progress.correct}</span>
        <span className="stat-label">câu đúng</span>
      </div>
      <div className="stat">
        <span className="stat-value">{game.xp}</span>
        <span className="stat-label">
          XP · cấp {levelFor(game.xp)} ({levelProgress(game.xp)}/100)
        </span>
      </div>
      <div className="stat">
        <span className="stat-value">{game.streak.count}</span>
        <span className="stat-label">ngày liên tiếp</span>
      </div>
      <div className="stat-track" aria-hidden="true">
        <span className="stat-fill" style={{ width: `${progress.percent}%` }} />
      </div>
      <p className="stat-note">
        {progress.percent}% chương trình · điểm và chuỗi ngày chỉ lưu trên máy bạn, không gửi đi đâu
      </p>
    </div>
  );
}
