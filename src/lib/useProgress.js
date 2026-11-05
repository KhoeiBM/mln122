'use client';

import { useCallback, useEffect, useState } from 'react';
import { STORAGE_KEY, emptyProgress, migrate } from './progress';

// Đọc/ghi tiến độ trong localStorage. Trạng thái đầu tiên luôn rỗng để HTML server
// và HTML client khớp nhau; dữ liệu thật được nạp sau khi mount.
export function useProgress() {
  const [progress, setProgress] = useState(emptyProgress);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setProgress(migrate(JSON.parse(raw)));
    } catch {
      // localStorage bị chặn hoặc dữ liệu hỏng: chạy tiếp với tiến độ rỗng.
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // Không lưu được thì thôi, không chặn trải nghiệm.
    }
  }, [progress, ready]);

  const update = useCallback((updater) => {
    setProgress((current) => updater(current));
  }, []);

  const reset = useCallback(() => setProgress(emptyProgress()), []);

  return { progress, ready, update, reset };
}
