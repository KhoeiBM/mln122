'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CHAPTERS } from '../../content/chapters';
import { XP, dayKey, recordAnswer } from '../../lib/game';
import { selectQuiz } from '../../lib/questions';
import { useGame } from '../../lib/useGame';

const LETTERS = ['A', 'B', 'C', 'D'];

const COUNTS = [
  { value: 10, label: '10 câu' },
  { value: 20, label: '20 câu' },
  { value: 0, label: 'Tất cả' },
];

export default function QuizRunner() {
  const { game, ready, update } = useGame();
  const [phase, setPhase] = useState('setup');
  const [chapter, setChapter] = useState('all');
  const [count, setCount] = useState(10);
  const [unseenOnly, setUnseenOnly] = useState(false);
  const [round, setRound] = useState(null);
  const [index, setIndex] = useState(0);
  const [choice, setChoice] = useState(null);
  const [score, setScore] = useState(0);

  // Đọc ?chapter=N sau khi gắn vào DOM để trang vẫn là HTML tĩnh.
  useEffect(() => {
    const value = Number(new URLSearchParams(window.location.search).get('chapter'));
    if (value >= 1 && value <= CHAPTERS.length) {
      setChapter(value);
      setCount(0);
    }
  }, []);

  function start(seed = Date.now() % 100000) {
    let questions = selectQuiz({
      chapter,
      count: count || 0,
      seed: seed + 1,
    });
    if (unseenOnly) {
      const unseen = questions.filter((question) => !game.answered[question.id]);
      if (unseen.length) questions = unseen;
    }
    setRound(questions);
    setIndex(0);
    setChoice(null);
    setScore(0);
    setPhase(questions.length ? 'running' : 'done');
  }

  function choose(optionIndex) {
    if (choice !== null) return;
    const question = round[index];
    const correct = optionIndex === question.answer;
    setChoice(optionIndex);
    if (correct) setScore((current) => current + 1);
    update((current) => recordAnswer(current, question.id, correct, dayKey()));
  }

  function next() {
    if (index + 1 >= round.length) {
      setPhase('done');
      return;
    }
    setIndex((current) => current + 1);
    setChoice(null);
  }

  if (phase === 'setup') {
    return (
      <div className="quiz-setup">
        <div className="field">
          <p className="field-label">Chọn chương</p>
          <div className="chips">
            <button
              type="button"
              className={`chip${chapter === 'all' ? ' is-active' : ''}`}
              onClick={() => setChapter('all')}
            >
              Cả 6 chương
            </button>
            {CHAPTERS.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`chip${chapter === item.id ? ' is-active' : ''}`}
                onClick={() => setChapter(item.id)}
              >
                Ch.{item.id} · {item.title}
              </button>
            ))}
          </div>
        </div>

        <div className="field">
          <p className="field-label">Số câu mỗi lượt</p>
          <div className="chips">
            {COUNTS.map((item) => (
              <button
                key={item.value}
                type="button"
                className={`chip${count === item.value ? ' is-active' : ''}`}
                onClick={() => setCount(item.value)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <label className="switch">
          <input
            type="checkbox"
            checked={unseenOnly}
            onChange={(event) => setUnseenOnly(event.target.checked)}
          />
          <span>Ưu tiên câu chưa làm</span>
        </label>

        <div className="quiz-start">
          <button type="button" className="btn btn-primary" onClick={() => start()}>
            Bắt đầu làm
          </button>
          <p className="fineprint">
            {ready
              ? `Trong máy bạn đã có ${Object.keys(game.answered).length} câu được làm.`
              : 'Đang đọc tiến độ trên máy…'}
          </p>
        </div>
      </div>
    );
  }

  if (phase === 'done') {
    const total = round ? round.length : 0;
    const percent = total ? Math.round((score / total) * 100) : 0;
    return (
      <div className="quiz-done">
        <p className="quiz-done-score">
          {score}
          <span className="quiz-done-of">/{total}</span>
        </p>
        <p className="quiz-done-label">câu đúng · {percent}%</p>
        <p className="quiz-done-copy">
          {percent >= 80
            ? 'Phần này đã chắc. Thử sang chương khác hoặc làm lại ở chế độ tất cả các câu.'
            : percent >= 50
              ? 'Đã nắm được phần lớn. Đọc lại các câu sai ở Knowledge Hub rồi làm lại lượt mới.'
              : 'Nên đọc lại phần tóm tắt chương trước khi làm tiếp — câu hỏi sẽ lặp lại vài lần nữa.'}
        </p>
        <div className="quiz-done-actions">
          <button type="button" className="btn btn-primary" onClick={() => start()}>
            Lượt mới
          </button>
          <button type="button" className="btn btn-ghost" onClick={() => setPhase('setup')}>
            Đổi chương
          </button>
          <Link className="btn btn-ghost" href="/knowledge">
            Knowledge Hub
          </Link>
        </div>
      </div>
    );
  }

  const question = round[index];
  const revealed = choice !== null;

  return (
    <div className="quiz">
      <div className="quiz-top">
        <span className="quiz-count">
          Câu {index + 1}/{round.length} · Ch.{question.chapter}
        </span>
        <span className="quiz-score">{score} câu đúng</span>
      </div>

      <h2 className="quiz-stem">{question.stem}</h2>

      <ul className="quiz-options">
        {question.options.map((option, optionIndex) => {
          const isChosen = choice === optionIndex;
          const isAnswer = question.answer === optionIndex;
          const state = !revealed
            ? ''
            : isAnswer
              ? ' is-correct'
              : isChosen
                ? ' is-wrong'
                : ' is-dim';
          return (
            <li key={option}>
              <button
                type="button"
                className={`quiz-option${state}`}
                disabled={revealed}
                onClick={() => choose(optionIndex)}
              >
                <span className="quiz-letter">{LETTERS[optionIndex]}</span>
                <span className="quiz-text">{option}</span>
                {revealed ? <span className="quiz-mark">{isAnswer ? '✓' : isChosen ? '✗' : ''}</span> : null}
              </button>
              {revealed ? (
                <p className={`quiz-why${isAnswer ? ' is-good' : ''}`}>{question.why[optionIndex]}</p>
              ) : null}
            </li>
          );
        })}
      </ul>

      {revealed ? (
        <div className="quiz-after">
          <p className="quiz-tip">
            <span className="quiz-tip-label">Cách loại trừ</span>
            {question.tip}
          </p>
          <div className="quiz-after-actions">
            <button type="button" className="btn btn-primary" onClick={next}>
              {index + 1 >= round.length ? 'Xem kết quả' : 'Câu tiếp theo'}
            </button>
            <span className="fineprint">
              +{choice === question.answer ? XP.answer : XP.wrongAnswer} XP
            </span>
          </div>
        </div>
      ) : (
        <p className="fineprint">Chọn một phương án. Đúng được {XP.answer} XP, sai vẫn được {XP.wrongAnswer} XP.</p>
      )}
    </div>
  );
}
