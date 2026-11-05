import Link from 'next/link';
import { CONCEPTS, TEXTBOOK } from '../../src/content/concepts';
import { ITEMS } from '../../src/content/items';

export const metadata = {
  title: 'Kiến thức và nguồn | Bóc giá MLN122',
  description:
    'Tám phạm trù dùng trong sản phẩm: trích dẫn giáo trình, nói lại bằng lời thường, đúc kết và ứng dụng vào ba món hàng.',
};

export default function KnowledgePage() {
  return (
    <div className="knowledge-page">
      <header className="page-head">
        <p className="page-code">Phần kiến thức</p>
        <h1 className="page-title">Tám phạm trù, và chúng giải thích gì trong ba món hàng</h1>
        <p className="page-lead">
          Mỗi mục dưới đây có bốn phần: trích dẫn nguyên văn, nói lại bằng lời thường, đúc kết, và
          ứng dụng vào từng món. Các phạm trù được xếp theo mạch lập luận, không theo thứ tự bài
          giảng.
        </p>
      </header>

      <ol className="concept-toc" aria-label="Danh sách phạm trù">
        {CONCEPTS.map((concept) => (
          <li key={concept.id}>
            <a href={`#${concept.id}`}>{concept.name}</a>
          </li>
        ))}
      </ol>

      <div className="concept-list is-long">
        {CONCEPTS.map((concept) => (
          <section className="concept" id={concept.id} key={concept.id} aria-labelledby={`${concept.id}-name`}>
            <h2 className="concept-name" id={`${concept.id}-name`}>
              {concept.name}
            </h2>
            <blockquote className="concept-quote">
              <p>{concept.quote}</p>
              <footer>
                {TEXTBOOK.title}, {TEXTBOOK.publisher}, {TEXTBOOK.year}
                {concept.page ? `, tr. ${concept.page}` : ' — số trang cần đối chiếu bản in'}
              </footer>
            </blockquote>
            <p className="concept-plain">{concept.plain}</p>
            <p className="concept-conclusion">
              <span className="concept-label">Đúc kết</span>
              {concept.conclusion}
            </p>
            <div className="applications">
              <p className="applications-label">Ứng dụng vào ba món</p>
              {ITEMS.map((item) => (
                <p className="application" key={item.id}>
                  <span className="application-item">{item.name}</span>
                  {concept.applications[item.id]}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>

      <section className="sources" id="nguon" aria-labelledby="nguon-title">
        <h2 className="section-title" id="nguon-title">
          Nguồn và giới hạn
        </h2>
        <ul>
          <li>
            <strong>Trích dẫn:</strong> {TEXTBOOK.title}, {TEXTBOOK.publisher}, {TEXTBOOK.year}.{' '}
            {TEXTBOOK.note}
          </li>
          <li>
            <strong>Con số trong ba món:</strong> toàn bộ là ước lượng minh hoạ do nhóm dựng để dạy
            cách chia. Trung điểm các khoảng của mỗi món cộng lại đúng 100%. Không dùng số liệu của
            một quán, thương hiệu hay nền tảng cụ thể nào.
          </li>
          <li>
            <strong>Không chấm điểm:</strong> khoảng tham chiếu là khoảng, không phải đáp án. Sản
            phẩm không xếp hạng cách chia và không có cách chia nào được coi là đúng.
          </li>
          <li>
            <strong>Chưa kiểm chứng:</strong> nội dung chưa được giảng viên MLN122 thẩm định; số
            trang trích dẫn chưa đối chiếu; chưa thử với sinh viên ngoài nhóm.
          </li>
        </ul>
        <p className="sources-note">
          Muốn đọc bản đầy đủ của phần nguồn và danh sách việc cần kiểm trước khi công bố, xem
          tệp <code>docs/NGUON-VA-GIOI-HAN.md</code> trong kho mã.
        </p>
        <div className="sources-actions">
          <Link className="btn btn-primary btn-sm" href="/">
            Về ba món để bóc
          </Link>
        </div>
      </section>
    </div>
  );
}
