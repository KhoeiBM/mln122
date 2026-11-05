'use client';

import { useState } from 'react';
import { course, receipt, faqs } from '../../content/course';

const vnd = (n) => new Intl.NumberFormat('vi-VN').format(Math.round(n));

function Masthead() {
  return (
    <header className="masthead">
      <div className="shell masthead-inner">
        <a className="wordmark" href="/" aria-label="Sạp 122, về trang chủ">
          Sạp <span>122</span>
          <small>Kinh tế chính trị, Đại học FPT</small>
        </a>
        <nav className="masthead-nav" aria-label="Điều hướng chính">
          <a href="#chuong">Sáu chương</a>
          <a href="#cach-hoc">Cách học</a>
          <a href="#bang-tinh">Bảng tính</a>
          <a href="#hoi-dap">Hỏi nhanh</a>
        </nav>
        <a className="btn btn-primary btn-sm" href="/studio">
          Vào phòng học
        </a>
      </div>
    </header>
  );
}

function PriceBoard() {
  return (
    <figure className="board" aria-label="Bảng giá minh hoạ một ly trà sữa, chia thành c, v và m">
      <div className="board-head">
        <span>Bảng giá một ly trà sữa</span>
        <span>Ví dụ minh hoạ</span>
      </div>
      <ol className="board-rows">
        <li className="board-row is-total">
          <span className="board-name">
            Trà sữa trân châu, size L
            <small>Giá bán</small>
          </span>
          <span className="board-num">{vnd(receipt.price)}</span>
        </li>
        {receipt.lines.map((line) => (
          <li className={'board-row' + (line.key === 'm' ? ' is-m' : '')} key={line.key}>
            <span className="board-key">{line.key}</span>
            <span className="board-name">
              {line.label}
              <small>{line.note}</small>
            </span>
            <span className="board-num">{vnd(line.value)}</span>
          </li>
        ))}
      </ol>
      <div className="board-note">
        m′ = m / v = 200%. Con số là ví dụ để học phạm trù, không phải giá thật của quán nào.
      </div>
    </figure>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div>
        <h1>Một ly trà sữa cũng có giá trị thặng dư.</h1>
        <p className="lede">
          Sạp 122 viết lại sáu chương Kinh tế chính trị Mác – Lênin quanh những thứ bạn gặp mỗi ngày:
          hoá đơn quán nước, chuyến xe shipper, phiên livestream, bảng giá vàng. Có bảng tính kéo
          được, có câu hỏi kèm giải thích, tiến độ lưu trên máy bạn.
        </p>
        <div className="hero-actions">
          <a className="btn btn-primary" href="/studio">
            Vào phòng học
          </a>
          <a className="btn btn-quiet" href="#chuong">
            Xem sáu chương
          </a>
        </div>
        <div className="hero-facts">
          <div>
            <b>6</b> chương theo giáo trình
          </div>
          <div>
            <b>3</b> tín chỉ
          </div>
          <div>
            <b>14</b> câu hỏi có giải thích
          </div>
          <div>Không cần tài khoản</div>
        </div>
      </div>
      <PriceBoard />
    </section>
  );
}

