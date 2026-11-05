'use client';

import Link from 'next/link';
import { chapterLabel, chapterTitle } from '../../content/chapters';
import { MILESTONES, PROLOGUE_INTRO } from '../../content/prologue';
import { markMilestone, prologueSeenCount } from '../../lib/progress';
import { useProgress } from '../../lib/useProgress';

export default function PrologueApp() {
  const { progress, update } = useProgress();
  const seen = prologueSeenCount(progress);

  return (
    <div className="prologue">
      <header className="page-head">
        <p className="page-code">Phần mở đầu · Hai mốc</p>
        <h1 className="page-title">Trước khi chọn, hãy xem hai lần đất nước đã chọn</h1>
        <p className="page-lead">{PROLOGUE_INTRO}</p>
      </header>

      {MILESTONES.map((milestone) => {
        const isRead = Boolean(progress.prologue && progress.prologue[milestone.id]);
        return (
          <article className={`mile${isRead ? ' is-read' : ''}`} key={milestone.id} id={milestone.id}>
            <div className="mile-head">
              <p className="mile-code">{milestone.code}</p>
              <p className="mile-year">{milestone.year}</p>
              <h2 className="mile-title">{milestone.title}</h2>
              <p className="mile-lead">{milestone.lead}</p>
            </div>

            <div className="figures">
              {milestone.figures.map((figure) => (
                <div className="figure" key={figure.value}>
                  <p className="figure-value">{figure.value}</p>
                  <p className="figure-label">{figure.label}</p>
                  <p className={`figure-note${figure.canChot ? ' is-draft' : ''}`}>
                    {figure.canChot ? 'Số nháp — ' : ''}
                    {figure.note}
                  </p>
                </div>
              ))}
            </div>

            <div className="tension">
              <h3 className="tension-title">{milestone.tension.title}</h3>
              <p>{milestone.tension.body}</p>
              <ul className="tension-sides">
                {milestone.tension.sides.map((side) => (
                  <li key={side}>{side}</li>
                ))}
              </ul>
            </div>

            <div className="concepts">
              {milestone.concepts.map((concept) => (
                <div className="concept" key={concept.name}>
                  <p className="concept-head">
                    <span className="chapter-chip">{chapterLabel(concept.chapter)}</span>
                    <span className="concept-name">{concept.name}</span>
                  </p>
                  <p className="concept-link">{concept.link}</p>
                  <p className="concept-source">{chapterTitle(concept.chapter)}</p>
                </div>
              ))}
            </div>

            <div className="mile-question">
              <p className="mile-question-label">Câu hỏi dẫn vào kịch bản</p>
              <p className="mile-question-text">{milestone.question}</p>
            </div>

            <details className="sources">
              <summary>Nguồn của mốc này</summary>
              <ul>
                {milestone.sources.map((source) => (
                  <li key={source}>{source}</li>
                ))}
              </ul>
            </details>

            <div className="mile-actions">
              <button
                type="button"
                className={`btn btn-sm${isRead ? ' btn-ghost' : ''}`}
                aria-pressed={isRead}
                onClick={() => update((current) => markMilestone(current, milestone.id))}
              >
                {isRead ? 'Đã đọc mốc này' : 'Đánh dấu đã đọc mốc này'}
              </button>
            </div>
          </article>
        );
      })}

      <section className="next-block">
        <p className="next-count">Đã đọc {seen}/2 mốc lịch sử.</p>
        <p className="next-copy">
          Đọc hai mốc là phần chuẩn bị, không bắt buộc. Nhưng khi vào kịch bản, bạn sẽ phải chọn
          giữa hai điều đều có lý — giống hai lần đất nước đã phải chọn.
        </p>
        <div className="next-actions">
          <Link className="btn btn-primary" href="/kich-ban">
            Chọn một kịch bản
          </Link>
          <Link className="btn btn-ghost" href="/ho-so">
            Xem hồ sơ của tôi
          </Link>
        </div>
      </section>
    </div>
  );
}
