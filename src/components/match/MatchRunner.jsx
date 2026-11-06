'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { HUB } from '../../content/hub';
import { XP, addXp, dayKey, recordMatch } from '../../lib/game';
import { useGame } from '../../lib/useGame';

const PAIR_COUNT = 6;

function shuffle(items, seed) {
  let state = (seed || 1) >>> 0;
  const random = () => {
    state += 0x6d2b79f5;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const result = [...items];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function buildRound(round) {
  const picked = [];
  for (let i = 0; i < PAIR_COUNT; i += 1) {
    picked.push(HUB[(round * PAIR_COUNT + i) % HUB.length]);
  }
  return {
    pairs: picked,
    rightOrder: shuffle(picked.map((entry) => entry.id), round * 131 + 17),
  };
}

export default function MatchRunner() {
  const { update } = useGame();
  const [round, setRound] = useState(0);
  const [armed, setArmed] = useState(null);
  const [matched, setMatched] = useState([]);
  const [mistakes, setMistakes] = useState(0);
  const [wrong, setWrong] = useState(null);
  const timer = useRef(null);

  const data = useMemo(() => buildRound(round), [round]);
  const byId = useMemo(
    () => Object.fromEntries(data.pairs.map((entry) => [entry.id, entry])),
    [data],
  );
  const finished = matched.length === data.pairs.length;

  useEffect(() => () => clearTimeout(timer.current), []);

  useEffect(() => {
    if (!finished) return;
    update((current) => addXp(recordMatch(current, mistakes), XP.round, dayKey()));
    // Thưởng một lần khi vừa khớp hết cặp.
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
      update((current) => addXp(current, XP.matchPair, dayKey()));
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
      <div className="review-top">
        <span className="meta">
          Đã khớp {matched.length}/{data.pairs.length} · lượt {round + 1}
        </span>
        <span className="meta">{mistakes} lần chọn sai</span>
      </div>

      <p className="match-hint">
        Chọn một phạm trù bên trái, rồi chọn đúng câu đúc kết của nó bên phải. Mỗi lượt lấy sáu phạm
        trù trong Knowledge Hub.
      </p>

      <div className="match-board">
        <ul className="match-col" aria-label="Phạm trù">
          {data.pairs.map((entry) => {
            const isMatched = matched.includes(entry.id);
            return (
              <li key={`l-${entry.id}`}>
                <button
                  type="button"
                  className={`match-card${armed === entry.id ? ' is-armed' : ''}${
                    isMatched ? ' is-matched' : ''
                  }`}
                  disabled={isMatched}
                  aria-pressed={armed === entry.id}
                  onClick={() => pickLeft(entry.id)}
                >
                  {entry.term}
                </button>
              </li>
            );
          })}
        </ul>

        <ul className="match-col" aria-label="Câu đúc kết">
          {data.rightOrder.map((id) => {
            const entry = byId[id];
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
                  <span className="match-chapter">Ch.{entry.chapter}</span>
                  {entry.conclusion}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {finished ? (
        <div className="panel">
          <p className="panel-title">Đã khớp hết {data.pairs.length} cặp.</p>
          <p className="panel-copy">
            {mistakes === 0
              ? 'Không chọn sai lần nào.'
              : `Chọn sai ${mistakes} lần. Những chỗ vấp thường là ranh giới giữa các phạm trù gần nhau.`}
          </p>
          <div className="panel-actions">
            <button type="button" className="btn btn-primary btn-sm" onClick={nextRound}>
              Lượt ghép mới
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
