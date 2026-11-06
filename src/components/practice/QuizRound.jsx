'use client';

import { useEffect, useMemo, useState } from 'react';
import { ITEMS } from '../../content/items';
import { XP, addXp, dayKey, recordQuiz } from '../../lib/game';
import { buildQuiz } from '../../lib/quiz';
import { useGame } from '../../lib/useGame';

const LETTERS = ['A', 'B', 'C', 'D'];

export default function QuizRound() {
  const { update } = useGame();
  const [today, setToday] = useState(null);
  const [index, setIndex] = useState(0);
  const [choice, setChoice] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => setToday(dayKey()), []);

  const questions = useMemo(() => buildQuiz(ITEMS), []);
  const question = questions[index];

  function choose(optionIndex, isCorrect) {
    if (choice !== null) return;
    setChoice(optionIndex);
    if (isCorrect) {
      setScore((current) => current + 1);
      if (today) update((current) => addXp(current, XP.answer, today));
    }
  }

  function next() {
    if (index + 1 >= questions.length) {
      setFinished(true);
      update((current) => addXp(recordQuiz(current, score, questions.length), XP.round, dayKey()));
      return;
    }
    setIndex((current) => current + 1);
    setChoice(null);
  }

  function restart() {
    setIndex(0);
    setChoice(null);
    setScore(0);
    setFinished(false);
  }

  if (finished) {
    return (
      <div className="prac-done">
        <p className="prac-done-title">
          Đúng {score}/{questions.length} câu.
        </p>
        <p className="prac-done-copy">
          Câu hỏi được sinh trực tiếp từ số liệu ba món và khoảng tham chiếu, nên không có ngân hàng
          câu hỏi riêng để học thuộc.
        </p>
        <div className="prac-actions">
          <button type="button" className="btn btn-primary btn-sm" onClick={restart}>
            Làm lại lượt này
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz">
      <div className="quiz-top">
        <span className="quiz-count">
          Câu {index + 1}/{questions.length}
        </span>
        <span className="quiz-score">{score} câu đúng</span>
      </div>

      <h3 className="quiz-prompt">{question.prompt}</h3>

      <ul className="quiz-options">
        {question.options.map((option, optionIndex) => {
          const isChosen = choice === optionIndex;
          const revealed = choice !== null;
          const state = !revealed
            ? ''
            : option.correct
              ? ' is-correct'
              : isChosen
                ? ' is-wrong'
                : ' is-dim';
          return (
            <li key={option.text}>
              <button
                type="button"
                className={`quiz-option${state}`}
                disabled={revealed}
                onClick={() => choose(optionIndex, option.correct)}
              >
                <span className="quiz-letter">{LETTERS[optionIndex]}</span>
                <span className="quiz-text">{option.text}</span>
                {revealed ? <span className="quiz-mark">{option.correct ? '✓' : isChosen ? '✗' : ''}</span> : null}
              </button>
              {revealed ? <p className={`quiz-why${option.correct ? ' is-good' : ''}`}>{option.why}</p> : null}
            </li>
          );
        })}
      </ul>

      {choice !== null ? (
        <div className="quiz-after">
          <p className="quiz-explain">{question.explain}</p>
          <button type="button" className="btn btn-primary" onClick={next}>
            {index + 1 >= questions.length ? 'Xem kết quả' : 'Câu tiếp theo'}
          </button>
        </div>
      ) : (
        <p className="fineprint">Mỗi câu đúng được {XP.answer} điểm kinh nghiệm.</p>
      )}
    </div>
  );
}
