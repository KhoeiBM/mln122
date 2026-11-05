import Link from 'next/link';
import { chapterLabel, chapterTitle } from '../src/content/chapters';
import { MILESTONES } from '../src/content/prologue';
import { SCENARIOS } from '../src/content/scenarios';

const STAGES = [
  {
    num: '01',
    name: 'Đọc hai mốc lịch sử',
    time: 'khoảng 3 phút',
    body: 'Năm 1986 và năm 2007: hai lần nền kinh tế đổi cách vận hành, hai lần có người phải chọn trước.',
  },
  {
    num: '02',
    name: 'Chọn một phương án',
    time: 'khoảng 3 phút',
    body: 'Mỗi kịch bản có ba phương án. Mở hệ quả của từng phương án trên ba trục trước khi ghi lựa chọn của bạn.',
  },
  {
    num: '03',
    name: 'Xem ba phía, viết phản biện',
    time: 'khoảng 5 phút',
    body: 'Cùng một quyết định, ba người chịu ba hậu quả khác nhau. Rồi bạn giải thích lựa chọn bằng phạm trù MLN122.',
  },
];

export default function HomePage() {
  return (
    <div className="home">
      <section className="cover">
        <p className="cover-kicker">MLN122 · Kinh tế chính trị Mác – Lênin · Đại học FPT</p>
        <h1 className="cover-title">
          Một quyết định.
          <br />
          Nhiều góc nhìn.
        </h1>
        <p className="cover-lead">
          Bạn không đọc lại giáo trình. Bạn ngồi vào ghế người phải quyết định: một nhà máy có 1.200
          công nhân, hoặc một ứng dụng giao đồ ăn giữ 72% thị phần. Ba phương án, ba hệ quả, ba
          người chịu — và không có đáp án đúng.
        </p>
        <div className="cover-actions">
          <Link className="btn btn-primary" href="/lich-su">
            Bắt đầu từ hai mốc lịch sử
          </Link>
          <Link className="btn btn-ghost" href="/kich-ban">
            Vào thẳng kịch bản
          </Link>
        </div>
        <p className="cover-note">
          Khoảng 20 phút cho cả hai kịch bản. Tiến độ lưu trên máy bạn, không cần tài khoản.
        </p>
      </section>

      <section className="stages" aria-label="Ba chặng của sản phẩm">
        {STAGES.map((stage) => (
          <article className="stage" key={stage.num}>
            <p className="stage-num">{stage.num}</p>
            <h2 className="stage-name">{stage.name}</h2>
            <p className="stage-time">{stage.time}</p>
            <p className="stage-body">{stage.body}</p>
          </article>
        ))}
      </section>

      <section className="home-milestones" aria-labelledby="home-moc">
        <h2 id="home-moc" className="section-title">
          Hai mốc mở đầu
        </h2>
        <div className="mile-strip">
          {MILESTONES.map((milestone) => (
            <Link className="mile-card" href={`/lich-su#${milestone.id}`} key={milestone.id}>
              <span className="mile-card-year">{milestone.year}</span>
              <span className="mile-card-title">{milestone.title}</span>
              <span className="mile-card-note">{milestone.figures[0].value} — {milestone.figures[0].label}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="home-scenarios" aria-labelledby="home-kich-ban">
        <h2 id="home-kich-ban" className="section-title">
          Hai kịch bản
        </h2>
        <div className="card-grid">
          {SCENARIOS.map((scenario) => (
            <article className="scene-card" key={scenario.id}>
              <p className="scene-code">
                {scenario.code} — {scenario.minutes} phút
              </p>
              <h3 className="scene-title">{scenario.title}</h3>
              <p className="scene-kicker">{scenario.kicker}</p>
              <p className="scene-role">{scenario.role.name}</p>
              <ul className="scene-chips">
                {scenario.chapters.map((n) => (
                  <li key={n} title={chapterTitle(n)}>
                    {chapterLabel(n)}
                  </li>
                ))}
              </ul>
              <Link className="btn btn-sm" href={`/kich-ban/${scenario.id}`}>
                Mở kịch bản này
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="why" aria-labelledby="home-vi-sao">
        <h2 id="home-vi-sao" className="section-title">
          Vì sao làm trang này
        </h2>
        <div className="why-grid">
          <div>
            <h3 className="why-title">Học xong khái niệm nhưng không dùng được</h3>
            <p>
              Giá trị thặng dư, quan hệ sản xuất, độc quyền đều dễ đọc. Khó là nhìn một tình huống
              thật và biết khái niệm nào đang giải thích nó. Sản phẩm này bắt đầu từ tình huống,
              không bắt đầu từ định nghĩa.
            </p>
          </div>
          <div>
            <h3 className="why-title">Không có đáp án đúng, nên phải lập luận</h3>
            <p>
              Cả ba phương án đều có người được lợi và người trả giá. Vì không thể chọn theo đáp án
              mẫu, người học phải nói rõ mình dựa vào phạm trù nào — đó là phần được ghi vào hồ sơ.
            </p>
          </div>
          <div>
            <h3 className="why-title">Nối lịch sử kinh tế với quyết định hôm nay</h3>
            <p>
              1986 và 2007 không phải chuyện để nhớ ngày tháng. Chúng là hai lần cùng một câu hỏi:
              ai chịu chi phí của thay đổi, và chịu trong bao lâu.
            </p>
          </div>
        </div>
        <p className="why-note">
          Số liệu lịch sử đang ở dạng nháp và được ghi rõ trong hồ sơ.{' '}
          <Link href="/ho-so#gioi-han">Xem nguồn và giới hạn</Link>.
        </p>
      </section>
    </div>
  );
}
