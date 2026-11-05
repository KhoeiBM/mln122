'use client';

import { useEffect, useMemo, useState } from 'react';
import AppLayout from '@cloudscape-design/components/app-layout';
import TopNavigation from '@cloudscape-design/components/top-navigation';
import SideNavigation from '@cloudscape-design/components/side-navigation';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import Header from '@cloudscape-design/components/header';
import Container from '@cloudscape-design/components/container';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Grid from '@cloudscape-design/components/grid';
import Table from '@cloudscape-design/components/table';
import Tabs from '@cloudscape-design/components/tabs';
import Cards from '@cloudscape-design/components/cards';
import Badge from '@cloudscape-design/components/badge';
import Button from '@cloudscape-design/components/button';
import Box from '@cloudscape-design/components/box';
import ProgressBar from '@cloudscape-design/components/progress-bar';
import StatusIndicator from '@cloudscape-design/components/status-indicator';
import RadioGroup from '@cloudscape-design/components/radio-group';
import Flashbar from '@cloudscape-design/components/flashbar';
import Slider from '@cloudscape-design/components/slider';
import Form from '@cloudscape-design/components/form';
import FormField from '@cloudscape-design/components/form-field';
import Select from '@cloudscape-design/components/select';
import Alert from '@cloudscape-design/components/alert';
import Link from '@cloudscape-design/components/link';
import KeyValuePairs from '@cloudscape-design/components/key-value-pairs';
import { course } from '../../content/course';
import { applyStudioTheme } from './theme';
import { computeSurplus, chapterStatus, STORAGE_KEY, EMPTY_PROGRESS } from '../../lib/metrics';

const vnd = (n) => new Intl.NumberFormat('vi-VN').format(Math.round(n));

const chapters = course.chapters;
const questions = chapters.flatMap((chapter) =>
  chapter.quiz.map((question, index) => ({
    ...question,
    key: `${chapter.id}-${index}`,
    chapterId: chapter.id,
    chapterNo: chapter.number,
    chapterTitle: chapter.title,
  })),
);
const flashcards = chapters.flatMap((chapter) =>
  chapter.flashcards.map((card, index) => ({
    ...card,
    key: `${chapter.id}-${index}`,
    chapterId: chapter.id,
    chapterNo: chapter.number,
  })),
);

const yes = (v) => v === true;

/* ------------------------------------------------------------------ */
/* Bảng điều khiển                                                     */
/* ------------------------------------------------------------------ */

