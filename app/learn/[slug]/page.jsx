import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CHAPTERS, chapterBySlug, nextChapter } from '../../../src/content/chapters';
import { hubByChapter, sourceLine } from '../../../src/content/hub';
import { questionsByChapter } from '../../../src/lib/questions';

export function generateStaticParams() {
  return CHAPTERS.map((chapter) => ({ slug: chapter.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const chapter = chapterBySlug(slug);
  if (!chapter) return { title: 'Không tìm thấy chương | Sổ cái MLN122' };
  return {
    title: `Ch.${chapter.id} · ${chapter.title} | Sổ cái MLN122`,
    description: chapter.summary,
  };
}

export default async function ChapterPage({ params }) {
  const { slug } = await params;
  const chapter = chapterBySlug(slug);
  if (!chapter) notFound();

  const entries = hubByChapter(chapter.id);
  const next = nextChapter(chapter.id);
  const count = questionsByChapter(chapter.id).length;

  return (
    <div className="chapter-page">
      <p className="crumbs">
        <Link href="/learn">Phần học</Link> / Ch.{chapter.id}
      </p>

      <header className="page-head">
        <p className="eyebrow">Chương {chapter.id}</p>
        <h1 className="page-title">{chapter.title}</h1>
        <p className="page-lead">{chapter.summary}</p>
      </header>

      <section className="section" aria-labelledby="aims-title">
        <h2 className="section-title" id="aims-title">
          Học xong chương này cần làm được gì
        </h2>
        <ul className="aims">
          {chapter.aims.map((aim) => (
            <li key={aim}>{aim}</li>
          ))}
        </ul>
      </section>

      <section className="section" aria-labelledby="terms-title">
        <h2 className="section-title" id="terms-title">
          Phạm trù trọng tâm
        </h2>
        <ul className="terms">
          {entries.map((entry) => (
            <li className="term" key={entry.id}>
              <h3 className="term-name">{entry.term}</h3>
              <blockquote className="quote">
                <p>{entry.quote}</p>
                <footer>{sourceLine(entry)}</footer>
              </blockquote>
              <p className="term-plain">{entry.plain}</p>
              <p className="term-example">
                <span className="label">Ví dụ</span>
                {entry.example}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="section cta" aria-labelledby="cta-title">
        <h2 className="section-title" id="cta-title">
          Kiểm tra chương này
        </h2>
        <p>
          {count} câu hỏi, mỗi câu giải thích cả bốn phương án. Sai vẫn được điểm kinh nghiệm — mục
          đích là biết mình hổng chỗ nào.
        </p>
        <div className="hero-actions">
          <Link className="btn btn-primary" href={`/quiz?chapter=${chapter.id}`}>
            Làm {count} câu chương {chapter.id}
          </Link>
          <Link className="btn btn-ghost" href="/review">
            Ôn thẻ phạm trù
          </Link>
        </div>
      </section>

      <nav className="chapter-nav" aria-label="Chương kế tiếp">
        <Link className="btn btn-ghost btn-sm" href="/learn">
          ← Danh sách chương
        </Link>
        <Link className="btn btn-sm" href={`/learn/${next.slug}`}>
          Ch.{next.id} · {next.title} →
        </Link>
      </nav>
    </div>
  );
}
