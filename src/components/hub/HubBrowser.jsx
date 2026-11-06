'use client';

import { useMemo, useState } from 'react';
import { CHAPTERS } from '../../content/chapters';
import { HUB, sourceLine } from '../../content/hub';

export default function HubBrowser() {
  const [chapter, setChapter] = useState('all');
  const [query, setQuery] = useState('');

  const entries = useMemo(() => {
    const text = query.trim().toLowerCase();
    return HUB.filter((entry) => {
      const inChapter = chapter === 'all' || entry.chapter === chapter;
      if (!inChapter) return false;
      if (!text) return true;
      return `${entry.term} ${entry.plain} ${entry.conclusion} ${entry.example}`
        .toLowerCase()
        .includes(text);
    });
  }, [chapter, query]);

  return (
    <div className="hub">
      <div className="hub-controls">
        <div className="chips">
          <button
            type="button"
            className={`chip${chapter === 'all' ? ' is-active' : ''}`}
            onClick={() => setChapter('all')}
          >
            Tất cả ({HUB.length})
          </button>
          {CHAPTERS.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`chip${chapter === item.id ? ' is-active' : ''}`}
              onClick={() => setChapter(item.id)}
            >
              Ch.{item.id}
            </button>
          ))}
        </div>
        <label className="search">
          <span className="sr-only">Tìm phạm trù</span>
          <input
            type="search"
            value={query}
            placeholder="Tìm theo tên phạm trù hoặc nội dung…"
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
      </div>

      <p className="hub-count">
        {entries.length} phạm trù
        {query ? ` khớp “${query.trim()}”` : ''}
      </p>

      {entries.length === 0 ? (
        <p className="panel-copy">Không có phạm trù nào khớp. Thử từ khoá khác hoặc bỏ lọc chương.</p>
      ) : (
        <ul className="hub-list">
          {entries.map((entry) => (
            <li className="hub-entry" id={entry.id} key={entry.id}>
              <p className="hub-meta">
                Ch.{entry.chapter} · {entry.verbatim ? 'Trích giáo trình' : 'Diễn đạt theo giáo trình'}
              </p>
              <h2 className="hub-term">{entry.term}</h2>
              <blockquote className="quote">
                <p>{entry.quote}</p>
                <footer>{sourceLine(entry)}</footer>
              </blockquote>
              <p className="hub-plain">{entry.plain}</p>
              <p className="hub-conclusion">
                <span className="label">Đúc kết</span>
                {entry.conclusion}
              </p>
              <p className="hub-example">
                <span className="label">Ví dụ</span>
                {entry.example}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
