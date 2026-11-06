'use client';

import Link from 'next/link';
import { CHAPTERS } from '../../content/chapters';
import { chapterProgress } from '../../lib/questions';
import { useGame } from '../../lib/useGame';

export default function ChapterGrid() {
  const { game, ready } = useGame();
  const rows = ready ? chapterProgress(game.answered) : null;

  return (
    <ul className="chapters">
      {CHAPTERS.map((chapter, index) => {
        const row = rows ? rows[index] : null;
        return (
          <li key={chapter.id} className="chapter">
            <Link className="chapter-link" href={`/learn/${chapter.slug}`}>
              <span className="chapter-num">Ch.{chapter.id}</span>
              <span className="chapter-title">{chapter.title}</span>
              <span className="chapter-tag">{chapter.tagline}</span>
              <span className="chapter-track" aria-hidden="true">
                <span
                  className="chapter-fill"
                  style={{ width: `${row ? row.percent : 0}%` }}
                />
              </span>
              <span className="chapter-meta">
                {row ? `${row.correct}/${row.total} câu đúng` : '20 câu hỏi'}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