function ChapterShelf() {
  return (
    <section className="section" id="chuong">
      <div className="section-head">
        <h2>Sáu chương, sáu câu hỏi bạn đã từng tự hỏi.</h2>
        <p>
          Mỗi chương mở bằng một câu hỏi đời thường rồi mới đi vào phạm trù. Đọc từ trên xuống, hoặc
          nhảy thẳng vào chương đang học trên lớp.
        </p>
      </div>

      <ol className="shelf">
        {course.chapters.map((chapter) => (
          <li key={chapter.id}>
            <a className="shelf-row" href={`/studio?chuong=${chapter.id}`}>
              <span className="shelf-no">{chapter.number}</span>
              <span>
                <span className="shelf-title">{chapter.title}</span>
                <span className="shelf-hook">{chapter.hook}</span>
              </span>
              <span className="shelf-level">{chapter.level}</span>
              <span className="shelf-time">{chapter.time} phút</span>
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}

function FieldNotes() {
  return (
    <section className="section" id="cach-hoc">
      <div className="notes">
        <figure>
          <img
            src="/sap-hang.jpg"
            alt="Một sạp tạp hoá nhỏ với hàng hoá đóng gói treo kín vách và những tấm bảng giá viết tay"
            width="700"
            height="525"
            loading="lazy"
            decoding="async"
          />
          <figcaption>
            Sạp hàng nhỏ là nơi chương 2 xuất hiện cùng lúc: hàng hoá, hai thuộc tính của hàng hoá,
            tiền, cung cầu và cả sự mặc cả.
          </figcaption>
        </figure>

        <div>
          <h2>Điểm khó không nằm ở số tiết.</h2>
          <p className="lede">
            Các phạm trù của môn này rất trừu tượng, và đề cương thì không giúp bạn hình dung. Cách
            duy nhất để nhớ lâu là gắn mỗi phạm trù với một vật cụ thể rồi tự kiểm tra lại.
          </p>
          <ul className="note-list">
            <li>
              <b>Một phạm trù, một vật thật</b>
              <p>
                Giá trị thặng dư đi với tờ hoá đơn. Cạnh tranh đi với hai quán cà phê sát vách. Hội
                nhập đi với một chiếc điện thoại.
              </p>
            </li>
            <li>
              <b>Đoán trước, đọc sau</b>
              <p>
                Mỗi câu hỏi có phản hồi giải thích ngay khi bạn chọn. Đoán sai một lần rồi hiểu vì sao
                sai tốt hơn đọc lại ba lần.
              </p>
            </li>
            <li>
              <b>Học theo chương đang lên lớp</b>
              <p>
                Phòng học giữ trạng thái từng chương, để mở máy ra là biết mình đang ở đâu và còn
                chương nào chưa đụng tới.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function Counter() {
  const [price, setPrice] = useState(45000);
  const c = 18000;
  const v = 9000;
  const m = price - c - v;
  const rate = (m / v) * 100;
  const total = Math.max(price, 1);

  return (
    <section className="section" id="bang-tinh">
      <div className="counter">
        <div>
          <h2>Kéo giá bán, thấy m′ xuất hiện.</h2>
          <p className="lede" style={{ marginTop: 18 }}>
            Giả định một quán nhỏ: mỗi ly tốn 18.000đ nguyên liệu và khấu hao máy, 9.000đ tiền công.
            Kéo giá bán để thấy giá trị thặng dư và tỷ suất thặng dư thay đổi. Bản đầy đủ có thêm
            thanh trượt cho nguyên liệu, khấu hao và tiền công.
          </p>
          <p style={{ marginTop: 16 }}>
            <a className="btn btn-quiet btn-sm" href="/studio">
              Mở bảng tính đầy đủ
            </a>
          </p>
        </div>

        <div className="counter-panel">
          <div className="counter-head">
            <span>Quầy tính một ly</span>
            <span>Minh hoạ</span>
          </div>
          <div className="counter-body">
            <div className="field">
              <label className="field-label" htmlFor="gia-ban">
                <span>Giá bán</span>
                <output htmlFor="gia-ban">{vnd(price)}đ</output>
              </label>
              <input
                id="gia-ban"
                className="range"
                type="range"
                min="20000"
                max="80000"
                step="1000"
                value={price}
                onChange={(event) => setPrice(Number(event.target.value))}
              />
            </div>

            <div className="split" aria-hidden="true">
              <span className="split-c" style={{ width: `${(c / total) * 100}%` }} />
              <span className="split-v" style={{ width: `${(v / total) * 100}%` }} />
              <span className="split-m" style={{ width: `${(Math.max(m, 0) / total) * 100}%` }} />
            </div>
            <div className="legend">
              <span>
                <i style={{ background: 'var(--rule)' }} /> c, nguyên liệu và khấu hao
              </span>
              <span>
                <i style={{ background: 'var(--board)' }} /> v, tiền công
              </span>
              <span>
                <i style={{ background: 'var(--yellow)' }} /> m, giá trị thặng dư
              </span>
            </div>

            <div className="readout">
              <div className={m < 0 ? '' : 'is-m'}>
                <span className="readout-label">Giá trị thặng dư m</span>
                <span className="readout-value">
                  {vnd(m)}
                  <small>đ</small>
                </span>
              </div>
              <div>
                <span className="readout-label">Tỷ suất m′ bằng m chia v</span>
                <span className="readout-value">
                  {rate.toFixed(0)}
                  <small>%</small>
                </span>
              </div>
            </div>

            <p className={'counter-note' + (m < 0 ? ' is-loss' : '')}>
              {m < 0
                ? 'Giá bán thấp hơn chi phí nên không có phần dôi ra. Quán đang lỗ, và đây là lúc phạm trù trở nên rất cụ thể.'
                : 'c và v không đổi. Phần dôi ra chỉ đến từ lao động sống trong giờ làm việc.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Rooms() {
  return (
    <section className="section" id="phong-hoc">
      <div className="section-head">
        <h2>Phòng học không phải bản số hoá của giáo trình.</h2>
        <p>
          Nó là lớp ghi chú bấm được, để dùng trước giờ lên lớp và trước ngày thi. Ba phần dưới đây
          làm những việc mà đề cương giấy không làm được.
        </p>
      </div>

      <div className="rooms">
        <article className="room">
          <h3>Biết mình đang ở đâu</h3>
          <p>
            Sáu chương hiện như sáu mục công việc: đã đọc hay chưa, chương nào đang mở, điểm luyện
            cao nhất. Bảng điều khiển này xếp theo thứ tự giáo trình nên không phải nhớ lại.
          </p>
          <span className="tag">Lưu trong trình duyệt, không cần đăng nhập</span>
        </article>
        <article className="room">
          <h3>Tính c, v, m bằng tay</h3>
          <p>
            Bốn thanh trượt cho giá bán, nguyên liệu, khấu hao, tiền công. Máy tính trả về c, v, m,
            m′ và cảnh báo khi bạn kéo tới vùng không có thặng dư.
          </p>
          <span className="tag">Cập nhật ngay khi kéo</span>
        </article>
        <article className="room">
          <h3>Tự kiểm tra trước khi thi</h3>
          <p>
            Mười bốn câu trắc nghiệm có giải thích, mười hai thẻ ghi nhớ, và phần đánh dấu từng chương
            khi bạn đã đọc xong. Sai ở đâu thì biết ngay ở đó.
          </p>
          <span className="tag">Có giải thích cho mọi đáp án</span>
        </article>
      </div>
    </section>
  );
}

function Questions() {
  return (
    <section className="section" id="hoi-dap">
      <div className="qa">
        <div>
          <h2>Hỏi nhanh trước khi học.</h2>
          <p className="lede" style={{ marginTop: 16 }}>
            Phần chân trang nói rõ nguồn nội dung và giới hạn của trang. Nếu bạn còn thắc mắc khác,
            hỏi giảng viên trước khi dùng trang này để ôn thi.
          </p>
        </div>
        <div className="qa-list">
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
        <h2>Chọn một chương và bắt đầu từ câu hỏi.</h2>
        <p>
          Không cần đăng ký. Tiến độ nằm trên máy bạn và chỉ mất khi bạn xoá dữ liệu trình duyệt.
        </p>
      </div>
      <div>
        <a className="btn" href="/studio">
          Vào phòng học
        </a>
        <p className="closing-meta">Sáu chương, khoảng hai tiếng rưỡi nếu đọc liền.</p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <span className="footer-mark">
            Sạp <span>122</span>
          </span>
          <p className="footer-note">
            Nội dung tóm tắt và diễn giải lại từ giáo trình Kinh tế chính trị Mác – Lênin, dùng cho
            việc tự học. Trang không thay thế tài liệu chính thức, bài giảng hay hướng dẫn ôn thi của
            giảng viên. Ảnh trong bài là ảnh tư liệu, cần kiểm tra lại giấy phép nếu dùng công khai.
          </p>
        </div>
        <nav className="footer-links" aria-label="Liên kết chân trang">
          <a href="/studio">Phòng học</a>
          <a href="/studio?chuong=chuong-3">Chương 3, giá trị thặng dư</a>
          <a href="#hoi-dap">Câu hỏi thường gặp</a>
        </nav>
        <div className="footer-meta">
          MLN122, 3 tín chỉ
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
    <>
      <Masthead />
      <main className="shell">
        <Hero />
        <ChapterShelf />
        <FieldNotes />
        <Counter />
        <Rooms />
        <Questions />
        <Closing />
      </main>
      <Footer />
    </>
  );
}
