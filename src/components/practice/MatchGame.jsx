'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { CONCEPTS } from '../../content/concepts';
import { ITEMS } from '../../content/items';
import { XP, addXp, dayKey, recordMatch } from '../../lib/game';
import { buildMatchRound } from '../../lib/quiz';
import { useGame } from '../../lib/useGame';

export default function MatchGame() {
  const { update } = useGame();
  const [today, setToday] = useState(null);
  const [round, setRound] = useState(0);
  const [armed, setArmed] = useState(null);
  const [matched, setMatched] = useState([]);
  const [mistakes, setMistakes] = useState(0);
  const [wrong, setWrong] = useState(null);
  const timer = useRef(null);

  useEffect(() => setToday(dayKey()), []);

  const data = useMemo(() => buildMatchRound(CONCEPTS, ITEMS, round), [round]);
  const byId = useMemo(() => Object.fromEntries(data.pairs.map((pair) => [pair.id, pair])), [data]);
  const finished = matched.length === data.pairs.length;

  useEffect(() => () => clearTimeout(timer.current), []);

  useEffect(() => {
    if (!finished) return;
    update((current) =>
      addXp(recordMatch(current, mistakes), XP.round, dayKey()),
    );
    // Cộng thưởng một lần khi vừa khớp hết cặp.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finished]);

  function pickLeft(id) {
    if (matched.includes(id)) return;
    setArmed(id);
  }

  function pickRight(id) {
    if (!armed || matched.includes(id)) return;
    if (armed === id) {
      setMatched((current) => [...current, id]);
      setArmed(null);
      if (today) update((current) => addXp(current, XP.matchPair, today));
      return;
    }
    setMistakes((current) => current + 1);
    setWrong(id);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setWrong(null), 520);
    setArmed(null);
  }

  function nextRound() {
    setRound((current) => current + 1);
    setArmed(null);
    setMatched([]);
    setMistakes(0);
    setWrong(null);
  }

  return (
    <div className="match">
      <div className="match-top">
        <span className="match-count">
          Đã khớp {matched.length}/{data.pairs.length}
        </span>
        <span className="match-mistakes">{mistakes} lần chọn sai</span>
      </div>

      <p className="match-hint">
        Chọn một phạm trù bên trái, rồi chọn dòng ứng dụng đúng của nó bên phải. Dòng ứng dụng lấy
        từ chính ba món trong sản phẩm.
      </p>

      <div className="match-board">
        <ul className="match-col" aria-label="Phạm trù">
          {data.pairs.map((pair) => {
            const isMatched = matched.includes(pair.id);
            return (
              <li key={`l-${pair.id}`}>
                <button
                  type="button"
                  className={`match-card${armed === pair.id ? ' is-armed' : ''}${
                    isMatched ? ' is-matched' : ''
                  }`}
                  disabled={isMatched}
                  aria-pressed={armed === pair.id}
                  onClick={() => pickLeft(pair.id)}
                >
                  {pair.left}
                </button>
              </li>
            );
          })}
        </ul>

        <ul className="match-col" aria-label="Dòng ứng dụng">
          {data.rightOrder.map((id) => {
            const pair = byId[id];
            const isMatched = matched.includes(id);
            return (
              <li key={`r-${id}`}>
                <button
                  type="button"
                  className={`match-card match-right${isMatched ? ' is-matched' : ''}${
                    wrong === id ? ' is-wrong' : ''
                  }`}
                  disabled={isMatched}
                  onClick={() => pickRight(id)}
                >
                  <span className="match-item">{pair.itemName}</span>
                  {pair.right}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {finished ? (
        <div className="prac-done">
          <p className="prac-done-title">Đã khớp hết {data.pairs.length} cặp.</p>
          <p className="prac-done-copy">
            {mistakes === 0
              ? 'Không chọn sai lần nào.'
              : `Chọn sai ${mistakes} lần. Những chỗ vấp thường là ranh giới giữa các phạm trù gần nhau.`}
          </p>
          <div className="prac-actions">
            <button type="button" className="btn btn-primary btn-sm" onClick={nextRound}>
              Lượt ghép mới
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
