import './de-cuong.css';
import { course } from '../../src/content/course';
import PrintButton from '../../src/components/site/PrintButton';

export const metadata = {
  title: 'Bản in một trang — Sạp 122',
  description:
    'Tóm tắt sáu chương MLN122 trên một trang in được: ý chính, khái niệm, công thức và câu để nhớ.',
};

export default function DeCuongPage() {
  return (
    <div className="sheet">
      <header className="sheet-top no-print">
        <a className="wordmark" href="/">
          Sạp <span>122</span>
          <small>Bản in một trang</small>
        </a>
        <div className="sheet-actions">
          <PrintButton />
          <a className="btn btn-quiet btn-sm" href="/studio">
            Vào phòng học
          </a>
        </div>
      </header>

      <main className="sheet-main">
        <h1 className="sheet-title">
          {course.code}. {course.name}
        </h1>
        <p className="sheet-sub">
          Tóm tắt sáu chương để mang đi học nhóm. Bản in không thay thế giáo trình: câu hỏi thi lấy từ
          tài liệu chính thức của môn.
        </p>

        <section className="formulas">
          <h2>Công thức cần nhớ</h2>
          <ul>
            <li>
              <b>m = giá bán − c − v</b>, trong đó c là tư bản bất biến (tư liệu sản xuất), v là tư bản
              khả biến (tiền công).
            </li>
            <li>
              <b>m′ = m / v × 100%</b>: tỷ suất giá trị thặng dư, cho biết mỗi 100 đồng tiền công sinh
              ra bao nhiêu đồng thặng dư.
            </li>
            <li>
              <b>M = m′ × V</b>: khối lượng giá trị thặng dư, phụ thuộc cả tỷ suất lẫn tổng tư bản khả
              biến.
            </li>
            <li>
              <b>Ví dụ một ly trà sữa 45.000đ</b>: c = 18.000đ, v = 9.000đ, m = 18.000đ, m′ = 200%. Số
              liệu minh hoạ.
            </li>
          </ul>
        </section>

        <ol className="sheet-chapters">
          {course.chapters.map((chapter) => (
            <li key={chapter.id} className="sheet-chapter">
              <h2>
                <span className="sheet-no">{chapter.number}</span>
                {chapter.title}
              </h2>
              <p className="sheet-summary">{chapter.summary}</p>
              <dl className="sheet-concepts">
                {chapter.concepts.map((concept) => (
                  <div key={concept.term}>
                    <dt>{concept.term}</dt>
                    <dd>{concept.definition}</dd>
                  </div>
                ))}
              </dl>
              <p className="sheet-takeaway">
                <b>Để nhớ:</b> {chapter.takeaway}
              </p>
            </li>
          ))}
        </ol>

        <section className="sheet-refs">
          <h2>Nguồn và giới hạn</h2>
          <p>
            Nội dung tóm tắt từ giáo trình Kinh tế chính trị Mác – Lênin dùng trong chương trình đại
            học. Bản in này là ghi chú học tập, không phải tài liệu chính thức của môn hay của trường.
            Số liệu trong ví dụ là số minh hoạ để học phạm trù, không phải số liệu khảo sát.
          </p>
          <p className="sheet-credit">Sạp 122, cập nhật {course.updated}. In từ sap122.</p>
        </section>
      </main>
    </div>
  );
}
