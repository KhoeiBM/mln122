import Link from 'next/link';
import ChapterGrid from '../src/components/dash/ChapterGrid';
import StatsStrip from '../src/components/dash/StatsStrip';
import { CHAPTERS } from '../src/content/chapters';
import { EXAMPLES } from '../src/content/examples';
import { HUB } from '../src/content/hub';
import { TOTAL_QUESTIONS } from '../src/lib/questions';

const MODES = [
  {
    href: '/quiz',
    label: 'Quiz theo chương',
    detail: `${TOTAL_QUESTIONS} câu, giải thích từng phương án và mẹo loại trừ`,
    code: '01',
  },
  {
    href: '/review',
    label: 'Ôn thẻ đến hạn',
    detail: `${HUB.length} thẻ phạm trù, lịch ôn giãn theo mức tự đánh giá`,
    code: '02',
  },
  {
    href: '/match',
    label: 'Ghép thuật ngữ',
    detail: 'Sáu cặp mỗi lượt: phạm trù với câu đúc kết',
    code: '03',
  },
  {
    href: '/knowledge',
    label: 'Knowledge Hub',
    detail: 'Tra theo chương, có trích dẫn, đúc kết và ví dụ',
    code: '04',
  },
];

export default function HomePage() {
  return (
    <div className="home">
      <section className="hero" aria-labelledby="hero-title">
        <p className="eyebrow">MLN122 · Kinh tế chính trị Mác – Lênin · Đại học FPT</p>
        <h1 className="hero-title" id="hero-title">
          Sáu chương, một cuốn sổ,
          <br />
          và {TOTAL_QUESTIONS} câu để tự kiểm tra
        </h1>
        <p className="hero-lead">
          Mỗi câu trả lời đều có giải thích cho cả bốn phương án — kể cả phương án sai. Không có bảng
          xếp hạng, không thu thập dữ liệu: điểm và chuỗi ngày chỉ nằm trong trình duyệt của bạn.
        </p>
        <div className="hero-actions">
          <Link className="btn btn-primary" href="/quiz">
            Quiz nhanh 10 câu
          </Link>
          <Link className="btn btn-ghost" href="/learn">
            Học theo chương
          </Link>
        </div>
      </section>

      <StatsStrip />

      <section className="section" aria-labelledby="modes-title">
        <h2 className="section-title" id="modes-title">
          Bốn lối vào
        </h2>
        <ul className="modes">
          {MODES.map((mode) => (
            <li key={mode.href}>
              <Link className="mode" href={mode.href}>
                <span className="mode-code">{mode.code}</span>
                <span className="mode-label">{mode.label}</span>
                <span className="mode-detail">{mode.detail}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="section" aria-labelledby="chapters-title">
        <h2 className="section-title" id="chapters-title">
          Sáu chương
        </h2>
        <p className="section-lead">
          Thứ tự chương theo giáo trình. Mỗi chương có 20 câu hỏi, phần tóm tắt và các phạm trù trọng
          tâm nối sang Knowledge Hub.
        </p>
        <ChapterGrid />
      </section>

      <section className="section" aria-labelledby="examples-title">
        <h2 className="section-title" id="examples-title">
          Ba ví dụ dùng xuyên suốt
        </h2>
        <p className="section-lead">
          Mọi phạm trù đều được kiểm tra lại trên cùng ba món quen, để lý thuyết không tách khỏi đời
          sống.
        </p>
        <ul className="examples">
          {EXAMPLES.map((example) => (
            <li className="example" key={example.id}>
              <p className="example-name">{example.name}</p>
              <p className="example-price">{example.price}</p>
              <p className="example-line">{example.line}</p>
              <p className="example-chapter">Dùng ở Ch.{example.chapter}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="section note" aria-labelledby="note-title">
        <h2 className="section-title" id="note-title">
          Nguồn và giới hạn
        </h2>
        <p>
          Nội dung bám theo giáo trình Kinh tế chính trị Mác – Lênin (NXB Chính trị quốc gia Sự thật,
          2021). {CHAPTERS.length} chương, {TOTAL_QUESTIONS} câu hỏi do nhóm biên soạn, chưa được
          giảng viên thẩm định; trích dẫn chưa đối chiếu số trang bản in.
        </p>
        <p>
          <Link className="text-link" href="/knowledge#nguon">
            Đọc đầy đủ phần nguồn và giới hạn
          </Link>
        </p>
      </section>
    </div>
  );
}