function Overview({ progress, onOpen, onPractice }) {
  const readCount = chapters.filter((chapter) => yes(progress.read?.[chapter.id])).length;
  const percent = Math.round((readCount / chapters.length) * 100);
  const nextChapter = chapters.find((chapter) => !yes(progress.read?.[chapter.id])) ?? chapters[0];

  const columns = [
    {
      id: 'chapter',
      header: 'Chương',
      cell: (item) => (
        <Link href="#mo-chuong" onFollow={(event) => { event.preventDefault(); onOpen(item.id); }}>
          {item.number} · {item.title}
        </Link>
      ),
      width: 280,
    },
    { id: 'full', header: 'Nội dung', cell: (item) => <Box color="text-body-secondary">{item.fullTitle}</Box> },
    {
      id: 'status',
      header: 'Trạng thái',
      cell: (item) => {
        const status = chapterStatus(progress, item);
        return <StatusIndicator type={status.type}>{status.label}</StatusIndicator>;
      },
      width: 160,
    },
    {
      id: 'level',
      header: 'Mức độ',
      cell: (item) => <Badge color={item.level === 'Trọng tâm' ? 'red' : 'grey'}>{item.level}</Badge>,
      width: 120,
    },
    { id: 'time', header: 'Thời lượng', cell: (item) => `${item.time} phút`, width: 110 },
    {
      id: 'action',
      header: '',
      cell: (item) => (
        <Button variant="inline-link" onClick={() => onOpen(item.id)}>
          Mở chương
        </Button>
      ),
      width: 130,
    },
  ];

  return (
    <SpaceBetween size="l">
      <Grid gridDefinition={[{ colspan: { default: 12, m: 5 } }, { colspan: { default: 12, m: 4 } }, { colspan: { default: 12, m: 3 } }]}>
        <Container header={<Header variant="h2">Tiến độ của bạn</Header>}>
          <SpaceBetween size="m">
            <ProgressBar
              value={percent}
              description={`${readCount} trên ${chapters.length} chương đã đánh dấu`}
              additionalInfo={`Điểm luyện cao nhất: ${progress.quizBest == null ? 'chưa làm' : `${progress.quizBest}/${questions.length}`}`}
              status={percent === 100 ? 'success' : 'in-progress'}
            />
            <KeyValuePairs
              columns={2}
              items={[
                { label: 'Chương đã đọc', value: `${readCount}/${chapters.length}` },
                { label: 'Lượt luyện tập', value: progress.quizAttempts ?? 0 },
                { label: 'Flashcard', value: flashcards.length },
                { label: 'Câu hỏi', value: questions.length },
              ]}
            />
          </SpaceBetween>
        </Container>

        <Container header={<Header variant="h2">Gợi ý tiếp theo</Header>}>
          <SpaceBetween size="s">
            <Box variant="p">
              {readCount === chapters.length
                ? 'Bạn đã đi hết sáu chương. Chuyển sang phần luyện tập để kiểm tra lại những chương yếu.'
                : `Chương ${nextChapter.number} đang mở: ${nextChapter.title}`}
            </Box>
            <Box variant="p" color="text-body-secondary">
              {nextChapter.hook}
            </Box>
            <SpaceBetween direction="horizontal" size="xs">
              <Button variant="primary" onClick={() => onOpen(nextChapter.id)}>
                Vào chương {nextChapter.number}
              </Button>
              <Button onClick={onPractice}>Luyện trắc nghiệm</Button>
            </SpaceBetween>
          </SpaceBetween>
        </Container>

        <Container header={<Header variant="h2">Ghi chú sử dụng</Header>}>
          <SpaceBetween size="s">
            <Box variant="small" color="text-body-secondary">
              Tiến độ được lưu trong trình duyệt này. Đổi máy hoặc xóa dữ liệu trình duyệt thì tiến độ
              không đi theo.
            </Box>
            <Box variant="small" color="text-body-secondary">
              Nội dung là bản tóm tắt để tự học, không thay thế giáo trình và hướng dẫn của giảng viên.
            </Box>
          </SpaceBetween>
        </Container>
      </Grid>

      <Table
        columnDefinitions={columns}
        items={chapters}
        variant="container"
        header={
          <Header variant="h2" counter={`(${chapters.length})`} description="Sáu chương của MLN122, sắp theo thứ tự giáo trình.">
            Bản đồ môn học
          </Header>
        }
        footer={<Box color="text-body-secondary">Nhấn vào tên chương để mở phần học tương ứng.</Box>}
      />
    </SpaceBetween>
  );
}

/* ------------------------------------------------------------------ */
/* Trang chương                                                        */
/* ------------------------------------------------------------------ */

function FlashcardDeck({ items, progress, onStar }) {
  return (
    <Cards
      items={items}
      cardDefinition={{
        header: (item) => (
          <SpaceBetween direction="horizontal" size="xs">
            <Box variant="span" fontWeight="bold">
              {item.front}
            </Box>
          </SpaceBetween>
        ),
        sections: [
          {
            id: 'answer',
            content: (item) => (
              <Box color={progress[item.key] ? 'text-body-default' : 'text-status-inactive'}>
                {progress[item.key] ? item.back : 'Tự trả lời trước, rồi mở đáp án.'}
              </Box>
            ),
          },
        ],
        footer: (item) => (
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="inline-link" onClick={() => onStar(item.key)}>
              {progress[item.key] ? 'Thu đáp án' : 'Hiện đáp án'}
            </Button>
            <Box variant="small" color="text-body-secondary">
              Chương {item.chapterNo} · {progress[item.key] ? 'đã mở đáp án' : 'chưa mở đáp án'}
            </Box>
          </SpaceBetween>
        ),
      }}
      cardsPerRow={[{ cards: 1 }, { minWidth: 520, cards: 2 }]}
      empty={<Box variant="p">Chưa có flashcard cho chương này.</Box>}
    />
  );
}

