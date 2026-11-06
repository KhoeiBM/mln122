import HubBrowser from '../../src/components/hub/HubBrowser';
import { HUB, TEXTBOOK } from '../../src/content/hub';

export const metadata = {
  title: 'Knowledge Hub | Sổ cái MLN122',
  description: `${HUB.length} phạm trù của sáu chương MLN122: trích dẫn kèm nguồn, phần nói lại, đúc kết và ví dụ đời thường.`,
};

export default function KnowledgePage() {
  return (
    <div className="knowledge">
      <header className="page-head">
        <p className="eyebrow">Knowledge Hub</p>
        <h1 className="page-title">Tra một phạm trù, thấy cả chương</h1>
        <p className="page-lead">
          Lọc theo chương hoặc tìm theo từ khoá. Mỗi mục ghi rõ đâu là trích giáo trình, đâu là phần
          diễn đạt của nhóm.
        </p>
      </header>

      <HubBrowser />

      <section className="section note" id="nguon" aria-labelledby="nguon-title">
        <h2 className="section-title" id="nguon-title">
          Nguồn và giới hạn
        </h2>
        <ul className="source-list">
          <li>
            <strong>Trích dẫn:</strong> {TEXTBOOK.title}, {TEXTBOOK.publisher}, {TEXTBOOK.year}.{' '}
            {TEXTBOOK.note}
          </li>
          <li>
            <strong>Phần diễn đạt:</strong> những mục ghi “diễn đạt theo giáo trình” là câu chữ của
            nhóm, không phải nguyên văn — đừng trích lại như trích dẫn gốc.
          </li>
          <li>
            <strong>Câu hỏi:</strong> {HUB.length} phạm trù và 120 câu hỏi do nhóm biên soạn theo sáu
            chương, chưa được giảng viên MLN122 thẩm định.
          </li>
          <li>
            <strong>Số liệu ví dụ:</strong> 45.000đ, 250.000đ, 35.000đ là ví dụ minh hoạ, không phải
            giá công bố của doanh nghiệp nào.
          </li>
          <li>
            <strong>Dữ liệu học tập:</strong> điểm, chuỗi ngày, lịch ôn và số câu đã làm chỉ nằm
            trong localStorage của trình duyệt; xoá dữ liệu trình duyệt là mất.
          </li>
        </ul>
      </section>
    </div>
  );
}
