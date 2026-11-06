'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Flashcards from './Flashcards';
import MatchGame from './MatchGame';
import QuizRound from './QuizRound';
import XpStrip from './XpStrip';
import { CONCEPTS } from '../../content/concepts';
import { ITEMS } from '../../content/items';
import { buildQuiz } from '../../lib/quiz';

export default function PracticeApp() {
  const [tab, setTab] = useState('the');
  const questionCount = useMemo(() => buildQuiz(ITEMS).length, []);

  const tabs = [
    { key: 'the', label: 'Thẻ ghi nhớ', hint: `${CONCEPTS.length} thẻ, giãn lịch theo mức tự đánh giá` },
    { key: 'ghep', label: 'Ghép cặp', hint: '6 cặp mỗi lượt, lấy từ ba món' },
    { key: 'trac-nghiem', label: 'Trắc nghiệm', hint: `${questionCount} câu, giải thích từng phương án` },
  ];

  return (
    <div className="practice">
      <header className="page-head">
        <p className="page-code">Phần luyện</p>
        <h1 className="page-title">Ba cách nhớ lại, không có cách nào để học thuộc đáp án</h1>
        <p className="page-lead">
          Thẻ ghi nhớ, ghép cặp và trắc nghiệm đều lấy từ tám phạm trù và số liệu ba món đang có.
          Điểm kinh nghiệm và chuỗi ngày học chỉ để bạn thấy mình quay lại đều hay không — không
          phải điểm môn học.
        </p>
      </header>

      <XpStrip />

      <nav className="prac-tabs" aria-label="Ba chế độ luyện">
        {tabs.map((item) => (
          <button
            key={item.key}
            type="button"
            className={`prac-tab${tab === item.key ? ' is-active' : ''}`}
            aria-pressed={tab === item.key}
            onClick={() => setTab(item.key)}
          >
            <span className="prac-tab-label">{item.label}</span>
            <span className="prac-tab-hint">{item.hint}</span>
          </button>
        ))}
      </nav>

      <section className="prac-body">
        {tab === 'the' ? <Flashcards /> : null}
        {tab === 'ghep' ? <MatchGame /> : null}
        {tab === 'trac-nghiem' ? <QuizRound /> : null}
      </section>

      <div className="prac-foot">
        <Link className="btn btn-ghost btn-sm" href="/">
          ← Về ba món để bóc
        </Link>
        <Link className="btn btn-sm" href="/kien-thuc">
          Đọc phần kiến thức
        </Link>
      </div>
    </div>
  );
}