function ChapterView({ chapter, progress, onToggleRead, revealed, onReveal }) {
  const read = yes(progress.read?.[chapter.id]);
  const conceptColumns = [
    { id: 'term', header: 'Thuật ngữ', cell: (item) => <Box fontWeight="bold">{item.term}</Box>, width: 230 },
    { id: 'definition', header: 'Nội dung', cell: (item) => item.definition },
    {
      id: 'example',
      header: 'Ví dụ đời thường',
      cell: (item) => <Box color="text-body-secondary">{item.example}</Box>,
      width: 320,
    },
  ];

  return (
    <SpaceBetween size="l">
      <Alert type="info" header="Câu hỏi dẫn vào chương">
        {chapter.hook}
      </Alert>

      <Tabs
        tabs={[
          {
            label: 'Khái niệm',
            id: 'khai-niem',
            content: (
              <SpaceBetween size="m">
                <Container header={<Header variant="h2">Ý chính cần nắm</Header>}>
                  <Box variant="p">{chapter.summary}</Box>
                </Container>
                <Table
                  columnDefinitions={conceptColumns}
                  items={chapter.concepts}
                  variant="container"
                  header={<Header variant="h2" counter={`(${chapter.concepts.length})`}>Bảng khái niệm</Header>}
                  stickyHeader
                />
                <Alert type="success" header="Một câu để nhớ">
                  {chapter.takeaway}
                </Alert>
              </SpaceBetween>
            ),
          },
          {
            label: 'Flashcard',
            id: 'flashcard',
            content: (
              <FlashcardDeck
                items={chapter.flashcards.map((card, index) => ({
                  ...card,
                  key: `${chapter.id}-${index}`,
                  chapterNo: chapter.number,
                }))}
                progress={revealed}
                onStar={onReveal}
              />
            ),
          },
        ]}
      />

      <Container
        header={
          <Header
            variant="h2"
            description="Đánh dấu khi bạn đã đọc xong phần này — bảng điều khiển sẽ ghi nhận."
            actions={
              <Button variant={read ? 'normal' : 'primary'} onClick={() => onToggleRead(chapter.id)}>
                {read ? 'Bỏ đánh dấu' : 'Đánh dấu đã học'}
              </Button>
            }
          >
            Trạng thái chương
          </Header>
        }
      >
        <StatusIndicator type={read ? 'success' : 'pending'}>
          {read ? 'Đã hoàn thành chương này' : 'Chưa đánh dấu hoàn thành'}
        </StatusIndicator>
      </Container>
    </SpaceBetween>
  );
}

/* ------------------------------------------------------------------ */
/* Luyện tập                                                           */
/* ------------------------------------------------------------------ */

