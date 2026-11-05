import Link from 'next/link';

export default function SiteHeader() {
  return (
    <header className="top">
      <div className="shell top-inner">
        <Link className="brand" href="/">
          <span className="brand-mark" aria-hidden="true" />
          <span className="brand-text">
            Chọn đường
            <span className="brand-sub">MLN122 · Đại học FPT</span>
          </span>
        </Link>
        <nav className="nav" aria-label="Các phần của sản phẩm">
          <Link href="/lich-su">Hai mốc lịch sử</Link>
          <Link href="/kich-ban">Kịch bản</Link>
          <Link href="/ho-so">Hồ sơ của tôi</Link>
        </nav>
      </div>
    </header>
  );
}
