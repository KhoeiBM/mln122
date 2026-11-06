import Link from 'next/link';

export default function SiteHeader() {
  return (
    <header className="top">
      <div className="shell top-inner">
        <Link className="brand" href="/">
          <span className="brand-mark" aria-hidden="true" />
          <span className="brand-text">
            Sổ cái MLN122
            <span className="brand-sub">Kinh tế chính trị Mác – Lênin</span>
          </span>
        </Link>
        <nav className="nav" aria-label="Các phần của sản phẩm">
          <Link href="/learn">Học</Link>
          <Link href="/quiz">Quiz</Link>
          <Link href="/review">Ôn thẻ</Link>
          <Link href="/match">Ghép</Link>
          <Link href="/knowledge">Hub</Link>
        </nav>
      </div>
    </header>
  );
}