function Practice({ progress, onFinish }) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [finished, setFinished] = useState(false);

  const question = questions[index];
  const chosen = answers[question.key];
  const answeredCount = Object.keys(answers).length;
  const score = questions.reduce((total, item) => total + (answers[item.key] === item.answer ? 1 : 0), 0);

  const restart = () => {
    setAnswers({});
    setIndex(0);
    setFinished(false);
  };

  if (finished) {
    const percent = Math.round((score / questions.length) * 100);
    return (
      <SpaceBetween size="l">
        <Container header={<Header variant="h2">Kết quả lượt này</Header>}>
          <SpaceBetween size="m">
            <Box variant="h1">
              {score}
              <Box variant="span" color="text-body-secondary">
                /{questions.length}
              </Box>
            </Box>
            <ProgressBar
              value={percent}
              status={percent >= 80 ? 'success' : percent >= 50 ? 'in-progress' : 'error'}
              description={percent >= 80 ? 'Nắm khá chắc. Thử lại để giữ phong độ.' : 'Còn vài chương cần đọc lại phần khái niệm.'}
            />
            <SpaceBetween direction="horizontal" size="xs">
              <Button variant="primary" onClick={restart}>
                Làm lại
              </Button>
              <Button onClick={() => setFinished(false)}>Xem lại đáp án</Button>
            </SpaceBetween>
          </SpaceBetween>
        </Container>

        <Table
          variant="container"
          header={<Header variant="h2">Chi tiết từng câu</Header>}
          columnDefinitions={[
            { id: 'no', header: '#', cell: (item) => questions.indexOf(item) + 1, width: 60 },
            { id: 'chapter', header: 'Chương', cell: (item) => `${item.chapterNo} · ${item.chapterTitle}`, width: 240 },
            { id: 'q', header: 'Câu hỏi', cell: (item) => item.q },
            {
              id: 'result',
              header: 'Kết quả',
              cell: (item) =>
                answers[item.key] === item.answer ? (
                  <StatusIndicator type="success">Đúng</StatusIndicator>
                ) : (
                  <StatusIndicator type="error">Sai</StatusIndicator>
                ),
              width: 120,
            },
            {
              id: 'answer',
              header: 'Đáp án đúng',
              cell: (item) => item.options[item.answer],
              width: 300,
            },
          ]}
          items={questions}
        />
      </SpaceBetween>
    );
  }

  return (
    <SpaceBetween size="l">
      <Container
        header={
          <Header
            variant="h2"
            description={`Chương ${question.chapterNo} · ${question.chapterTitle}`}
            actions={<Box color="text-body-secondary">{answeredCount}/{questions.length} câu đã trả lời</Box>}
          >
            Câu {index + 1}
          </Header>
        }
      >
        <SpaceBetween size="m">
          <ProgressBar value={Math.round((answeredCount / questions.length) * 100)} description={`Điểm hiện tại: ${score}/${questions.length}`} />

          <Form>
            <FormField label={question.q} description="Chọn một đáp án. Giải thích hiện ra ngay sau khi chọn.">
              <RadioGroup
                value={chosen === undefined ? null : String(chosen)}
                onChange={({ detail }) => setAnswers((current) => ({ ...current, [question.key]: Number(detail.value) }))}
                items={question.options.map((option, optionIndex) => ({
                  value: String(optionIndex),
                  label: option,
                }))}
              />
            </FormField>
          </Form>

          {chosen !== undefined && (
            <Alert type={chosen === question.answer ? 'success' : 'error'} header={chosen === question.answer ? 'Đúng' : 'Chưa đúng'}>
              {question.explain}
            </Alert>
          )}

          <SpaceBetween direction="horizontal" size="xs">
            <Button disabled={index === 0} onClick={() => setIndex((current) => current - 1)}>
              Câu trước
            </Button>
            {index === questions.length - 1 ? (
              <Button
                variant="primary"
                disabled={chosen === undefined}
                onClick={() => {
                  setFinished(true);
                  onFinish(score);
                }}
              >
                Xem kết quả
              </Button>
            ) : (
              <Button
                variant="primary"
                disabled={chosen === undefined}
                onClick={() => setIndex((current) => current + 1)}
              >
                Câu tiếp
              </Button>
            )}
            <Button variant="link" onClick={() => { setAnswers({}); setIndex(0); }}>
              Làm lại từ đầu
            </Button>
          </SpaceBetween>
        </SpaceBetween>
      </Container>

      <Box variant="small" color="text-body-secondary">
        Lượt luyện tốt nhất được lưu trên máy: {progress.quizBest == null ? 'chưa có' : `${progress.quizBest}/${questions.length}`}.
      </Box>
    </SpaceBetween>
  );
}

/* ------------------------------------------------------------------ */
/* Sổ tay                                                              */
/* ------------------------------------------------------------------ */

