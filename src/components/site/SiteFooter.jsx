import Link from 'next/link';

export default function SiteFooter() {
  return (
    <footer className="foot">
      <div className="shell foot-inner">
        <div>
          <p className="foot-title">Bóc giá — một món hàng, ai lấy phần nào?</p>
          <p className="foot-note">
            Sản phẩm học tập cho môn MLN122 (Kinh tế chính trị Mác – Lênin), Đại học FPT. Khoảng
            tham chiếu là ước lượng minh hoạ để dạy cách chia, không phải số liệu công bố của doanh
            nghiệp nào. Sản phẩm không chấm điểm cách chia.
          </p>
        </div>
        <div className="foot-links">
          <Link href="/kien-thuc">Kiến thức và nguồn</Link>
          <Link href="/kien-thuc#nguon">Giới hạn của sản phẩm</Link>
        </div>
      </div>
    </footer>
  );
}
