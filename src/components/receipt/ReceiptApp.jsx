'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import BucketRow from './BucketRow';
import MoneyBar from './MoneyBar';
import { GROUPS } from '../../content/items';
import { conceptById } from '../../content/concepts';
import {
  NOTE_MIN,
  amountOf,
  chooseCut,
  deviations,
  filledPercent,
  formatPercent,
  formatVnd,
  groupTotals,
  isComplete,
  itemState,
  laborShare,
  markChainSeen,
  markRevealed,
  midpoints,
  remainingPercent,
  resetItem,
  saveNote,
  setBucket,
  surplusRate,
} from '../../lib/split';
import { useSplit } from '../../lib/useSplit';

const SLOTS = ['c', 'v', 'm', 'ngoai'];

export default function ReceiptApp({ item, next }) {
  const { progress, ready, update } = useSplit();
  const [note, setNote] = useState('');
  const [announce, setAnnounce] = useState('');
  const [confirmReset, setConfirmReset] = useState(false);
  const revealRef = useRef(null);

  const state = itemState(progress, item.id);
  const filled = filledPercent(state.split);
  const remaining = remainingPercent(state.split);
  const revealed = state.revealed;
  const complete = isComplete(state);
  const deltas = deviations(item, state.split);

  const userTotals = groupTotals(item, state.split);
  const refSplit = midpoints(item);
  const refTotals = groupTotals(item, refSplit);
  const rate = surplusRate(userTotals);
  const refRate = surplusRate(refTotals);
  const share = laborShare(userTotals);
  const cutOption = item.cut.find((option) => option.bucketId === state.cut) || null;

  useEffect(() => {
    if (ready) setNote(itemState(progress, item.id).note);
    // Nạp một lần sau khi localStorage đã đọc xong.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);

  function scrollToReveal() {
    const node = revealRef.current;
    if (node && typeof node.scrollIntoView === 'function') {
      node.scrollIntoView({ block: 'start' });
    }
  }

  function handleChange(bucketId, value) {
    update((current) => setBucket(current, item, bucketId, value));
  }

  function handleReveal() {
    update((current) => markRevealed(current, item));
    setAnnounce('Đã mở phần thật để đối chiếu.');
    setTimeout(scrollToReveal, 60);
  }

  const concepts = item.concepts.map(conceptById).filter(Boolean);
  const noteLength = note.trim().length;

  return (
    <article className="receipt">
      <header className="receipt-head">
        <p className="receipt-brand">
          Bóc giá
          <span className="receipt-code">{item.code}</span>
        </p>
        <h1 className="receipt-title">{item.name}</h1>
        <p className="receipt-price">
          {formatVnd(item.price)}
          <span className="receipt-unit"> / {item.unit}</span>
        </p>
        <p className="receipt-kicker">{item.kicker}</p>
      </header>

      <p className="sr-only" aria-live="polite">
        {announce}
      </p>

      <section className="block" aria-labelledby="buoc-chia">
        <div className="block-head">
          <h2 id="buoc-chia" className="block-title">
            Chia {formatVnd(item.price)} thành bảy khoản
          </h2>
          <p className="block-lead">{item.brief}</p>
          <p className="block-note">
            Đặt phần trăm cho từng khoản sao cho cộng đủ 100%. Đây là phỏng đoán của bạn, không có
            đáp án đúng.
          </p>
        </div>

        <MoneyBar item={item} split={state.split} filled={filled} revealed={revealed} />

        <div className="rows">
          {item.buckets.map((bucket) => (
            <BucketRow
              key={bucket.id}
              item={item}
              bucket={bucket}
              value={state.split[bucket.id] || 0}
              deviation={deltas.find((delta) => delta.id === bucket.id)}
              revealed={revealed}
              onChange={(value) => handleChange(bucket.id, value)}
            />
          ))}
        </div>

        <div className={`total${filled === 100 ? ' is-full' : ''}`}>
          <span className="total-label">Đã chia</span>
          <span className="total-value" data-testid="total-value">
            {filled}%
          </span>
          <span className="total-rest">
            {filled === 100 ? 'đủ 100%' : `còn ${remaining}% chưa chia`}
          </span>
        </div>

        {!revealed ? (
          <div className="block-actions">
            <button
              type="button"
              className="btn btn-primary"
              disabled={filled !== 100}
              onClick={handleReveal}
            >
              {filled === 100 ? 'Mở phần thật để đối chiếu' : `Còn ${remaining}% chưa chia`}
            </button>
            <span className="fineprint">Mở xong vẫn đổi được cách chia.</span>
          </div>
        ) : null}
      </section>

      {revealed ? (
        <section className="block is-reveal" ref={revealRef} aria-labelledby="buoc-ket-qua">
          <div className="block-head">
            <h2 id="buoc-ket-qua" className="block-title">
              Phần thật (tham chiếu)
            </h2>
            <p className="block-lead">
              Cách chia của bạn đặt cạnh một khoảng tham chiếu. Lệch bao nhiêu không phải điểm số —
              nó là chỗ cần giải thích.
            </p>
          </div>

          <div className="groups">
            {SLOTS.map((slot) => {
              const group = GROUPS[slot];
              return (
                <div className={`group group-${slot}`} key={slot}>
                  <p className="group-name">
                    <span className={`tag tag-${slot}`}>{group.label}</span> {group.name}
                  </p>
                  <p className="group-value">
                    {formatPercent(userTotals[slot])}
                    <span className="group-ref">tham chiếu {formatPercent(refTotals[slot])}</span>
                  </p>
                  <p className="group-note">{group.note}</p>
                </div>
              );
            })}
          </div>

          <div className="rate">
            <p className="rate-label">Tỷ suất giá trị thặng dư theo cách chia của bạn</p>
            <p className="rate-value">
              {rate === null ? '—' : `${formatPercent(rate)}`}
              <span className="rate-formula">
                m′ = m / v × 100% = {userTotals.m}% / {userTotals.v}%
              </span>
            </p>
            <p className="rate-ref">
              Với cách chia tham chiếu: {refRate === null ? '—' : formatPercent(refRate)}. Phần giá
              bán trả cho lao động trong cách chia của bạn: {share === null ? '—' : formatPercent(share)}.
            </p>
            {rate === null ? (
              <p className="rate-warn">
                Bạn chưa đặt phần nào cho công lao động (v), nên m′ không tính được — phép chia
                không có mẫu số.
              </p>
            ) : null}
          </div>

          <p className="fineprint">{item.referenceNote}</p>
        </section>
      ) : null}

      {revealed ? (
        <section className="block" aria-labelledby="buoc-chuoi">
          <div className="block-head">
            <h2 id="buoc-chuoi" className="block-title">
              Ai lấy phần thặng dư
            </h2>
            <p className="block-lead">
              Bốn người trong cùng một món hàng. Mỗi người nhận một phần khác nhau, và chịu một
              loại rủi ro khác nhau.
            </p>
          </div>

          <ol className="chain">
            {item.chain.map((link, index) => (
              <li className="chain-item" key={link.actor}>
                <span className="chain-index">{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <p className="chain-actor">
                    {link.actor}
                    <span className="chain-takes">{link.takes}</span>
                  </p>
                  <p className="chain-note">{link.note}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="cut">
            <h3 className="cut-title">Nếu phải cắt 5% để giữ giá, bạn cắt ở đâu?</h3>
            <div className="cut-options">
              {item.cut.map((option) => (
                <button
                  key={option.bucketId}
                  type="button"
                  className={`cut-option${state.cut === option.bucketId ? ' is-chosen' : ''}`}
                  aria-pressed={state.cut === option.bucketId}
                  onClick={() => {
                    update((current) => chooseCut(current, item, option.bucketId));
                    setAnnounce(`Đã ghi lựa chọn: ${option.title}.`);
                  }}
                >
                  {option.title}
                </button>
              ))}
            </div>
            {cutOption ? (
              <div className="cut-result">
                <p className="cut-who">Ai chịu: {cutOption.title}</p>
                <p>{cutOption.consequence}</p>
              </div>
            ) : null}
          </div>

          {!state.chainSeen ? (
            <div className="block-actions">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  update((current) => markChainSeen(current, item));
                  setAnnounce('Đã đánh dấu xem chuỗi giá trị.');
                }}
              >
                Đã xem chuỗi giá trị
              </button>
            </div>
          ) : null}
        </section>
      ) : null}

      {state.chainSeen && state.cut ? (
        <section className="block" aria-labelledby="buoc-ghi">
          <div className="block-head">
            <h2 id="buoc-ghi" className="block-title">
              Một dòng của bạn
            </h2>
            <p className="block-lead">
              Nhìn lại cách chia của mình: điều gì quyết định phần dư ra trong món này — chi phí,
              công lao động, hay vị thế của người bán?
            </p>
          </div>

          <label className="field">
            <span className="field-label">Trả lời ngắn</span>
            <textarea
              value={note}
              rows={5}
              onChange={(event) => {
                setNote(event.target.value);
                update((current) => saveNote(current, item, event.target.value));
              }}
              placeholder="Viết 2–4 câu: phần dư ra đến từ đâu, và ai đang quyết định cách chia nó."
            />
          </label>
          <p className={`counter${noteLength >= NOTE_MIN ? ' is-enough' : ''}`}>
            {noteLength}/{NOTE_MIN} ký tự tối thiểu
            {noteLength >= NOTE_MIN ? ' — đã đủ' : ''}
          </p>

          {complete ? (
            <div className="done">
              <p className="done-title">Đã bóc xong {item.name.toLowerCase()}.</p>
              <p className="done-copy">
                Bạn chia {userTotals.c}% cho c, {userTotals.v}% cho v, phần thặng dư {userTotals.m}%
                {rate === null ? '' : ` — m′ ${formatPercent(rate)}`}.
              </p>
              <div className="done-actions">
                {next ? (
                  <Link className="btn btn-primary btn-sm" href={`/boc/${next.id}`}>
                    Bóc tiếp: {next.name}
                  </Link>
                ) : (
                  <Link className="btn btn-primary btn-sm" href="/">
                    Xem cả ba món
                  </Link>
                )}
                <Link className="btn btn-sm" href="/kien-thuc">
                  Đọc phần kiến thức
                </Link>
              </div>
            </div>
          ) : null}
        </section>
      ) : null}

      <section className="block block-knowledge" aria-labelledby="buoc-kien-thuc">
        <div className="block-head">
          <h2 id="buoc-kien-thuc" className="block-title">
            Kiến thức dùng ở đây
          </h2>
          <p className="block-lead">
            Bốn phạm trù giải thích cách chia vừa rồi. Mỗi phạm trù có trích dẫn, phần nói lại bằng
            lời thường, đúc kết và ứng dụng vào chính món này.
          </p>
        </div>

        <div className="concept-list">
          {concepts.map((concept) => (
            <article className="concept" key={concept.id}>
              <h3 className="concept-name">{concept.name}</h3>
              <blockquote className="concept-quote">
                <p>{concept.quote}</p>
                <footer>
                  Giáo trình Kinh tế chính trị Mác – Lênin, NXB Chính trị quốc gia Sự thật, 2021
                  {concept.page ? `, tr. ${concept.page}` : ' — số trang cần đối chiếu bản in'}
                </footer>
              </blockquote>
              <p className="concept-plain">{concept.plain}</p>
              <p className="concept-conclusion">
                <span className="concept-label">Đúc kết</span>
                {concept.conclusion}
              </p>
              <p className="concept-apply">
                <span className="concept-label">Với {item.name.toLowerCase()}</span>
                {concept.applications[item.id]}
              </p>
            </article>
          ))}
        </div>

        <div className="block-actions">
          <Link className="btn btn-ghost btn-sm" href="/kien-thuc">
            Xem toàn bộ kiến thức và nguồn
          </Link>
        </div>
      </section>

      <div className="receipt-foot">
        <button type="button" className="link-btn" onClick={() => setConfirmReset(true)}>
          Xoá cách chia của món này
        </button>
        <span className="fineprint">
          {complete ? 'Đã hoàn thành' : `Đã chia ${filled}%`} · lưu trên máy bạn
        </span>
      </div>

      {confirmReset ? (
        <div className="confirm" role="dialog" aria-label="Xác nhận xoá cách chia">
          <p>Xoá cách chia, lựa chọn cắt 5% và phần trả lời của món này?</p>
          <div className="confirm-actions">
            <button
              type="button"
              className="btn btn-sm"
              onClick={() => {
                update((current) => resetItem(current, item));
                setNote('');
                setConfirmReset(false);
                setAnnounce('Đã xoá cách chia của món này.');
              }}
            >
              Xoá
            </button>
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              onClick={() => setConfirmReset(false)}
            >
              Giữ lại
            </button>
          </div>
        </div>
      ) : null}

      <div className="receipt-next">
        <Link className="btn btn-ghost btn-sm" href="/">
          ← Cả ba món
        </Link>
        {next ? (
          <Link className="btn btn-sm" href={`/boc/${next.id}`}>
            {next.name}
          </Link>
        ) : null}
      </div>
    </article>
  );
}
