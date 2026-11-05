'use client';

import { useMemo, useState } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { course, receipt, faqs } from '../../content/course';

const vnd = (n) => new Intl.NumberFormat('vi-VN').format(Math.round(n));

function Masthead() {
  return (
    <header className="masthead">
      <div className="shell masthead-inner">
        <a className="brand" href="/" aria-label="Sạp 122 — trang chủ">
          <span className="brand-mark">122</span>
          <span className="brand-word">
            Sạp 122
            <small>Kinh tế chính trị · ĐH FPT</small>
          </span>
        </a>
        <nav className="masthead-nav" aria-label="Điều hướng chính">
          <a href="#chuong">Sáu chương</a>
          <a href="#cach-hoc">Cách học</a>
          <a href="#thu-tay">Thử tay</a>
          <a href="#hoi-dap">Hỏi đáp</a>
        </nav>
        <div className="masthead-actions">
          <a className="button button-primary button-sm" href="/studio">
            Vào sạp học <ArrowRight size={15} strokeWidth={2.2} />
          </a>
        </div>
      </div>
    </header>
  );
}

function ReceiptCard() {
  return (
    <div className="hero-visual">
      <figure className="receipt" aria-label="Hoá đơn minh hoạ một ly trà sữa, chia thành c, v và m">
        <div className="receipt-head">
          <span>SẠP 122</span>
          <span>No. 0003</span>
        </div>
        <p className="receipt-sub">Hoá đơn minh hoạ · chương 03</p>

        <div className="receipt-item">
          <span>{receipt.item}</span>
          <b>{vnd(receipt.price)}</b>
        </div>
        <div className="receipt-rule" />

        <ul className="receipt-lines">
          {receipt.lines.map((line) => (
            <li key={line.key}>
              <span className={'key' + (line.key === 'm' ? ' is-m' : '')}>{line.key}</span>
              <span className="label">
                {line.label}
                <small>{line.note}</small>
              </span>
              <b>{vnd(line.value)}</b>
            </li>
          ))}
        </ul>

        <div className="receipt-rule" />
        <div className="receipt-total">
          <span>Tỷ suất m′ = m / v</span>
          <b>200%</b>
        </div>
        <p className="receipt-note">
          Con số là ví dụ để học phạm trù, không phải giá thật của bất kỳ quán nào. m′ càng cao, phần
          lao động không được trả công càng lớn.
        </p>
      </figure>
      <span className="stamp" aria-hidden="true">
        6 chương
        <br />3 tín chỉ
        <br />MLN122
      </span>
    </div>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="hero-copy">
        <p className="eyebrow">
          <span className="dot" />
          MLN122 · Kinh tế chính trị Mác – Lênin
        </p>
        <h1>
          Giá trị thặng dư bắt đầu từ <em>một ly trà sữa.</em>
        </h1>
        <p className="lede">
          Sạp 122 biến sáu chương của môn MLN122 thành những thứ bạn gặp mỗi ngày: tờ hoá đơn, chuyến
          xe của shipper, một phiên livestream, bảng giá vàng. Học bằng cách kéo, bấm, đoán sai rồi
          hiểu lại — không phải đọc chay.
        </p>
        <div className="hero-actions">
          <a className="button button-primary" href="/studio">
            Vào sạp học <ArrowRight size={16} strokeWidth={2.2} />
          </a>
          <a className="button button-ghost" href="#chuong">
            Xem sáu chương
          </a>
        </div>
        <dl className="hero-meta">
          <div>
            <dt>Sáu chương</dt>
            <dd>từ đối tượng nghiên cứu đến hội nhập</dd>
          </div>
          <div>
            <dt>3 tín chỉ</dt>
            <dd>theo chương trình đại học FPT</dd>
          </div>
          <div>
            <dt>Lưu trên máy</dt>
            <dd>tiến độ không cần tài khoản</dd>
          </div>
        </dl>
      </div>
      <ReceiptCard />
    </section>
  );
}

