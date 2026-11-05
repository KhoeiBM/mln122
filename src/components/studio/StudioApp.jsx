'use client';

import { useEffect, useMemo, useState } from 'react';
import { course } from '../../content/course';
import {
  computeSurplus,
  chapterStatus,
  chapterProgress,
  completedCount,
  migrateProgress,
  STORAGE_KEY,
  EMPTY_PROGRESS,
  CHAPTER_STEPS,
} from '../../lib/metrics';

const chapters = course.chapters;

const questions = chapters.flatMap((chapter) =>
  chapter.quiz.map((question, index) => ({
    ...question,
    key: `${chapter.id}-${index}`,
    chapterNo: chapter.number,
    chapterTitle: chapter.title,
  })),
);

const cards = chapters.flatMap((chapter) =>
  chapter.flashcards.map((card, index) => ({
    ...card,
    key: `${chapter.id}-${index}`,
    chapterId: chapter.id,
    chapterNo: chapter.number,
  })),
);

const vnd = (n) => new Intl.NumberFormat('vi-VN').format(Math.round(n));

const DOCK = [
  { id: 'tong-quan', label: 'Bảng' },
  { id: 'luyen-tap', label: 'Trắc nghiệm' },
  { id: 'so-tay', label: 'Sổ tay' },
  { id: 'bang-tinh', label: 'Bảng tính' },
];

