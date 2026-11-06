'use client';

import { useCallback, useEffect, useState } from 'react';
import { GAME_KEY, emptyGame, migrateGame } from './game';

// Đọc/ghi điểm kinh nghiệm, chuỗi ngày và lịch ôn thẻ trong localStorage.
export function useGame() {
  const [game, setGame] = useState(emptyGame);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(GAME_KEY);
      if (raw) setGame(migrateGame(JSON.parse(raw)));
    } catch {
      // localStorage bị chặn hoặc dữ liệu hỏng: chạy tiếp với trạng thái rỗng.
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(GAME_KEY, JSON.stringify(game));
    } catch {
      // Không lưu được thì thôi.
    }
  }, [game, ready]);

  const update = useCallback((updater) => setGame((current) => updater(current)), []);
  const reset = useCallback(() => setGame(emptyGame()), []);

  return { game, ready, update, reset };
}
