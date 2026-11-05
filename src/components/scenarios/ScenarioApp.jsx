'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import Stamp from '../Stamp';
import Ledger from './Ledger';
import { chapterLabel, chapterTitle } from '../../content/chapters';
import {
  REFLECTION_MIN,
  STEPS,
  chooseOption,
  markPerspective,
  markStepSeen,
  reflectionEnough,
  resetScenario,
  saveReflection,
  scenarioState,
  scenarioStatus,
  stepCompletion,
} from '../../lib/progress';
import { useProgress } from '../../lib/useProgress';

export default function ScenarioApp({ scenario, next }) {
  const { progress, ready, update } = useProgress();
  const [active, setActive] = useState(STEPS[0].key);
  const [openOption, setOpenOption] = useState(null);
  const [draft, setDraft] = useState('');
  const [announce, setAnnounce] = useState('');
  const [confirmReset, setConfirmReset] = useState(false);
  const panelRef = useRef(null);

  const state = scenarioState(progress, scenario.id);
  const done = stepCompletion(progress, scenario);
  const status = scenarioStatus(progress, scenario);
  const option = scenario.options.find((item) => item.id === state.choice) || null;

  useEffect(() => {
    if (ready) setDraft(scenarioState(progress, scenario.id).reflection);
    // Chỉ nạp một lần sau khi localStorage đã đọc xong.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);

  const nextKey = useMemo(() => {
    const found = STEPS.find((step) => !done[step.key]);
    return found ? found.key : null;
  }, [done]);

  function go(key) {
    setActive(key);
    const panel = panelRef.current;
    if (panel && typeof panel.scrollIntoView === 'function') {
      panel.scrollIntoView({ block: 'start' });
    }
  }

  function handleChoose(id) {
    update((current) => chooseOption(current, scenario.id, id));
    setAnnounce(`Đã ghi phương án ${id} vào hồ sơ. Các góc nhìn đã xem trước đó được đặt lại.`);
  }

  function handlePerspective(index, role) {
    update((current) => markPerspective(current, scenario.id, index));
    setAnnounce(`Đã xem góc nhìn của ${role}.`);
  }

  function handleSeen(key, message) {
    update((current) => markStepSeen(current, scenario.id, key));
    setAnnounce(message);
  }

  function handleReflection(value) {
    setDraft(value);
    update((current) => saveReflection(current, scenario.id, value));
  }

  const count = draft.trim().length;
  const enough = reflectionEnough(draft);
  const complete = status.key === 'xong';

  return (
    <div className="scene">
      <header className="scene-head">
        <p className="scene-code">
          {scenario.code} — {scenario.minutes} phút
        </p>
        <h1 className="scene-title">{scenario.title}</h1>
        <p className="scene-kicker">{scenario.kicker}</p>
        <ul className="scene-chips">
          {scenario.chapters.map((n) => (
            <li key={n}>
              <span className="chapter-chip">{chapterLabel(n)}</span>
              <span className="chip-title">{chapterTitle(n)}</span>
            </li>
          ))}
        </ul>
      </header>

      <nav className="tabs" aria-label="Năm bước của kịch bản">
        {STEPS.map((step, index) => {
          const locked = step.key === 'goc-nhin' && !state.choice;
          return (
            <button
              key={step.key}
              type="button"
              className={`tab${active === step.key ? ' is-active' : ''}${
                done[step.key] ? ' is-done' : ''
              }`}
              aria-current={active === step.key ? 'step' : undefined}
              aria-disabled={locked || undefined}
              onClick={() => {
                if (locked) {
                  setAnnounce('Cần chọn một phương án trước khi xem ba góc nhìn.');
                  go('phuong-an');
                  return;
                }
                go(step.key);
              }}
            >
              <span className="tab-num">{String(index + 1).padStart(2, '0')}</span>
              <span className="tab-label">{step.short}</span>
              <span className="tab-mark" aria-hidden="true">
                {done[step.key] ? '✓' : ''}
              </span>
            </button>
          );
        })}
      </nav>

      <p className="sr-only" aria-live="polite">
        {announce}
      </p>

      <div className="panel" ref={panelRef}>
        {active === 'boi-canh' ? (
          <section aria-labelledby="buoc-boi-canh">
            <h2 id="buoc-boi-canh" className="panel-title">
              Bối cảnh
            </h2>
            <div className="role-box">
              <p className="role-name">{scenario.role.name}</p>
              <p className="role-detail">{scenario.role.detail}</p>
            </div>
            <p className="panel-lead">{scenario.brief}</p>

            <div className="data-list">
              {scenario.dataPoints.map((point) => (
                <div className="data-row" key={point.value}>
                  <span className="data-value">{point.value}</span>
                  <span className="data-label">{point.label}</span>
                  <span className="data-note">{point.note}</span>
                </div>
              ))}
            </div>

            <div className="tension">
              <h3 className="tension-title">{scenario.tension.title}</h3>
              <p>{scenario.tension.body}</p>
            </div>

            <div className="panel-actions">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  handleSeen('boi-canh', 'Đã đánh dấu bước bối cảnh.');
                  go('phuong-an');
                }}
              >
                Đã hiểu bối cảnh, xem ba phương án
              </button>
              <span className="fineprint">Mất khoảng 2 phút cho phần này.</span>
            </div>
          </section>
        ) : null}

        {active === 'phuong-an' ? (
          <section aria-labelledby="buoc-phuong-an">
            <h2 id="buoc-phuong-an" className="panel-title">
              Ba phương án
            </h2>
            <p className="panel-lead">
              Không có phương án nào đúng cho mọi phía. Bấm mở từng phương án để xem hệ quả trên
              ba trục trước khi chọn.
            </p>

            <div className="opt-list">
              {scenario.options.map((item) => {
                const isOpen = openOption === item.id;
                const isChosen = state.choice === item.id;
                return (
                  <article
                    key={item.id}
                    className={`opt${isChosen ? ' is-chosen' : ''}${isOpen ? ' is-open' : ''}`}
                  >
                    <div className="opt-head">
                      <span className="opt-letter" aria-hidden="true">
                        {item.id}
                      </span>
                      <div className="opt-titles">
                        <h3 className="opt-title">{item.title}</h3>
                        <p className="opt-summary">{item.summary}</p>
                      </div>
                      {isChosen ? <Stamp label="Đã chọn" /> : null}
                    </div>

                    <div className="opt-actions">
                      <button
                        type="button"
                        className="btn btn-ghost btn-sm"
                        aria-expanded={isOpen}
                        onClick={() => setOpenOption(isOpen ? null : item.id)}
                      >
                        {isOpen ? 'Thu gọn hệ quả' : `Xem hệ quả của phương án ${item.id}`}
                      </button>
                      {!isChosen ? (
                        <button
                          type="button"
                          className="btn btn-sm"
                          onClick={() => handleChoose(item.id)}
                        >
                          Ghi phương án {item.id} vào hồ sơ
                        </button>
                      ) : null}
                    </div>

                    {isOpen ? <Ledger option={item} /> : null}

                    {isChosen ? (
                      <div className="opt-next">
                        <button type="button" className="btn btn-primary" onClick={() => go('goc-nhin')}>
                          Xem ba góc nhìn của phương án {item.id}
                        </button>
                      </div>
                    ) : null}
                  </article>
                );
              })}
            </div>

            {state.choice ? (
              <p className="fineprint mt-3">
                Đổi sang phương án khác sẽ đặt lại các góc nhìn đã xem, vì mỗi phương án có hệ quả
                khác nhau cho từng phía.
              </p>
            ) : null}
          </section>
        ) : null}

        {active === 'goc-nhin' ? (
          <section aria-labelledby="buoc-goc-nhin">
            <h2 id="buoc-goc-nhin" className="panel-title">
              Ba góc nhìn
            </h2>
            {!option ? (
              <div className="empty">
                <p>Bạn chưa chọn phương án nào, nên chưa có ba góc nhìn để xem.</p>
                <button type="button" className="btn btn-primary" onClick={() => go('phuong-an')}>
                  Quay lại ba phương án
                </button>
              </div>
            ) : (
              <>
                <p className="panel-lead">
                  Cùng một quyết định, ba người chịu ba hậu quả khác nhau. Mở đủ ba góc nhìn để
                  bước này được tính là hoàn thành.
                </p>
                <div className="sides">
                  {option.perspectives.map((side, index) => {
                    const seen = state.perspectivesSeen.includes(index);
                    return (
                      <article key={side.role} className={`side${seen ? ' is-seen' : ''}`}>
                        <h3 className="side-role">{side.role}</h3>
                        <p className="side-stake">{side.stake}</p>
                        {seen ? (
                          <p className="side-view">{side.view}</p>
                        ) : (
                          <button
                            type="button"
                            className="btn btn-ghost btn-sm"
                            onClick={() => handlePerspective(index, side.role)}
                          >
                            Xem góc nhìn này
                          </button>
                        )}
                      </article>
                    );
                  })}
                </div>
                <div className="panel-actions">
                  <span className="fineprint">
                    Đã xem {state.perspectivesSeen.length}/{option.perspectives.length} góc nhìn.
                  </span>
                  <button
                    type="button"
                    className="btn btn-primary"
                    disabled={state.perspectivesSeen.length < option.perspectives.length}
                    onClick={() => go('phan-tich')}
                  >
                    Đọc góc phân tích MLN122
                  </button>
                </div>
              </>
            )}
          </section>
        ) : null}

        {active === 'phan-tich' ? (
          <section aria-labelledby="buoc-phan-tich">
            <h2 id="buoc-phan-tich" className="panel-title">
              Góc phân tích MLN122
            </h2>
            {!option ? (
              <div className="empty">
                <p>Chọn phương án trước để xem phần phân tích tương ứng.</p>
                <button type="button" className="btn btn-primary" onClick={() => go('phuong-an')}>
                  Quay lại ba phương án
                </button>
              </div>
            ) : (
              <>
                <p className="panel-lead">
                  Phần này không nói lựa chọn của bạn đúng hay sai. Nó chỉ ra phạm trù nào đang
                  giải thích điều gì đã xảy ra.
                </p>
                <div className="theory">
                  {option.theory.map((item) => (
                    <article className="theory-card" key={item.concept}>
                      <p className="theory-head">
                        <span className="chapter-chip">{chapterLabel(item.chapter)}</span>
                        <span className="theory-name">{item.concept}</span>
                      </p>
                      <p className="theory-link">{item.link}</p>
                      <p className="theory-source">{chapterTitle(item.chapter)}</p>
                    </article>
                  ))}
                </div>

                <div className="tension">
                  <h3 className="tension-title">Câu hỏi phản biện</h3>
                  <p>{scenario.counterQuestion}</p>
                </div>

                <div className="panel-actions">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                      handleSeen('phan-tich', 'Đã đánh dấu bước góc phân tích.');
                      go('phan-bien');
                    }}
                  >
                    Đọc xong, sang phần phản biện
                  </button>
                </div>
              </>
            )}
          </section>
        ) : null}

        {active === 'phan-bien' ? (
          <section aria-labelledby="buoc-phan-bien">
            <h2 id="buoc-phan-bien" className="panel-title">
              Phản biện
            </h2>
            <p className="panel-lead">{scenario.reflectionPrompt}</p>
            <ul className="hints">
              {scenario.hints.map((hint) => (
                <li key={hint}>{hint}</li>
              ))}
            </ul>

            <label className="field">
              <span className="field-label">Phản biện của bạn</span>
              <textarea
                value={draft}
                onChange={(event) => handleReflection(event.target.value)}
                rows={6}
                placeholder="Viết ngắn, tập trung vào ai chịu chi phí và phạm trù nào giải thích điều đó."
              />
            </label>
            <p className={`counter${enough ? ' is-enough' : ''}`}>
              {count}/{REFLECTION_MIN} ký tự tối thiểu
              {enough ? ' — đã đủ để tính hoàn thành' : ''}
            </p>

            <div className="panel-actions">
              <button
                type="button"
                className="btn btn-primary"
                disabled={!enough}
                onClick={() => {
                  update((current) => saveReflection(current, scenario.id, draft));
                  setAnnounce('Đã lưu phản biện. Kịch bản này đã đủ điều kiện hoàn thành.');
                }}
              >
                Lưu phản biện
              </button>
              <span className="fineprint">
                Phản biện được lưu trên máy bạn, không gửi đi đâu cả.
              </span>
            </div>

            {complete ? (
              <div className="done">
                <Stamp label="Hoàn thành" detail={scenario.code} />
                <div>
                  <p className="done-title">Hồ sơ kịch bản này đã đủ năm bước.</p>
                  <p className="fineprint">
                    Phương án đã ghi: {state.choice}. Phản biện dài {count} ký tự.
                  </p>
                  <div className="done-actions">
                    <Link className="btn btn-primary btn-sm" href="/ho-so">
                      Xem hồ sơ của tôi
                    </Link>
                    {next ? (
                      <Link className="btn btn-sm" href={`/kich-ban/${next.id}`}>
                        Sang kịch bản: {next.title}
                      </Link>
                    ) : (
                      <Link className="btn btn-sm" href="/kich-ban">
                        Về danh sách kịch bản
                      </Link>
                    )}
                    <button
                      type="button"
                      className="btn btn-ghost btn-sm"
                      onClick={() => go('boi-canh')}
                    >
                      Đọc lại từ đầu
                    </button>
                  </div>
                </div>
              </div>
            ) : null}
          </section>
        ) : null}
      </div>

      <div className="scene-foot">
        <button
          type="button"
          className="btn btn-ghost btn-sm"
          onClick={() => setConfirmReset(true)}
        >
          Xoá tiến độ kịch bản này
        </button>
        <span className="fineprint">
          {status.label} — {status.doneCount}/{status.total} bước
        </span>
      </div>

      {confirmReset ? (
        <div className="confirm" role="dialog" aria-label="Xác nhận xoá tiến độ kịch bản">
          <p>
            Xoá toàn bộ lựa chọn, góc nhìn và phản biện của kịch bản này? Không khôi phục được.
          </p>
          <div className="confirm-actions">
            <button
              type="button"
              className="btn btn-sm"
              onClick={() => {
                update((current) => resetScenario(current, scenario.id));
                setDraft('');
                setOpenOption(null);
                go('boi-canh');
                setConfirmReset(false);
                setAnnounce('Đã xoá tiến độ của kịch bản này.');
              }}
            >
              Xoá tiến độ
            </button>
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => setConfirmReset(false)}>
              Giữ lại
            </button>
          </div>
        </div>
      ) : null}

      {nextKey && nextKey !== active ? (
        <div className="actbar">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => go(nextKey)}
          >
            Bước tiếp: {STEPS.find((step) => step.key === nextKey).label}
          </button>
        </div>
      ) : null}
    </div>
  );
}