function ChapterList() {
  return (
    <section className="section" id="chuong">
      <div className="section-head">
        <div>
          <p className="eyebrow">
            <span className="dot" />
            Bản đồ môn học
          </p>
          <h2>
            Sáu chương, sáu câu hỏi
            <br />
            bạn đã từng <em>tự hỏi.</em>
          </h2>
        </div>
        <p className="section-note">
          Mỗi chương mở bằng một câu hỏi đời thường rồi mới đi vào phạm trù. Đọc từ trên xuống, hoặc
          nhảy thẳng vào chương đang học trên lớp.
        </p>
      </div>

      <ol className="chapter-list">
        {course.chapters.map((chapter) => (
          <li key={chapter.id}>
            <a className="chapter-row" href={`/studio?chuong=${chapter.id}`}>
              <span className="chapter-no">{chapter.number}</span>
              <span className="chapter-main">
                <strong>{chapter.title}</strong>
                <span className="chapter-hook">{chapter.hook}</span>
              </span>
              <span className="chapter-meta">
                <span className="chip">{chapter.level}</span>
                <span>{chapter.time} phút</span>
              </span>
              <ArrowUpRight className="chapter-arrow" size={18} strokeWidth={1.8} />
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}

function FieldNotes() {
  return (
    <section className="section">
      <div className="field-notes">
        <figure className="field-photo">
          <img
            src="/sap-hang.jpg"
            alt="Một sạp tạp hoá nhỏ với hàng hoá đóng gói treo kín vách và những tấm bảng giá viết tay"
            width="700"
            height="420"
            loading="lazy"
            decoding="async"
          />
          <figcaption>
            Một sạp hàng nhỏ là nơi chương 2 xuất hiện cùng lúc: hàng hoá, hai thuộc tính của hàng
            hoá, tiền, cung – cầu và cả sự mặc cả.
          </figcaption>
        </figure>

        <div>
          <p className="eyebrow">
            <span className="dot" />
            Cách học
          </p>
          <h2>
            Không học thuộc.
            <br />
            Tập <em>nhìn.</em>
          </h2>
          <p className="lede">
            Điểm khó của MLN122 không nằm ở số tiết, mà ở chỗ các phạm trù rất trừu tượng. Cách duy
            nhất để nhớ lâu là gắn mỗi phạm trù với một vật cụ thể và tự kiểm tra lại.
          </p>
          <ul className="principle-list">
            <li>
              <span>01</span>
              <div>
                <b>Một phạm trù, một vật thật</b>
                <p>
                  Giá trị thặng dư đi với tờ hoá đơn; cạnh tranh đi với hai quán cà phê cạnh nhau;
                  hội nhập đi với một chiếc điện thoại.
                </p>
              </div>
            </li>
            <li>
              <span>02</span>
              <div>
                <b>Đoán trước, đọc sau</b>
                <p>
                  Mỗi câu hỏi đều có phản hồi giải thích ngay. Sai một lần và hiểu vì sao sai tốt hơn
                  đọc lại ba lần.
                </p>
              </div>
            </li>
            <li>
              <span>03</span>
              <div>
                <b>Học theo chương đang lên lớp</b>
                <p>
                  Trang bảng điều khiển giữ trạng thái từng chương, để bạn mở máy ra là biết mình
                  đang ở đâu.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function LabCalculator() {
  const [price, setPrice] = useState(45000);
  const c = 18000;
  const v = 9000;
  const m = price - c - v;
  const rate = (m / v) * 100;

  const { parts } = useMemo(() => {
    const total = Math.max(price, 1);
    return {
      parts: [c, v, Math.max(m, 0)].map((value) => (value / total) * 100),
    };
  }, [price, m]);

  return (
    <section className="section" id="thu-tay">
      <div className="lab">
        <div className="lab-copy">
          <p className="eyebrow">
            <span className="dot" />
            Thử tay
          </p>
          <h2>
            Kéo giá bán,
            <br />
            xem <em>m′</em> xuất hiện.
          </h2>
          <p>
            Giả định một quán nhỏ: mỗi ly tốn 18.000đ nguyên liệu và khấu hao máy, 9.000đ tiền công.
            Kéo giá bán để thấy giá trị thặng dư và tỷ suất thặng dư thay đổi ra sao — chỉ với một
            thanh trượt.
          </p>
          <a className="text-link" href="/studio">
            Mở bản đầy đủ trong phòng học <ArrowRight size={15} />
          </a>
        </div>

        <div className="lab-panel">
          <div className="lab-panel-head">
            <h3>Một ly trà sữa</h3>
            <span>MINH HOẠ</span>
          </div>

          <div className="lab-field">
            <label className="lab-field-label" htmlFor="gia-ban">
              <span>Giá bán</span>
              <output htmlFor="gia-ban">{vnd(price)}đ</output>
            </label>
            <input
              id="gia-ban"
              className="lab-range"
              type="range"
              min="20000"
              max="80000"
              step="1000"
              value={price}
              onChange={(event) => setPrice(Number(event.target.value))}
            />
          </div>

          <div className="lab-split" aria-hidden="true">
            <span className="seg-c" style={{ width: `${parts[0]}%` }} />
            <span className="seg-v" style={{ width: `${parts[1]}%` }} />
            <span className="seg-m" style={{ width: `${parts[2]}%` }} />
          </div>
          <div className="lab-legend">
            <span>
              <i style={{ background: '#c8bfa9' }} /> c · nguyên liệu, khấu hao
            </span>
            <span>
              <i style={{ background: 'var(--green-2)' }} /> v · tiền công
            </span>
            <span>
              <i style={{ background: 'var(--brass)' }} /> m · giá trị thặng dư
            </span>
          </div>

          <dl className="lab-output">
            <div>
              <dt>Giá trị thặng dư m</dt>
              <dd>
                {vnd(m)}
                <small>đ</small>
              </dd>
            </div>
            <div>
              <dt>Tỷ suất m′ = m / v</dt>
              <dd>
                {rate.toFixed(0)}
                <small>%</small>
              </dd>
            </div>
          </dl>

          <p className={'lab-note' + (m < 0 ? ' is-negative' : '')}>
            {m < 0
              ? 'Giá bán thấp hơn chi phí: không có giá trị thặng dư, quán đang lỗ. Đây là lúc phạm trù trở nên rất cụ thể.'
              : 'c không đổi, v không đổi — phần dôi ra chỉ đến từ lao động sống trong giờ làm việc.'}
          </p>
        </div>
      </div>
    </section>
  );
}

const features = [
  {
    no: '01',
    title: 'Bảng điều khiển cho sinh viên',
    copy: 'Sáu chương hiện như sáu mục công việc: đã đọc hay chưa, điểm luyện cao nhất, chương nào đang mở. Dựng trên Cloudscape Design System của AWS nên đọc bảng và trạng thái rất nhanh.',
    tag: 'Cloudscape · bảng, bộ lọc, trạng thái',
  },
  {
    no: '02',
    title: 'Máy tính giá trị thặng dư',
    copy: 'Kéo bốn thanh trượt: doanh thu, nguyên liệu, khấu hao, tiền công. Máy tự tính c, v, m và m′ — và cảnh báo khi bạn kéo tới vùng không có thặng dư.',
    tag: 'Tương tác · số liệu cập nhật tức thì',
  },
  {
    no: '03',
    title: 'Sổ tay và bài luyện',
    copy: 'Mười bốn câu trắc nghiệm có giải thích, mười hai flashcard và phần đánh dấu từ khoá. Tiến độ lưu ngay trên máy bạn, không cần đăng nhập.',
    tag: 'localStorage · không tài khoản',
  },
];

function Features() {
  return (
    <section className="section" id="cach-hoc">
      <div className="section-head">
        <div>
          <p className="eyebrow">
            <span className="dot" />
            Trong phòng học có gì
          </p>
          <h2>
            Ba thứ bạn không tìm thấy
            <br />
            trong <em>đề cương.</em>
          </h2>
        </div>
        <p className="section-note">
          Sạp 122 không phải bản số hoá của giáo trình. Nó là lớp ghi chú có thể bấm được, để bạn
          dùng trước giờ lên lớp và trước ngày thi.
        </p>
      </div>

      <div className="feature-grid">
        {features.map((feature) => (
          <article className="feature" key={feature.no}>
            <span className="feature-no">{feature.no}</span>
            <h3>{feature.title}</h3>
            <p>{feature.copy}</p>
            <span className="feature-tag">{feature.tag}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section className="section" id="hoi-dap">
      <div className="faq">
        <div>
          <p className="eyebrow">
            <span className="dot" />
            Hỏi nhanh
          </p>
          <h2>
            Điều bạn nên
            <br />
            biết trước khi <em>học.</em>
          </h2>
          <p className="section-note" style={{ marginTop: 18 }}>
            Nếu còn câu hỏi khác, phần ghi chú ở chân trang nói rõ nguồn nội dung và giới hạn của
            trang.
          </p>
        </div>
        <div className="faq-list">
          {faqs.map((item) => (
            <details key={item.q}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function Closing() {
  return (
    <section className="closing">
      <div>
        <p className="eyebrow light">Mở cửa 24/7</p>
        <h2>
          Chọn một chương,
          <br />
          bắt đầu từ <em>câu hỏi.</em>
        </h2>
      </div>
      <div className="closing-actions">
        <a className="button button-light" href="/studio">
          Vào phòng học <ArrowRight size={16} strokeWidth={2.2} />
        </a>
        <span>Không cần đăng ký · tiến độ lưu trên máy bạn</span>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <span className="footer-brand">
            <span>122</span> Sạp 122 · Kinh tế chính trị
          </span>
          <p className="footer-note">
            Nội dung tóm tắt và diễn giải lại từ giáo trình Kinh tế chính trị Mác – Lênin, dùng cho
            việc tự học. Trang không thay thế tài liệu chính thức, bài giảng hay hướng dẫn ôn thi của
            giảng viên. Ảnh minh hoạ trong bài là ảnh tư liệu, cần kiểm tra lại giấy phép nếu dùng
            cho mục đích công khai.
          </p>
        </div>
        <nav className="footer-links" aria-label="Liên kết chân trang">
          <a href="/studio">Phòng học</a>
          <a href="/studio?chuong=chuong-3">Chương 3 · Giá trị thặng dư</a>
          <a href="#hoi-dap">Câu hỏi thường gặp</a>
        </nav>
        <div className="footer-meta">
          MLN122 · 3 tín chỉ
          <br />
          Cập nhật {course.updated}
          <br />
          Làm cho sinh viên FPT
        </div>
      </div>
    </footer>
  );
}

export default function LandingPage() {
  return (
    <div className="site">
      <Masthead />
      <main className="shell">
        <Hero />
        <ChapterList />
        <FieldNotes />
        <LabCalculator />
        <Features />
        <Faq />
        <Closing />
      </main>
      <Footer />
    </div>
  );
}
