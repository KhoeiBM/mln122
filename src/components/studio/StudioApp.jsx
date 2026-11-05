'use client';

import { useEffect, useMemo, useState } from 'react';
import { course } from '../../content/course';
import {
  computeSurplus,
  chapterStatus,
  readCount,
  STORAGE_KEY,
  EMPTY_PROGRESS,
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

const NAV = [
  { id: 'tong-quan', label: 'Bảng điều khiển' },
  { id: 'luyen-tap', label: 'Trắc nghiệm' },
  { id: 'so-tay', label: 'Sổ tay ghi nhớ' },
  { id: 'bang-tinh', label: 'Bảng tính c, v, m' },
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
            const done = Boolean(progress.read?.[chapter.id]);
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
                  {done && (
                    <span className="rail-done" aria-label="đã đánh dấu học xong">
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
          {NAV.slice(1).map((item) => (
            <li key={item.id}>
              <button
                type="button"
                className={section === item.id ? 'is-active' : ''}
                aria-current={section === item.id ? 'page' : undefined}
                onClick={() => onGo(item.id)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
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
  const done = readCount(progress, chapters);
  const percent = (done / chapters.length) * 100;
  const next = chapters.find((chapter) => !progress.read?.[chapter.id]) ?? chapters[0];

  return (
    <>
      <div className="overview">
        <div className="panel">
          <div className="panel-head">Tiến độ của bạn</div>
          <div className="panel-body">
            <p className="big-number">
              <span className="num">{done}</span>
              <span className="big-number-of">/ {chapters.length} chương đã đánh dấu</span>
            </p>
            <Meter value={percent} label="Tỉ lệ chương đã hoàn thành" />
            <dl className="facts">
              <div>
                <dt>Điểm luyện cao nhất</dt>
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
                Mở chương {next.number}
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
                <span className={status.type === 'success' ? 'row-status is-done' : 'row-status'}>
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

function ChapterView({ chapter, progress, onToggleRead, revealed, onReveal }) {
  const done = Boolean(progress.read?.[chapter.id]);
  const chapterCards = chapter.flashcards.map((card, index) => ({
    ...card,
    key: `${chapter.id}-${index}`,
    chapterNo: chapter.number,
  }));

  return (
    <>
      <div className="panel hook">
        <div className="panel-head">Câu hỏi dẫn vào chương</div>
        <p className="hook-text">{chapter.hook}</p>
      </div>

      <section className="stage-section">
        <h2 className="stage-sub">Ý chính cần nắm</h2>
        <p id="tom-tat">{chapter.summary}</p>
      </section>

      <section className="stage-section">
        <h2 className="stage-sub">Bảng khái niệm</h2>
        <dl className="concepts">
          {chapter.concepts.map((concept) => (
            <div className="concept" key={concept.term}>
              <dt>{concept.term}</dt>
              <dd>
                {concept.definition}
                <span className="concept-example">
                  <b>Ví dụ.</b> {concept.example}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="stage-section">
        <h2 className="stage-sub">Thẻ ghi nhớ của chương</h2>
        <Flashcards items={chapterCards} revealed={revealed} onReveal={onReveal} />
      </section>

      <section className="stage-section">
        <div className="takeaway">
          <p>
            <b>Một câu để nhớ.</b> {chapter.takeaway}
          </p>
        </div>
        <div className="panel">
          <div className="panel-body panel-inline">
            <p>
              {done
                ? 'Bạn đã đánh dấu chương này là đã học.'
                : 'Khi đọc xong phần khái niệm và thẻ ghi nhớ, đánh dấu để bảng điều khiển ghi nhận.'}
            </p>
            <button
              type="button"
              className={done ? 'btn btn-quiet btn-sm' : 'btn btn-primary btn-sm'}
              onClick={() => onToggleRead(chapter.id)}
            >
              {done ? 'Bỏ đánh dấu' : 'Đánh dấu đã học'}
            </button>
          </div>
        </div>
      </section>
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
        <span>Câu {index + 1} trên {questions.length}</span>
        <span>Chương {question.chapterNo}. {question.chapterTitle}</span>
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

export default function StudioApp() {
  const [section, setSection] = useState('tong-quan');
  const [progress, setProgress] = useState(EMPTY_PROGRESS);
  const [hydrated, setHydrated] = useState(false);
  const [revealed, setRevealed] = useState({});

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setProgress({ ...EMPTY_PROGRESS, ...parsed, read: { ...(parsed.read ?? {}) } });
      }
    } catch {
      /* dữ liệu hỏng thì bắt đầu lại */
    }

    const params = new URLSearchParams(window.location.search);
    const target = params.get('chuong');
    if (chapters.some((chapter) => chapter.id === target)) setSection(target);
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

  const toggleRead = (chapterId) =>
    setProgress((current) => ({
      ...current,
      read: { ...current.read, [chapterId]: !current.read?.[chapterId] },
    }));

  const finishQuiz = (score) =>
    setProgress((current) => ({
      ...current,
      quizBest: Math.max(current.quizBest ?? 0, score),
      quizAttempts: (current.quizAttempts ?? 0) + 1,
    }));

  const resetProgress = () => setProgress({ ...EMPTY_PROGRESS, read: {} });

  const chapter = chapters.find((item) => item.id === section);

  const head = chapter
    ? { title: `Chương ${chapter.number}. ${chapter.title}`, sub: chapter.fullTitle }
    : {
        'tong-quan': { title: 'Bảng điều khiển', sub: `${course.code}, ${course.name}. ${course.credits} tín chỉ.` },
        'luyen-tap': { title: 'Trắc nghiệm', sub: `${questions.length} câu hỏi có giải thích, rút từ sáu chương.` },
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
          </div>

          {section === 'tong-quan' && <Overview progress={progress} onGo={go} />}

          {chapter && (
            <ChapterView
              chapter={chapter}
              progress={progress}
              onToggleRead={toggleRead}
              revealed={revealed}
              onReveal={(key) => setRevealed((current) => ({ ...current, [key]: !current[key] }))}
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
    </>
  );
}
