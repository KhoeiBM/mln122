import Link from 'next/link';
import { CHAPTERS } from '../../src/content/chapters';
import { questionsByChapter } from '../../src/lib/questions';

export const metadata = {
  title: 'Học theo chương | Sổ cái MLN122',
  description:
    'Sáu chương MLN122: tóm tắt, mục tiêu học, phạm trù trọng tâm và 20 câu hỏi cho mỗi chương.',
};

export default function LearnIndex() {
  return (
    <div className="learn">
      <header className="page-head">
        <p className="eyebrow">Phần học</p>
        <h1 className="page-title">Sáu chương, đọc theo thứ tự hoặc nhảy thẳng</h1>
        <p className="page-lead">
          Mỗi chương có phần tóm tắt, ba mục tiêu, các phạm trù trọng tâm (bấm sang Knowledge Hub) và
          một lượt quiz riêng.
        </p>
      </header>

      <ol className="chapter-list">
        {CHAPTERS.map((chapter) => (
          <li className="chapter-row" key={chapter.id}>
            <p className="chapter-row-num">Ch.{chapter.id}</p>
            <div className="chapter-row-main">
              <h2 className="chapter-row-title">
                <Link href={`/learn/${chapter.slug}`}>{chapter.title}</Link>
              </h2>
              <p className="chapter-row-tag">{chapter.tagline}</p>
              <p className="chapter-row-summary">{chapter.summary}</p>
            </div>
            <p className="chapter-row-count">{questionsByChapter(chapter.id).length} câu</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
