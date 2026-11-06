import Link from 'next/link';

export default function SiteFooter() {
  return (
    <footer className="foot">
      <div className="shell foot-inner">
        <div>
          <p className="foot-title">Sổ cái MLN122 — sáu chương, 120 câu, một cuốn sổ</p>
          <p className="foot-note">
            Sản phẩm học tập cho môn MLN122 (Kinh tế chính trị Mác – Lênin), Đại học FPT. Câu hỏi và
            phạm trù do nhóm biên soạn theo giáo trình, chưa được giảng viên thẩm định. Điểm và tiến
            độ chỉ lưu trong trình duyệt của người học.
          </p>
        </div>
        <div className="foot-links">
          <Link href="/knowledge#nguon">Nguồn và giới hạn</Link>
          <Link href="/learn">Sáu chương</Link>
          <Link href="/quiz">Luyện câu hỏi</Link>
        </div>
      </div>
    </footer>
  );
}
