import Link from 'next/link';

export default function SiteHeader() {
  return (
    <header className="top">
      <div className="shell top-inner">
        <Link className="brand" href="/">
          <span className="brand-mark" aria-hidden="true" />
          <span className="brand-text">
            Bóc giá
            <span className="brand-sub">MLN122 · Đại học FPT</span>
          </span>
        </Link>
        <nav className="nav" aria-label="Các phần của sản phẩm">
          <Link href="/">Ba món</Link>
          <Link href="/luyen">Luyện</Link>
          <Link href="/kien-thuc">Kiến thức và nguồn</Link>
        </nav>
      </div>
    </header>
  );
}
