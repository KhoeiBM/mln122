'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import PrintButton from '../site/PrintButton';
import DossierBody from './DossierBody';
import { SCENARIOS } from '../../content/scenarios';
import { completedCount, prologueSeenCount } from '../../lib/progress';
import { useProgress } from '../../lib/useProgress';

export default function DossierApp() {
  const { progress, ready, reset } = useProgress();
  const [dateLabel, setDateLabel] = useState('');
  const [confirmReset, setConfirmReset] = useState(false);

  useEffect(() => {
    setDateLabel(
      new Intl.DateTimeFormat('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }).format(new Date()),
    );
  }, []);

  const finished = completedCount(progress, SCENARIOS);
  const read = prologueSeenCount(progress);
  const empty = ready && finished === 0 && read === 0;

  return (
    <div className="dossier-page">
      <div className="no-print dossier-bar">
        <PrintButton />
        <button type="button" className="btn btn-ghost btn-sm" onClick={() => setConfirmReset(true)}>
          Xoá toàn bộ tiến độ
        </button>
      </div>

      {empty ? (
        <div className="empty-banner">
          <p className="empty-title">Hồ sơ đang trống.</p>
          <p>
            Hồ sơ chỉ có nội dung sau khi bạn đọc một mốc lịch sử hoặc hoàn thành một kịch bản. Đây
            là bản ghi việc học của bạn, không phải bài kiểm tra.
          </p>
          <div className="empty-actions">
            <Link className="btn btn-primary btn-sm" href="/kich-ban">
              Mở một kịch bản
            </Link>
            <Link className="btn btn-ghost btn-sm" href="/lich-su">
              Đọc hai mốc lịch sử
            </Link>
          </div>
        </div>
      ) : null}

      <DossierBody progress={progress} scenarios={SCENARIOS} dateLabel={dateLabel} />

      {confirmReset ? (
        <div className="confirm" role="dialog" aria-label="Xác nhận xoá toàn bộ tiến độ">
          <p>Xoá toàn bộ tiến độ, gồm cả hai kịch bản và phần phản biện? Không khôi phục được.</p>
          <div className="confirm-actions">
            <button
              type="button"
              className="btn btn-sm"
              onClick={() => {
                reset();
                setConfirmReset(false);
              }}
            >
              Xoá toàn bộ
            </button>
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => setConfirmReset(false)}>
              Giữ lại
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