function Notebook({ revealed, onReveal }) {
  const [chapterId, setChapterId] = useState('all');
  const items = useMemo(
    () => (chapterId === 'all' ? flashcards : flashcards.filter((card) => card.chapterId === chapterId)),
    [chapterId],
  );

  return (
    <SpaceBetween size="l">
      <Container>
        <SpaceBetween size="m">
          <Box variant="p">
            Đọc câu hỏi, tự trả lời thành tiếng, rồi mở đáp án. Đây là cách nhanh nhất để biết mình đã
            hiểu hay chỉ đang nhận ra chữ quen.
          </Box>
          <FormField label="Lọc theo chương">
            <Select
              selectedOption={
                chapterId === 'all'
                  ? { value: 'all', label: 'Tất cả các chương' }
                  : { value: chapterId, label: chapters.find((chapter) => chapter.id === chapterId).fullTitle }
              }
              onChange={({ detail }) => setChapterId(detail.selectedOption.value)}
              options={[
                { value: 'all', label: 'Tất cả các chương' },
                ...chapters.map((chapter) => ({ value: chapter.id, label: `${chapter.number} · ${chapter.title}` })),
              ]}
            />
          </FormField>
        </SpaceBetween>
      </Container>

      <FlashcardDeck items={items} progress={revealed} onStar={onReveal} />
    </SpaceBetween>
  );
}

/* ------------------------------------------------------------------ */
/* Máy tính giá trị thặng dư                                          */
/* ------------------------------------------------------------------ */

function Calculator() {
  const [price, setPrice] = useState(45000);
  const [materials, setMaterials] = useState(12000);
  const [depreciation, setDepreciation] = useState(6000);
  const [wage, setWage] = useState(9000);

  const { c, v, m, rate, shares } = computeSurplus({ price, materials, depreciation, wage });

  return (
    <SpaceBetween size="l">
      <Container header={<Header variant="h2">Tham số một ly trà sữa</Header>}>
        <Form>
          <SpaceBetween size="xl">
            <FormField label="Giá bán" description="Doanh thu bạn nhận được từ một sản phẩm." stretch>
              <Slider
                value={price}
                min={15000}
                max={90000}
                step={1000}
                onChange={({ detail }) => setPrice(detail.value)}
                formatValue={(value) => `${vnd(value)}đ`}
              />
            </FormField>
            <FormField label="Nguyên liệu" description="Trà, sữa, trân châu, ly, ống hút." stretch>
              <Slider
                value={materials}
                min={0}
                max={50000}
                step={500}
                onChange={({ detail }) => setMaterials(detail.value)}
                formatValue={(value) => `${vnd(value)}đ`}
              />
            </FormField>
            <FormField label="Khấu hao máy móc, mặt bằng" description="Phần giá trị tư liệu sản xuất chuyển vào sản phẩm." stretch>
              <Slider
                value={depreciation}
                min={0}
                max={30000}
                step={500}
                onChange={({ detail }) => setDepreciation(detail.value)}
                formatValue={(value) => `${vnd(value)}đ`}
              />
            </FormField>
            <FormField label="Tiền công cho người pha chế" description="Giá trị sức lao động được trả cho một sản phẩm." stretch>
              <Slider
                value={wage}
                min={0}
                max={40000}
                step={500}
                onChange={({ detail }) => setWage(detail.value)}
                formatValue={(value) => `${vnd(value)}đ`}
              />
            </FormField>
          </SpaceBetween>
        </Form>
      </Container>

      <Container header={<Header variant="h2">Kết quả</Header>}>
        <SpaceBetween size="l">
          <div className="calc-bar" role="img" aria-label={`Cơ cấu giá bán: c ${vnd(c)} đồng, v ${vnd(v)} đồng, m ${vnd(m)} đồng`}>
            <span className="calc-seg calc-c" style={{ width: `${shares.c}%` }} />
            <span className="calc-seg calc-v" style={{ width: `${shares.v}%` }} />
            <span className="calc-seg calc-m" style={{ width: `${shares.m}%` }} />
          </div>

          <Grid gridDefinition={[{ colspan: { default: 6, m: 3 } }, { colspan: { default: 6, m: 3 } }, { colspan: { default: 6, m: 3 } }, { colspan: { default: 6, m: 3 } }]}>
            <div className="calc-cell">
              <span className="calc-label">c · bất biến</span>
              <span className="calc-value">{vnd(c)}đ</span>
            </div>
            <div className="calc-cell">
              <span className="calc-label">v · khả biến</span>
              <span className="calc-value">{vnd(v)}đ</span>
            </div>
            <div className={m < 0 ? 'calc-cell is-negative' : 'calc-cell is-accent'}>
              <span className="calc-label">m · thặng dư</span>
              <span className="calc-value">{vnd(m)}đ</span>
            </div>
            <div className="calc-cell">
              <span className="calc-label">m′ = m / v</span>
              <span className="calc-value">{v === 0 ? '—' : `${rate.toFixed(0)}%`}</span>
            </div>
          </Grid>

          <Alert type={m < 0 ? 'error' : m === 0 ? 'warning' : 'info'} header={m < 0 ? 'Không có giá trị thặng dư' : 'Đọc kết quả thế nào'}>
            {m < 0
              ? 'Giá bán thấp hơn chi phí: quán lỗ, không có phần giá trị mới dôi ra. Hạ nguyên liệu hoặc tăng giá bán để quay lại vùng có thặng dư.'
              : `c = ${vnd(c)}đ là phần giá trị được chuyển nguyên vẹn vào sản phẩm. v = ${vnd(v)}đ tạo ra giá trị mới ${vnd(v + m)}đ. Phần dôi ra ${vnd(m)}đ chính là giá trị thặng dư; tỷ suất m′ cho biết mỗi 100đ tiền công sinh ra bao nhiêu đồng thặng dư.`}
          </Alert>
        </SpaceBetween>
      </Container>
    </SpaceBetween>
  );
}