function Rail({ section, onGo, progress }) {
  return (
    <aside className="rail">
      <nav aria-label="Nội dung phòng học">
        <ul className="rail-nav">
          <li>
            <button
              type="button"
              className={section === 'tong-quan' ? 'is-active' : ''}
              aria-current={section === 'tong-quan' ? 'page' : undefined}
              onClick={() => onGo('tong-quan')}
            >
              Bảng điều khiển
            </button>
          </li>
        </ul>

        <p className="rail-label">Sáu chương</p>
        <ul className="rail-nav">
          {chapters.map((chapter) => {
            const state = chapterProgress(progress, chapter);
            return (
              <li key={chapter.id}>
                <button
                  type="button"
                  className={section === chapter.id ? 'is-active' : ''}
                  aria-current={section === chapter.id ? 'page' : undefined}
                  onClick={() => onGo(chapter.id)}
                >
                  <span className="rail-no">{chapter.number}</span>
                  <span>{chapter.title}</span>
                  {state.done && (
                    <span className="rail-done" aria-label="đã hoàn thành chương">
                      ✓
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        <p className="rail-label">Luyện và tra cứu</p>
        <ul className="rail-nav">
          {DOCK.slice(1).map((item) => (
            <li key={item.id}>
              <button
                type="button"
                className={section === item.id ? 'is-active' : ''}
                aria-current={section === item.id ? 'page' : undefined}
                onClick={() => onGo(item.id)}
              >
                {item.id === 'luyen-tap' ? 'Trắc nghiệm' : item.id === 'so-tay' ? 'Sổ tay ghi nhớ' : 'Bảng tính c, v, m'}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

function Dock({ section, onGo }) {
  return (
    <nav className="dock" aria-label="Điều hướng nhanh">
      {DOCK.map((item) => (
        <button
          key={item.id}
          type="button"
          className={section === item.id ? 'is-active' : ''}
          aria-current={section === item.id ? 'page' : undefined}
          onClick={() => onGo(item.id)}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
}

function Meter({ value, label }) {
  return (
    <div className="meter-wrap">
      <div
        className="meter"
        role="progressbar"
        aria-valuenow={Math.round(value)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
      >
        <span style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
      </div>
      <span className="meter-value num">{Math.round(value)}%</span>
    </div>
  );
}

function Overview({ progress, onGo }) {
  const done = completedCount(progress, chapters);
  const percent = (done / chapters.length) * 100;
  const next = chapters.find((chapter) => !chapterProgress(progress, chapter).done) ?? chapters[0];

  return (
    <>
      <div className="overview">
        <div className="panel">
          <div className="panel-head">Tiến độ của bạn</div>
          <div className="panel-body">
            <p className="big-number">
              <span className="num">{done}</span>
              <span className="big-number-of">/ {chapters.length} chương hoàn thành</span>
            </p>
            <Meter value={percent} label="Tỉ lệ chương đã hoàn thành" />
            <dl className="facts">
              <div>
                <dt>Điểm luyện tổng</dt>
                <dd>{progress.quizBest == null ? 'chưa làm' : `${progress.quizBest}/${questions.length}`}</dd>
              </div>
              <div>
                <dt>Lượt luyện</dt>
                <dd>{progress.quizAttempts ?? 0}</dd>
              </div>
              <div>
                <dt>Thẻ ghi nhớ</dt>
                <dd>{cards.length}</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="panel">
          <div className="panel-head">Việc tiếp theo</div>
          <div className="panel-body">
            <h2 className="panel-title">
              Chương {next.number}. {next.title}
            </h2>
            <p className="panel-text">{next.hook}</p>
            <div className="panel-actions">
              <button type="button" className="btn btn-primary btn-sm" onClick={() => onGo(next.id)}>
                Vào chương {next.number}
              </button>
              <button type="button" className="btn btn-quiet btn-sm" onClick={() => onGo('luyen-tap')}>
                Làm trắc nghiệm
              </button>
            </div>
          </div>
        </div>
      </div>

      <section className="stage-section">
        <h2 className="stage-sub">Bản đồ sáu chương</h2>
        <p className="stage-note">
          Mỗi chương đi theo ba bước: hiểu ý chính, xem ví dụ, tự kiểm tra. Chương chỉ được tính là
          hoàn thành khi bạn đã xem kết quả phần tự kiểm tra.
        </p>
        <ul className="rows">
          {chapters.map((chapter) => {
            const status = chapterStatus(progress, chapter);
            return (
              <li key={chapter.id} className="row">
                <span className="row-no num">{chapter.number}</span>
                <span className="row-main">
                  <span className="row-title">{chapter.title}</span>
                  <span className="row-sub">{chapter.fullTitle}</span>
                </span>
                <span
                  className={
                    'row-status' +
                    (status.type === 'success' ? ' is-done' : status.type === 'progress' ? ' is-progress' : '')
                  }
                >
                  {status.label}
                </span>
                <span className="row-meta">{chapter.level}</span>
                <span className="row-meta row-time num">{chapter.time} phút</span>
                <button type="button" className="btn btn-quiet btn-sm" onClick={() => onGo(chapter.id)}>
                  Mở
                </button>
              </li>
            );
          })}
        </ul>
        <p className="fineprint">
          Tiến độ được lưu trong trình duyệt này. Đổi máy hoặc xoá dữ liệu trình duyệt thì tiến độ
          không đi theo. Nội dung là bản tóm tắt để tự học, không thay thế giáo trình.
        </p>
      </section>
    </>
  );
}

function Flashcards({ items, revealed, onReveal }) {
  return (
    <ul className="cards">
      {items.map((card) => {
        const open = Boolean(revealed[card.key]);
        return (
          <li className="card" key={card.key}>
            <p className="card-front">{card.front}</p>
            <p className={open ? 'card-back is-open' : 'card-back'}>
              {open ? card.back : 'Tự trả lời trước khi mở đáp án.'}
            </p>
            <div className="card-foot">
              <button type="button" className="btn btn-quiet btn-sm" onClick={() => onReveal(card.key)}>
                {open ? 'Thu đáp án' : 'Hiện đáp án'}
              </button>
              <span className="card-tag">Chương {card.chapterNo}</span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function ChapterQuiz({ chapter, previous, onResult }) {
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState(false);

  const score = chapter.quiz.reduce(
    (total, question, index) => total + (answers[index] === question.answer ? 1 : 0),
    0,
  );
  const allAnswered = chapter.quiz.every((_, index) => answers[index] !== undefined);

  if (checked) {
    return (
      <div className="quiz-result">
        <p className="big-number">
          <span className="num">{score}</span>
          <span className="big-number-of">/ {chapter.quiz.length} câu đúng</span>
        </p>
        <p className="panel-text">
          {score === chapter.quiz.length
            ? 'Đúng hết. Bạn có thể chuyển sang chương tiếp theo.'
            : 'Đọc lại phần giải thích ở từng câu bên dưới, rồi làm lại nếu cần.'}
        </p>
        <div className="panel-actions">
          <button
            type="button"
            className="btn btn-quiet btn-sm"
            onClick={() => {
              setAnswers({});
              setChecked(false);
            }}
          >
            Làm lại phần này
          </button>
        </div>

        <ol className="quiz-review">
          {chapter.quiz.map((question, index) => {
            const right = answers[index] === question.answer;
            return (
              <li key={question.q}>
                <p className="quiz-review-q">
                  <span className={right ? 'mark is-right' : 'mark is-wrong'}>{right ? 'Đúng' : 'Sai'}</span>
                  {question.q}
                </p>
                <p className="quiz-review-a">
                  Đáp án đúng: <b>{question.options[question.answer]}</b>
                </p>
                <p className="quiz-review-e">{question.explain}</p>
              </li>
            );
          })}
        </ol>
      </div>
    );
  }

  return (
    <form
      className="chapter-quiz"
      onSubmit={(event) => {
        event.preventDefault();
        if (!allAnswered) return;
        setChecked(true);
        onResult(score);
      }}
    >
      {chapter.quiz.map((question, index) => (
        <fieldset className="quiz-fieldset" key={question.q}>
          <legend className="quiz-legend">
            <span className="quiz-index num">{index + 1}</span>
            {question.q}
          </legend>
          {question.options.map((option, position) => (
            <label
              key={option}
              className={'option' + (answers[index] === position ? ' is-chosen' : '')}
            >
              <input
                type="radio"
                name={`${chapter.id}-${index}`}
                value={position}
                checked={answers[index] === position}
                onChange={() => setAnswers((current) => ({ ...current, [index]: position }))}
              />
              <span className="option-key num">{String.fromCharCode(65 + position)}</span>
              <span>{option}</span>
            </label>
          ))}
        </fieldset>
      ))}

      <div className="quiz-actions">
        <button type="submit" className="btn btn-primary btn-sm" disabled={!allAnswered}>
          Xem kết quả
        </button>
        <span className="fineprint" style={{ margin: 0 }}>
          {previous === null
            ? 'Lần đầu làm phần này.'
            : `Lần trước: ${previous}/${chapter.quiz.length} câu đúng.`}
        </span>
      </div>
    </form>
  );
}

function ChapterSteps({ chapter, progress, onStage, revealed, onReveal, onGo }) {
  const state = chapterProgress(progress, chapter);
  const startStep = state.count === 3 ? 2 : state.count;
  const [step, setStep] = useState(startStep);

  const nextChapter = chapters[chapters.findIndex((item) => item.id === chapter.id) + 1];

  const goStep = (next) => setStep(next);

  return (
    <>
      <ol className="steps" aria-label="Ba bước của chương">
        {CHAPTER_STEPS.map((item, index) => {
          const done = index === 0 ? state.hieu : index === 1 ? state.viDu : state.kiemTra !== null;
          return (
            <li key={item.id}>
              <button
                type="button"
                className={'step' + (step === index ? ' is-current' : '') + (done ? ' is-done' : '')}
                aria-current={step === index ? 'step' : undefined}
                onClick={() => goStep(index)}
              >
                <span className="step-no num">{index + 1}</span>
                <span className="step-label">{item.label}</span>
                <span className="step-state">{done ? 'đã xong' : 'chưa'}</span>
              </button>
            </li>
          );
        })}
      </ol>

      {step === 0 && (
        <>
          <div className="panel hook">
            <div className="panel-head">Câu hỏi dẫn vào chương</div>
            <p className="hook-text">{chapter.hook}</p>
          </div>

          <section className="stage-section">
            <h2 className="stage-sub">Ý chính cần nắm</h2>
            <p className="stage-note">{chapter.summary}</p>
          </section>

          <section className="stage-section">
            <h2 className="stage-sub">Bảng khái niệm</h2>
            <dl className="concepts">
              {chapter.concepts.map((concept) => (
                <div className="concept" key={concept.term}>
                  <dt>{concept.term}</dt>
                  <dd>{concept.definition}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="stage-section">
            <div className="takeaway">
              <p>
                <b>Một câu để nhớ.</b> {chapter.takeaway}
              </p>
            </div>
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={() => {
                onStage(chapter.id, 'hieu');
                goStep(1);
              }}
            >
              Đã hiểu, xem ví dụ
            </button>
          </section>
        </>
      )}

      {step === 1 && (
        <>
          <section className="stage-section">
            <h2 className="stage-sub">Ví dụ đời thường</h2>
            <p className="stage-note">
              Cùng một phạm trù, nhìn qua bốn câu chuyện. Đọc xong, thử tự lấy một ví dụ của riêng bạn
              trước khi sang phần tự kiểm tra.
            </p>
            <ul className="examples">
              {chapter.concepts.map((concept) => (
                <li key={concept.term}>
                  <span className="example-term">{concept.term}</span>
                  <p>{concept.example}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="stage-section">
            <h2 className="stage-sub">Thẻ ghi nhớ của chương</h2>
            <Flashcards
              items={chapter.flashcards.map((card, index) => ({
                ...card,
                key: `${chapter.id}-${index}`,
                chapterNo: chapter.number,
              }))}
              revealed={revealed}
              onReveal={onReveal}
            />
          </section>

          <div className="step-actions">
            <button type="button" className="btn btn-quiet btn-sm" onClick={() => goStep(0)}>
              Quay lại ý chính
            </button>
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={() => {
                onStage(chapter.id, 'vi-du');
                goStep(2);
              }}
            >
              Sang phần tự kiểm tra
            </button>
          </div>
        </>
      )}

      {step === 2 && (
        <section className="stage-section">
          <h2 className="stage-sub">Tự kiểm tra chương {chapter.number}</h2>
          <p className="stage-note">
            {chapter.quiz.length} câu. Chọn đáp án cho tất cả, rồi xem kết quả. Điểm ở đây được ghi
            nhận cho chương này và không ảnh hưởng điểm luyện tổng.
          </p>
          <ChapterQuiz
            chapter={chapter}
            previous={state.kiemTra}
            onResult={(score) => onStage(chapter.id, 'tu-kiem-tra', score)}
          />
        </section>
      )}

      {state.done && (
        <div className="done-bar">
          <p>
            <b>Chương {chapter.number} đã hoàn thành.</b> Bạn đã qua đủ ba bước và xem kết quả tự kiểm
            tra.
          </p>
          <div className="panel-actions">
            {nextChapter ? (
              <button type="button" className="btn btn-primary btn-sm" onClick={() => onGo(nextChapter.id)}>
                Sang chương {nextChapter.number}
              </button>
            ) : (
              <button type="button" className="btn btn-primary btn-sm" onClick={() => onGo('luyen-tap')}>
                Làm bài luyện tổng
              </button>
            )}
            <button type="button" className="btn btn-quiet btn-sm" onClick={() => onGo('tong-quan')}>
              Về bảng điều khiển
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function Practice({ progress, onFinish }) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [finished, setFinished] = useState(false);

  const question = questions[index];
  const chosen = answers[question.key];
  const answeredCount = Object.keys(answers).length;
  const score = questions.reduce(
    (total, item) => total + (answers[item.key] === item.answer ? 1 : 0),
    0,
  );

  const restart = () => {
    setAnswers({});
    setIndex(0);
    setFinished(false);
  };

  if (finished) {
    const percent = (score / questions.length) * 100;
    return (
      <>
        <div className="panel">
          <div className="panel-head">Kết quả lượt này</div>
          <div className="panel-body">
            <p className="big-number">
              <span className="num">{score}</span>
              <span className="big-number-of">/ {questions.length} câu đúng</span>
            </p>
            <Meter value={percent} label="Tỉ lệ câu trả lời đúng" />
            <p className="panel-text">
              {percent >= 80
                ? 'Nắm khá chắc. Làm lại lần nữa để giữ phong độ.'
                : 'Còn vài chương nên đọc lại phần khái niệm trước khi thi.'}
            </p>
            <div className="panel-actions">
              <button type="button" className="btn btn-primary btn-sm" onClick={restart}>
                Làm lại
              </button>
              <button type="button" className="btn btn-quiet btn-sm" onClick={() => setFinished(false)}>
                Xem lại đáp án
              </button>
            </div>
          </div>
        </div>

        <section className="stage-section">
          <h2 className="stage-sub">Chi tiết từng câu</h2>
          <ul className="rows">
            {questions.map((item, position) => {
              const right = answers[item.key] === item.answer;
              return (
                <li className="row row-quiet" key={item.key}>
                  <span className="row-no num">{position + 1}</span>
                  <span className="row-main">
                    <span className="row-title">{item.q}</span>
                    <span className="row-sub">
                      Chương {item.chapterNo}. Đáp án đúng: {item.options[item.answer]}
                    </span>
                  </span>
                  <span className={right ? 'row-status is-done' : 'row-status is-wrong'}>
                    {right ? 'Đúng' : 'Sai'}
                  </span>
                </li>
              );
            })}
          </ul>
        </section>
      </>
    );
  }

  return (
    <div className="panel">
      <div className="panel-head">
        <span>
          Câu {index + 1} trên {questions.length}
        </span>
        <span>
          Chương {question.chapterNo}. {question.chapterTitle}
        </span>
      </div>
      <div className="panel-body">
        <Meter value={(answeredCount / questions.length) * 100} label="Số câu đã trả lời" />

        <form
          className="quiz"
          onSubmit={(event) => {
            event.preventDefault();
            if (chosen === undefined) return;
            if (index === questions.length - 1) {
              setFinished(true);
              onFinish(score);
            } else {
              setIndex((current) => current + 1);
            }
          }}
        >
          <fieldset className="quiz-fieldset">
            <legend className="quiz-legend">{question.q}</legend>
            {question.options.map((option, position) => (
              <label
                key={option}
                className={
                  'option' +
                  (chosen === position ? ' is-chosen' : '') +
                  (chosen !== undefined && position === question.answer ? ' is-correct' : '')
                }
              >
                <input
                  type="radio"
                  name={question.key}
                  value={position}
                  checked={chosen === position}
                  onChange={() =>
                    setAnswers((current) => ({ ...current, [question.key]: position }))
                  }
                />
                <span className="option-key num">{String.fromCharCode(65 + position)}</span>
                <span>{option}</span>
              </label>
            ))}
          </fieldset>

          <div aria-live="polite">
            {chosen !== undefined && (
              <p className={chosen === question.answer ? 'feedback is-right' : 'feedback is-wrong'}>
                <b>{chosen === question.answer ? 'Đúng.' : 'Chưa đúng.'}</b> {question.explain}
              </p>
            )}
          </div>

          <div className="quiz-actions">
            <button
              type="button"
              className="btn btn-quiet btn-sm"
              onClick={() => setIndex((current) => Math.max(0, current - 1))}
              disabled={index === 0}
            >
              Câu trước
            </button>
            <button type="submit" className="btn btn-primary btn-sm" disabled={chosen === undefined}>
              {index === questions.length - 1 ? 'Xem kết quả' : 'Câu tiếp'}
            </button>
            <button type="button" className="btn btn-quiet btn-sm" onClick={restart}>
              Làm lại từ đầu
            </button>
          </div>
        </form>

        <p className="fineprint">
          Lượt luyện tốt nhất được lưu trên máy:{' '}
          {progress.quizBest == null ? 'chưa có' : `${progress.quizBest}/${questions.length}`}.
        </p>
      </div>
    </div>
  );
}

function Notebook({ revealed, onReveal }) {
  const [filter, setFilter] = useState('all');
  const items = useMemo(
    () => (filter === 'all' ? cards : cards.filter((card) => card.chapterId === filter)),
    [filter],
  );

  return (
    <>
      <p className="lede">
        Đọc câu hỏi, tự trả lời thành tiếng, rồi mở đáp án. Đây là cách nhanh nhất để biết mình đã
        hiểu hay chỉ đang nhận ra chữ quen.
      </p>

      <div className="chips" role="group" aria-label="Lọc thẻ theo chương">
        <button
          type="button"
          className={filter === 'all' ? 'chip is-active' : 'chip'}
          aria-pressed={filter === 'all'}
          onClick={() => setFilter('all')}
        >
          Tất cả {cards.length} thẻ
        </button>
        {chapters.map((chapter) => (
          <button
            key={chapter.id}
            type="button"
            className={filter === chapter.id ? 'chip is-active' : 'chip'}
            aria-pressed={filter === chapter.id}
            onClick={() => setFilter(chapter.id)}
          >
            Chương {chapter.number}
          </button>
        ))}
      </div>

      <Flashcards items={items} revealed={revealed} onReveal={onReveal} />
    </>
  );
}

function Calculator() {
  const [price, setPrice] = useState(45000);
  const [materials, setMaterials] = useState(12000);
  const [depreciation, setDepreciation] = useState(6000);
  const [wage, setWage] = useState(9000);

  const { c, v, m, rate, shares } = computeSurplus({ price, materials, depreciation, wage });

  const fields = [
    { id: 'gia', label: 'Giá bán', value: price, set: setPrice, min: 15000, max: 90000, step: 1000 },
    { id: 'nguyen-lieu', label: 'Nguyên liệu', value: materials, set: setMaterials, min: 0, max: 50000, step: 500 },
    { id: 'khau-hao', label: 'Khấu hao máy và mặt bằng', value: depreciation, set: setDepreciation, min: 0, max: 30000, step: 500 },
    { id: 'tien-cong', label: 'Tiền công người pha chế', value: wage, set: setWage, min: 0, max: 40000, step: 500 },
  ];

  return (
    <div className="counter">
      <div className="counter-panel">
        <div className="counter-head">
          <span>Tham số một ly</span>
          <span>Kéo để thay đổi</span>
        </div>
        <div className="counter-body">
          {fields.map((field) => (
            <div className="field" key={field.id}>
              <label className="field-label" htmlFor={field.id}>
                <span>{field.label}</span>
                <output htmlFor={field.id}>{vnd(field.value)}đ</output>
              </label>
              <input
                id={field.id}
                className="range"
                type="range"
                min={field.min}
                max={field.max}
                step={field.step}
                value={field.value}
                onChange={(event) => field.set(Number(event.target.value))}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="counter-panel">
        <div className="counter-head">
          <span>Kết quả</span>
          <span>Tính theo m = giá bán − c − v</span>
        </div>
        <div className="counter-body">
          <div className="split" aria-hidden="true">
            <span className="split-c" style={{ width: `${shares.c}%` }} />
            <span className="split-v" style={{ width: `${shares.v}%` }} />
            <span className="split-m" style={{ width: `${shares.m}%` }} />
          </div>
          <div className="legend">
            <span>
              <i style={{ background: 'var(--rule)' }} /> c
            </span>
            <span>
              <i style={{ background: 'var(--board)' }} /> v
            </span>
            <span>
              <i style={{ background: 'var(--yellow)' }} /> m
            </span>
          </div>

          <div className="readout">
            <div>
              <span className="readout-label">Tư bản bất biến c</span>
              <span className="readout-value">
                {vnd(c)}
                <small>đ</small>
              </span>
            </div>
            <div>
              <span className="readout-label">Tư bản khả biến v</span>
              <span className="readout-value">
                {vnd(v)}
                <small>đ</small>
              </span>
            </div>
            <div className={m < 0 ? '' : 'is-m'}>
              <span className="readout-label">Giá trị thặng dư m</span>
              <span className="readout-value">
                {vnd(m)}
                <small>đ</small>
              </span>
            </div>
            <div>
              <span className="readout-label">Tỷ suất m′</span>
              <span className="readout-value">
                {v === 0 ? '—' : rate.toFixed(0)}
                <small>%</small>
              </span>
            </div>
          </div>

          <p className={'counter-note' + (m < 0 ? ' is-loss' : '')}>
            {m < 0
              ? 'Giá bán thấp hơn chi phí nên không có phần dôi ra. Quán đang lỗ.'
              : `c = ${vnd(c)}đ được chuyển nguyên vẹn vào sản phẩm. v = ${vnd(v)}đ tạo ra giá trị mới ${vnd(v + m)}đ; phần dôi ra ${vnd(m)}đ là giá trị thặng dư.`}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function StudioApp({ initialSection = 'tong-quan' }) {
  const [section, setSection] = useState(initialSection);
  const [progress, setProgress] = useState(EMPTY_PROGRESS);
  const [hydrated, setHydrated] = useState(false);
  const [revealed, setRevealed] = useState({});

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setProgress(migrateProgress(JSON.parse(raw)));
    } catch {
      /* dữ liệu hỏng thì bắt đầu lại */
    }

    if (window.location.hash === '#bang-tinh') setSection('bang-tinh');

    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      /* trình duyệt chặn lưu trữ thì bỏ qua */
    }
  }, [progress, hydrated]);

  const go = (next) => {
    setSection(next);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const markStage = (chapterId, stage, score) =>
    setProgress((current) => {
      const chapterStages = { ...(current.stages?.[chapterId] ?? {}) };

      if (stage === 'tu-kiem-tra') {
        chapterStages['tu-kiem-tra'] =
          score === undefined ? chapterStages['tu-kiem-tra'] : score;
      } else {
        chapterStages[stage] = true;
      }

      return { ...current, stages: { ...current.stages, [chapterId]: chapterStages } };
    });

  const finishQuiz = (score) =>
    setProgress((current) => ({
      ...current,
      quizBest: Math.max(current.quizBest ?? 0, score),
      quizAttempts: (current.quizAttempts ?? 0) + 1,
    }));

  const resetProgress = () => setProgress({ ...EMPTY_PROGRESS, stages: {} });

  const chapter = chapters.find((item) => item.id === section);

  const head = chapter
    ? { title: `Chương ${chapter.number}. ${chapter.title}`, sub: chapter.fullTitle }
    : {
        'tong-quan': {
          title: 'Bảng điều khiển',
          sub: `${course.code}, ${course.name}. ${course.credits} tín chỉ.`,
        },
        'luyen-tap': {
          title: 'Trắc nghiệm',
          sub: `${questions.length} câu hỏi có giải thích, rút từ sáu chương.`,
        },
        'so-tay': { title: 'Sổ tay ghi nhớ', sub: `${cards.length} thẻ để tự kiểm tra trước khi thi.` },
        'bang-tinh': {
          title: 'Bảng tính c, v, m',
          sub: 'Kéo bốn thanh trượt để thấy giá trị thặng dư và tỷ suất thay đổi theo từng đồng.',
        },
      }[section];

  return (
    <>
      <header className="studio-top">
        <div className="shell studio-top-inner">
          <a className="wordmark" href="/">
            Sạp <span>122</span>
            <small>Phòng học</small>
          </a>
          <div className="studio-top-actions">
            <a className="btn btn-quiet btn-sm" href="/de-cuong">
              Bản in một trang
            </a>
            <a className="btn btn-quiet btn-sm" href="/">
              Trang chủ
            </a>
            <button type="button" className="btn btn-quiet btn-sm" onClick={resetProgress}>
              Đặt lại tiến độ
            </button>
          </div>
        </div>
      </header>

      <div className="shell studio">
        <Rail section={section} onGo={go} progress={progress} />

        <main className="stage">
          <div className="stage-head">
            <h1>{head.title}</h1>
            <p className="stage-sub-line">{head.sub}</p>
            <label className="chapter-select">
              <span>Chuyển chương</span>
              <select value={chapter ? chapter.id : ''} onChange={(event) => go(event.target.value)}>
                <option value="" disabled>
                  Chọn chương
                </option>
                {chapters.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.number}. {item.title}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {section === 'tong-quan' && <Overview progress={progress} onGo={go} />}

          {chapter && (
            <ChapterSteps
              key={chapter.id}
              chapter={chapter}
              progress={progress}
              onStage={markStage}
              revealed={revealed}
              onReveal={(key) => setRevealed((current) => ({ ...current, [key]: !current[key] }))}
              onGo={go}
            />
          )}

          {section === 'luyen-tap' && <Practice progress={progress} onFinish={finishQuiz} />}

          {section === 'so-tay' && (
            <Notebook
              revealed={revealed}
              onReveal={(key) => setRevealed((current) => ({ ...current, [key]: !current[key] }))}
            />
          )}

          {section === 'bang-tinh' && <Calculator />}

          <p className="fineprint studio-foot">
            {course.school}. Môn {course.code}, {course.name}. Nội dung tóm tắt phục vụ tự học, không
            thay thế giáo trình chính thức hay hướng dẫn của giảng viên.
          </p>
        </main>
      </div>

      <Dock section={section} onGo={go} />
    </>
  );
}
