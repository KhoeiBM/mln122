import Link from 'next/link';

export default function SiteFooter() {
  return (
    <footer className="foot">
      <div className="shell foot-inner">
        <div className="foot-main">
          <p className="foot-title">Chọn đường — một quyết định, nhiều góc nhìn</p>
          <p className="foot-note">
            Sản phẩm học tập cho môn MLN122 (Kinh tế chính trị Mác – Lênin), Đại học FPT.
            Đây là mô phỏng học tập: không có phương án nào là đáp án đúng và sản phẩm không
            chấm điểm lựa chọn của bạn.
          </p>
        </div>
        <div className="foot-links">
          <Link href="/ho-so">Hồ sơ của tôi</Link>
          <Link href="/ho-so#gioi-han">Nguồn và giới hạn</Link>
        </div>
      </div>
    </footer>
  );
}