/* ------------------------------------------------------------------ */
/* Khung ứng dụng                                                      */
/* ------------------------------------------------------------------ */

const navItems = [
  { type: 'link', text: 'Bảng điều khiển', href: '#tong-quan' },
  {
    type: 'section',
    title: 'Sáu chương',
    items: chapters.map((chapter) => ({
      type: 'link',
      text: `${chapter.number} · ${chapter.title}`,
      href: `#${chapter.id}`,
    })),
  },
  {
    type: 'section',
    title: 'Luyện và tra cứu',
    items: [
      { type: 'link', text: 'Trắc nghiệm', href: '#luyen-tap' },
      { type: 'link', text: 'Sổ tay flashcard', href: '#so-tay' },
      { type: 'link', text: 'Máy tính giá trị thặng dư', href: '#may-tinh' },
    ],
  },
];

export default function StudioApp() {
  const [section, setSection] = useState('tong-quan');
  const [navOpen, setNavOpen] = useState(true);
  const [progress, setProgress] = useState(EMPTY_PROGRESS);
  const [hydrated, setHydrated] = useState(false);
  const [revealed, setRevealed] = useState({});
  const [flash, setFlash] = useState([]);

  useEffect(() => {
    applyStudioTheme();
    setNavOpen(window.innerWidth >= 1000);
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
    if (window.location.hash === '#may-tinh') setSection('may-tinh');
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
    if (window.innerWidth < 1000) setNavOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleRead = (chapterId) => {
    setProgress((current) => ({
      ...current,
      read: { ...current.read, [chapterId]: !current.read?.[chapterId] },
    }));
  };

  const finishQuiz = (score) => {
    setProgress((current) => ({
      ...current,
      quizBest: Math.max(current.quizBest ?? 0, score),
      quizAttempts: (current.quizAttempts ?? 0) + 1,
    }));
  };

  const resetProgress = () => {
    setProgress(EMPTY_PROGRESS);
    setFlash([{ type: 'success', content: 'Đã đặt lại tiến độ trên trình duyệt này.', dismissible: true, id: 'reset' }]);
  };

  const activeChapter = chapters.find((chapter) => chapter.id === section);
  const readCount = chapters.filter((chapter) => yes(progress.read?.[chapter.id])).length;

  let page;
  if (section === 'tong-quan') {
    page = (
      <Overview
        progress={progress}
        onOpen={go}
        onPractice={() => go('luyen-tap')}
      />
    );
  } else if (activeChapter) {
    page = (
      <ChapterView
        chapter={activeChapter}
        progress={progress}
        onToggleRead={toggleRead}
        revealed={revealed}
        onReveal={(key) => setRevealed((current) => ({ ...current, [key]: !current[key] }))}
      />
    );
  } else if (section === 'luyen-tap') {
    page = <Practice progress={progress} onFinish={finishQuiz} />;
  } else if (section === 'so-tay') {
    page = (
      <Notebook
        revealed={revealed}
        onReveal={(key) => setRevealed((current) => ({ ...current, [key]: !current[key] }))}
      />
    );
  } else {
    page = <Calculator />;
  }

  const titles = {
    'tong-quan': {
      title: 'Bảng điều khiển',
      description: `${readCount}/${chapters.length} chương đã đánh dấu · ${course.code} · ${course.credits} tín chỉ`,
    },
    'luyen-tap': { title: 'Trắc nghiệm', description: `${questions.length} câu hỏi có giải thích, rút từ sáu chương.` },
    'so-tay': { title: 'Sổ tay flashcard', description: `${flashcards.length} thẻ ghi nhớ để tự kiểm tra.` },
    'may-tinh': {
      title: 'Máy tính giá trị thặng dư',
      description: 'Kéo các thanh trượt để thấy c, v, m và m′ thay đổi theo từng đồng.',
    },
  };

  const heading = activeChapter
    ? {
        title: `Chương ${activeChapter.number} · ${activeChapter.title}`,
        description: activeChapter.fullTitle,
        actions: (
          <SpaceBetween direction="horizontal" size="xs">
            <Button onClick={() => go('tong-quan')}>Bảng điều khiển</Button>
            <Button variant="primary" onClick={() => go('luyen-tap')}>
              Luyện trắc nghiệm
            </Button>
          </SpaceBetween>
        ),
      }
    : titles[section];

  return (
    <>
      <TopNavigation
        identity={{ href: '/', title: 'Sạp 122 · Phòng học MLN122' }}
        utilities={[
          { type: 'button', text: 'Trang chủ', href: '/' },
          { type: 'button', text: 'Đặt lại tiến độ', onClick: resetProgress },
        ]}
      />
      <AppLayout
        contentType="default"
        navigationOpen={navOpen}
        onNavigationChange={({ detail }) => setNavOpen(detail.open)}
        navigation={
          <SideNavigation
            activeHref={`#${section}`}
            header={{ href: '/', text: 'Sạp 122' }}
            items={navItems}
            onFollow={(event) => {
              if (event.detail.external) return;
              event.preventDefault();
              go(event.detail.href.replace('#', ''));
            }}
          />
        }
        breadcrumbs={
          <BreadcrumbGroup
            items={[
              { text: 'Sạp 122', href: '/' },
              { text: 'Phòng học', href: '#' },
              { text: heading.title },
            ]}
            onFollow={(event) => {
              event.preventDefault();
              if (event.detail.href === '/') window.location.href = '/';
            }}
          />
        }
        toolsHide
        maxContentWidth={1240}
        content={
          <SpaceBetween size="l">
            <Flashbar items={flash} />
            <Header variant="h1" description={heading.description} actions={heading.actions}>
              {heading.title}
            </Header>
            {page}
            <Box variant="small" color="text-body-secondary">
              {course.school} · {course.code} — {course.name} · Nội dung tóm tắt phục vụ tự học, không thay
              thế giáo trình chính thức.
            </Box>
          </SpaceBetween>
        }
      />
    </>
  );
}
