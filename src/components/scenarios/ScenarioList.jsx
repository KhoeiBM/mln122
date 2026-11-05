'use client';

import Link from 'next/link';
import { chapterLabel, chapterTitle } from '../../content/chapters';
import { SCENARIOS } from '../../content/scenarios';
import { completedCount, scenarioStatus } from '../../lib/progress';
import { useProgress } from '../../lib/useProgress';

export default function ScenarioList() {
  const { progress, ready } = useProgress();
  const finished = completedCount(progress, SCENARIOS);

  return (
    <div className="list-page">
      <header className="page-head">
        <p className="page-code">Phần chính · Hai kịch bản</p>
        <h1 className="page-title">Bạn ngồi vào ghế người phải quyết định</h1>
        <p className="page-lead">
          Mỗi kịch bản mất khoảng 8 phút: đọc bối cảnh, mở hệ quả của ba phương án, chọn một, xem
          cùng quyết định đó từ ba phía, rồi viết phản biện. Không có phương án nào được tính là
          đúng.
        </p>
        <p className="list-progress">
          {ready ? `${finished}/${SCENARIOS.length} kịch bản đã hoàn thành` : 'Đang đọc tiến độ…'}
        </p>
      </header>

      <div className="list">
        {SCENARIOS.map((scenario) => {
          const status = scenarioStatus(progress, scenario);
          return (
            <article className="scene-row" key={scenario.id}>
              <div className="row-main">
                <p className="row-code">
                  {scenario.code} — {scenario.minutes} phút
                </p>
                <h2 className="row-title">
                  <Link href={`/kich-ban/${scenario.id}`}>{scenario.title}</Link>
                </h2>
                <p className="row-kicker">{scenario.kicker}</p>
                <ul className="row-chips">
                  {scenario.chapters.map((n) => (
                    <li key={n} title={chapterTitle(n)}>
                      {chapterLabel(n)}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="row-side">
                <span className={`status status-${status.key}`}>{status.label}</span>
                <Link className="btn btn-sm" href={`/kich-ban/${scenario.id}`}>
                  {status.key === 'chua-mo' ? 'Mở kịch bản' : 'Làm tiếp'}
                </Link>
              </div>
            </article>
          );
        })}
      </div>

      <div className="next-block">
        <p className="next-copy">
          Làm xong một kịch bản, hồ sơ của bạn ghi lại phương án đã chọn, ba góc nhìn đã xem và
          phần phản biện — đủ để mang đi thảo luận nhóm hoặc in ra nộp kèm bài.
        </p>
        <div className="next-actions">
          <Link className="btn btn-primary" href="/ho-so">
            Xem hồ sơ của tôi
          </Link>
          <Link className="btn btn-ghost" href="/lich-su">
            Đọc lại hai mốc lịch sử
          </Link>
        </div>
      </div>
    </div>
  );
}
