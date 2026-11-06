import Link from 'next/link';
import ItemGrid from '../src/components/receipt/ItemGrid';
import XpStrip from '../src/components/practice/XpStrip';
import { ITEMS } from '../src/content/items';
import { formatVnd } from '../src/lib/split';

const STEPS = [
  {
    num: '01',
    name: 'Chia giá bán',
    body: 'Bảy khoản, cộng đủ 100%. Bạn phải quyết định bao nhiêu là vải, bao nhiêu là công, bao nhiêu là lợi nhuận.',
  },
  {
    num: '02',
    name: 'Mở phần thật',
    body: 'Đặt cách chia của bạn cạnh một khoảng tham chiếu, rồi gộp lại thành c, v, m và tự tính m′.',
  },
  {
    num: '03',
    name: 'Xem ai lấy gì',
    body: 'Bốn người trong cùng một món hàng. Rồi chọn chỗ cắt 5% và đọc xem ai thật sự phải chịu.',
  },
];

export default function HomePage() {
  return (
    <div className="home">
      <section className="hero">
        <p className="hero-kicker">MLN122 · Kinh tế chính trị Mác – Lênin · Đại học FPT</p>
        <h1 className="hero-title">
          Một món hàng.
          <br />
          Ai lấy phần nào?
        </h1>
        <p className="hero-lead">
          Ly trà sữa {formatVnd(45000)}, chiếc áo thun {formatVnd(250000)}, suất ăn {formatVnd(35000)}.
          Bạn thấy giá bán, nhưng không thấy bên trong nó có bao nhiêu là nguyên liệu, bao nhiêu là
          công, bao nhiêu là phần dôi ra. Trang này để bạn tự chia trước, rồi mới đối chiếu.
        </p>
        <div className="hero-actions">
          <Link className="btn btn-primary" href={`/boc/${ITEMS[0].id}`}>
            Bóc thử ly trà sữa
          </Link>
          <Link className="btn btn-ghost" href="/kien-thuc">
            Đọc phần kiến thức
          </Link>
        </div>
        <p className="hero-note">
          Khoảng 4 phút mỗi món. Không cần tài khoản, cách chia được lưu trên máy bạn.
        </p>
      </section>

      <section className="stages" aria-label="Ba bước của một lần bóc">
        {STEPS.map((step) => (
          <article className="stage" key={step.num}>
            <p className="stage-num">{step.num}</p>
            <h2 className="stage-name">{step.name}</h2>
            <p className="stage-body">{step.body}</p>
          </article>
        ))}
      </section>

      <section className="section" aria-labelledby="ba-mon">
        <h2 id="ba-mon" className="section-title">
          Ba món để bóc
        </h2>
        <ItemGrid />
      </section>

      <section className="section" aria-labelledby="luyen">
        <h2 id="luyen" className="section-title">
          Luyện nhanh
        </h2>
        <p className="section-lead">
          Ba chế độ luyện lấy từ chính tám phạm trù và số liệu ba món: thẻ ghi nhớ có lịch ôn giãn,
          ghép cặp phạm trù với dòng ứng dụng, trắc nghiệm có giải thích từng phương án. Điểm kinh
          nghiệm và chuỗi ngày chỉ để bạn thấy mình có quay lại đều không.
        </p>
        <XpStrip />
        <div className="hero-actions">
          <Link className="btn btn-primary" href="/luyen">
            Mở phần luyện
          </Link>
          <Link className="btn btn-ghost" href="/kien-thuc">
            Xem tám phạm trù
          </Link>
        </div>
      </section>

      <section className="section why" aria-labelledby="vi-sao">
        <h2 id="vi-sao" className="section-title">
          Vì sao làm theo cách này
        </h2>
        <div className="why-grid">
          <div>
            <h3 className="why-title">Giá là chỗ kiến thức bị bỏ qua nhiều nhất</h3>
            <p>
              Ai cũng biết một ly trà sữa giá bao nhiêu, gần như không ai biết bên trong nó có bao
              nhiêu là công lao động. Bắt đầu từ con số quen thuộc thì phạm trù mới có chỗ bám.
            </p>
          </div>
          <div>
            <h3 className="why-title">Phải tự chia, không được chọn đáp án</h3>
            <p>
              Không có phương án A, B, C. Bạn đặt từng phần trăm, nên kết quả là cách nghĩ của bạn —
              và chỗ lệch với tham chiếu là chỗ cần giải thích, không phải điểm trừ.
            </p>
          </div>
          <div>
            <h3 className="why-title">Tự tính ra m′ của chính mình</h3>
            <p>
              m′ không phải công thức để học thuộc. Bạn vừa có m và v do mình chia, nên con số xuất
              hiện như hệ quả của một quyết định phân phối.
            </p>
          </div>
        </div>
      </section>

      <section className="section honest" aria-labelledby="trung-thuc">
        <h2 id="trung-thuc" className="section-title">
          Con số lấy từ đâu
        </h2>
        <p>
          Cả ba món dùng <strong>khoảng tham chiếu minh hoạ</strong> dựng để dạy cách chia, không
          phải số liệu công bố của quán hay doanh nghiệp nào. Mỗi món ghi chú ngay dưới phần kết quả.
          Phần trích dẫn giáo trình có ghi nguồn, số trang còn chờ đối chiếu bản in.
        </p>
        <p>
          <Link href="/kien-thuc#nguon">Xem đầy đủ nguồn và giới hạn</Link>.
        </p>
      </section>
    </div>
  );
}
